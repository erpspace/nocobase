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
var parsedValue_exports = {};
__export(parsedValue_exports, {
  parsedValue: () => parsedValue
});
module.exports = __toCommonJS(parsedValue_exports);
var import_json_templates = require("./json-templates");
function appendArrayColumn(scope, key) {
  const paths = key.split(".");
  let data = scope;
  for (let p = 0; p < paths.length && data != null; p++) {
    const path = paths[p];
    const isIndex = path.match(/^\d+$/);
    if (Array.isArray(data) && !isIndex && !data[path]) {
      data[path] = data.map((item) => item[path]).flat();
    }
    data = data == null ? void 0 : data[path];
  }
}
__name(appendArrayColumn, "appendArrayColumn");
const parsedValue = /* @__PURE__ */ __name((value, variables) => {
  const template = (0, import_json_templates.parse)(value);
  template.parameters.forEach(({ key }) => {
    appendArrayColumn(variables, key);
  });
  return template(variables);
}, "parsedValue");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parsedValue
});
