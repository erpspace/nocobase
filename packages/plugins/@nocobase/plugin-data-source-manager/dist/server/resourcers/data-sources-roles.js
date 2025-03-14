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
var data_sources_roles_exports = {};
__export(data_sources_roles_exports, {
  default: () => data_sources_roles_default
});
module.exports = __toCommonJS(data_sources_roles_exports);
var data_sources_roles_default = {
  name: "dataSources.roles",
  actions: {
    async update(ctx, next) {
      const params = ctx.action.params;
      const { filterByTk: name, associatedIndex: dataSourceKey } = params;
      let connectionRoleRecord = await ctx.db.getRepository("dataSourcesRoles").findOne({
        filter: {
          roleName: name,
          dataSourceKey
        }
      });
      if (!connectionRoleRecord) {
        connectionRoleRecord = await ctx.db.getRepository("dataSourcesRoles").create({
          values: {
            ...params.values,
            roleName: name,
            dataSourceKey
          }
        });
      } else {
        await connectionRoleRecord.update({
          ...params.values
        });
      }
      if (params.values.resources) {
        await ctx.db.getRepository("dataSourcesRolesResources").destroy({
          filter: {
            roleName: name,
            dataSourceKey
          }
        });
        for (const resource of params.values.resources) {
          await ctx.db.getRepository("dataSourcesRolesResources").create({
            values: {
              ...resource,
              roleName: name,
              dataSourceKey
            }
          });
        }
      }
      ctx.body = connectionRoleRecord.toJSON();
      await next();
    },
    async get(ctx, next) {
      const params = ctx.action.params;
      const { filterByTk: name, associatedIndex: dataSourceKey } = params;
      let connectionRoleRecord = await ctx.db.getRepository("dataSourcesRoles").findOne({
        filter: {
          roleName: name,
          dataSourceKey
        }
      });
      if (!connectionRoleRecord) {
        connectionRoleRecord = await ctx.db.getRepository("dataSourcesRoles").create({
          values: {
            roleName: name,
            dataSourceKey
          }
        });
      }
      ctx.body = connectionRoleRecord.toJSON();
      await next();
    }
  }
};
