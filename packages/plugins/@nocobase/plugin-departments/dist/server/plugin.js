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
  PluginDepartmentsServer: () => PluginDepartmentsServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_departments = require("./actions/departments");
var import_users = require("./actions/users");
var import_users2 = require("./collections/users");
var import_middlewares = require("./middlewares");
var import_set_departments_roles = require("./middlewares/set-departments-roles");
var import_department = require("./models/department");
var import_department_data_sync_resource = require("./department-data-sync-resource");
class PluginDepartmentsServer extends import_server.Plugin {
  afterAdd() {
  }
  beforeLoad() {
    this.app.db.registerModels({ DepartmentModel: import_department.DepartmentModel });
    this.app.acl.addFixedParams("collections", "destroy", () => {
      return {
        filter: {
          "name.$notIn": ["departments", "departmentsUsers", "departmentsRoles"]
        }
      };
    });
  }
  async load() {
    this.app.resourceManager.registerActionHandlers({
      "users:listExcludeDept": import_users.listExcludeDept,
      "users:setMainDepartment": import_users.setMainDepartment,
      "departments:aggregateSearch": import_departments.aggregateSearch,
      "departments:setOwner": import_departments.setOwner,
      "departments:removeOwner": import_departments.removeOwner
    });
    this.app.acl.allow("users", ["setMainDepartment", "listExcludeDept"], "loggedIn");
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: [
        "departments:*",
        "roles:list",
        "users:list",
        "users:listExcludeDept",
        "users:setMainDepartment",
        "users.departments:*",
        "roles.departments:*",
        "departments.members:*"
      ]
    });
    this.app.resourceManager.use(import_set_departments_roles.setDepartmentsInfo, {
      tag: "setDepartmentsInfo",
      before: "setCurrentRole",
      after: "auth"
    });
    this.app.dataSourceManager.afterAddDataSource((dataSource) => {
      dataSource.resourceManager.use(import_set_departments_roles.setDepartmentsInfo, {
        tag: "setDepartmentsInfo",
        before: "setCurrentRole",
        after: "auth"
      });
    });
    this.app.resourceManager.use(import_middlewares.setDepartmentOwners);
    this.app.resourceManager.use(import_middlewares.destroyDepartmentCheck);
    this.app.resourceManager.use(import_middlewares.updateDepartmentIsLeaf);
    this.app.resourceManager.use(import_middlewares.resetUserDepartmentsCache);
    this.app.resourceManager.use(import_middlewares.setMainDepartment);
    this.app.db.on("departmentsUsers.afterSave", async (model) => {
      const cache = this.app.cache;
      await cache.del(`departments:${model.get("userId")}`);
    });
    this.app.db.on("departmentsUsers.afterDestroy", async (model) => {
      const cache = this.app.cache;
      await cache.del(`departments:${model.get("userId")}`);
    });
    this.app.on("beforeSignOut", ({ userId }) => {
      this.app.cache.del(`departments:${userId}`);
    });
    const userDataSyncPlugin = this.app.pm.get("user-data-sync");
    if (userDataSyncPlugin && userDataSyncPlugin.enabled) {
      userDataSyncPlugin.resourceManager.registerResource(new import_department_data_sync_resource.DepartmentDataSyncResource(this.db, this.app.logger), {
        // write department records after writing user records
        after: "users"
      });
    }
  }
  async install(options) {
    const collectionRepo = this.db.getRepository("collections");
    if (collectionRepo) {
      await collectionRepo.db2cm("departments");
    }
    const fieldRepo = this.db.getRepository("fields");
    if (fieldRepo) {
      const isDepartmentsFieldExists = await fieldRepo.count({
        filter: {
          name: "departments",
          collectionName: "users"
        }
      });
      if (!isDepartmentsFieldExists) {
        await fieldRepo.create({
          values: import_users2.departmentsField
        });
      }
      const isMainDepartmentFieldExists = await fieldRepo.count({
        filter: {
          name: "mainDepartment",
          collectionName: "users"
        }
      });
      if (!isMainDepartmentFieldExists) {
        await fieldRepo.create({
          values: import_users2.mainDepartmentField
        });
      }
    }
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginDepartmentsServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginDepartmentsServer
});
