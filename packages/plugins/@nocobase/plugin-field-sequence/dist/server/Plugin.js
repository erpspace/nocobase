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
var Plugin_exports = {};
__export(Plugin_exports, {
  default: () => PluginFieldSequenceServer
});
module.exports = __toCommonJS(Plugin_exports);
var import_crypto = require("crypto");
var import_path = __toESM(require("path"));
var import_util = require("util");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_sequence_field = require("./fields/sequence-field");
const asyncRandomInt = (0, import_util.promisify)(import_crypto.randomInt);
class PluginFieldSequenceServer extends import_server.Plugin {
  patternTypes = new import_utils.Registry();
  async load() {
    const { app, db, options } = this;
    db.registerFieldTypes({
      sequence: import_sequence_field.SequenceField
    });
    db.addMigrations({
      namespace: "sequence-field",
      directory: import_path.default.resolve(__dirname, "migrations"),
      context: {
        plugin: this
      }
    });
    await this.importCollections(import_path.default.resolve(__dirname, "collections"));
    db.on("fields.beforeSave", async (field, { transaction }) => {
      if (field.get("type") !== "sequence") {
        return;
      }
      const patterns = (field.get("patterns") || []).filter((p) => p.type === "integer");
      if (!patterns.length) {
        return;
      }
      const SequenceRepo = db.getRepository("sequences");
      await patterns.reduce(
        (promise, p) => promise.then(async () => {
          var _a;
          if (((_a = p.options) == null ? void 0 : _a.key) == null) {
            Object.assign(p, {
              options: {
                ...p.options,
                key: await asyncRandomInt(1 << 16)
              }
            });
          }
        }),
        Promise.resolve()
      );
      const sequences = await SequenceRepo.find({
        filter: {
          field: field.get("name"),
          collection: field.get("collectionName"),
          key: patterns.map((p) => p.options.key)
        },
        transaction
      });
      await patterns.reduce(
        (promise, p) => promise.then(async () => {
          if (!sequences.find((s) => s.get("key") === p.options.key)) {
            await SequenceRepo.create({
              values: {
                field: field.get("name"),
                collection: field.get("collectionName"),
                key: p.options.key
              },
              transaction
            });
            await field.load({ transaction });
          }
        }),
        Promise.resolve()
      );
    });
    db.on("fields.afterDestroy", async (field, { transaction }) => {
      if (field.get("type") !== "sequence") {
        return;
      }
      const patterns = (field.get("patterns") || []).filter((p) => p.type === "integer");
      if (!patterns.length) {
        return;
      }
      const SequenceRepo = db.getRepository("sequences");
      await SequenceRepo.destroy({
        filter: {
          field: field.get("name"),
          collection: field.get("collectionName"),
          key: patterns.map((p) => p.key)
        },
        transaction
      });
    });
  }
  async install() {
  }
}
