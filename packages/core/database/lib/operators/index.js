/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var operators_exports = {};
__export(operators_exports, {
  default: () => operators_default
});
module.exports = __toCommonJS(operators_exports);
var import_association = __toESM(require("./association"));
var import_date = __toESM(require("./date"));
var import_array = __toESM(require("./array"));
var import_empty = __toESM(require("./empty"));
var import_string = __toESM(require("./string"));
var import_eq = __toESM(require("./eq"));
var import_ne = __toESM(require("./ne"));
var import_notIn = __toESM(require("./notIn"));
var import_boolean = __toESM(require("./boolean"));
var import_child_collection = __toESM(require("./child-collection"));
var operators_default = {
  ...import_association.default,
  ...import_date.default,
  ...import_array.default,
  ...import_empty.default,
  ...import_string.default,
  ...import_eq.default,
  ...import_ne.default,
  ...import_notIn.default,
  ...import_boolean.default,
  ...import_child_collection.default
};
