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
var array_field_exports = {};
__export(array_field_exports, {
  ArrayField: () => ArrayField
});
module.exports = __toCommonJS(array_field_exports);
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _ArrayField = class _ArrayField extends import_field.Field {
  get dataType() {
    const { dataType, elementType = "" } = this.options;
    if (this.database.sequelize.getDialect() === "postgres") {
      if (dataType === "array") {
        return new import_sequelize.DataTypes.ARRAY(import_sequelize.DataTypes[elementType.toUpperCase()]);
      }
      return import_sequelize.DataTypes.JSONB;
    }
    return import_sequelize.DataTypes.JSON;
  }
  sortValue = /* @__PURE__ */ __name((instances) => {
    instances = Array.isArray(instances) ? instances : [instances];
    for (const instance of instances) {
      let oldValue = instance.get(this.options.name);
      if (oldValue) {
        if (typeof oldValue === "string") {
          oldValue = JSON.parse(oldValue);
        }
        const newValue = oldValue.sort();
        instance.set(this.options.name, newValue);
      }
    }
  }, "sortValue");
  bind() {
    super.bind();
    this.on("beforeSave", this.sortValue);
    this.on("beforeBulkCreate", this.sortValue);
  }
  unbind() {
    super.unbind();
    this.off("beforeSave", this.sortValue);
    this.off("beforeBulkCreate", this.sortValue);
  }
};
__name(_ArrayField, "ArrayField");
let ArrayField = _ArrayField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayField
});
