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
var datetime_no_tz_field_exports = {};
__export(datetime_no_tz_field_exports, {
  DatetimeNoTzField: () => DatetimeNoTzField
});
module.exports = __toCommonJS(datetime_no_tz_field_exports);
var import_field = require("./field");
var import_sequelize = require("sequelize");
var import_moment = __toESM(require("moment"));
const _DatetimeNoTzTypeMySQL = class _DatetimeNoTzTypeMySQL extends import_sequelize.DataTypes.ABSTRACT {
  key = "DATETIME";
};
__name(_DatetimeNoTzTypeMySQL, "DatetimeNoTzTypeMySQL");
let DatetimeNoTzTypeMySQL = _DatetimeNoTzTypeMySQL;
const _DatetimeNoTzTypePostgres = class _DatetimeNoTzTypePostgres extends import_sequelize.DataTypes.ABSTRACT {
  key = "TIMESTAMP";
};
__name(_DatetimeNoTzTypePostgres, "DatetimeNoTzTypePostgres");
let DatetimeNoTzTypePostgres = _DatetimeNoTzTypePostgres;
const _DatetimeNoTzField = class _DatetimeNoTzField extends import_field.Field {
  get dataType() {
    if (this.database.inDialect("postgres")) {
      return DatetimeNoTzTypePostgres;
    }
    if (this.database.isMySQLCompatibleDialect()) {
      return DatetimeNoTzTypeMySQL;
    }
    return import_sequelize.DataTypes.DATE;
  }
  beforeSave = /* @__PURE__ */ __name(async (instances, options) => {
    instances = Array.isArray(instances) ? instances : [instances];
    const { name, defaultToCurrentTime, onUpdateToCurrentTime } = this.options;
    for (const instance of instances) {
      const value = instance.get(name);
      if (!value && instance.isNewRecord && defaultToCurrentTime) {
        instance.set(name, /* @__PURE__ */ new Date());
        continue;
      }
      if (onUpdateToCurrentTime) {
        instance.set(name, /* @__PURE__ */ new Date());
        continue;
      }
    }
  }, "beforeSave");
  additionalSequelizeOptions() {
    const { name } = this.options;
    const timezone = this.database.options.rawTimezone || "+00:00";
    const isPg = this.database.inDialect("postgres");
    const isMySQLCompatibleDialect = this.database.isMySQLCompatibleDialect();
    return {
      get() {
        const val = this.getDataValue(name);
        if (val instanceof Date) {
          const momentVal = (0, import_moment.default)(val);
          return momentVal.format("YYYY-MM-DD HH:mm:ss");
        }
        return val;
      },
      set(val) {
        if (val == null) {
          return this.setDataValue(name, null);
        }
        const dateOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
        const momentVal = (0, import_moment.default)(val);
        if (typeof val === "string" && isIso8601(val) || val instanceof Date) {
          momentVal.utcOffset(timezone);
          momentVal.utcOffset(-dateOffset, true);
        }
        if (isMySQLCompatibleDialect) {
          momentVal.millisecond(0);
        }
        const date = momentVal.toDate();
        return this.setDataValue(name, date);
      }
    };
  }
  bind() {
    super.bind();
    this.on("beforeSave", this.beforeSave);
    this.on("beforeBulkCreate", this.beforeSave);
  }
  unbind() {
    super.unbind();
    this.off("beforeSave", this.beforeSave);
    this.off("beforeBulkCreate", this.beforeSave);
  }
};
__name(_DatetimeNoTzField, "DatetimeNoTzField");
let DatetimeNoTzField = _DatetimeNoTzField;
function isIso8601(str) {
  const iso8601StrictRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return iso8601StrictRegex.test(str);
}
__name(isIso8601, "isIso8601");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatetimeNoTzField
});
