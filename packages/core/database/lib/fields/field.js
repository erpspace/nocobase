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
var field_exports = {};
__export(field_exports, {
  Field: () => Field
});
module.exports = __toCommonJS(field_exports);
var import_lodash = __toESM(require("lodash"));
var import_utils = require("../utils");
const _Field = class _Field {
  options;
  context;
  database;
  collection;
  constructor(options, context) {
    this.context = context;
    this.database = this.context.database;
    this.collection = this.context.collection;
    this.options = options || {};
    this.init();
  }
  get name() {
    return this.options.name;
  }
  get type() {
    return this.options.type;
  }
  isRelationField() {
    return false;
  }
  async sync(syncOptions) {
    await this.collection.sync({
      ...syncOptions,
      force: false,
      alter: {
        drop: false
      }
    });
  }
  init() {
  }
  on(eventName, listener) {
    this.database.on(`${this.collection.name}.${eventName}`, listener);
    return this;
  }
  off(eventName, listener) {
    this.database.off(`${this.collection.name}.${eventName}`, listener);
    return this;
  }
  get(name) {
    return this.options[name];
  }
  remove() {
    this.collection.removeIndex([this.name]);
    return this.collection.removeField(this.name);
  }
  columnName() {
    if (this.options.field) {
      return this.options.field;
    }
    if (this.database.options.underscored) {
      return (0, import_utils.snakeCase)(this.name);
    }
    return this.name;
  }
  async existsInDb(options) {
    const opts = {
      transaction: options == null ? void 0 : options.transaction
    };
    let sql;
    if (this.database.sequelize.getDialect() === "sqlite") {
      sql = `SELECT *
             from pragma_table_info('${this.collection.model.tableName}')
             WHERE name = '${this.columnName()}'`;
    } else if (this.database.inDialect("mysql", "mariadb")) {
      sql = `
        select column_name
        from INFORMATION_SCHEMA.COLUMNS
        where TABLE_SCHEMA = '${this.database.options.database}'
          AND TABLE_NAME = '${this.collection.model.tableName}'
          AND column_name = '${this.columnName()}'
      `;
    } else {
      sql = `
        select column_name
        from INFORMATION_SCHEMA.COLUMNS
        where TABLE_NAME = '${this.collection.model.tableName}'
          AND column_name = '${this.columnName()}'
          AND table_schema = '${this.collection.collectionSchema() || "public"}'
      `;
    }
    const [rows] = await this.database.sequelize.query(sql, opts);
    return rows.length > 0;
  }
  merge(obj) {
    Object.assign(this.options, obj);
  }
  bind() {
    const { model } = this.context.collection;
    model.rawAttributes[this.name] = this.toSequelize();
    model.refreshAttributes();
    if (this.options.index) {
      this.context.collection.addIndex([this.name]);
    }
  }
  unbind() {
    const { model } = this.context.collection;
    delete model.prototype[this.name];
    model.removeAttribute(this.name);
    if (this.options.index || this.options.unique) {
      this.context.collection.removeIndex([this.name]);
    }
  }
  toSequelize() {
    const opts = import_lodash.default.omit(this.options, ["name"]);
    if (this.dataType) {
      Object.assign(opts, { type: this.database.sequelize.normalizeDataType(this.dataType) });
    }
    Object.assign(opts, this.additionalSequelizeOptions());
    return opts;
  }
  additionalSequelizeOptions() {
    return {};
  }
  typeToString() {
    return this.dataType.toString();
  }
};
__name(_Field, "Field");
let Field = _Field;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Field
});
