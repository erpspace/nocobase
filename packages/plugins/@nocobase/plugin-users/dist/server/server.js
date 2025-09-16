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
  default: () => PluginUsersServer
});
module.exports = __toCommonJS(server_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var actions = __toESM(require("./actions/users"));
var import_UserModel = require("./models/UserModel");
var import_user_data_sync_resource = require("./user-data-sync-resource");
var import_edit_form_schema = require("./profile/edit-form-schema");
class PluginUsersServer extends import_server.Plugin {
  async beforeLoad() {
    this.db.registerModels({
      UserModel: import_UserModel.UserModel
    });
    this.db.registerOperators({
      $isCurrentUser(_, ctx) {
        var _a, _b, _c, _d;
        return {
          [import_database.Op.eq]: ((_d = (_c = (_b = (_a = ctx == null ? void 0 : ctx.app) == null ? void 0 : _a.ctx) == null ? void 0 : _b.state) == null ? void 0 : _c.currentUser) == null ? void 0 : _d.id) || -1
        };
      },
      $isNotCurrentUser(_, ctx) {
        var _a, _b, _c, _d;
        return {
          [import_database.Op.ne]: ((_d = (_c = (_b = (_a = ctx == null ? void 0 : ctx.app) == null ? void 0 : _a.ctx) == null ? void 0 : _b.state) == null ? void 0 : _c.currentUser) == null ? void 0 : _d.id) || -1
        };
      },
      $isVar(val, ctx) {
        var _a, _b;
        const obj = (0, import_utils.parse)({ val: `{{${val}}}` })(JSON.parse(JSON.stringify((_b = (_a = ctx == null ? void 0 : ctx.app) == null ? void 0 : _a.ctx) == null ? void 0 : _b.state)));
        return {
          [import_database.Op.eq]: obj.val
        };
      }
    });
    this.db.on("field.afterAdd", ({ collection, field }) => {
      if (field.options.interface === "createdBy") {
        collection.setField("createdById", {
          type: "context",
          dataType: "bigInt",
          dataIndex: "state.currentUser.id",
          createOnly: true,
          visible: true,
          index: true
        });
      }
      if (field.options.interface === "updatedBy") {
        collection.setField("updatedById", {
          type: "context",
          dataType: "bigInt",
          dataIndex: "state.currentUser.id",
          visible: true,
          index: true
        });
      }
    });
    this.db.on("afterDefineCollection", (collection) => {
      const { createdBy, updatedBy } = collection.options;
      if (createdBy === true) {
        collection.setField("createdById", {
          type: "context",
          dataType: "bigInt",
          dataIndex: "state.currentUser.id",
          createOnly: true,
          visible: true,
          index: true
        });
        collection.setField("createdBy", {
          type: "belongsTo",
          target: "users",
          foreignKey: "createdById",
          targetKey: "id",
          uiSchema: {
            type: "object",
            title: '{{t("Created by")}}',
            "x-component": "AssociationField",
            "x-component-props": {
              fieldNames: {
                value: "id",
                label: "nickname"
              }
            },
            "x-read-pretty": true
          },
          interface: "createdBy"
        });
      }
      if (updatedBy === true) {
        collection.setField("updatedById", {
          type: "context",
          dataType: "bigInt",
          dataIndex: "state.currentUser.id",
          visible: true,
          index: true
        });
        collection.setField("updatedBy", {
          type: "belongsTo",
          target: "users",
          foreignKey: "updatedById",
          targetKey: "id",
          uiSchema: {
            type: "object",
            title: '{{t("Last updated by")}}',
            "x-component": "AssociationField",
            "x-component-props": {
              fieldNames: {
                value: "id",
                label: "nickname"
              }
            },
            "x-read-pretty": true
          },
          interface: "updatedBy"
        });
      }
    });
    for (const [key, action] of Object.entries(actions)) {
      this.app.resourcer.registerActionHandler(`users:${key}`, action);
    }
    this.app.acl.addFixedParams("users", "destroy", () => {
      return {
        filter: {
          "id.$ne": 1
        }
      };
    });
    this.app.acl.addFixedParams("collections", "destroy", () => {
      return {
        filter: {
          "name.$ne": "users"
        }
      };
    });
    const loggedInActions = ["updateProfile", "updateLang"];
    loggedInActions.forEach((action) => this.app.acl.allow("users", action, "loggedIn"));
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ["users:*"]
    });
    const getMetaDataForUpdateProfileAction = async (ctx) => {
      return {
        request: {
          body: {
            ...ctx.request.body,
            password: "******"
          }
        }
      };
    };
    const getSourceAndTargetForUpdateProfileAction = async (ctx) => {
      const { id } = ctx.state.currentUser;
      let idStr = "";
      if (typeof id === "number") {
        idStr = id.toString();
      } else if (typeof id === "string") {
        idStr = id;
      }
      return {
        targetCollection: "users",
        targetRecordUK: idStr
      };
    };
    this.app.auditManager.registerActions([
      {
        name: "users:updateProfile",
        getMetaData: getMetaDataForUpdateProfileAction,
        getSourceAndTarget: getSourceAndTargetForUpdateProfileAction
      }
    ]);
  }
  async load() {
    this.app.resourceManager.use(async function deleteRolesCache(ctx, next) {
      await next();
      const { associatedName, resourceName, actionName, values } = ctx.action.params;
      if (associatedName === "roles" && resourceName === "users" && ["add", "remove", "set"].includes(actionName) && (values == null ? void 0 : values.length)) {
        await Promise.all(values.map((userId) => ctx.app.emitAsync("cache:del:roles", { userId })));
      }
    });
    this.app.resourceManager.use(async (ctx, next) => {
      const { resourceName, actionName } = ctx.action;
      if (resourceName === "users" && actionName === "updateProfile") {
        ctx.action.actionName = "update";
      }
      await next();
    });
    const userDataSyncPlugin = this.app.pm.get("user-data-sync");
    if (userDataSyncPlugin && userDataSyncPlugin.enabled) {
      userDataSyncPlugin.resourceManager.registerResource(new import_user_data_sync_resource.UserDataSyncResource(this.db, this.app.logger));
    }
    this.app.db.on("users.beforeUpdate", async (model) => {
      if (!model._changed.has("password")) {
        return;
      }
      model.set("passwordChangeTz", Date.now());
      await this.app.emitAsync("cache:del:roles", { userId: model.get("id") });
      await this.app.emitAsync("cache:del:auth", { userId: model.get("id") });
    });
  }
  getInstallingData(options = {}) {
    var _a;
    const { INIT_ROOT_NICKNAME, INIT_ROOT_PASSWORD, INIT_ROOT_EMAIL, INIT_ROOT_USERNAME } = process.env;
    const {
      rootEmail = INIT_ROOT_EMAIL || "admin@nocobase.com",
      rootPassword = INIT_ROOT_PASSWORD || "admin123",
      rootNickname = INIT_ROOT_NICKNAME || "Super Admin",
      rootUsername = INIT_ROOT_USERNAME || "nocobase"
    } = options.users || ((_a = options == null ? void 0 : options.cliArgs) == null ? void 0 : _a[0]) || {};
    return {
      rootEmail,
      rootPassword,
      rootNickname,
      rootUsername
    };
  }
  async initUserCollection(options) {
    const { rootNickname, rootPassword, rootEmail, rootUsername } = this.getInstallingData(options);
    const User = this.db.getCollection("users");
    if (await User.repository.findOne({ filter: { email: rootEmail } })) {
      return;
    }
    await User.repository.create({
      values: {
        email: rootEmail,
        password: rootPassword,
        nickname: rootNickname,
        username: rootUsername
      }
    });
    const repo = this.db.getRepository("collections");
    if (repo) {
      await repo.db2cm("users");
    }
  }
  async initProfileSchema() {
    const uiSchemas = this.db.getRepository("uiSchemas");
    if (!uiSchemas) {
      return;
    }
    await uiSchemas.insert(import_edit_form_schema.adminProfileCreateFormSchema);
    await uiSchemas.insert(import_edit_form_schema.adminProfileEditFormSchema);
    await uiSchemas.insert(import_edit_form_schema.userProfileEditFormSchema);
  }
  async install(options) {
    await this.initUserCollection(options);
    await this.initProfileSchema();
  }
}
