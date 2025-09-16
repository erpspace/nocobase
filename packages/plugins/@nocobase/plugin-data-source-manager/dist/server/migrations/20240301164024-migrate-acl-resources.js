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
var migrate_acl_resources_exports = {};
__export(migrate_acl_resources_exports, {
  default: () => migrate_acl_resources_default
});
module.exports = __toCommonJS(migrate_acl_resources_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
/* istanbul ignore file -- @preserve */
class migrate_acl_resources_default extends import_server.Migration {
  on = "afterSync";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<0.19.0-alpha.10";
  async up() {
    const transaction = await this.db.sequelize.transaction();
    try {
      await this.doUp(transaction);
      await transaction.commit();
    } catch (e) {
      throw e;
    }
  }
  async doUp(transaction) {
    const scopeMap = {};
    const oldScopes = await this.db.getRepository("rolesResourcesScopes").find({
      transaction
    });
    for (const oldScope of oldScopes) {
      const key = oldScope.key;
      const newScope = await this.db.getRepository("dataSourcesRolesResourcesScopes").firstOrCreate({
        values: {
          key,
          name: oldScope.name,
          resourceName: oldScope.resourceName,
          scope: oldScope.scope,
          dataSourceKey: "main"
        },
        filterKeys: ["key", "dataSourceKey"],
        hooks: false,
        transaction
      });
      scopeMap[key] = newScope.id;
    }
    const roles = await this.db.getRepository("roles").find({
      transaction
    });
    for (const role of roles) {
      await this.app.db.getRepository("dataSourcesRoles").updateOrCreate({
        values: {
          roleName: role.get("name"),
          dataSourceKey: "main",
          strategy: role.get("strategy"),
          id: (0, import_utils.uid)()
        },
        filterKeys: ["roleName", "dataSourceKey"],
        hooks: false,
        transaction
      });
    }
    const oldResources = await this.db.getRepository("rolesResources").find({
      appends: ["actions"],
      transaction
    });
    for (const oldResource of oldResources) {
      const role = await this.db.getRepository("roles").findOne({
        filter: {
          name: oldResource.roleName
        },
        transaction
      });
      if (!role) {
        continue;
      }
      const newResource = await this.db.getRepository("dataSourcesRolesResources").firstOrCreate({
        values: {
          name: oldResource.name,
          roleName: oldResource.roleName,
          usingActionsConfig: oldResource.usingActionsConfig,
          dataSourceKey: "main"
        },
        transaction,
        filterKeys: ["name"],
        hooks: false
      });
      for (const oldAction of oldResource.actions) {
        const newActionValues = {
          resource: newResource.id,
          name: oldAction.name,
          fields: oldAction.fields
        };
        if (oldAction.scope) {
          newActionValues.scope = scopeMap[oldAction.scope];
        }
        await this.db.getRepository("dataSourcesRolesResourcesActions").create({
          values: newActionValues,
          hooks: false,
          transaction
        });
      }
    }
  }
}
