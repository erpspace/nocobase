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
var filter_parser_exports = {};
__export(filter_parser_exports, {
  default: () => FilterParser
});
module.exports = __toCommonJS(filter_parser_exports);
var import_flat = require("flat");
var import_lodash = __toESM(require("lodash"));
const debug = require("debug")("noco-database");
const _FilterParser = class _FilterParser {
  collection;
  database;
  model;
  filter;
  context;
  constructor(filter, context) {
    const { collection } = context;
    this.collection = collection;
    this.context = context;
    this.model = collection.model;
    this.filter = this.prepareFilter(filter);
    this.database = collection.context.database;
  }
  prepareFilter(filter) {
    if (import_lodash.default.isPlainObject(filter)) {
      const renamedKey = {};
      for (const key of Object.keys(filter)) {
        if (key.endsWith(".$exists") || key.endsWith(".$notExists")) {
          const keyArr = key.split(".");
          if (keyArr[keyArr.length - 2] == "id") {
            continue;
          }
          keyArr.splice(keyArr.length - 1, 0, "id");
          renamedKey[key] = keyArr.join(".");
        }
      }
      for (const [oldKey, newKey] of Object.entries(renamedKey)) {
        filter[newKey] = filter[oldKey];
        delete filter[oldKey];
      }
    }
    return filter;
  }
  toSequelizeParams() {
    debug("filter %o", this.filter);
    if (!this.filter) {
      return {};
    }
    const filter = this.filter;
    const model = this.model;
    const operators = this.database.operators;
    const originalFiler = import_lodash.default.cloneDeep(filter || {});
    const flattenedFilter = (0, import_flat.flatten)(filter || {});
    debug("flattened filter %o", flattenedFilter);
    const include = {};
    const where = {};
    let skipPrefix = null;
    const associations = model.associations;
    debug("associations %O", associations);
    for (const entry of Object.entries(flattenedFilter)) {
      const key = entry[0];
      let value = entry[1];
      if (skipPrefix && key.startsWith(skipPrefix)) {
        continue;
      }
      if ((key == "$or" || key == "$and") && Array.isArray(value) && value.length == 0) {
        continue;
      }
      debug('handle filter key "%s: "%s"', key, value);
      const keys = key.split(".");
      const paths = [];
      const origins = [];
      while (keys.length) {
        debug("keys: %o, paths: %o, origins: %o", keys, paths, origins);
        const firstKey = keys.shift();
        origins.push(firstKey);
        debug("origins: %o", origins);
        if (firstKey.startsWith("$")) {
          if (operators.has(firstKey)) {
            debug("%s is operator", firstKey);
            const opKey = operators.get(firstKey);
            debug("operator key %s, operator: %o", firstKey, opKey);
            if (typeof opKey === "symbol") {
              paths.push(opKey);
              continue;
            } else if (typeof opKey === "function") {
              skipPrefix = origins.join(".");
              const queryValue = import_lodash.default.get((0, import_flat.unflatten)(originalFiler), skipPrefix);
              const [fieldName, fullName] = this.getFieldNameFromQueryPath(skipPrefix);
              value = opKey(queryValue, {
                app: this.context.app,
                db: this.database,
                path: skipPrefix,
                fullName,
                fieldName,
                fieldPath: `${this.collection.name}.${fullName}`,
                model: this.model
              });
              break;
            }
          } else {
            paths.push(firstKey);
            continue;
          }
        }
        if (!import_lodash.default.isNaN(parseInt(firstKey))) {
          paths.push(firstKey);
          continue;
        }
        if (!associations[firstKey]) {
          paths.push(firstKey);
          continue;
        }
        const association = associations[firstKey];
        const associationKeys = [];
        associationKeys.push(firstKey);
        debug("associationKeys %o", associationKeys);
        const existInclude = import_lodash.default.get(include, firstKey);
        if (!existInclude) {
          let includeOptions = {
            association: firstKey,
            attributes: []
            // out put empty fields by default
          };
          if (association.associationType === "BelongsToArray") {
            includeOptions = {
              ...includeOptions,
              ...association.generateInclude()
            };
          }
          import_lodash.default.set(include, firstKey, includeOptions);
        }
        let target = associations[firstKey].target;
        debug("association target %o", target);
        while (target) {
          const attr = keys.shift();
          origins.push(attr);
          if (target.rawAttributes[attr]) {
            associationKeys.push(target.rawAttributes[attr].field || attr);
            target = null;
          } else if (target.associations[attr]) {
            associationKeys.push(attr);
            const assoc = [];
            associationKeys.forEach((associationKey, index) => {
              if (index > 0) {
                assoc.push("include");
              }
              assoc.push(associationKey);
            });
            const existInclude2 = import_lodash.default.get(include, assoc);
            if (!existInclude2) {
              import_lodash.default.set(include, assoc, {
                association: attr,
                attributes: []
              });
            }
            target = target.associations[attr].target;
          } else {
            throw new Error(`${attr} neither ${firstKey}'s association nor ${firstKey}'s attribute`);
          }
        }
        debug("associationKeys %o", associationKeys);
        if (associationKeys.length > 1) {
          paths.push(`$${associationKeys.join(".")}$`);
        } else {
          paths.push(firstKey);
        }
      }
      debug("where %o, paths %o, value, %o", where, paths, value);
      const values = import_lodash.default.get(where, paths);
      if (values && typeof values === "object" && value && typeof value === "object") {
        value = { ...value, ...values };
      }
      import_lodash.default.set(where, paths, value);
    }
    const toInclude = /* @__PURE__ */ __name((items) => {
      return Object.values(items).map((item) => {
        if (item.include) {
          item.include = toInclude(item.include);
        }
        return item;
      });
    }, "toInclude");
    debug("where %o, include %o", where, include);
    const results = { where, include: toInclude(include) };
    const traverseInclude = /* @__PURE__ */ __name((include2) => {
      for (const item of include2) {
        if (item.include) {
          traverseInclude(item.include);
        }
        item.fromFilter = true;
      }
    }, "traverseInclude");
    traverseInclude(results.include);
    return results;
  }
  getFieldNameFromQueryPath(queryPath) {
    const paths = queryPath.split(".");
    let fieldName;
    const fullPaths = [];
    for (const path of paths) {
      if (path.startsWith("$") || !import_lodash.default.isNaN(parseInt(path))) {
        continue;
      }
      fullPaths.push(path);
      fieldName = path;
    }
    return [fieldName, fullPaths.join(".")];
  }
};
__name(_FilterParser, "FilterParser");
let FilterParser = _FilterParser;
