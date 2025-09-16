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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var child_collection_exports = {};
__export(child_collection_exports, {
  default: () => child_collection_default
});
module.exports = __toCommonJS(child_collection_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
const mapVal = /* @__PURE__ */ __name((values, db) => values.map((v) => {
  const collection = db.getCollection(v);
  return import_sequelize.Sequelize.literal(`'${collection.tableNameAsString()}'::regclass`);
}), "mapVal");
const filterItems = /* @__PURE__ */ __name((values, db) => {
  return import_lodash.default.castArray(values).map((v) => {
    const collection = db.getCollection(v);
    if (!collection) return null;
    return `'${collection.tableNameAsString()}'::regclass`;
  }).filter(Boolean);
}, "filterItems");
const joinValues = /* @__PURE__ */ __name((items) => items.join(", "), "joinValues");
var child_collection_default = {
  $childIn(values, ctx) {
    const db = ctx.db;
    const items = filterItems(values, db);
    if (items.length) {
      return import_sequelize.Sequelize.literal(`"${ctx.model.name}"."tableoid" IN (${joinValues(items)})`);
    } else {
      return import_sequelize.Sequelize.literal(`1 = 2`);
    }
  },
  $childNotIn(values, ctx) {
    const db = ctx.db;
    const items = filterItems(values, db);
    if (items.length) {
      return import_sequelize.Sequelize.literal(`"${ctx.model.name}"."tableoid" NOT IN (${joinValues(items)})`);
    } else {
      return import_sequelize.Sequelize.literal(`1 = 1`);
    }
  }
};
