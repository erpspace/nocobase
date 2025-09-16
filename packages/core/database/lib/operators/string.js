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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var string_exports = {};
__export(string_exports, {
  default: () => string_default
});
module.exports = __toCommonJS(string_exports);
var import_sequelize = require("sequelize");
var import_utils = require("./utils");
function escapeLike(value) {
  return value.replace(/[_%]/g, "\\$&");
}
__name(escapeLike, "escapeLike");
const getFieldName = /* @__PURE__ */ __name((ctx) => {
  const fullNameSplit = ctx.fullName.split(".");
  const fieldName = ctx.fieldName;
  let columnName = fieldName;
  const associationPath = [];
  if (fullNameSplit.length > 1) {
    for (let i = 0; i < fullNameSplit.length - 1; i++) {
      associationPath.push(fullNameSplit[i]);
    }
  }
  const getModelFromAssociationPath = /* @__PURE__ */ __name(() => {
    let model2 = ctx.model;
    for (const association of associationPath) {
      model2 = model2.associations[association].target;
    }
    return model2;
  }, "getModelFromAssociationPath");
  const model = getModelFromAssociationPath();
  let columnPrefix = model.name;
  if (model.rawAttributes[fieldName]) {
    columnName = model.rawAttributes[fieldName].field || fieldName;
  }
  if (associationPath.length > 0) {
    const association = associationPath.join("->");
    columnPrefix = association;
  }
  columnName = `${columnPrefix}.${columnName}`;
  return columnName;
}, "getFieldName");
function getFieldExpression(value, ctx, operator) {
  if ((0, import_utils.isPg)(ctx)) {
    const fieldName = getFieldName(ctx);
    const queryInterface = ctx.db.sequelize.getQueryInterface();
    const quotedField = queryInterface.quoteIdentifiers(fieldName);
    return import_sequelize.Sequelize.literal(`CAST(${quotedField} AS TEXT) ${operator} ${ctx.db.sequelize.escape(value)}`);
  }
  const op = operator === "LIKE" ? import_sequelize.Op.like : operator === "NOT LIKE" ? import_sequelize.Op.notLike : operator === "ILIKE" ? import_sequelize.Op.like : operator === "NOT ILIKE" ? import_sequelize.Op.notLike : import_sequelize.Op.like;
  return { [op]: value };
}
__name(getFieldExpression, "getFieldExpression");
var string_default = {
  $includes(value, ctx) {
    if (value === null) {
      return {
        [import_sequelize.Op.is]: null
      };
    }
    if (Array.isArray(value)) {
      const conditions = value.map(
        (item) => getFieldExpression(`%${escapeLike(item)}%`, ctx, (0, import_utils.isPg)(ctx) ? "ILIKE" : "LIKE")
      );
      return {
        [import_sequelize.Op.or]: conditions
      };
    }
    return getFieldExpression(`%${escapeLike(value)}%`, ctx, (0, import_utils.isPg)(ctx) ? "ILIKE" : "LIKE");
  },
  $notIncludes(value, ctx) {
    if (value === null) {
      return {
        [import_sequelize.Op.not]: null
      };
    }
    if (Array.isArray(value)) {
      const conditions = value.map(
        (item) => getFieldExpression(`%${escapeLike(item)}%`, ctx, (0, import_utils.isPg)(ctx) ? "NOT ILIKE" : "NOT LIKE")
      );
      return {
        [import_sequelize.Op.and]: conditions
      };
    }
    return getFieldExpression(`%${escapeLike(value)}%`, ctx, (0, import_utils.isPg)(ctx) ? "NOT ILIKE" : "NOT LIKE");
  },
  $startsWith(value, ctx) {
    if (Array.isArray(value)) {
      const conditions = value.map(
        (item) => getFieldExpression(`${escapeLike(item)}%`, ctx, (0, import_utils.isPg)(ctx) ? "ILIKE" : "LIKE")
      );
      return {
        [import_sequelize.Op.or]: conditions
      };
    }
    return getFieldExpression(`${escapeLike(value)}%`, ctx, (0, import_utils.isPg)(ctx) ? "ILIKE" : "LIKE");
  },
  $notStartsWith(value, ctx) {
    if (Array.isArray(value)) {
      const conditions = value.map(
        (item) => getFieldExpression(`${escapeLike(item)}%`, ctx, (0, import_utils.isPg)(ctx) ? "NOT ILIKE" : "NOT LIKE")
      );
      return {
        [import_sequelize.Op.and]: conditions
      };
    }
    return getFieldExpression(`${escapeLike(value)}%`, ctx, (0, import_utils.isPg)(ctx) ? "NOT ILIKE" : "NOT LIKE");
  },
  $endWith(value, ctx) {
    if (Array.isArray(value)) {
      const conditions = value.map(
        (item) => getFieldExpression(`%${escapeLike(item)}`, ctx, (0, import_utils.isPg)(ctx) ? "ILIKE" : "LIKE")
      );
      return {
        [import_sequelize.Op.or]: conditions
      };
    }
    return getFieldExpression(`%${escapeLike(value)}`, ctx, (0, import_utils.isPg)(ctx) ? "ILIKE" : "LIKE");
  },
  $notEndWith(value, ctx) {
    if (Array.isArray(value)) {
      const conditions = value.map(
        (item) => getFieldExpression(`%${escapeLike(item)}`, ctx, (0, import_utils.isPg)(ctx) ? "NOT ILIKE" : "NOT LIKE")
      );
      return {
        [import_sequelize.Op.and]: conditions
      };
    }
    return getFieldExpression(`%${escapeLike(value)}`, ctx, (0, import_utils.isPg)(ctx) ? "NOT ILIKE" : "NOT LIKE");
  }
};
