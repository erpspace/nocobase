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
  PluginFieldSortServer: () => PluginFieldSortServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_sort_field = require("./sort-field");
var import_action = require("./action");
class PluginFieldSortServer extends import_server.Plugin {
  async afterAdd() {
  }
  async beforeLoad() {
    const { lockManager } = this.app;
    class SortFieldClass extends import_sort_field.SortField {
    }
    SortFieldClass.lockManager = lockManager;
    this.app.dataSourceManager.beforeAddDataSource((dataSource) => {
      if (dataSource.collectionManager instanceof import_data_source_manager.SequelizeCollectionManager) {
        dataSource.collectionManager.db.registerFieldTypes({
          sort: SortFieldClass
        });
        dataSource.resourceManager.registerActionHandlers({ move: import_action.move });
      }
    });
  }
  async load() {
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
var plugin_default = PluginFieldSortServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginFieldSortServer
});
