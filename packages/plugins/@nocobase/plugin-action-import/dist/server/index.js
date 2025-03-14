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
  PluginActionImportServer: () => PluginActionImportServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_actions = require("./actions");
var import_middleware = require("./middleware");
var import_errors = require("./errors");
__reExport(server_exports, require("./services/xlsx-importer"), module.exports);
__reExport(server_exports, require("./services/template-creator"), module.exports);
class PluginActionImportServer extends import_server.Plugin {
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
              actions: [...role.strategy.actions, "importXlsx"]
            }
          }
        });
      }
    });
  }
  async load() {
    this.app.dataSourceManager.afterAddDataSource((dataSource) => {
      dataSource.resourceManager.use(import_middleware.importMiddleware);
      dataSource.resourceManager.registerActionHandler("downloadXlsxTemplate", import_actions.downloadXlsxTemplate);
      dataSource.resourceManager.registerActionHandler("importXlsx", import_actions.importXlsx);
      dataSource.acl.setAvailableAction("importXlsx", {
        displayName: '{{t("Import")}}',
        allowConfigureFields: true,
        type: "new-data",
        onNewRecord: true
      });
      dataSource.acl.allow("*", "downloadXlsxTemplate", "loggedIn");
    });
    const errorHandlerPlugin = this.app.getPlugin("error-handler");
    errorHandlerPlugin.errorHandler.register(
      (err) => err instanceof import_errors.ImportValidationError,
      (err, ctx) => {
        ctx.status = 400;
        ctx.body = {
          errors: [
            {
              message: ctx.i18n.t(err.code, {
                ...err.params,
                ns: "action-import"
              })
            }
          ]
        };
      }
    );
    errorHandlerPlugin.errorHandler.register(
      (err) => err.name === "ImportError",
      (err, ctx) => {
        ctx.status = 400;
        const causeError = err.cause;
        errorHandlerPlugin.errorHandler.renderError(causeError, ctx);
        ctx.body = {
          errors: [
            {
              message: ctx.i18n.t("import-error", {
                ns: "action-import",
                rowData: err.rowData,
                rowIndex: err.rowIndex,
                causeMessage: ctx.body.errors[0].message
              })
            }
          ]
        };
      }
    );
  }
}
var server_default = PluginActionImportServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginActionImportServer,
  ...require("./services/xlsx-importer"),
  ...require("./services/template-creator")
});
