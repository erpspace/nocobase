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
var field_type_map_exports = {};
__export(field_type_map_exports, {
  default: () => field_type_map_default
});
module.exports = __toCommonJS(field_type_map_exports);
const postgres = {
  "character varying": ["string", "uuid", "nanoid", "encryption", "datetimeNoTz"],
  varchar: ["string", "uuid", "nanoid", "encryption", "datetimeNoTz"],
  char: ["string", "uuid", "nanoid", "encryption", "datetimeNoTz"],
  character: "string",
  text: "text",
  oid: "string",
  name: "string",
  smallint: ["integer", "sort"],
  integer: ["integer", "unixTimestamp", "sort"],
  bigint: ["bigInt", "unixTimestamp", "sort"],
  decimal: "decimal",
  numeric: "float",
  real: "float",
  "double precision": "float",
  "timestamp without time zone": "datetimeNoTz",
  "timestamp with time zone": "datetimeTz",
  "time without time zone": "time",
  date: "dateOnly",
  boolean: "boolean",
  json: ["json", "array"],
  jsonb: ["json", "array", "jsonb"],
  point: "json",
  path: "json",
  polygon: "json",
  circle: "json",
  uuid: "uuid",
  set: "set",
  array: "array"
};
const mysql = {
  smallint: ["integer", "boolean", "sort"],
  tinyint: ["integer", "boolean", "sort"],
  mediumint: ["integer", "boolean", "sort"],
  "smallint unsigned": ["integer", "boolean", "sort"],
  "tinyint unsigned": ["integer", "boolean", "sort"],
  "mediumint unsigned": ["integer", "boolean", "sort"],
  char: ["string", "uuid", "nanoid", "encryption"],
  varchar: ["string", "uuid", "nanoid", "encryption"],
  date: "dateOnly",
  time: "time",
  tinytext: "text",
  text: "text",
  mediumtext: "text",
  longtext: "text",
  int: ["integer", "unixTimestamp", "sort"],
  "int unsigned": ["integer", "unixTimestamp", "sort"],
  integer: ["integer", "unixTimestamp", "sort"],
  bigint: ["bigInt", "unixTimestamp", "sort"],
  "bigint unsigned": ["bigInt", "unixTimestamp", "sort"],
  float: "float",
  double: "float",
  boolean: "boolean",
  decimal: "decimal",
  year: ["string", "integer"],
  datetime: ["datetimeNoTz", "datetimeTz"],
  timestamp: "datetimeTz",
  json: ["json", "array"],
  enum: "string"
};
const sqlite = {
  text: "text",
  varchar: ["string", "uuid", "nanoid", "encryption"],
  integer: "integer",
  real: "real",
  datetime: "datetimeTz",
  date: "date",
  time: "time",
  boolean: "boolean",
  numeric: "decimal",
  json: ["json", "array"]
};
const fieldTypeMap = { postgres, mysql, sqlite, mariadb: mysql };
var field_type_map_default = fieldTypeMap;
