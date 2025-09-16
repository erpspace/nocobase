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
var boolean_interface_exports = {};
__export(boolean_interface_exports, {
  BooleanInterface: () => BooleanInterface
});
module.exports = __toCommonJS(boolean_interface_exports);
var import_base_interface = require("./base-interface");
const _BooleanInterface = class _BooleanInterface extends import_base_interface.BaseInterface {
  async toValue(value, ctx) {
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "number") {
      return !!value;
    }
    if (typeof value === "string") {
      if (!value) {
        return false;
      }
      if (["1", "y", "yes", "true", "\u662F"].includes(value.toLowerCase())) {
        return true;
      } else if (["0", "n", "no", "false", "\u5426"].includes(value.toLowerCase())) {
        return false;
      }
    }
    throw new Error(`Invalid value - ${JSON.stringify(value)}`);
  }
  toString(value, ctx) {
    var _a;
    const enumConfig = ((_a = this.options.uiSchema) == null ? void 0 : _a.enum) || [];
    if ((enumConfig == null ? void 0 : enumConfig.length) > 0) {
      const option = enumConfig.find((item) => item.value === value);
      return option == null ? void 0 : option.label;
    } else {
      const label = value ? "True" : value === null || value === void 0 ? "" : "False";
      if (ctx == null ? void 0 : ctx.t) {
        return ctx.t(label, { ns: "action-export" });
      }
      return label;
    }
  }
};
__name(_BooleanInterface, "BooleanInterface");
let BooleanInterface = _BooleanInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BooleanInterface
});
