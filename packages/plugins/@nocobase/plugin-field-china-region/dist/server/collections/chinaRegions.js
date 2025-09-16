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
var chinaRegions_exports = {};
__export(chinaRegions_exports, {
  default: () => chinaRegions_default
});
module.exports = __toCommonJS(chinaRegions_exports);
var import_database = require("@nocobase/database");
var chinaRegions_default = (0, import_database.defineCollection)({
  dumpRules: "skipped",
  migrationRules: ["schema-only", "overwrite"],
  name: "chinaRegions",
  autoGenId: false,
  fields: [
    // 如使用代码作为 id 可能更节省，但由于代码数字最长为 12 字节，除非使用 bigint(64) 才够放置
    {
      name: "code",
      type: "string",
      // unique: true,
      primaryKey: true
    },
    {
      name: "name",
      type: "string"
    },
    {
      name: "parent",
      type: "belongsTo",
      target: "chinaRegions",
      targetKey: "code",
      foreignKey: "parentCode"
    },
    {
      name: "children",
      type: "hasMany",
      target: "chinaRegions",
      sourceKey: "code",
      foreignKey: "parentCode"
    },
    {
      name: "level",
      type: "integer"
    }
  ]
});
