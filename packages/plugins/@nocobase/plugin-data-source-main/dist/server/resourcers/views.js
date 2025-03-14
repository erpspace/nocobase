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
var views_exports = {};
__export(views_exports, {
  default: () => views_default
});
module.exports = __toCommonJS(views_exports);
var import_database = require("@nocobase/database");
var views_default = {
  name: "dbViews",
  actions: {
    async get(ctx, next) {
      const { filterByTk, schema } = ctx.action.params;
      const db = ctx.app.db;
      const fields = [];
      const unsupportedFields = [];
      const inferFields = await import_database.ViewFieldInference.inferFields({
        db,
        viewName: filterByTk,
        viewSchema: schema
      });
      for (const [_name, field] of Object.entries(inferFields)) {
        if (!field.type) {
          unsupportedFields.push(field);
        } else {
          fields.push(field);
        }
      }
      ctx.body = {
        fields,
        unsupportedFields,
        sources: [
          ...new Set(
            Object.values(fields).map((field) => field.source).filter(Boolean).map((source) => source.split(".")[0])
          )
        ]
      };
      await next();
    },
    list: async function(ctx, next) {
      const db = ctx.app.db;
      const dbViews = await db.queryInterface.listViews();
      const viewCollections = Array.from(db.collections.values()).filter((collection) => collection.isView());
      ctx.body = dbViews.map((dbView) => {
        return {
          ...dbView
        };
      }).filter((dbView) => {
        return !viewCollections.find((collection) => {
          const viewName = dbView.name;
          const schema = dbView.schema;
          const collectionViewName = collection.options.viewName || collection.options.name;
          return collectionViewName === viewName && collection.options.schema === schema;
        });
      });
      await next();
    },
    async query(ctx, next) {
      const { filterByTk, fieldTypes, schema = "public", page = 1, pageSize = 10 } = ctx.action.params;
      const offset = (page - 1) * pageSize;
      const limit = 1 * pageSize;
      const sql = `SELECT *
                   FROM ${ctx.app.db.utils.quoteTable(ctx.app.db.utils.addSchema(filterByTk, schema))} LIMIT ${limit}
                   OFFSET ${offset}`;
      const rawValues = await ctx.app.db.sequelize.query(sql, { type: "SELECT" });
      if (fieldTypes) {
        for (const raw of rawValues) {
          const fakeInstance = {
            dataValues: raw,
            getDataValue: (key) => raw[key]
          };
          for (const fieldName of Object.keys(fieldTypes)) {
            const fieldType = fieldTypes[fieldName];
            const FieldClass = ctx.app.db.fieldTypes.get(fieldType);
            const fieldOptions = new FieldClass(
              { name: fieldName },
              {
                db: ctx.app.db
              }
            ).options;
            if (fieldOptions.get) {
              const newValue = fieldOptions.get.apply(fakeInstance);
              raw[fieldName] = newValue;
            }
          }
        }
      }
      ctx.body = rawValues;
      await next();
    }
  }
};
