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
  PluginPublicFormsServer: () => PluginPublicFormsServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_hook = require("./hook");
class PasswordError extends Error {
}
class PluginPublicFormsServer extends import_server.Plugin {
  async parseCollectionData(formCollection, appends) {
    const collection = this.db.getCollection(formCollection);
    const collections = [
      {
        name: collection.name,
        fields: collection.getFields().map((v) => {
          return {
            ...v.options
          };
        }),
        template: collection.options.template
      }
    ];
    return collections.concat(
      appends.map((v) => {
        const targetCollection = this.db.getCollection(v);
        return {
          name: targetCollection.name,
          fields: targetCollection.getFields().map((v2) => {
            return {
              ...v2.options
            };
          }),
          template: targetCollection.options.template
        };
      })
    );
  }
  async getMetaByTk(filterByTk, options) {
    const { token, password } = options;
    const publicForms = this.db.getRepository("publicForms");
    const uiSchema = this.db.getRepository("uiSchemas");
    const instance = await publicForms.findOne({
      filter: {
        key: filterByTk
      }
    });
    if (!instance) {
      throw new Error("The form is not found");
    }
    if (!instance.get("enabled")) {
      return null;
    }
    if (!token) {
      if (instance.get("password")) {
        if (password === void 0) {
          return {
            passwordRequired: true
          };
        }
        if (this.app.environment.renderJsonTemplate(instance.get("password")) !== password) {
          throw new PasswordError("Please enter your password");
        }
      }
    }
    const keys = instance.collection.split(":");
    const collectionName = keys.pop();
    const dataSourceKey = keys.pop() || "main";
    const schema = await uiSchema.getJsonSchema(filterByTk);
    const { getAssociationAppends } = (0, import_hook.parseAssociationNames)(dataSourceKey, collectionName, this.app, schema);
    const { appends } = getAssociationAppends();
    const collections = await this.parseCollectionData(collectionName, appends);
    return {
      dataSource: {
        key: dataSourceKey,
        displayName: dataSourceKey,
        collections
      },
      token: this.app.authManager.jwt.sign(
        {
          collectionName,
          formKey: filterByTk,
          targetCollections: appends
        },
        {
          expiresIn: "1h"
        }
      ),
      schema
    };
  }
  // TODO
  getPublicFormsMeta = async (ctx, next) => {
    const token = ctx.get("X-Form-Token");
    const { filterByTk, password } = ctx.action.params;
    try {
      ctx.body = await this.getMetaByTk(filterByTk, { password, token });
    } catch (error) {
      if (error instanceof PasswordError) {
        ctx.throw(401, error.message);
      } else {
        throw error;
      }
    }
    await next();
  };
  parseToken = async (ctx, next) => {
    if (!ctx.action) {
      return next();
    }
    const { actionName, resourceName, params } = ctx.action;
    if (resourceName === "publicForms" && actionName === "getMeta" && params.password) {
      return next();
    }
    const jwt = this.app.authManager.jwt;
    const token = ctx.get("X-Form-Token");
    if (token) {
      try {
        const tokenData = await jwt.decode(token);
        ctx.PublicForm = {
          collectionName: tokenData.collectionName,
          formKey: tokenData.formKey,
          targetCollections: tokenData.targetCollections
        };
        const publicForms = this.db.getRepository("publicForms");
        const instance = await publicForms.findOne({
          filter: {
            key: tokenData.formKey
          }
        });
        if (!instance) {
          throw new Error("The form is not found");
        }
        if (!instance.get("enabled")) {
          throw new Error("The form is not enabled");
        }
        const actionName2 = ctx.action.actionName;
        if (actionName2 === "publicSubmit") {
          ctx.action.actionName = "create";
        }
        ctx.skipAuthCheck = true;
      } catch (error) {
        ctx.throw(401, error.message);
      }
    }
    await next();
  };
  parseACL = async (ctx, next) => {
    if (!ctx.PublicForm) {
      return next();
    }
    const { resourceName, actionName } = ctx.action;
    const collection = this.db.getCollection(resourceName);
    if (actionName === "create" && ctx.PublicForm["collectionName"] === resourceName) {
      ctx.permission = {
        skip: true
      };
    } else if (actionName === "list" && ctx.PublicForm["targetCollections"].includes(resourceName) || collection.options.template === "file" && actionName === "create" || resourceName === "storages" && actionName === "getBasicInfo" || resourceName === "map-configuration" && actionName === "get") {
      ctx.permission = {
        skip: true
      };
    }
    await next();
  };
  async load() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ["publicForms:*"]
    });
    this.app.acl.allow("publicForms", "getMeta", "public");
    this.app.resourceManager.registerActionHandlers({
      "publicForms:getMeta": this.getPublicFormsMeta
    });
    this.app.dataSourceManager.afterAddDataSource((dataSource) => {
      dataSource.resourceManager.use(this.parseToken, {
        before: "auth"
      });
      dataSource.acl.use(this.parseACL, {
        before: "core"
      });
      dataSource.resourceManager.registerActionHandlers({
        publicSubmit: dataSource.resourceManager.getRegisteredHandler("create")
      });
    });
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
var plugin_default = PluginPublicFormsServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginPublicFormsServer
});
