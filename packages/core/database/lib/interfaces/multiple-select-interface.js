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
var multiple_select_interface_exports = {};
__export(multiple_select_interface_exports, {
  MultipleSelectInterface: () => MultipleSelectInterface
});
module.exports = __toCommonJS(multiple_select_interface_exports);
var import_base_interface = require("./base-interface");
var import_lodash = __toESM(require("lodash"));
const _MultipleSelectInterface = class _MultipleSelectInterface extends import_base_interface.BaseInterface {
  async toValue(str, ctx) {
    var _a;
    const items = this.castArray(str);
    const enumConfig = ((_a = this.options.uiSchema) == null ? void 0 : _a.enum) || [];
    return items.map((item) => {
      const option = enumConfig.find((option2) => option2.label === item);
      if (option) {
        return option.value;
      }
      const valueOption = enumConfig.find((option2) => option2.value === item);
      if (valueOption) {
        return valueOption.value;
      }
      throw new Error(`"${item}" is not a valid option in ${ctx.field.name} field.`);
    });
  }
  toString(value, ctx) {
    var _a;
    const enumConfig = ((_a = this.options.uiSchema) == null ? void 0 : _a.enum) || [];
    return import_lodash.default.castArray(value).map((value2) => {
      const option = enumConfig.find((item) => item.value === value2);
      if (option) {
        if (ctx == null ? void 0 : ctx.t) {
          return ctx.t(option.label, { ns: "lm-collections" });
        }
        return option.label;
      }
      return value2;
    }).join(",");
  }
};
__name(_MultipleSelectInterface, "MultipleSelectInterface");
let MultipleSelectInterface = _MultipleSelectInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MultipleSelectInterface
});
