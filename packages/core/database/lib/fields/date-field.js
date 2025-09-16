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
var date_field_exports = {};
__export(date_field_exports, {
  DateField: () => DateField
});
module.exports = __toCommonJS(date_field_exports);
var import_sequelize = require("sequelize");
var import_field = require("./field");
var import_moment = __toESM(require("moment"));
const datetimeRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
function isValidDatetime(str) {
  return datetimeRegex.test(str);
}
__name(isValidDatetime, "isValidDatetime");
const _DateField = class _DateField extends import_field.Field {
  get dataType() {
    return import_sequelize.DataTypes.DATE(3);
  }
  get timezone() {
    return this.isGMT() ? "+00:00" : null;
  }
  getProps() {
    var _a, _b;
    return ((_b = (_a = this.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) || {};
  }
  isDateOnly() {
    const props = this.getProps();
    return !props.showTime;
  }
  isGMT() {
    const props = this.getProps();
    return props.gmt;
  }
  init() {
    const { name, defaultToCurrentTime, onUpdateToCurrentTime, timezone } = this.options;
    this.resolveTimeZone = (context) => {
      const serverTimeZone = this.database.options.rawTimezone;
      if (timezone === "server") {
        return serverTimeZone;
      }
      if (timezone === "client") {
        return (context == null ? void 0 : context.timezone) || serverTimeZone;
      }
      if (timezone) {
        return timezone;
      }
      return serverTimeZone;
    };
    this.beforeSave = async (instances, options) => {
      instances = Array.isArray(instances) ? instances : [instances];
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
    };
    if (this.options.defaultValue && this.database.isMySQLCompatibleDialect()) {
      if (typeof this.options.defaultValue === "string" && isIso8601(this.options.defaultValue)) {
        this.options.defaultValue = (0, import_moment.default)(this.options.defaultValue).utcOffset(this.resolveTimeZone()).format("YYYY-MM-DD HH:mm:ss");
      }
    }
  }
  setter(value, options) {
    if (value === null) {
      return value;
    }
    if (value instanceof Date) {
      return value;
    }
    if (typeof value === "string" && isValidDatetime(value)) {
      const dateTimezone = this.resolveTimeZone(options == null ? void 0 : options.context);
      const dateString = `${value} ${dateTimezone}`;
      return new Date(dateString);
    }
    return value;
  }
  additionalSequelizeOptions() {
    const { name } = this.options;
    const serverTimeZone = this.database.options.rawTimezone;
    return {
      get() {
        const value = this.getDataValue(name);
        if (value === null || value === void 0) {
          return value;
        }
        if (typeof value === "string" && isValidDatetime(value)) {
          const dateString = `${value} ${serverTimeZone}`;
          return new Date(dateString);
        }
        return new Date(value);
      }
    };
  }
  bind() {
    super.bind();
    if (this.options.interface === "createdAt") {
      const { model } = this.context.collection;
      model._timestampAttributes.createdAt = this.name;
      model.refreshAttributes();
    }
    if (this.options.interface === "updatedAt") {
      const { model } = this.context.collection;
      model._timestampAttributes.updatedAt = this.name;
      model.refreshAttributes();
    }
    this.on("beforeSave", this.beforeSave);
    this.on("beforeBulkCreate", this.beforeSave);
  }
  unbind() {
    super.unbind();
    this.off("beforeSave", this.beforeSave);
    this.off("beforeBulkCreate", this.beforeSave);
  }
};
__name(_DateField, "DateField");
let DateField = _DateField;
function isIso8601(str) {
  const iso8601StrictRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return iso8601StrictRegex.test(str);
}
__name(isIso8601, "isIso8601");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateField
});
