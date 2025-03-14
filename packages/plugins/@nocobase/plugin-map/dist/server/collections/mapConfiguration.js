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
var mapConfiguration_exports = {};
__export(mapConfiguration_exports, {
  default: () => mapConfiguration_default
});
module.exports = __toCommonJS(mapConfiguration_exports);
var import_database = require("@nocobase/database");
var import_constants = require("../constants");
var mapConfiguration_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "third-party"
  },
  migrationRules: ["overwrite", "schema-only"],
  name: import_constants.MapConfigurationCollectionName,
  shared: true,
  fields: [
    {
      title: "Access key",
      comment: "\u8BBF\u95EE\u5BC6\u94A5",
      name: "accessKey",
      type: "string"
    },
    {
      title: "securityJsCode",
      comment: "securityJsCode or serviceHOST",
      name: "securityJsCode",
      type: "string"
    },
    {
      title: "Map type",
      comment: "\u5730\u56FE\u7C7B\u578B",
      name: "type",
      type: "string"
    }
  ]
});
