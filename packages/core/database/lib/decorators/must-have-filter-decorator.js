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
var must_have_filter_decorator_exports = {};
__export(must_have_filter_decorator_exports, {
  default: () => must_have_filter_decorator_default
});
module.exports = __toCommonJS(must_have_filter_decorator_exports);
var import_utils = require("@nocobase/utils");
const mustHaveFilter = /* @__PURE__ */ __name(() => (target, propertyKey, descriptor) => {
  const oldValue = descriptor.value;
  descriptor.value = function(...args) {
    const options = args[0];
    if (Array.isArray(options.values)) {
      return oldValue.apply(this, args);
    }
    if (!(0, import_utils.isValidFilter)(options == null ? void 0 : options.filter) && !(options == null ? void 0 : options.filterByTk) && !(options == null ? void 0 : options.forceUpdate)) {
      throw new Error(`must provide filter or filterByTk for ${propertyKey} call, or set forceUpdate to true`);
    }
    return oldValue.apply(this, args);
  };
  return descriptor;
}, "mustHaveFilter");
var must_have_filter_decorator_default = mustHaveFilter;
