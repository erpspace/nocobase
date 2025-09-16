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
var localization_texts_exports = {};
__export(localization_texts_exports, {
  default: () => localization_texts_default
});
module.exports = __toCommonJS(localization_texts_exports);
var import_database = require("@nocobase/database");
var localization_texts_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "required"
  },
  migrationRules: ["overwrite", "schema-only"],
  name: "localizationTexts",
  model: "LocalizationTextModel",
  createdBy: true,
  updatedBy: true,
  logging: true,
  shared: true,
  fields: [
    {
      name: "id",
      type: "bigInt",
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      interface: "id"
    },
    {
      interface: "input",
      type: "string",
      name: "module",
      allowNull: false,
      uiSchema: {
        type: "string",
        title: '{{t("Module")}}',
        "x-component": "Select",
        required: true
      }
    },
    {
      interface: "input",
      type: "text",
      name: "text",
      allowNull: false,
      uiSchema: {
        type: "string",
        title: '{{t("Text")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      name: "batch",
      type: "string"
    },
    {
      interface: "o2m",
      type: "hasMany",
      name: "translations",
      target: "localizationTranslations",
      sourceKey: "id",
      foreignKey: "textId",
      onDelete: "CASCADE"
    }
  ],
  indexes: [
    {
      fields: ["batch"]
    }
  ]
});
