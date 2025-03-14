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
var chartsQueries_exports = {};
__export(chartsQueries_exports, {
  getData: () => getData,
  listMetadata: () => listMetadata,
  validate: () => validate
});
module.exports = __toCommonJS(chartsQueries_exports);
var import_json5 = __toESM(require("json5"));
var import_query = require("../query");
const getData = async (ctx, next) => {
  const { filterByTk } = ctx.action.params;
  const r = ctx.db.getRepository("chartsQueries");
  try {
    const instance = await r.findOne({ filterByTk });
    const result = await import_query.query[instance.type](instance.options, { db: ctx.db, skipError: true });
    if (typeof result === "string") {
      ctx.body = import_json5.default.parse(result);
    } else {
      ctx.body = result;
    }
  } catch (error) {
    ctx.body = [];
    ctx.logger.info("chartsQueries", error);
  }
  return next();
};
const validate = async (ctx, next) => {
  const { values } = ctx.action.params;
  ctx.body = {
    errorMessage: ""
  };
  try {
    await import_query.query.sql(values, { db: ctx.db, validateSQL: true });
  } catch (error) {
    ctx.body = {
      errorMessage: error.message
    };
  }
  return next();
};
const listMetadata = async (ctx, next) => {
  const r = ctx.db.getRepository("chartsQueries");
  const items = await r.find({ sort: "-id" });
  ctx.body = items.map((item) => {
    return {
      id: item.id,
      title: item.title,
      type: item.type,
      fields: item.fields
    };
  });
  return next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getData,
  listMetadata,
  validate
});
