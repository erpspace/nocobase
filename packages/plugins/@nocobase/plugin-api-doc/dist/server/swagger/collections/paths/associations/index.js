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
var associations_exports = {};
__export(associations_exports, {
  associationFields: () => associationFields,
  default: () => associations_default
});
module.exports = __toCommonJS(associations_exports);
var import_database = require("@nocobase/database");
var import_multiple_association = __toESM(require("./multiple-association"));
var import_single_association = __toESM(require("./single-association"));
var import__ = require("..");
var associations_default = (collection) => {
  return associationFields(collection).map((field) => {
    if (field.type === "belongsToMany" || field.type === "hasMany") {
      return (0, import_multiple_association.default)(collection, field);
    }
    return (0, import_single_association.default)(collection, field);
  }).reduce((obj, item) => {
    return {
      ...obj,
      ...item
    };
  }, {});
};
function associationFields(collection) {
  if ((0, import__.isViewCollection)(collection)) {
    return [];
  }
  return Array.from(collection.fields.values()).filter((field) => field instanceof import_database.RelationField).filter((field) => field.name !== "createdBy" && field.name !== "updatedBy");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  associationFields
});
