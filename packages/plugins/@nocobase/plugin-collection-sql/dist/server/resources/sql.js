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
var sql_exports = {};
__export(sql_exports, {
  default: () => sql_default
});
module.exports = __toCommonJS(sql_exports);
var import_sql_collection = require("../sql-collection");
var import_utils = require("../utils");
const updateCollection = async (ctx, transaction) => {
  var _a;
  const { filterByTk, values } = ctx.action.params;
  const repo = ctx.db.getRepository("collections");
  const collection = await repo.findOne({
    filter: {
      name: filterByTk
    },
    transaction
  });
  const existFields = await collection.getFields({ transaction });
  const deletedFields = existFields.filter((field) => {
    var _a2;
    return !((_a2 = values.fields) == null ? void 0 : _a2.find((f) => f.name === field.name));
  });
  for (const field of deletedFields) {
    await field.destroy({ transaction });
  }
  const upRes = await repo.update({
    filterByTk,
    values: {
      ...values,
      fields: (_a = values.fields) == null ? void 0 : _a.map((f) => {
        delete f.key;
        return f;
      })
    },
    updateAssociationValues: ["fields"],
    transaction
  });
  return { collection, upRes };
};
var sql_default = {
  name: "sqlCollection",
  actions: {
    execute: async (ctx, next) => {
      const { sql } = ctx.action.params.values || {};
      if (!sql) {
        ctx.throw(400, ctx.t("Please enter a SQL statement"));
      }
      try {
        (0, import_utils.checkSQL)(sql);
      } catch (e) {
        ctx.throw(400, ctx.t(e.message));
      }
      const tmpCollection = new import_sql_collection.SQLCollection({ name: "tmp", sql }, { database: ctx.db });
      const model = tmpCollection.model;
      const data = await model.findAll({ attributes: ["*"], limit: 5, raw: true });
      let fields = {};
      try {
        fields = model.inferFields();
      } catch (err) {
        ctx.logger.warn(`resource: sql-collection, action: execute, error: ${err}`);
        fields = {};
      }
      const sources = Array.from(
        new Set(
          Object.values(fields).map((field) => field.collection).filter((c) => c)
        )
      );
      ctx.body = { data, fields, sources };
      await next();
    },
    setFields: async (ctx, next) => {
      const transaction = await ctx.app.db.sequelize.transaction();
      try {
        const {
          upRes: [collection]
        } = await updateCollection(ctx, transaction);
        await collection.loadFields({
          transaction
        });
        await transaction.commit();
      } catch (e) {
        await transaction.rollback();
        throw e;
      }
      await next();
    },
    update: async (ctx, next) => {
      const transaction = await ctx.app.db.sequelize.transaction();
      try {
        const { upRes } = await updateCollection(ctx, transaction);
        const [collection] = upRes;
        await collection.load({ transaction, resetFields: true });
        await transaction.commit();
        ctx.body = upRes;
      } catch (e) {
        await transaction.rollback();
        throw e;
      }
      await next();
    }
  }
};
