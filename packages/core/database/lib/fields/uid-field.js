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
var uid_field_exports = {};
__export(uid_field_exports, {
  UidField: () => UidField
});
module.exports = __toCommonJS(uid_field_exports);
var import_utils = require("@nocobase/utils");
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _UidField = class _UidField extends import_field.Field {
  get dataType() {
    return import_sequelize.DataTypes.STRING;
  }
  init() {
    const { name, prefix = "", pattern } = this.options;
    const re = new RegExp(pattern || "^[A-Za-z0-9_][A-Za-z0-9_-]*$");
    this.listener = async (instances) => {
      instances = Array.isArray(instances) ? instances : [instances];
      for (const instance of instances) {
        const value = instance.get(name);
        if (!value) {
          instance.set(name, `${prefix}${(0, import_utils.uid)()}`);
        } else if (re.test(value)) {
          instance.set(name, value);
        } else {
          throw new Error(
            `${this.collection.name}.${this.options.name} can only include A-Z, a-z, 0-9, _-*$, '${value}' is invalid`
          );
        }
      }
    };
  }
  bind() {
    super.bind();
    this.on("beforeCreate", this.listener);
    this.on("beforeUpdate", this.listener);
    this.on("beforeBulkCreate", this.listener);
  }
  unbind() {
    super.unbind();
    this.off("beforeCreate", this.listener);
    this.off("beforeUpdate", this.listener);
    this.off("beforeBulkCreate", this.listener);
  }
};
__name(_UidField, "UidField");
let UidField = _UidField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UidField
});
