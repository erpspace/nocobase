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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var server_exports = {};
__export(server_exports, {
  PluginActionExportServer: () => PluginActionExportServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_actions = require("./actions");
__reExport(server_exports, require("./services/base-exporter"), module.exports);
__reExport(server_exports, require("./services/xlsx-exporter"), module.exports);
class PluginActionExportServer extends import_server.Plugin {
  beforeLoad() {
    this.app.on("afterInstall", async () => {
      if (!this.app.db.getRepository("roles")) {
        return;
      }
      const roleNames = ["admin", "member"];
      const roles = await this.app.db.getRepository("roles").find({
        filter: {
          name: roleNames
        }
      });
      for (const role of roles) {
        await this.app.db.getRepository("roles").update({
          filter: {
            name: role.name
          },
          values: {
            strategy: {
              ...role.strategy,
              actions: [...role.strategy.actions, "export"]
            }
          }
        });
      }
    });
  }
  async load() {
    this.app.dataSourceManager.afterAddDataSource((dataSource) => {
      dataSource.resourceManager.registerActionHandler("export", import_actions.exportXlsx);
      dataSource.acl.setAvailableAction("export", {
        displayName: '{{t("Export")}}',
        allowConfigureFields: true,
        aliases: ["export", "exportAttachments"]
      });
    });
  }
}
var server_default = PluginActionExportServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginActionExportServer,
  ...require("./services/base-exporter"),
  ...require("./services/xlsx-exporter")
});
