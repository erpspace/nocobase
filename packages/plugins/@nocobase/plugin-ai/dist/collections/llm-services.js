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
var llm_services_exports = {};
__export(llm_services_exports, {
  default: () => llm_services_default
});
module.exports = __toCommonJS(llm_services_exports);
var llm_services_default = {
  name: "llmServices",
  fields: [
    {
      name: "name",
      type: "uid",
      primaryKey: true
    },
    {
      name: "title",
      type: "string",
      interface: "input",
      uiSchema: {
        title: '{{t("Title")}}',
        "x-component": "Input"
      }
    },
    {
      name: "provider",
      type: "string",
      interface: "select",
      uiSchema: {
        title: '{{t("Provider")}}',
        "x-component": "Select"
      }
    },
    {
      name: "options",
      type: "jsonb"
    }
  ]
};
