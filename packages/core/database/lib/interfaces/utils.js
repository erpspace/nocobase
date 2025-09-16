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
var utils_exports = {};
__export(utils_exports, {
  registerInterfaces: () => registerInterfaces
});
module.exports = __toCommonJS(utils_exports);
var import_index = require("./index");
var import_many_to_one_interface = require("./many-to-one-interface");
var import_many_to_many_interface = require("./many-to-many-interface");
var import_one_has_one_interface = require("./one-has-one-interface");
var import_one_belongs_to_one_interface = require("./one-belongs-to-one-interface");
var import_one_to_many_interface = require("./one-to-many-interface");
var import_integer_interface = require("./integer-interface");
var import_number_interface = require("./number-interface");
var import_json_interface = require("./json-interface");
var import_input_interface = require("./input-interface");
const interfaces = {
  integer: import_integer_interface.IntegerInterface,
  number: import_number_interface.NumberInterface,
  multipleSelect: import_index.MultipleSelectInterface,
  checkboxes: import_index.MultipleSelectInterface,
  checkboxGroup: import_index.MultipleSelectInterface,
  checkbox: import_index.BooleanInterface,
  select: import_index.SelectInterface,
  radio: import_index.SelectInterface,
  radioGroup: import_index.SelectInterface,
  percent: import_index.PercentInterface,
  datetime: import_index.DatetimeInterface,
  datetimeNoTz: import_index.DatetimeNoTzInterface,
  unixTimestamp: import_index.DatetimeInterface,
  date: import_index.DateInterface,
  createdAt: import_index.DatetimeInterface,
  updatedAt: import_index.DatetimeInterface,
  boolean: import_index.BooleanInterface,
  json: import_json_interface.JsonInterface,
  oho: import_one_has_one_interface.OneHasOneInterface,
  obo: import_one_belongs_to_one_interface.OneBelongsToOneInterface,
  o2m: import_one_to_many_interface.OneToManyInterface,
  m2o: import_many_to_one_interface.ManyToOneInterface,
  m2m: import_many_to_many_interface.ManyToManyInterface,
  time: import_index.TimeInterface,
  input: import_input_interface.InputInterface,
  textarea: import_index.TextareaInterface
};
function registerInterfaces(db) {
  for (const [interfaceName, type] of Object.entries(interfaces)) {
    db.interfaceManager.registerInterfaceType(interfaceName, type);
  }
}
__name(registerInterfaces, "registerInterfaces");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerInterfaces
});
