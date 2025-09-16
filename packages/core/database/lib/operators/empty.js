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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var empty_exports = {};
__export(empty_exports, {
  default: () => empty_default
});
module.exports = __toCommonJS(empty_exports);
var import_sequelize = require("sequelize");
var import_fields = require("../fields");
var import_array = __toESM(require("./array"));
var import_lodash = __toESM(require("lodash"));
const findFilterFieldType = /* @__PURE__ */ __name((ctx) => {
  const db = ctx.db;
  const path = ctx.path.split(".");
  path.pop();
  const fieldName = path.pop();
  let model = ctx.model;
  const associationPath = path;
  for (const association of associationPath) {
    if (import_lodash.default.isFinite((0, import_lodash.parseInt)(association)) || association.startsWith("$")) {
      continue;
    }
    const modelAssociation = model.associations[association];
    if (!modelAssociation) {
      break;
    }
    model = modelAssociation.target;
  }
  const collection = db.modelCollection.get(model);
  return collection.getField(fieldName);
}, "findFilterFieldType");
var empty_default = {
  $empty(_, ctx) {
    const field = findFilterFieldType(ctx);
    if (field instanceof import_fields.StringField) {
      return {
        [import_sequelize.Op.or]: {
          [import_sequelize.Op.is]: null,
          [import_sequelize.Op.eq]: ""
        }
      };
    }
    if (field instanceof import_fields.ArrayField) {
      return import_array.default.$arrayEmpty(_, ctx);
    }
    return {
      [import_sequelize.Op.is]: null
    };
  },
  $notEmpty(_, ctx) {
    const field = findFilterFieldType(ctx);
    if (field instanceof import_fields.StringField) {
      return {
        [import_sequelize.Op.and]: {
          [import_sequelize.Op.not]: null,
          [import_sequelize.Op.ne]: ""
        }
      };
    }
    if (field instanceof import_fields.ArrayField) {
      return import_array.default.$arrayNotEmpty(_, ctx);
    }
    return {
      [import_sequelize.Op.not]: null
    };
  }
};
