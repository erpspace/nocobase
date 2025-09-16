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
var number_interface_exports = {};
__export(number_interface_exports, {
  NumberInterface: () => NumberInterface
});
module.exports = __toCommonJS(number_interface_exports);
var import_lodash = __toESM(require("lodash"));
var import_base_interface = require("./base-interface");
const _NumberInterface = class _NumberInterface extends import_base_interface.BaseInterface {
  sanitizeValue(value) {
    if (typeof value === "string") {
      if (["n/a", "-"].includes(value.toLowerCase())) {
        return null;
      }
      if (value.includes(",")) {
        value = value.replace(/,/g, "");
      }
    }
    return value;
  }
  async toValue(value) {
    if (value === null || value === void 0 || typeof value === "number") {
      return value;
    }
    if (!value) {
      return null;
    }
    const sanitizedValue = this.sanitizeValue(value);
    const numberValue = this.parseValue(sanitizedValue);
    if (!this.validate(numberValue)) {
      throw new Error(`Invalid number value: "${value}"`);
    }
    return numberValue;
  }
  parseValue(value) {
    return value;
  }
  validate(value) {
    return !isNaN(value);
  }
  toString(value, ctx) {
    var _a, _b, _c, _d;
    value = super.toString(value, ctx);
    const step = (_c = (_b = (_a = this.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) == null ? void 0 : _c.step;
    if (value != null && !import_lodash.default.isUndefined(step)) {
      const s = step.toString();
      const precision = ((_d = s.split(".")[1]) == null ? void 0 : _d.length) || 0;
      const num = Number(value);
      if (precision > 0) {
        const factor = Math.pow(10, precision);
        const rounded = Math.round(num * factor) / factor;
        return rounded.toFixed(precision);
      }
      return num.toFixed(0);
    }
    return value;
  }
};
__name(_NumberInterface, "NumberInterface");
let NumberInterface = _NumberInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NumberInterface
});
