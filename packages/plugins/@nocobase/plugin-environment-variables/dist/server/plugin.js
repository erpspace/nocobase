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
  PluginEnvironmentVariablesServer: () => PluginEnvironmentVariablesServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
class PluginEnvironmentVariablesServer extends import_server.Plugin {
  updated = false;
  get aesEncryptor() {
    return this.app.aesEncryptor;
  }
  async handleSyncMessage(message) {
    const { type, name, value } = message;
    if (type === "updated") {
      this.updated = true;
    } else if (type === "setVariable") {
      this.app.environment.setVariable(name, value);
    } else if (type === "removeVariable") {
      this.app.environment.removeVariable(name);
      this.updated = true;
    }
  }
  async load() {
    this.registerACL();
    this.onEnvironmentSaved();
    await this.loadVariables();
  }
  registerACL() {
    this.app.acl.allow("environmentVariables", "list", "loggedIn");
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ["environmentVariables:*", "app:refresh"]
    });
  }
  async listEnvironmentVariables() {
    const repository = this.db.getRepository("environmentVariables");
    const items = await repository.find({
      sort: "name"
    });
    return items.map(({ name, type }) => ({ name, type }));
  }
  validateTexts(texts) {
    if (!Array.isArray(texts)) {
      throw new Error("texts parameter must be an array");
    }
    for (const item of texts) {
      if (!item || typeof item !== "object") {
        throw new Error("Each item in texts must be an object");
      }
      if (typeof item.text !== "string" || !item.text.trim()) {
        throw new Error("text property must be a non-empty string");
      }
      if (typeof item.secret !== "boolean") {
        throw new Error("secret property must be a boolean");
      }
      const lines = item.text.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
      for (const line of lines) {
        const equalIndex = line.indexOf("=");
        if (equalIndex === -1) {
          throw new Error(`Invalid environment variable format: ${line}`);
        }
        const key = line.slice(0, equalIndex).trim();
        const value = line.slice(equalIndex + 1).trim();
        if (!key) {
          throw new Error(`Environment variable name cannot be empty`);
        }
        if (!value) {
          throw new Error(`Environment variable "${key}" must have a value`);
        }
      }
    }
  }
  async setEnvironmentVariablesByText(texts) {
    this.validateTexts(texts);
    const repository = this.db.getRepository("environmentVariables");
    for (const { text, secret } of texts) {
      const lines = text.split("\n").map((line) => line.trim()).filter((line) => line && !line.startsWith("#"));
      for (const line of lines) {
        const equalIndex = line.indexOf("=");
        if (equalIndex === -1) {
          this.app.log.warn(`Invalid environment variable format: ${line}`);
          continue;
        }
        const key = line.slice(0, equalIndex).trim();
        const value = line.slice(equalIndex + 1).trim();
        if (!key) {
          this.app.log.warn(`Empty key found: ${line}`);
          continue;
        }
        if (!value) {
          throw new Error(`Empty value is not allowed for key: ${key}`);
        }
        await repository.create({
          values: {
            name: key,
            type: secret ? "secret" : "default",
            value
          }
        });
      }
    }
  }
  onEnvironmentSaved() {
    this.db.on("environmentVariables.afterUpdate", async (model, { transaction }) => {
      this.updated = true;
      this.sendSyncMessage({ type: "updated" }, { transaction });
    });
    this.db.on("environmentVariables.beforeSave", async (model) => {
      if (model.type === "secret" && model.changed("value")) {
        const encrypted = await this.aesEncryptor.encrypt(model.value);
        model.set("value", encrypted);
      }
    });
    this.app.resourceManager.registerActionHandler("environmentVariables:list", async (ctx, next) => {
      const repository = this.db.getRepository("environmentVariables");
      const items = await repository.find({
        sort: "name",
        filter: ctx.action.params.filter
      });
      for (const model of items) {
        if (model.type === "secret") {
          model.set("value", void 0);
        }
      }
      ctx.withoutDataWrapping = true;
      ctx.body = {
        data: items,
        meta: {
          updated: this.updated
        }
      };
      await next();
    });
    this.db.on("environmentVariables.afterSave", async (model, { transaction }) => {
      if (model.type === "secret") {
        try {
          const decrypted = await this.aesEncryptor.decrypt(model.value);
          model.set("value", decrypted);
        } catch (error) {
          this.app.log.error(error);
        }
      }
      this.app.environment.setVariable(model.name, model.value);
      this.sendSyncMessage({ type: "setVariable", name: model.name, value: model.value }, { transaction });
    });
    this.db.on("environmentVariables.afterDestroy", async (model, { transaction }) => {
      this.app.environment.removeVariable(model.name);
      this.updated = true;
      this.sendSyncMessage({ type: "removeVariable", name: model.name }, { transaction });
    });
  }
  async loadVariables() {
    const repository = this.db.getRepository("environmentVariables");
    const r = await repository.collection.existsInDb();
    if (!r) {
      return;
    }
    const items = await repository.find();
    for (const model of items) {
      if (model.type === "secret") {
        try {
          const decrypted = await this.aesEncryptor.decrypt(model.value);
          model.set("value", decrypted);
        } catch (error) {
          this.app.log.error(error);
        }
      }
      this.app.environment.setVariable(model.name, model.value);
    }
  }
}
var plugin_default = PluginEnvironmentVariablesServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginEnvironmentVariablesServer
});
