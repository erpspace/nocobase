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
var array_value_parser_exports = {};
__export(array_value_parser_exports, {
  ArrayValueParser: () => ArrayValueParser
});
module.exports = __toCommonJS(array_value_parser_exports);
var import_base_value_parser = require("./base-value-parser");
const _ArrayValueParser = class _ArrayValueParser extends import_base_value_parser.BaseValueParser {
  async setValue(value) {
    const { map, set } = this.getOptions();
    const values = this.toArr(value);
    if (set.size > 0) {
      const filtered = values.map((v) => map.has(v) ? map.get(v) : v).filter((v) => set.has(v));
      if (values.length === filtered.length) {
        this.value = filtered;
      } else {
        this.errors.push(`No matching option found - ${JSON.stringify(value)}`);
      }
    } else {
      this.value = values;
    }
  }
  getOptions() {
    var _a, _b;
    const options = ((_b = (_a = this.field.options) == null ? void 0 : _a["uiSchema"]) == null ? void 0 : _b.enum) || [];
    const map = /* @__PURE__ */ new Map();
    const set = /* @__PURE__ */ new Set();
    for (const option of options) {
      set.add(option.value);
      set.add(option.label);
      map.set(option.label, option.value);
    }
    return { map, set };
  }
};
__name(_ArrayValueParser, "ArrayValueParser");
let ArrayValueParser = _ArrayValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayValueParser
});
