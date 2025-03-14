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
var source_manager_exports = {};
__export(source_manager_exports, {
  SourceManager: () => SourceManager
});
module.exports = __toCommonJS(source_manager_exports);
var import_utils = require("@nocobase/utils");
class SourceManager {
  sources = new import_utils.Registry();
  registerSource(name, source) {
    this.sources.register(name, source);
  }
  async sync(ctx, types) {
    const resources = { client: {} };
    const sources = Array.from(this.sources.getKeys());
    const syncSources = sources.filter((source) => types.includes(source));
    const promises = syncSources.map((source) => this.sources.get(source).sync(ctx));
    const results = await Promise.all(promises);
    return results.reduce((result, resource) => {
      return { ...result, ...resource };
    }, resources);
  }
  handleTextsSaved(db, handler) {
    const sources = this.sources;
    for (const source of sources.getValues()) {
      if (!source.collections) {
        continue;
      }
      for (const { collection, fields } of source.collections) {
        db.on(`${collection}.afterSave`, async (instance, options) => {
          const texts = [];
          const changedFields = fields.filter((field) => instance["_changed"].has(field));
          if (!changedFields.length) {
            return;
          }
          changedFields.forEach((field) => {
            texts.push({ text: instance.get(field), module: `resources.${source.namespace}` });
          });
          await handler(texts, options);
        });
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SourceManager
});
