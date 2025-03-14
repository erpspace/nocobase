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
var sync_source_manager_exports = {};
__export(sync_source_manager_exports, {
  SyncSourceManager: () => SyncSourceManager
});
module.exports = __toCommonJS(sync_source_manager_exports);
var import_utils = require("@nocobase/utils");
class SyncSourceManager {
  syncSourceTypes = new import_utils.Registry();
  registerType(syncSourceType, syncSourceConfig) {
    this.syncSourceTypes.register(syncSourceType, syncSourceConfig);
  }
  listTypes() {
    return Array.from(this.syncSourceTypes.getEntities()).map(([syncSourceType, source]) => ({
      name: syncSourceType,
      title: source.title
    }));
  }
  async getByName(name, ctx) {
    const repo = ctx.db.getRepository("userDataSyncSources");
    const sourceInstance = await repo.findOne({ filter: { enabled: true, name } });
    if (!sourceInstance) {
      throw new Error(`SyncSource [${name}] is not found.`);
    }
    return this.create(sourceInstance, ctx);
  }
  async getById(id, ctx) {
    const repo = ctx.db.getRepository("userDataSyncSources");
    const sourceInstance = await repo.findOne({ filter: { enabled: true }, filterByTk: id });
    if (!sourceInstance) {
      throw new Error(`SyncSource [${id}] is not found.`);
    }
    return this.create(sourceInstance, ctx);
  }
  create(sourceInstance, ctx) {
    const { syncSource } = this.syncSourceTypes.get(sourceInstance.sourceType) || {};
    if (!syncSource) {
      throw new Error(`SyncSourceType [${sourceInstance.sourceType}] is not found.`);
    }
    return new syncSource({ sourceInstance, options: sourceInstance.options, ctx });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SyncSourceManager
});
