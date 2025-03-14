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
  PluginFieldM2MArrayServer: () => PluginFieldM2MArrayServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_belongs_to_array_field = require("./belongs-to-array-field");
var import_create_foreign_key = require("./hooks/create-foreign-key");
var import_before_destroy_foreign_key = require("./hooks/before-destroy-foreign-key");
var import_data_source_manager = require("@nocobase/data-source-manager");
class PluginFieldM2MArrayServer extends import_server.Plugin {
  async afterAdd() {
  }
  async beforeLoad() {
  }
  async load() {
    this.app.dataSourceManager.beforeAddDataSource((dataSource) => {
      const collectionManager = dataSource.collectionManager;
      if (collectionManager instanceof import_data_source_manager.SequelizeCollectionManager) {
        collectionManager.registerFieldTypes({
          belongsToArray: import_belongs_to_array_field.BelongsToArrayField
        });
      }
    });
    this.db.on("fields.afterCreate", (0, import_create_foreign_key.createForeignKey)(this.db));
    this.db.on("fields.beforeDestroy", (0, import_before_destroy_foreign_key.beforeDestroyForeignKey)(this.db));
  }
  async install() {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginFieldM2MArrayServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginFieldM2MArrayServer
});
