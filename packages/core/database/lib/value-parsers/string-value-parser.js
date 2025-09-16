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
var string_value_parser_exports = {};
__export(string_value_parser_exports, {
  StringValueParser: () => StringValueParser
});
module.exports = __toCommonJS(string_value_parser_exports);
var import_base_value_parser = require("./base-value-parser");
const _StringValueParser = class _StringValueParser extends import_base_value_parser.BaseValueParser {
  async setValue(value) {
    const { map, set } = this.getOptions();
    if (set.size > 0) {
      if (map.has(value)) {
        value = map.get(value);
      }
      if (set.has(value)) {
        this.value = value;
      } else {
        this.errors.push(`No matching option found - ${JSON.stringify(value)}`);
      }
    } else {
      this.value = value;
    }
  }
  getOptions() {
    var _a, _b;
    const options = ((_b = (_a = this.field.options) == null ? void 0 : _a["uiSchema"]) == null ? void 0 : _b.enum) || [];
    const map = /* @__PURE__ */ new Map();
    const set = /* @__PURE__ */ new Set();
    for (const option of options) {
      if (typeof option === "string") {
        set.add(option);
        map.set(option, option);
      } else {
        set.add(option.value);
        set.add(option.label);
        map.set(option.label, option.value);
      }
    }
    return { map, set };
  }
};
__name(_StringValueParser, "StringValueParser");
let StringValueParser = _StringValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StringValueParser
});
