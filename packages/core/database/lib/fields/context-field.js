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
var context_field_exports = {};
__export(context_field_exports, {
  ContextField: () => ContextField
});
module.exports = __toCommonJS(context_field_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _ContextField = class _ContextField extends import_field.Field {
  get dataType() {
    const type = this.options.dataType || "string";
    return import_sequelize.DataTypes[type.toUpperCase()] || import_sequelize.DataTypes.STRING;
  }
  listener = /* @__PURE__ */ __name(async (instances, options) => {
    instances = Array.isArray(instances) ? instances : [instances];
    const { name, dataIndex } = this.options;
    const { context } = options;
    for (const instance of instances) {
      instance.set(name, import_lodash.default.get(context, dataIndex));
      instance.changed(name, true);
    }
  }, "listener");
  bind() {
    super.bind();
    const { createOnly } = this.options;
    this.on("beforeCreate", this.listener);
    this.on("beforeBulkCreate", this.listener);
    if (!createOnly) {
      this.on("beforeUpdate", this.listener);
    }
  }
  unbind() {
    super.unbind();
    const { createOnly } = this.options;
    this.off("beforeCreate", this.listener);
    this.off("beforeBulkCreate", this.listener);
    if (!createOnly) {
      this.off("beforeUpdate", this.listener);
    }
  }
};
__name(_ContextField, "ContextField");
let ContextField = _ContextField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContextField
});
