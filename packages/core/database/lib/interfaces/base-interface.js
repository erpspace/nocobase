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
var base_interface_exports = {};
__export(base_interface_exports, {
  BaseInterface: () => BaseInterface
});
module.exports = __toCommonJS(base_interface_exports);
const _BaseInterface = class _BaseInterface {
  constructor(options = {}) {
    this.options = options;
  }
  /**
   * cast value to string
   * @param value
   * @param ctx
   */
  toString(value, ctx) {
    return value;
  }
  /**
   * parse string to value
   * @param str
   * @param ctx
   */
  async toValue(str, ctx) {
    return str;
  }
  /**
   * cast value to array
   * eg: 'a,b,c' => ['a', 'b', 'c']
   * eg: ['a', 'b', 'c'] => ['a', 'b', 'c']
   * @param value
   * @param splitter
   */
  castArray(value, splitter) {
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
  trim(value) {
    return typeof value === "string" ? value.trim() : value;
  }
};
__name(_BaseInterface, "BaseInterface");
let BaseInterface = _BaseInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseInterface
});
