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
var unix_timestamp_field_exports = {};
__export(unix_timestamp_field_exports, {
  UnixTimestampField: () => UnixTimestampField
});
module.exports = __toCommonJS(unix_timestamp_field_exports);
var import_sequelize = require("sequelize");
var import_date_field = require("./date-field");
const _UnixTimestampField = class _UnixTimestampField extends import_date_field.DateField {
  get dataType() {
    return import_sequelize.DataTypes.BIGINT;
  }
  dateToValue(val) {
    var _a, _b, _c, _d, _e;
    if (val === null || val === void 0) {
      return val;
    }
    let { accuracy } = this.options;
    if ((_c = (_b = (_a = this.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) == null ? void 0 : _c.accuracy) {
      accuracy = (_e = (_d = this.options) == null ? void 0 : _d.uiSchema["x-component-props"]) == null ? void 0 : _e.accuracy;
    }
    if (!accuracy) {
      accuracy = "second";
    }
    let rationalNumber = 1e3;
    if (accuracy === "millisecond") {
      rationalNumber = 1;
    }
    return Math.floor(typeof val === "number" ? val : new Date(val).getTime() / rationalNumber);
  }
  additionalSequelizeOptions() {
    var _a, _b, _c, _d, _e;
    const { name } = this.options;
    let { accuracy } = this.options;
    if ((_c = (_b = (_a = this.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) == null ? void 0 : _c.accuracy) {
      accuracy = (_e = (_d = this.options) == null ? void 0 : _d.uiSchema["x-component-props"]) == null ? void 0 : _e.accuracy;
    }
    if (!accuracy) {
      accuracy = "second";
    }
    let rationalNumber = 1e3;
    if (accuracy === "millisecond") {
      rationalNumber = 1;
    }
    return {
      get() {
        const value = this.getDataValue(name);
        if (value == null) {
          return value;
        }
        return new Date(value * rationalNumber);
      },
      set(value) {
        if (value == null) {
          this.setDataValue(name, value);
        } else {
          this.setDataValue(
            name,
            Math.floor(typeof value === "number" ? value : new Date(value).getTime() / rationalNumber)
          );
        }
      }
    };
  }
};
__name(_UnixTimestampField, "UnixTimestampField");
let UnixTimestampField = _UnixTimestampField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UnixTimestampField
});
