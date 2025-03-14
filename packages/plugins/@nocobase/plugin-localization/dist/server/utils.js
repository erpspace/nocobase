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
var utils_exports = {};
__export(utils_exports, {
  compile: () => compile,
  getTextsFromDBRecord: () => getTextsFromDBRecord,
  getTextsFromUISchema: () => getTextsFromUISchema
});
module.exports = __toCommonJS(utils_exports);
const compile = (title) => (title || "").replace(/{{\s*t\(["|'|`](.*)["|'|`]\)\s*}}/g, "$1");
/* istanbul ignore next -- @preserve */
const getTextsFromUISchema = (schema) => {
  var _a, _b, _c, _d;
  const texts = [];
  const title = compile(schema.title);
  const componentPropsTitle = compile((_a = schema["x-component-props"]) == null ? void 0 : _a.title);
  const decoratorPropsTitle = compile((_b = schema["x-decorator-props"]) == null ? void 0 : _b.title);
  if (title) {
    texts.push(title);
  }
  if (componentPropsTitle) {
    texts.push(componentPropsTitle);
  }
  if (decoratorPropsTitle) {
    texts.push(decoratorPropsTitle);
  }
  if ((_d = (_c = schema["x-data-templates"]) == null ? void 0 : _c.items) == null ? void 0 : _d.length) {
    schema["x-data-templates"].items.forEach((item) => {
      const title2 = compile(item.title);
      if (title2) {
        texts.push(title2);
      }
    });
  }
  return texts;
};
const getTextsFromDBRecord = (fields, record) => {
  const texts = [];
  fields.forEach((field) => {
    var _a, _b;
    const value = record[field];
    if (typeof value === "string") {
      texts.push(compile(value));
    }
    if (typeof value === "object") {
      if ((_a = value == null ? void 0 : value.uiSchema) == null ? void 0 : _a.title) {
        texts.push(compile(value.uiSchema.title));
      }
      if ((_b = value == null ? void 0 : value.uiSchema) == null ? void 0 : _b.enum) {
        value.uiSchema.enum.forEach((item) => {
          if (item == null ? void 0 : item.label) {
            texts.push(compile(item.label));
          }
        });
      }
    }
  });
  return texts;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compile,
  getTextsFromDBRecord,
  getTextsFromUISchema
});
