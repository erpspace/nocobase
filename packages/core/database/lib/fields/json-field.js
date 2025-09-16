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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var json_field_exports = {};
__export(json_field_exports, {
  JsonField: () => JsonField,
  JsonbField: () => JsonbField
});
module.exports = __toCommonJS(json_field_exports);
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _JsonField = class _JsonField extends import_field.Field {
  get dataType() {
    const dialect = this.context.database.sequelize.getDialect();
    const { jsonb } = this.options;
    if (dialect === "postgres" && jsonb) {
      return import_sequelize.DataTypes.JSONB;
    }
    return import_sequelize.DataTypes.JSON;
  }
};
__name(_JsonField, "JsonField");
let JsonField = _JsonField;
const _JsonbField = class _JsonbField extends import_field.Field {
  get dataType() {
    const dialect = this.context.database.sequelize.getDialect();
    if (dialect === "postgres") {
      return import_sequelize.DataTypes.JSONB;
    }
    return import_sequelize.DataTypes.JSON;
  }
};
__name(_JsonbField, "JsonbField");
let JsonbField = _JsonbField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JsonField,
  JsonbField
});
