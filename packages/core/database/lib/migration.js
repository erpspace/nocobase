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
var migration_exports = {};
__export(migration_exports, {
  Migration: () => Migration,
  Migrations: () => Migrations
});
module.exports = __toCommonJS(migration_exports);
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
const _Migration = class _Migration {
  name;
  context;
  constructor(context) {
    this.context = context;
  }
  get db() {
    return this.context.db;
  }
  get sequelize() {
    return this.context.db.sequelize;
  }
  get queryInterface() {
    return this.context.db.sequelize.getQueryInterface();
  }
  async up() {
  }
  async down() {
  }
};
__name(_Migration, "Migration");
let Migration = _Migration;
const _Migrations = class _Migrations {
  items = [];
  context;
  constructor(context) {
    this.context = context;
  }
  clear() {
    this.items = [];
  }
  add(item) {
    const Migration2 = item.migration;
    if (Migration2 && typeof Migration2 === "function") {
      const migration = new Migration2({ ...this.context, ...item.context });
      migration.name = item.name;
      this.items.push(migration);
    } else {
      this.items.push(item);
    }
  }
  callback() {
    return async (ctx) => {
      return await Promise.all(
        import_lodash.default.sortBy(this.items, (item) => {
          const keys = item.name.split("/");
          return keys.pop() || item.name;
        }).map(async (item) => {
          if (typeof item.migration === "string") {
            const Migration2 = await (0, import_utils.importModule)(item.migration);
            const migration = new Migration2({ ...this.context, ...item.context });
            migration.name = item.name;
            return migration;
          }
          return item;
        })
      );
    };
  }
};
__name(_Migrations, "Migrations");
let Migrations = _Migrations;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Migration,
  Migrations
});
