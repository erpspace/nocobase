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
var server_hooks_exports = {};
__export(server_hooks_exports, {
  ServerHooks: () => ServerHooks
});
module.exports = __toCommonJS(server_hooks_exports);
var import_hooks = require("./hooks");
class ServerHooks {
  constructor(db) {
    this.db = db;
    this.listen();
    this.registerHooks();
  }
  hooks = /* @__PURE__ */ new Map();
  registerHooks() {
    import_hooks.hooks.forEach((hook) => this.register(hook.hookType, hook.hookName, hook.hookFunc));
  }
  listen() {
    this.db.on("fields.afterDestroy", async (model, options) => {
      await this.onCollectionFieldDestroy(model, options);
      await this.onAnyCollectionFieldDestroy(model, options);
    });
    this.db.on("collections.afterDestroy", async (model, options) => {
      await this.onCollectionDestroy(model, options);
    });
    this.db.on("uiSchemas.afterCreateWithAssociations", async (model, options) => {
      await this.onUiSchemaCreate(model, options);
    });
    this.db.on("uiSchemaMove", async (model, options) => {
      await this.onUiSchemaMove(model, options);
    });
    this.db.on("uiSchemas.afterSave", async (model, options) => {
      await this.onUiSchemaSave(model, options);
    });
  }
  async callSchemaInstanceHooksByType(schemaInstance, options, type) {
    var _a;
    const { transaction } = options;
    const hooks2 = schemaInstance.getServerHooksByType(type);
    for (const hook of hooks2) {
      const hookFunc = (_a = this.hooks.get(type)) == null ? void 0 : _a.get(hook["method"]);
      await (hookFunc == null ? void 0 : hookFunc({
        schemaInstance,
        options,
        db: this.db,
        params: hook["params"]
      }));
    }
  }
  async onUiSchemaMove(schemaInstance, options) {
    await this.callSchemaInstanceHooksByType(schemaInstance, options, "onSelfMove");
  }
  async onCollectionDestroy(collectionModel, options) {
    const { transaction } = options;
    await this.findHooksAndCall(
      {
        type: "onCollectionDestroy",
        collection: collectionModel.get("name")
      },
      {
        collectionInstance: collectionModel,
        options
      },
      transaction
    );
  }
  async onAnyCollectionFieldDestroy(fieldModel, options) {
    const { transaction } = options;
    const collectionName = fieldModel.get("collectionName");
    await this.findHooksAndCall(
      {
        type: "onAnyCollectionFieldDestroy",
        collection: collectionName
      },
      {
        collectionFieldInstance: fieldModel,
        options
      },
      transaction
    );
  }
  async onCollectionFieldDestroy(fieldModel, options) {
    const { transaction } = options;
    const collectionName = fieldModel.get("collectionName");
    const fieldName = fieldModel.get("name");
    await this.findHooksAndCall(
      {
        type: "onCollectionFieldDestroy",
        collection: collectionName,
        field: fieldName
      },
      {
        collectionFieldInstance: fieldModel,
        options
      },
      transaction
    );
  }
  async onUiSchemaCreate(schemaInstance, options) {
    await this.callSchemaInstanceHooksByType(schemaInstance, options, "onSelfCreate");
  }
  async onUiSchemaSave(schemaInstance, options) {
    await this.callSchemaInstanceHooksByType(schemaInstance, options, "onSelfSave");
  }
  async findHooksAndCall(hooksFilter, hooksArgs, transaction) {
    var _a;
    const hooks2 = await this.db.getRepository("uiSchemaServerHooks").find({
      filter: hooksFilter,
      appends: ["uiSchema"],
      transaction
    });
    for (const hookRecord of hooks2) {
      const hoodMethodName = hookRecord.get("method");
      const hookFunc = (_a = this.hooks.get(hookRecord.get("type"))) == null ? void 0 : _a.get(hoodMethodName);
      if (hookFunc) {
        await hookFunc({
          ...hooksArgs,
          schemaInstance: hookRecord.uiSchema,
          db: this.db,
          params: hookRecord.get("params")
        });
      }
    }
  }
  /**
   * register a server hook function
   * @param type type of server hook
   * @param name name of server hook
   * @param hookFunc server hook function
   */
  register(type, name, hookFunc) {
    if (!this.hooks.has(type)) {
      this.hooks.set(type, /* @__PURE__ */ new Map());
    }
    const hookTypeMap = this.hooks.get(type);
    hookTypeMap.set(name, hookFunc);
  }
  remove(type, name) {
    if (!this.hooks.has(type)) {
      return;
    }
    const hookTypeMap = this.hooks.get(type);
    hookTypeMap.delete(name);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ServerHooks
});
