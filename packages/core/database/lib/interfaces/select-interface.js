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
var select_interface_exports = {};
__export(select_interface_exports, {
  SelectInterface: () => SelectInterface
});
module.exports = __toCommonJS(select_interface_exports);
var import_base_interface = require("./base-interface");
const _SelectInterface = class _SelectInterface extends import_base_interface.BaseInterface {
  async toValue(str, ctx) {
    var _a;
    if (!str) {
      return null;
    }
    const enumConfig = ((_a = this.options.uiSchema) == null ? void 0 : _a.enum) || [];
    const option = enumConfig.find((item) => item.label === str);
    if (option) {
      return option.value;
    }
    const valueOption = enumConfig.find((item) => item.value === str);
    if (valueOption) {
      return valueOption.value;
    }
    throw new Error(`"${str}" is not a valid option in ${ctx.field.name} field.`);
  }
  toString(value, ctx) {
    var _a;
    const enumConfig = ((_a = this.options.uiSchema) == null ? void 0 : _a.enum) || [];
    const option = enumConfig.find((item) => item.value === value);
    if (option) {
      if (ctx == null ? void 0 : ctx.t) {
        return ctx.t(option.label, { ns: "lm-collections" });
      }
      return option.label;
    }
    return value;
  }
};
__name(_SelectInterface, "SelectInterface");
let SelectInterface = _SelectInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SelectInterface
});
