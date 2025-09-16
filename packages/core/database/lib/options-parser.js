/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var options_parser_exports = {};
__export(options_parser_exports, {
  OptionsParser: () => OptionsParser
});
module.exports = __toCommonJS(options_parser_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_filter_parser = __toESM(require("./filter-parser"));
var import_qs = __toESM(require("qs"));
const debug = require("debug")("noco-database");
const _OptionsParser = class _OptionsParser {
  options;
  database;
  collection;
  model;
  filterParser;
  context;
  constructor(options, context) {
    const { collection } = context;
    this.collection = collection;
    this.model = collection.model;
    this.options = options;
    this.database = collection.context.database;
    this.filterParser = new import_filter_parser.default(options == null ? void 0 : options.filter, {
      collection,
      app: {
        ctx: options == null ? void 0 : options.context
      }
    });
    this.context = context;
  }
  static appendInheritInspectAttribute(include, collection) {
    if (include.find((item) => (item == null ? void 0 : item[1]) === "__tableName")) {
      return;
    }
    include.push([
      import_sequelize.Sequelize.literal(`(select relname from pg_class where pg_class.oid = "${collection.name}".tableoid)`),
      "__tableName"
    ]);
    include.push([
      import_sequelize.Sequelize.literal(`
        (SELECT n.nspname
        FROM pg_class c
               JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.oid = "${collection.name}".tableoid)
      `),
      "__schemaName"
    ]);
  }
  isAssociation(key) {
    return this.model.associations[key] !== void 0;
  }
  isAssociationPath(path) {
    return this.isAssociation(path.split(".")[0]);
  }
  filterByTkToWhereOption() {
    var _a;
    const filterByTkOption = (_a = this.options) == null ? void 0 : _a.filterByTk;
    if (!filterByTkOption) {
      return {};
    }
    if (import_lodash.default.isPlainObject(this.options.filterByTk)) {
      const where = {};
      for (const [key, value] of Object.entries(filterByTkOption)) {
        where[key] = value;
      }
      return where;
    }
    const filterTargetKey = this.context.targetKey || this.collection.filterTargetKey;
    if (Array.isArray(filterTargetKey)) {
      throw new Error("multi filter target key value must be object");
    }
    return {
      [filterTargetKey]: filterByTkOption
    };
  }
  toSequelizeParams(options = { parseSort: true }) {
    var _a, _b;
    const queryParams = this.filterParser.toSequelizeParams();
    if ((_a = this.options) == null ? void 0 : _a.filterByTk) {
      const filterByTkWhere = this.filterByTkToWhereOption();
      queryParams.where = {
        [import_sequelize.Op.and]: [queryParams.where, filterByTkWhere]
      };
    }
    if ((_b = this.options) == null ? void 0 : _b.include) {
      if (!queryParams.include) {
        queryParams.include = [];
      }
      queryParams.include.push(...import_lodash.default.castArray(this.options.include));
    }
    const fields = this.parseFields(queryParams);
    return options.parseSort ? this.parseSort(fields) : fields;
  }
  /**
   * parser sort options
   * @param filterParams
   * @protected
   */
  parseSort(filterParams) {
    var _a, _b;
    let sort = ((_a = this.options) == null ? void 0 : _a.sort) || [];
    if (typeof sort === "string") {
      sort = sort.split(",");
    }
    let defaultSortField = this.model.primaryKeyAttribute;
    if (Array.isArray(this.collection.filterTargetKey)) {
      defaultSortField = this.collection.filterTargetKey;
    }
    if (!defaultSortField && this.collection.filterTargetKey && !Array.isArray(this.collection.filterTargetKey)) {
      defaultSortField = this.collection.filterTargetKey;
    }
    if (defaultSortField && !((_b = this.options) == null ? void 0 : _b.group)) {
      defaultSortField = import_lodash.default.castArray(defaultSortField);
      for (const key of defaultSortField) {
        if (!sort.includes(key) && !sort.includes(`-${key}`)) {
          sort.push(key);
        }
      }
    }
    const orderParams = [];
    for (const sortKey of sort) {
      let direction = sortKey.startsWith("-") ? "DESC" : "ASC";
      const sortField = sortKey.startsWith("-") ? sortKey.replace("-", "").split(".") : sortKey.split(".");
      if (this.database.inDialect("postgres", "sqlite")) {
        direction = `${direction} NULLS LAST`;
      }
      if (sortField.length > 1) {
        let associationModel = this.model;
        for (let i = 0; i < sortField.length - 1; i++) {
          const associationKey = sortField[i];
          sortField[i] = associationModel.associations[associationKey].target;
          associationModel = sortField[i];
        }
      } else {
        const rawField = this.model.rawAttributes[sortField[0]];
        sortField[0] = (rawField == null ? void 0 : rawField.field) || sortField[0];
      }
      sortField.push(direction);
      if (this.database.isMySQLCompatibleDialect()) {
        const fieldName = sortField[0];
        if (this.model.fieldRawAttributesMap[fieldName]) {
          orderParams.push([import_sequelize.Sequelize.fn("ISNULL", import_sequelize.Sequelize.col(`${this.model.name}.${sortField[0]}`))]);
        }
      }
      orderParams.push(sortField);
    }
    if (orderParams.length > 0) {
      return {
        order: orderParams,
        ...filterParams
      };
    }
    return filterParams;
  }
  parseFields(filterParams) {
    var _a, _b, _c, _d;
    const appends = ((_a = this.options) == null ? void 0 : _a.appends) || [];
    const except = [];
    if ((_b = this.options) == null ? void 0 : _b.attributes) {
      return {
        attributes: this.options.attributes
      };
    }
    let attributes = {
      include: [],
      exclude: []
    };
    if (this.collection.isParent()) {
      _OptionsParser.appendInheritInspectAttribute(attributes.include, this.collection);
    }
    if ((_c = this.options) == null ? void 0 : _c.fields) {
      attributes = [];
      if (this.collection.isParent()) {
        _OptionsParser.appendInheritInspectAttribute(attributes, this.collection);
      }
      for (const field of this.options.fields) {
        if (this.isAssociationPath(field)) {
          appends.push(field);
        } else {
          attributes.push(field);
        }
      }
    }
    if ((_d = this.options) == null ? void 0 : _d.except) {
      for (const exceptKey of this.options.except) {
        if (this.isAssociationPath(exceptKey)) {
          except.push(exceptKey);
        } else {
          if (Array.isArray(attributes)) continue;
          attributes.exclude.push(exceptKey);
        }
      }
    }
    return {
      attributes,
      ...this.parseExcept(except, this.parseAppends(appends, filterParams))
    };
  }
  parseExcept(except, filterParams) {
    if (!except) return filterParams;
    const setExcept = /* @__PURE__ */ __name((queryParams, except2) => {
      const exceptPath = except2.split(".");
      const association = exceptPath[0];
      const lastLevel = exceptPath.length <= 2;
      const existIncludeIndex = queryParams["include"].findIndex((include) => include["association"] == association);
      if (existIncludeIndex == -1) {
        return;
      }
      if (lastLevel) {
        if (Array.isArray(queryParams["include"][existIncludeIndex]["attributes"])) {
          return;
        } else {
          if (!queryParams["include"][existIncludeIndex]["attributes"]["exclude"]) {
            queryParams["include"][existIncludeIndex]["attributes"]["exclude"] = [];
          }
          queryParams["include"][existIncludeIndex]["attributes"]["exclude"].push(exceptPath[1]);
        }
      } else {
        setExcept(queryParams["include"][existIncludeIndex], exceptPath.filter((_, index) => index !== 0).join("."));
      }
    }, "setExcept");
    for (const exceptKey of except) {
      setExcept(filterParams, exceptKey);
    }
    return filterParams;
  }
  parseAppendWithOptions(append) {
    const parts = append.split("(");
    const obj = {
      name: parts[0]
    };
    if (parts.length > 1) {
      const optionsStr = parts[1].replace(")", "");
      obj.options = import_qs.default.parse(optionsStr);
      obj.raw = `(${optionsStr})`;
    }
    return obj;
  }
  parseAppends(appends, filterParams) {
    if (!appends) return filterParams;
    appends = import_lodash.default.sortBy(appends, (append) => append.split(".").length);
    const setInclude = /* @__PURE__ */ __name((model, queryParams, append) => {
      var _a;
      const appendWithOptions = this.parseAppendWithOptions(append);
      append = appendWithOptions.name;
      const appendFields = append.split(".");
      const appendAssociation = appendFields[0];
      const associations = model.associations;
      let lastLevel = false;
      if (appendFields.length == 1) {
        lastLevel = true;
      }
      if (appendFields.length == 2) {
        const association = associations[appendFields[0]];
        if (!association) {
          throw new Error(`association ${appendFields[0]} in ${model.name} not found`);
        }
        const associationModel = associations[appendFields[0]].target;
        if (associationModel.rawAttributes[appendFields[1]]) {
          lastLevel = true;
        }
      }
      if (queryParams["include"] == void 0) {
        queryParams["include"] = [];
      }
      let existIncludeIndex = queryParams["include"].findIndex(
        (include) => include["association"] == appendAssociation
      );
      if (existIncludeIndex != -1) {
        delete queryParams["include"][existIncludeIndex]["fromFilter"];
        if (Array.isArray(queryParams["include"][existIncludeIndex]["attributes"]) && queryParams["include"][existIncludeIndex]["attributes"].length == 0) {
          queryParams["include"][existIncludeIndex]["attributes"] = {
            include: []
          };
        }
      }
      if (lastLevel && existIncludeIndex != -1 && ((_a = import_lodash.default.get(queryParams, ["include", existIncludeIndex, "attributes", "include"])) == null ? void 0 : _a.length) == 0) {
        return;
      }
      if (existIncludeIndex == -1) {
        queryParams["include"].push({
          association: appendAssociation,
          options: appendWithOptions.options || {}
        });
        existIncludeIndex = queryParams["include"].length - 1;
      }
      if (lastLevel) {
        let attributes = queryParams["include"][existIncludeIndex]["attributes"] || {
          include: []
          // all fields are output by default
        };
        if (appendFields.length == 2) {
          if (!Array.isArray(attributes)) {
            attributes = [];
          }
          const attributeName = appendFields[1];
          attributes.push(attributeName);
        } else {
          if (Array.isArray(attributes) && attributes.length == 0) {
            attributes = {
              include: []
            };
          }
        }
        queryParams["include"][existIncludeIndex] = {
          ...queryParams["include"][existIncludeIndex],
          attributes
        };
      } else {
        const existInclude = queryParams["include"][existIncludeIndex];
        if (existInclude.attributes && Array.isArray(existInclude.attributes) && existInclude.attributes.length == 0) {
          existInclude.attributes = {
            include: []
          };
        }
        let nextAppend = appendFields.filter((_, index) => index !== 0).join(".");
        if (appendWithOptions.raw) {
          nextAppend += appendWithOptions.raw;
        }
        setInclude(
          model.associations[queryParams["include"][existIncludeIndex].association].target,
          queryParams["include"][existIncludeIndex],
          nextAppend
        );
      }
    }, "setInclude");
    for (const append of appends) {
      setInclude(this.model, filterParams, append);
    }
    debug("filter params: %o", filterParams);
    return filterParams;
  }
};
__name(_OptionsParser, "OptionsParser");
let OptionsParser = _OptionsParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OptionsParser
});
