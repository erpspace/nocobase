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
var sequence_field_key_exports = {};
__export(sequence_field_key_exports, {
  default: () => sequence_field_key_default
});
module.exports = __toCommonJS(sequence_field_key_exports);
var import_server = require("@nocobase/server");
class sequence_field_key_default extends import_server.Migration {
  appVersion = "<0.8.1-alpha.2";
  async up() {
    const match = await this.app.version.satisfies("<=0.8.0-alpha.13");
    if (!match) {
      return;
    }
    const { db } = this.context;
    const fieldRepo = db.getRepository("fields");
    if (!fieldRepo) {
      return;
    }
    const pluginRepo = db.getRepository("applicationPlugins");
    await db.sequelize.transaction(async (transaction) => {
      const seqPlugin = await pluginRepo.findOne({
        filter: {
          name: "sequence-field"
        },
        transaction
      });
      if (!seqPlugin) {
        await pluginRepo.create({
          values: {
            name: "sequence-field",
            version: "0.8.0-alpha.13",
            enabled: true,
            installed: true,
            builtIn: true
          }
        });
      }
      const fields = await fieldRepo.find({
        filter: {
          type: "sequence"
        }
      });
      await fields.reduce(
        (promise, field) => promise.then(async () => {
          const options = field.get("options");
          const fieldName = field.get("name");
          const collectionName = field.get("collectionName");
          field.set("patterns", options.patterns);
          await field.save({ transaction });
          const repo = db.getRepository(collectionName);
          const item = await repo.findOne({
            sort: ["-createdAt"],
            transaction
          });
          if (!item) {
            return;
          }
          const collection = db.getCollection(collectionName);
          const memField = collection.getField(fieldName);
          await memField.update(item, { transaction });
        }),
        Promise.resolve()
      );
    });
  }
  async down() {
  }
}
