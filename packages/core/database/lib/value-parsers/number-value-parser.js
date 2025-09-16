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
var number_value_parser_exports = {};
__export(number_value_parser_exports, {
  NumberValueParser: () => NumberValueParser
});
module.exports = __toCommonJS(number_value_parser_exports);
var import_utils = require("../utils");
var import_base_value_parser = require("./base-value-parser");
const _NumberValueParser = class _NumberValueParser extends import_base_value_parser.BaseValueParser {
  async setValue(value) {
    if (value === null || value === void 0 || typeof value === "number") {
      this.value = value;
    } else if (typeof value === "string") {
      if (!value) {
        this.value = null;
      } else if (["n/a", "-"].includes(value.toLowerCase())) {
        this.value = null;
      } else {
        value = value.replace(/,/g, "");
        if (value.endsWith("%")) {
          value = (0, import_utils.percent2float)(value);
        } else {
          value = +value;
        }
        if (isNaN(value)) {
          this.errors.push(`Invalid value - "${value}"`);
        } else {
          this.value = value;
        }
      }
    } else {
      this.errors.push(`Invalid value - ${JSON.stringify(value)}`);
    }
  }
};
__name(_NumberValueParser, "NumberValueParser");
let NumberValueParser = _NumberValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NumberValueParser
});
