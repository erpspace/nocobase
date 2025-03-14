/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sql_collection_exports = {};
__export(sql_collection_exports, {
  SQLCollection: () => SQLCollection
});
module.exports = __toCommonJS(sql_collection_exports);
var import_database = require("@nocobase/database");
var import_sql_model = require("./sql-model");
class SQLCollection extends import_database.Collection {
  constructor(options, context) {
    options.autoGenId = false;
    options.timestamps = false;
    options.underscored = false;
    super(options, context);
  }
  /* istanbul ignore next -- @preserve */
  get filterTargetKey() {
    var _a;
    const targetKey = ((_a = this.options) == null ? void 0 : _a.filterTargetKey) || "id";
    if (Array.isArray(targetKey)) {
      return targetKey;
    }
    if (targetKey && this.model.getAttributes()[targetKey]) {
      return targetKey;
    }
    if (this.model.primaryKeyAttributes.length > 1) {
      return null;
    }
    return this.model.primaryKeyAttribute;
  }
  isSql() {
    return true;
  }
  unavailableActions() {
    return ["create", "update", "destroy"];
  }
  collectionSchema() {
    return void 0;
  }
  modelInit() {
    const { autoGenId, sql } = this.options;
    const model = class extends import_sql_model.SQLModel {
    };
    model.init(null, {
      ...this.sequelizeModelOptions(),
      schema: void 0
    });
    if (!autoGenId) {
      model.removeAttribute("id");
    }
    model.sql = (sql == null ? void 0 : sql.endsWith(";")) ? sql.slice(0, -1) : sql;
    model.database = this.context.database;
    model.collection = this;
    this.model = new Proxy(model, {
      get(target, prop) {
        if (prop === "_schema") {
          return void 0;
        }
        return Reflect.get(target, prop);
      }
    });
  }
  async removeFromDb(options) {
    if ((options == null ? void 0 : options.dropCollection) !== false) {
      return this.remove();
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SQLCollection
});
