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
var percent_interface_exports = {};
__export(percent_interface_exports, {
  PercentInterface: () => PercentInterface
});
module.exports = __toCommonJS(percent_interface_exports);
var import_utils = require("@nocobase/utils");
var import_number_interface = require("./number-interface");
var import_utils2 = require("../utils");
const _PercentInterface = class _PercentInterface extends import_number_interface.NumberInterface {
  parseValue(value) {
    if (typeof value === "string" && value.endsWith("%")) {
      const parsedValue = (0, import_utils2.percent2float)(value);
      return parsedValue;
    }
    return value;
  }
  toString(value) {
    var _a, _b, _c;
    const step = ((_c = (_b = (_a = this.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) == null ? void 0 : _c["step"]) ?? 0;
    return value && `${(0, import_utils.toFixedByStep)(value * 100, step)}%`;
  }
};
__name(_PercentInterface, "PercentInterface");
let PercentInterface = _PercentInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PercentInterface
});
