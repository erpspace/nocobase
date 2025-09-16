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
var base_value_parser_exports = {};
__export(base_value_parser_exports, {
  BaseValueParser: () => BaseValueParser
});
module.exports = __toCommonJS(base_value_parser_exports);
const _BaseValueParser = class _BaseValueParser {
  ctx;
  field;
  value;
  errors = [];
  constructor(field, ctx) {
    this.field = field;
    this.ctx = ctx;
    this.value = null;
  }
  trim(value) {
    return typeof value === "string" ? value.trim() : value;
  }
  toArr(value, splitter) {
    let values = [];
    if (!value) {
      values = [];
    } else if (typeof value === "string") {
      values = value.split(splitter || /,|，|、/);
    } else if (Array.isArray(value)) {
      values = value;
    }
    return values.map((v) => this.trim(v)).filter(Boolean);
  }
  toString() {
    return this.value;
  }
  getValue() {
    return this.value;
  }
  async setValue(value) {
    this.value = value;
  }
};
__name(_BaseValueParser, "BaseValueParser");
let BaseValueParser = _BaseValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseValueParser
});
