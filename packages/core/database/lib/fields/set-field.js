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
var set_field_exports = {};
__export(set_field_exports, {
  SetField: () => SetField
});
module.exports = __toCommonJS(set_field_exports);
var import_array_field = require("./array-field");
const _SetField = class _SetField extends import_array_field.ArrayField {
  beforeSave = /* @__PURE__ */ __name((instances) => {
    instances = Array.isArray(instances) ? instances : [instances];
    for (const instance of instances) {
      const oldValue = instance.get(this.options.name);
      if (oldValue) {
        instance.set(this.options.name, [...new Set(oldValue)]);
      }
    }
  }, "beforeSave");
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
__name(_SetField, "SetField");
let SetField = _SetField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SetField
});
