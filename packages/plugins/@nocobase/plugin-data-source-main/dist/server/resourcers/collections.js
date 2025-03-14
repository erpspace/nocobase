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
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default
});
module.exports = __toCommonJS(collections_exports);
var import_lodash = __toESM(require("lodash"));
var collections_default = {
  async ["collections:listMeta"](ctx, next) {
    const db = ctx.app.db;
    const results = [];
    db.collections.forEach((collection) => {
      if (!collection.options.loadedFromCollectionManager) {
        return;
      }
      const obj = {
        ...collection.options,
        filterTargetKey: collection.filterTargetKey
      };
      if (collection && collection.unavailableActions) {
        obj["unavailableActions"] = collection.unavailableActions();
      }
      obj.fields = import_lodash.default.sortBy(
        [...collection.fields.values()].map((field) => {
          return {
            ...field.options
          };
        }),
        "__sort"
      );
      results.push(obj);
    });
    ctx.body = import_lodash.default.sortBy(results, "sort");
    await next();
  },
  async ["collections:setFields"](ctx, next) {
    var _a;
    const { filterByTk, values } = ctx.action.params;
    const transaction = await ctx.app.db.sequelize.transaction();
    try {
      const fields = (_a = values.fields) == null ? void 0 : _a.map((f) => {
        delete f.key;
        return f;
      });
      const db = ctx.app.db;
      const collectionModel = await db.getRepository("collections").findOne({
        filter: {
          name: filterByTk
        },
        transaction
      });
      const existFields = await collectionModel.getFields({
        transaction
      });
      const needUpdateFields = fields.filter((f) => {
        return existFields.find((ef) => ef.name === f.name);
      }).map((f) => {
        return {
          ...f,
          key: existFields.find((ef) => ef.name === f.name).key
        };
      });
      const needDestroyFields = existFields.filter((ef) => {
        return !fields.find((f) => f.name === ef.name);
      });
      const needCreatedFields = fields.filter((f) => {
        return !existFields.find((ef) => ef.name === f.name);
      });
      if (needDestroyFields.length) {
        await db.getRepository("fields").destroy({
          filterByTk: needDestroyFields.map((f) => f.key),
          transaction
        });
      }
      if (needUpdateFields.length) {
        await db.getRepository("fields").updateMany({
          records: needUpdateFields,
          transaction
        });
      }
      if (needCreatedFields.length) {
        await db.getRepository("collections.fields", filterByTk).create({
          values: needCreatedFields,
          transaction
        });
      }
      await collectionModel.loadFields({
        transaction
      });
      const collection = db.getCollection(filterByTk);
      await collection.sync({
        force: false,
        alter: {
          drop: false
        },
        transaction
      });
      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
    await next();
  }
};
