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
var data_sources_resources_exports = {};
__export(data_sources_resources_exports, {
  default: () => data_sources_resources_default
});
module.exports = __toCommonJS(data_sources_resources_exports);
var data_sources_resources_default = {
  name: "roles.dataSourceResources",
  actions: {
    async create(ctx, next) {
      const { associatedIndex: roleName } = ctx.action.params;
      const db = ctx.db;
      const transaction = await db.sequelize.transaction();
      const dataSourceKey = ctx.action.params.values.dataSourceKey;
      if (!dataSourceKey) {
        throw new Error("dataSourceKey is required");
      }
      const connectionRole = await db.getRepository("dataSourcesRoles").findOne({
        filter: {
          roleName,
          dataSourceKey
        },
        transaction
      });
      if (!connectionRole) {
        await db.getRepository("dataSourcesRoles").create({
          values: {
            roleName,
            dataSourceKey
          },
          transaction
        });
      }
      const record = await db.getRepository("dataSourcesRolesResources").create({
        values: {
          roleName,
          ...ctx.action.params.values
        },
        transaction
      });
      await transaction.commit();
      ctx.body = record.toJSON();
      await next();
    },
    async update(ctx, next) {
      const { associatedIndex: roleName } = ctx.action.params;
      ctx.body = await ctx.db.getRepository("dataSourcesRolesResources").update({
        filter: {
          roleName,
          dataSourceKey: ctx.action.params.filter.dataSourceKey,
          name: ctx.action.params.filter.name
        },
        values: ctx.action.params.values,
        updateAssociationValues: ["actions"]
      });
      await next();
    },
    async get(ctx, next) {
      const { associatedIndex: roleName } = ctx.action.params;
      const record = await ctx.db.getRepository("dataSourcesRolesResources").findOne({
        filter: {
          roleName,
          dataSourceKey: ctx.action.params.filter.dataSourceKey,
          name: ctx.action.params.filter.name
        },
        appends: ctx.action.params.appends
      });
      ctx.body = record;
      await next();
    }
  }
};
