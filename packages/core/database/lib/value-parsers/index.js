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
var value_parsers_exports = {};
__export(value_parsers_exports, {
  ArrayValueParser: () => import_array_value_parser.ArrayValueParser,
  BaseValueParser: () => import_base_value_parser.BaseValueParser,
  BooleanValueParser: () => import_boolean_value_parser.BooleanValueParser,
  DateValueParser: () => import_date_value_parser.DateValueParser,
  JsonValueParser: () => import_json_value_parser.JsonValueParser,
  NumberValueParser: () => import_number_value_parser.NumberValueParser,
  StringValueParser: () => import_string_value_parser.StringValueParser,
  ToManyValueParser: () => import_to_many_value_parser.ToManyValueParser,
  ToOneValueParser: () => import_to_one_value_parser.ToOneValueParser,
  registerFieldValueParsers: () => registerFieldValueParsers
});
module.exports = __toCommonJS(value_parsers_exports);
var import_array_value_parser = require("./array-value-parser");
var import_base_value_parser = require("./base-value-parser");
var import_boolean_value_parser = require("./boolean-value-parser");
var import_date_value_parser = require("./date-value-parser");
var import_json_value_parser = require("./json-value-parser");
var import_number_value_parser = require("./number-value-parser");
var import_string_value_parser = require("./string-value-parser");
var import_to_many_value_parser = require("./to-many-value-parser");
var import_to_one_value_parser = require("./to-one-value-parser");
function registerFieldValueParsers(db) {
  db.registerFieldValueParsers({
    default: import_base_value_parser.BaseValueParser,
    array: import_array_value_parser.ArrayValueParser,
    set: import_array_value_parser.ArrayValueParser,
    boolean: import_boolean_value_parser.BooleanValueParser,
    date: import_date_value_parser.DateValueParser,
    json: import_json_value_parser.JsonValueParser,
    jsonb: import_json_value_parser.JsonValueParser,
    number: import_number_value_parser.NumberValueParser,
    integer: import_number_value_parser.NumberValueParser,
    bigInt: import_number_value_parser.NumberValueParser,
    float: import_number_value_parser.NumberValueParser,
    double: import_number_value_parser.NumberValueParser,
    real: import_number_value_parser.NumberValueParser,
    decimal: import_number_value_parser.NumberValueParser,
    string: import_string_value_parser.StringValueParser,
    hasOne: import_to_one_value_parser.ToOneValueParser,
    hasMany: import_to_many_value_parser.ToManyValueParser,
    belongsTo: import_to_one_value_parser.ToOneValueParser,
    belongsToMany: import_to_many_value_parser.ToManyValueParser
  });
}
__name(registerFieldValueParsers, "registerFieldValueParsers");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayValueParser,
  BaseValueParser,
  BooleanValueParser,
  DateValueParser,
  JsonValueParser,
  NumberValueParser,
  StringValueParser,
  ToManyValueParser,
  ToOneValueParser,
  registerFieldValueParsers
});
