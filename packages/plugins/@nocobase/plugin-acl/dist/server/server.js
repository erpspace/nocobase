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
  PluginACLServer: () => PluginACLServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_actions = require("@nocobase/actions");
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
var import_path = require("path");
var import_available_actions = require("./actions/available-actions");
var import_role_check = require("./actions/role-check");
var import_role_collections = require("./actions/role-collections");
var import_user_setDefaultRole = require("./actions/user-setDefaultRole");
var import_setCurrentRole = require("./middlewares/setCurrentRole");
var import_with_acl_meta = require("./middlewares/with-acl-meta");
var import_RoleModel = require("./model/RoleModel");
var import_RoleResourceActionModel = require("./model/RoleResourceActionModel");
var import_RoleResourceModel = require("./model/RoleResourceModel");
class PluginACLServer extends import_server.Plugin {
  get acl() {
    return this.app.acl;
  }
  async writeResourceToACL(resourceModel, transaction) {
    await resourceModel.writeToACL({
      acl: this.acl,
      transaction
    });
  }
  async writeActionToACL(actionModel, transaction) {
    const resource = actionModel.get("resource");
    const role = this.acl.getRole(resource.get("roleName"));
    await actionModel.writeToACL({
      acl: this.acl,
      role,
      resourceName: resource.get("name")
    });
  }
  async handleSyncMessage(message) {
    const { type } = message;
    if (type === "syncRole") {
      const { roleName } = message;
      const role = await this.app.db.getRepository("roles").findOne({
        filter: {
          name: roleName
        }
      });
      await this.writeRoleToACL(role, {
        withOutResources: true
      });
      await this.app.emitAsync("acl:writeResources", {
        roleName: role.get("name")
      });
    }
  }
  async writeRolesToACL(options) {
    const roles = await this.app.db.getRepository("roles").find({
      appends: ["resources", "resources.actions"]
    });
    for (const role of roles) {
      await this.writeRoleToACL(role, options);
    }
  }
  async writeRoleToACL(role, options = {}) {
    const transaction = options == null ? void 0 : options.transaction;
    role.writeToAcl({ acl: this.acl, withOutStrategy: true });
    if (options.withOutResources) {
      return;
    }
    let resources = role.get("resources");
    if (!resources) {
      resources = await role.getResources({ transaction });
    }
    for (const resource of resources) {
      await this.writeResourceToACL(resource, transaction);
    }
  }
  async beforeLoad() {
    this.db.addMigrations({
      namespace: this.name,
      directory: (0, import_path.resolve)(__dirname, "./migrations"),
      context: {
        plugin: this
      }
    });
    this.app.db.registerModels({
      RoleResourceActionModel: import_RoleResourceActionModel.RoleResourceActionModel,
      RoleResourceModel: import_RoleResourceModel.RoleResourceModel,
      RoleModel: import_RoleModel.RoleModel
    });
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.roles`,
      actions: [
        "roles:*",
        "roles.snippets:*",
        "availableActions:list",
        "roles.collections:list",
        "roles.resources:*",
        "uiSchemas:getProperties",
        "roles.menuUiSchemas:*",
        "roles.users:*",
        "dataSources.roles:*",
        "dataSources:list",
        "dataSources.rolesResourcesScopes:*",
        "roles.dataSourcesCollections:*",
        "roles.dataSourceResources:*",
        "dataSourcesRolesResourcesScopes:*",
        "rolesResourcesScopes:*"
      ]
    });
    this.app.acl.beforeGrantAction((ctx) => {
      const actionName = this.app.acl.resolveActionAlias(ctx.actionName);
      const collection = this.app.db.getCollection(ctx.resourceName);
      if (!collection) {
        return;
      }
      const fieldsParams = ctx.params.fields;
      if (!fieldsParams) {
        return;
      }
      if (actionName == "view" || actionName == "export") {
        const associationsFields = fieldsParams.filter((fieldName) => {
          const field = collection.getField(fieldName);
          return field instanceof import_database.RelationField;
        });
        ctx.params = {
          ...ctx.params,
          fields: import_lodash.default.difference(fieldsParams, associationsFields),
          appends: associationsFields
        };
      }
    });
    this.app.resourcer.define(import_available_actions.availableActionResource);
    this.app.resourcer.define(import_role_collections.roleCollectionsResource);
    this.app.resourcer.registerActionHandler("roles:check", import_role_check.checkAction);
    this.app.resourcer.registerActionHandler(`users:setDefaultRole`, import_user_setDefaultRole.setDefaultRole);
    this.db.on("users.afterCreateWithAssociations", async (model, options) => {
      const { transaction } = options;
      const repository = this.app.db.getRepository("roles");
      const defaultRole = await repository.findOne({
        filter: {
          default: true
        },
        transaction
      });
      if (defaultRole && await model.countRoles({ transaction }) == 0) {
        await model.addRoles(defaultRole, { transaction });
      }
    });
    this.app.on("acl:writeRoleToACL", async (roleModel) => {
      await this.writeRoleToACL(roleModel, {
        withOutResources: true
      });
      await this.app.db.getRepository("dataSourcesRoles").updateOrCreate({
        values: {
          roleName: roleModel.get("name"),
          dataSourceKey: "main",
          strategy: roleModel.get("strategy")
        },
        filterKeys: ["roleName", "dataSourceKey"]
      });
    });
    this.app.db.on("roles.afterSaveWithAssociations", async (model, options) => {
      const { transaction } = options;
      await this.writeRoleToACL(model, {
        withOutResources: true
      });
      await this.app.db.getRepository("dataSourcesRoles").updateOrCreate({
        values: {
          roleName: model.get("name"),
          dataSourceKey: "main",
          strategy: model.get("strategy")
        },
        filterKeys: ["roleName", "dataSourceKey"],
        transaction
      });
      await this.app.emitAsync("acl:writeResources", {
        roleName: model.get("name"),
        transaction
      });
      if (model.get("default")) {
        await this.app.db.getRepository("roles").update({
          values: {
            default: false
          },
          filter: {
            "name.$ne": model.get("name")
          },
          hooks: false,
          transaction
        });
      }
      this.sendSyncMessage(
        {
          type: "syncRole",
          roleName: model.get("name")
        },
        {
          transaction: options.transaction
        }
      );
    });
    this.app.db.on("roles.afterDestroy", (model) => {
      const roleName = model.get("name");
      this.acl.removeRole(roleName);
    });
    this.app.db.on("rolesResources.afterSaveWithAssociations", async (model, options) => {
      await this.writeResourceToACL(model, options.transaction);
    });
    this.app.db.on("rolesResourcesActions.afterUpdateWithAssociations", async (model, options) => {
      const { transaction } = options;
      const resource = await model.getResource({
        transaction
      });
      await this.writeResourceToACL(resource, transaction);
    });
    this.app.db.on("collections.afterDestroy", async (model, options) => {
      const { transaction } = options;
      await this.app.db.getRepository("dataSourcesRolesResources").destroy({
        filter: {
          name: model.get("name"),
          dataSourceKey: "main"
        },
        transaction
      });
    });
    this.app.db.on("fields.afterCreate", async (model, options) => {
      const { transaction } = options;
      const collectionName = model.get("collectionName");
      const fieldName = model.get("name");
      const resourceActions = await this.app.db.getRepository("dataSourcesRolesResourcesActions").find({
        filter: {
          "resource.name": collectionName,
          "resource.dataSourceKey": "main"
        },
        transaction,
        appends: ["resource"]
      });
      for (const resourceAction of resourceActions) {
        const fields = resourceAction.get("fields");
        const newFields = [...fields, fieldName];
        await this.app.db.getRepository("dataSourcesRolesResourcesActions").update({
          filterByTk: resourceAction.get("id"),
          values: {
            fields: newFields
          },
          transaction
        });
      }
    });
    this.app.db.on("fields.afterDestroy", async (model, options) => {
      const lockKey = `${this.name}:fields.afterDestroy:${model.get("collectionName")}:${model.get("name")}`;
      await this.app.lockManager.runExclusive(lockKey, async () => {
        const collectionName = model.get("collectionName");
        const fieldName = model.get("name");
        const resourceActions = await this.app.db.getRepository("dataSourcesRolesResourcesActions").find({
          filter: {
            "resource.name": collectionName,
            "fields.$anyOf": [fieldName],
            "resource.dataSourceKey": "main"
          },
          transaction: options.transaction
        });
        for (const resourceAction of resourceActions) {
          const fields = resourceAction.get("fields");
          const newFields = fields.filter((field) => field != fieldName);
          await this.app.db.getRepository("dataSourcesRolesResourcesActions").update({
            filterByTk: resourceAction.get("id"),
            values: {
              fields: newFields
            },
            transaction: options.transaction
          });
        }
      });
    });
    this.app.db.on("rolesUsers.afterSave", async (model) => {
      const cache = this.app.cache;
      await cache.del(`roles:${model.get("userId")}`);
    });
    this.app.db.on("rolesUsers.afterDestroy", async (model) => {
      const cache = this.app.cache;
      await cache.del(`roles:${model.get("userId")}`);
    });
    const writeRolesToACL = async (app, options) => {
      const exists = await this.app.db.collectionExistsInDb("roles");
      if (exists) {
        this.log.info("write roles to ACL", { method: "writeRolesToACL" });
        await this.writeRolesToACL(options);
      }
    };
    this.app.on("afterStart", async () => {
      await writeRolesToACL(this.app, {
        withOutResources: true
      });
    });
    this.app.on("afterInstallPlugin", async (plugin) => {
      if (plugin.getName() !== "users") {
        return;
      }
      const User = this.db.getCollection("users");
      await User.repository.update({
        values: {
          roles: ["root", "admin", "member"]
        },
        forceUpdate: true
      });
      const RolesUsers = this.db.getCollection("rolesUsers");
      await RolesUsers.repository.update({
        filter: {
          userId: 1,
          roleName: "root"
        },
        values: {
          default: true
        }
      });
    });
    this.app.on("beforeInstallPlugin", async (plugin) => {
      if (plugin.getName() !== "users") {
        return;
      }
      const roles = this.app.db.getRepository("roles");
      await roles.createMany({
        records: [
          {
            name: "root",
            title: '{{t("Root")}}',
            hidden: true,
            snippets: ["ui.*", "pm", "pm.*"]
          },
          {
            name: "admin",
            title: '{{t("Admin")}}',
            allowConfigure: true,
            allowNewMenu: true,
            strategy: { actions: ["create", "view", "update", "destroy"] },
            snippets: ["ui.*", "pm", "pm.*"]
          },
          {
            name: "member",
            title: '{{t("Member")}}',
            allowNewMenu: true,
            strategy: { actions: ["view", "update:own", "destroy:own", "create"] },
            default: true,
            snippets: ["!ui.*", "!pm", "!pm.*"]
          }
        ]
      });
      const rolesResourcesScopes = this.app.db.getRepository("dataSourcesRolesResourcesScopes");
      await rolesResourcesScopes.createMany({
        records: [
          {
            key: "all",
            name: '{{t("All records")}}',
            scope: {}
          },
          {
            key: "own",
            name: '{{t("Own records")}}',
            scope: {
              createdById: "{{ ctx.state.currentUser.id }}"
            }
          }
        ]
      });
    });
    this.app.on("cache:del:roles", ({ userId }) => {
      this.app.cache.del(`roles:${userId}`);
    });
    this.app.resourcer.use(import_setCurrentRole.setCurrentRole, { tag: "setCurrentRole", before: "acl", after: "auth" });
    this.app.acl.allow("users", "setDefaultRole", "loggedIn");
    this.app.acl.allow("roles", "check", "loggedIn");
    this.app.acl.allow("*", "*", (ctx) => {
      return ctx.state.currentRole === "root";
    });
    this.app.acl.addFixedParams("collections", "destroy", () => {
      return {
        filter: {
          $and: [{ "name.$ne": "roles" }, { "name.$ne": "rolesUsers" }]
        }
      };
    });
    this.app.acl.addFixedParams("rolesResourcesScopes", "destroy", () => {
      return {
        filter: {
          $and: [{ "key.$ne": "all" }, { "key.$ne": "own" }]
        }
      };
    });
    this.app.acl.addFixedParams("rolesResourcesScopes", "update", () => {
      return {
        filter: {
          $and: [{ "key.$ne": "all" }, { "key.$ne": "own" }]
        }
      };
    });
    this.app.acl.addFixedParams("roles", "destroy", () => {
      return {
        filter: {
          $and: [{ "name.$ne": "root" }, { "name.$ne": "admin" }, { "name.$ne": "member" }]
        }
      };
    });
    this.app.resourceManager.use(async function showAnonymous(ctx, next) {
      const { actionName, resourceName, params } = ctx.action;
      const { showAnonymous: showAnonymous2 } = params || {};
      if (actionName === "list" && resourceName === "roles") {
        if (!showAnonymous2) {
          ctx.action.mergeParams({
            filter: {
              "name.$ne": "anonymous"
            }
          });
        }
      }
      if (actionName === "update" && resourceName === "roles.resources") {
        ctx.action.mergeParams({
          updateAssociationValues: ["actions"]
        });
      }
      await next();
    });
    this.app.acl.use(async (ctx, next) => {
      var _a, _b, _c, _d, _e;
      const { actionName, resourceName } = ctx.action;
      if (actionName === "get" || actionName === "list") {
        if (!Array.isArray((_c = (_b = (_a = ctx == null ? void 0 : ctx.permission) == null ? void 0 : _a.can) == null ? void 0 : _b.params) == null ? void 0 : _c.fields)) {
          return next();
        }
        let collection;
        if (resourceName.includes(".")) {
          const [collectionName, associationName] = resourceName.split(".");
          const field = (_e = (_d = ctx.db.getCollection(collectionName)) == null ? void 0 : _d.getField) == null ? void 0 : _e.call(_d, associationName);
          if (field.target) {
            collection = ctx.db.getCollection(field.target);
          }
        } else {
          collection = ctx.db.getCollection(resourceName);
        }
        if (collection && collection.hasField("createdById")) {
          ctx.permission.can.params.fields.push("createdById");
        }
      }
      return next();
    });
    const parseJsonTemplate = this.app.acl.parseJsonTemplate;
    this.app.acl.beforeGrantAction(async (ctx) => {
      const actionName = this.app.acl.resolveActionAlias(ctx.actionName);
      if (import_lodash.default.isPlainObject(ctx.params)) {
        if (actionName === "view" && ctx.params.fields) {
          const appendFields = [];
          const collection = this.app.db.getCollection(ctx.resourceName);
          if (!collection) {
            return;
          }
          if (collection.model.primaryKeyAttribute) {
            appendFields.push(collection.model.primaryKeyAttribute);
          }
          if (collection.model.rawAttributes["createdAt"]) {
            appendFields.push("createdAt");
          }
          if (collection.model.rawAttributes["updatedAt"]) {
            appendFields.push("updatedAt");
          }
          ctx.params = {
            ...import_lodash.default.omit(ctx.params, "fields"),
            fields: [...ctx.params.fields, ...appendFields]
          };
        }
      }
    });
    this.app.acl.use(
      async (ctx, next) => {
        var _a, _b;
        const action = (_b = (_a = ctx.permission) == null ? void 0 : _a.can) == null ? void 0 : _b.action;
        if (action == "destroy" && !ctx.action.resourceName.includes(".")) {
          const repository = import_actions.utils.getRepositoryFromParams(ctx);
          if (!repository) {
            await next();
            return;
          }
          const hasFilterByTk = (params) => {
            return JSON.stringify(params).includes("filterByTk");
          };
          if (!hasFilterByTk(ctx.permission.mergedParams) || !hasFilterByTk(ctx.permission.rawParams)) {
            await next();
            return;
          }
          const filteredCount = await repository.count(ctx.permission.mergedParams);
          const queryCount = await repository.count(ctx.permission.rawParams);
          if (queryCount > filteredCount) {
            ctx.throw(403, "No permissions");
            return;
          }
        }
        await next();
      },
      {
        after: "core",
        group: "after"
      }
    );
    const withACLMeta = (0, import_with_acl_meta.createWithACLMetaMiddleware)();
    this.app.use(
      async function withACLMetaMiddleware(ctx, next) {
        try {
          await withACLMeta(ctx, next);
        } catch (error) {
          ctx.logger.error(error);
        }
      },
      { after: "dataSource", group: "with-acl-meta" }
    );
    this.db.on("afterUpdateCollection", async (collection) => {
      if (collection.options.loadedFromCollectionManager || collection.options.asStrategyResource) {
        this.app.acl.appendStrategyResource(collection.name);
      }
    });
    this.db.on("afterDefineCollection", async (collection) => {
      if (collection.options.loadedFromCollectionManager || collection.options.asStrategyResource) {
        this.app.acl.appendStrategyResource(collection.name);
      }
    });
    this.db.on("afterRemoveCollection", (collection) => {
      this.app.acl.removeStrategyResource(collection.name);
    });
  }
  async install() {
    const repo = this.db.getRepository("collections");
    if (repo) {
      await repo.db2cm("roles");
    }
  }
  async load() {
    await this.importCollections((0, import_path.resolve)(__dirname, "collections"));
    this.db.extendCollection({
      name: "rolesUischemas",
      dumpRules: "required",
      origin: this.options.packageName
    });
  }
}
var server_default = PluginACLServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginACLServer
});
