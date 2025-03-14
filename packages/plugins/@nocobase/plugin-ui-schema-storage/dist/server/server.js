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
var server_exports = {};
__export(server_exports, {
  PluginUISchemaStorageServer: () => PluginUISchemaStorageServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_path = __toESM(require("path"));
var import_ui_schema_action = require("./actions/ui-schema-action");
var import_model = require("./model");
var import_repository = __toESM(require("./repository"));
var import_server_hooks = require("./server-hooks");
var import_model2 = require("./server-hooks/model");
class PluginUISchemaStorageServer extends import_server.Plugin {
  serverHooks;
  registerRepository() {
    this.app.db.registerRepositories({
      UiSchemaRepository: import_repository.default
    });
  }
  async beforeLoad() {
    const db = this.app.db;
    this.serverHooks = new import_server_hooks.ServerHooks(db);
    this.app.db.registerModels({ MagicAttributeModel: import_database.MagicAttributeModel, UiSchemaModel: import_model.UiSchemaModel, ServerHookModel: import_model2.ServerHookModel });
    this.registerRepository();
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.block-templates`,
      actions: ["uiSchemaTemplates:*"]
    });
    this.app.acl.registerSnippet({
      name: "ui.uiSchemas",
      actions: ["uiSchemas:*", "uiSchemas.roles:list", "uiSchemas.roles:set"]
    });
    db.on("uiSchemas.beforeCreate", function setUid(model) {
      if (!model.get("name")) {
        model.set("name", (0, import_utils.uid)());
      }
    });
    db.on("uiSchemas.afterCreate", async function insertSchema(model, options) {
      const { transaction } = options;
      const uiSchemaRepository = db.getCollection("uiSchemas").repository;
      const context = options.context;
      if (context == null ? void 0 : context.disableInsertHook) {
        return;
      }
      await uiSchemaRepository.insert(model.toJSON(), {
        transaction
      });
    });
    db.on("uiSchemas.afterUpdate", async function patchSchema(model, options) {
      const { transaction } = options;
      const uiSchemaRepository = db.getCollection("uiSchemas").repository;
      await uiSchemaRepository.patch(model.toJSON(), {
        transaction
      });
    });
    this.app.resourcer.define({
      name: "uiSchemas",
      actions: import_ui_schema_action.uiSchemaActions
    });
    this.app.acl.allow(
      "uiSchemas",
      ["getProperties", "getJsonSchema", "getParentJsonSchema", "initializeActionContext"],
      "loggedIn"
    );
    this.app.acl.allow("uiSchemaTemplates", ["get", "list"], "loggedIn");
  }
  async load() {
    this.db.addMigrations({
      namespace: "ui-schema-storage",
      directory: import_path.default.resolve(__dirname, "./migrations"),
      context: {
        plugin: this
      }
    });
    const getSourceAndTargetForRemoveAction = async (ctx) => {
      const { filterByTk } = ctx.action.params;
      return {
        targetCollection: "uiSchemas",
        targetRecordUK: filterByTk
      };
    };
    const getSourceAndTargetForInsertAdjacentAction = async (ctx) => {
      var _a, _b;
      return {
        targetCollection: "uiSchemas",
        targetRecordUK: (_b = (_a = ctx.request.body) == null ? void 0 : _a.schema) == null ? void 0 : _b["x-uid"]
      };
    };
    const getSourceAndTargetForPatchAction = async (ctx) => {
      var _a;
      return {
        targetCollection: "uiSchemas",
        targetRecordUK: (_a = ctx.request.body) == null ? void 0 : _a["x-uid"]
      };
    };
    this.app.auditManager.registerActions([
      { name: "uiSchemas:remove", getSourceAndTarget: getSourceAndTargetForRemoveAction },
      { name: "uiSchemas:insertAdjacent", getSourceAndTarget: getSourceAndTargetForInsertAdjacentAction },
      { name: "uiSchemas:patch", getSourceAndTarget: getSourceAndTargetForPatchAction }
    ]);
    await this.importCollections((0, import_path.resolve)(__dirname, "collections"));
  }
}
var server_default = PluginUISchemaStorageServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginUISchemaStorageServer
});
