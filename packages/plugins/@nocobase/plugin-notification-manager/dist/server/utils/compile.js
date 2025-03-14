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
var compile_exports = {};
__export(compile_exports, {
  compile: () => compile
});
module.exports = __toCommonJS(compile_exports);
var import_utils = require("@nocobase/utils");
var import_utils2 = require("@nocobase/utils");
function deepCompile(template, data) {
  if (typeof template === "string") {
    const c = import_utils.Handlebars.compile(template);
    return c(data);
  } else if (Array.isArray(template)) {
    return template.map((item) => deepCompile(item, data));
  } else if ((0, import_utils2.isPlainObject)(template)) {
    const result = Object.keys(template).reduce((object, key) => {
      const value = deepCompile(template[key], data);
      return Object.assign(object, { [key]: value });
    }, {});
    return result;
  } else {
    return template;
  }
}
function compile(template, data) {
  if (!template) {
    return {};
  }
  return deepCompile(template, data);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compile
});
