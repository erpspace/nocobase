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
var boolean_value_parser_exports = {};
__export(boolean_value_parser_exports, {
  BooleanValueParser: () => BooleanValueParser
});
module.exports = __toCommonJS(boolean_value_parser_exports);
var import_base_value_parser = require("./base-value-parser");
const _BooleanValueParser = class _BooleanValueParser extends import_base_value_parser.BaseValueParser {
  async setValue(value) {
    if (typeof value === "boolean") {
      this.value = value;
    } else if (typeof value === "number" && [0, 1].includes(value)) {
      this.value = value === 1;
    } else if (typeof value === "string") {
      if (!value) {
        this.value = null;
      }
      if (["1", "y", "yes", "true", "\u662F"].includes(value.toLowerCase())) {
        this.value = true;
      } else if (["0", "n", "no", "false", "\u5426"].includes(value.toLowerCase())) {
        this.value = false;
      } else {
        this.errors.push(`Invalid value - ${JSON.stringify(this.value)}`);
      }
    } else {
      this.errors.push(`Invalid value - ${JSON.stringify(this.value)}`);
    }
  }
};
__name(_BooleanValueParser, "BooleanValueParser");
let BooleanValueParser = _BooleanValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BooleanValueParser
});
