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
var update_apps_collections_exports = {};
__export(update_apps_collections_exports, {
  default: () => update_apps_collections_default
});
module.exports = __toCommonJS(update_apps_collections_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
class update_apps_collections_default extends import_server.Migration {
  appVersion = "<0.9.3-alpha.1";
  async up() {
    const result = await this.app.version.satisfies("<0.9.3-alpha.1");
    if (!result) {
      return;
    }
    if (!this.app.db.getCollection("applications")) return;
    await this.app.db.getCollection("collections").repository.destroy({
      where: {
        name: "applications"
      }
    });
    const appSyncedCollections = /* @__PURE__ */ new Map();
    const collections = await this.app.db.getCollection("collections").repository.find();
    const collectionsData = collections.map((collection) => collection.toJSON());
    for (const collection of collections) {
      const collectionSyncToApps = collection.get("syncToApps");
      if (collectionSyncToApps) {
        for (const app of collectionSyncToApps) {
          if (!appSyncedCollections.has(app)) {
            appSyncedCollections.set(app, /* @__PURE__ */ new Set());
          }
          appSyncedCollections.get(app).add(collection.name);
        }
      }
    }
    const allCollections = collections.map((collection) => collection.name);
    const appCollectionBlacklist = this.app.db.getCollection("appCollectionBlacklist");
    for (const [app, syncedCollections] of appSyncedCollections) {
      const blackListCollections = allCollections.filter(
        (collection) => !syncedCollections.has(collection) && !["users", "roles"].includes(collection)
      );
      const connectedCollections = import_utils.CollectionsGraph.connectedNodes({
        collections: collectionsData,
        nodes: blackListCollections,
        direction: "reverse"
      });
      console.log(
        JSON.stringify(
          {
            app,
            connectedCollections
          },
          null,
          2
        )
      );
      await appCollectionBlacklist.model.bulkCreate(
        connectedCollections.map((collection) => {
          return {
            applicationName: app,
            collectionName: collection
          };
        })
      );
    }
  }
}
