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
var plugin_exports = {};
__export(plugin_exports, {
  PluginSnapshotFieldServer: () => PluginSnapshotFieldServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_path = require("path");
var import_snapshot_field = require("./fields/snapshot-field");
class PluginSnapshotFieldServer extends import_server.Plugin {
  afterAdd() {
  }
  async beforeLoad() {
    const collectionHandler = async (model, { transaction }) => {
      const collectionDoc = model.toJSON();
      const collectionsHistoryRepository = this.app.db.getRepository("collectionsHistory");
      const fieldsHistoryRepository = this.app.db.getRepository("fieldsHistory");
      const existCollection = await collectionsHistoryRepository.findOne({
        filter: {
          name: collectionDoc.name
        },
        transaction
      });
      if (existCollection) {
        await existCollection.destroy({
          transaction
        });
      }
      await collectionsHistoryRepository.create({
        values: collectionDoc,
        transaction
      });
    };
    this.app.db.on("collections.afterCreateWithAssociations", collectionHandler);
    const deleteField = async (field, transaction) => {
      const fieldsHistoryRepository = this.app.db.getRepository("fieldsHistory");
      const { name, collectionName } = field;
      await fieldsHistoryRepository.destroy({
        filter: { name, collectionName },
        transaction
      });
    };
    const fieldHandler = async (model, { transaction }) => {
      const fieldsHistoryRepository = this.app.db.getRepository("fieldsHistory");
      const fieldDoc = model.get();
      await deleteField(fieldDoc, transaction);
      const reverseField = fieldDoc.reverseField;
      if (reverseField) {
        await deleteField(reverseField, transaction);
      }
      await fieldsHistoryRepository.create({
        values: JSON.parse(JSON.stringify(fieldDoc)),
        transaction
      });
    };
    this.app.db.on("fields.afterCreateWithAssociations", fieldHandler);
    this.app.db.on("fields.beforeCreate", this.autoFillTargetCollection);
  }
  autoFillTargetCollection = async (model) => {
    const { collectionName, targetField } = model.get();
    const collection = this.db.getCollection(collectionName);
    if (!collection) {
      return;
    }
    const field = collection.getField(targetField);
    if (field == null ? void 0 : field.target) {
      model.set("targetCollection", field.target);
    }
  };
  async load() {
    await this.importCollections((0, import_path.resolve)(__dirname, "collections"));
    this.app.db.registerFieldTypes({
      snapshot: import_snapshot_field.SnapshotField
    });
    this.app.acl.allow("collectionsHistory", "list", "loggedIn");
  }
  // 初始化安装的时候
  async install(options) {
    await this.app.db.sequelize.transaction(async (transaction) => {
      const collectionsRepository = this.app.db.getRepository("collections");
      const collectionsHistoryRepository = this.app.db.getRepository("collectionsHistory");
      if ((await collectionsHistoryRepository.find()).length === 0) {
        const collectionsModels = await collectionsRepository.find();
        await collectionsHistoryRepository.createMany({
          records: collectionsModels.map((m) => m.get()),
          transaction
        });
      }
      const fieldsRepository = this.app.db.getRepository("fields");
      const fieldsHistoryRepository = this.app.db.getRepository("fieldsHistory");
      if ((await fieldsHistoryRepository.find()).length === 0) {
        const fieldsModels = await fieldsRepository.find();
        await fieldsHistoryRepository.createMany({
          records: fieldsModels.map((m) => m.get()),
          transaction
        });
      }
    });
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginSnapshotFieldServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginSnapshotFieldServer
});
