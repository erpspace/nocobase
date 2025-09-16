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
var string_field_exports = {};
__export(string_field_exports, {
  StringField: () => StringField
});
module.exports = __toCommonJS(string_field_exports);
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _StringField = class _StringField extends import_field.Field {
  get dataType() {
    if (this.options.length) {
      return import_sequelize.DataTypes.STRING(this.options.length);
    }
    return import_sequelize.DataTypes.STRING;
  }
  additionalSequelizeOptions() {
    const { name, trim, unique } = this.options;
    return {
      set(value) {
        if (unique && value === "") {
          value = null;
        }
        if (value == null) {
          this.setDataValue(name, null);
          return;
        }
        if (typeof value !== "string") {
          value = value.toString();
        }
        this.setDataValue(name, trim ? value.trim() : value);
      }
    };
  }
};
__name(_StringField, "StringField");
let StringField = _StringField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StringField
});
