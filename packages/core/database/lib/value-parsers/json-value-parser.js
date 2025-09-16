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
var json_value_parser_exports = {};
__export(json_value_parser_exports, {
  JsonValueParser: () => JsonValueParser
});
module.exports = __toCommonJS(json_value_parser_exports);
var import_base_value_parser = require("./base-value-parser");
const _JsonValueParser = class _JsonValueParser extends import_base_value_parser.BaseValueParser {
  async setValue(value) {
    if (typeof value === "string") {
      if (value.trim() === "") {
        this.value = null;
      } else {
        try {
          this.value = JSON.parse(value);
        } catch (error) {
          this.errors.push(error.message);
        }
      }
    } else {
      this.value = value;
    }
  }
};
__name(_JsonValueParser, "JsonValueParser");
let JsonValueParser = _JsonValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JsonValueParser
});
