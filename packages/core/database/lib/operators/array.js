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
var array_exports = {};
__export(array_exports, {
  default: () => array_default
});
module.exports = __toCommonJS(array_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_utils = require("./utils");
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
const escape = /* @__PURE__ */ __name((value, ctx) => {
  const sequelize = ctx.db.sequelize;
  return sequelize.escape(value);
}, "escape");
const getQueryInterface = /* @__PURE__ */ __name((ctx) => {
  const sequelize = ctx.db.sequelize;
  return sequelize.getQueryInterface();
}, "getQueryInterface");
const sqliteExistQuery = /* @__PURE__ */ __name((value, ctx) => {
  const fieldName = getFieldName(ctx);
  const queryInterface = getQueryInterface(ctx);
  const name = queryInterface.quoteIdentifiers(fieldName);
  const sqlArray = `(${value.map((v) => `'${v}'`).join(", ")})`;
  const subQuery = `exists (select * from json_each(${name}) where json_each.value in ${sqlArray})`;
  return subQuery;
}, "sqliteExistQuery");
const emptyQuery = /* @__PURE__ */ __name((ctx, operator) => {
  const fieldName = getFieldName(ctx);
  let funcName = "json_array_length";
  let ifNull = "IFNULL";
  if ((0, import_utils.isPg)(ctx)) {
    funcName = "jsonb_array_length";
    ifNull = "coalesce";
  }
  if ((0, import_utils.isMySQL)(ctx)) {
    funcName = "json_length";
  }
  const queryInterface = getQueryInterface(ctx);
  return `(select ${ifNull}(${funcName}(${queryInterface.quoteIdentifiers(fieldName)}), 0) ${operator} 0)`;
}, "emptyQuery");
var array_default = {
  $match(value, ctx) {
    const queryInterface = getQueryInterface(ctx);
    const fieldName = getFieldName(ctx);
    if ((0, import_utils.isPg)(ctx)) {
      const name = queryInterface.quoteIdentifiers(fieldName);
      const queryValue = escape(JSON.stringify(value), ctx);
      return import_sequelize.Sequelize.literal(`${name} @> ${queryValue}::JSONB AND ${name} <@ ${queryValue}::JSONB`);
    }
    value = escape(JSON.stringify(value.sort()), ctx);
    if ((0, import_utils.isMySQL)(ctx)) {
      const name = queryInterface.quoteIdentifiers(fieldName);
      return import_sequelize.Sequelize.literal(`JSON_CONTAINS(${name}, ${value}) AND JSON_CONTAINS(${value}, ${name})`);
    }
    return {
      [import_sequelize.Op.eq]: import_sequelize.Sequelize.literal(`json(${value})`)
    };
  },
  $notMatch(value, ctx) {
    const queryInterface = getQueryInterface(ctx);
    value = escape(JSON.stringify(value), ctx);
    if ((0, import_utils.isPg)(ctx)) {
      const name = queryInterface.quoteIdentifiers(getFieldName(ctx));
      return import_sequelize.Sequelize.literal(`not (${name} <@ ${value}::JSONB and ${name} @> ${value}::JSONB)`);
    }
    if ((0, import_utils.isMySQL)(ctx)) {
      const name = queryInterface.quoteIdentifiers(getFieldName(ctx));
      return import_sequelize.Sequelize.literal(`not (JSON_CONTAINS(${name}, ${value}) AND JSON_CONTAINS(${value}, ${name}))`);
    }
    return {
      [import_sequelize.Op.ne]: import_sequelize.Sequelize.literal(`json(${value})`)
    };
  },
  $anyOf(value, ctx) {
    const fieldName = getFieldName(ctx);
    value = import_lodash.default.castArray(value);
    const queryInterface = getQueryInterface(ctx);
    if ((0, import_utils.isPg)(ctx)) {
      const name = queryInterface.quoteIdentifiers(getFieldName(ctx));
      return import_sequelize.Sequelize.literal(
        `${name} ?| ${escape(
          value.map((i) => `${i}`),
          ctx
        )}`
      );
    }
    if ((0, import_utils.isMySQL)(ctx)) {
      value = escape(JSON.stringify(value), ctx);
      const name = queryInterface.quoteIdentifiers(getFieldName(ctx));
      return import_sequelize.Sequelize.literal(`JSON_OVERLAPS(${name}, ${value})`);
    }
    const subQuery = sqliteExistQuery(value, ctx);
    return import_sequelize.Sequelize.literal(subQuery);
  },
  $noneOf(value, ctx) {
    let where;
    value = import_lodash.default.castArray(value);
    const queryInterface = getQueryInterface(ctx);
    if ((0, import_utils.isPg)(ctx)) {
      const name = queryInterface.quoteIdentifiers(getFieldName(ctx));
      where = import_sequelize.Sequelize.literal(
        `not (${name} ?| ${escape(
          value.map((i) => `${i}`),
          ctx
        )})`
      );
    } else if ((0, import_utils.isMySQL)(ctx)) {
      const fieldName = getFieldName(ctx);
      value = escape(JSON.stringify(value), ctx);
      const name = queryInterface.quoteIdentifiers(getFieldName(ctx));
      where = import_sequelize.Sequelize.literal(`NOT JSON_OVERLAPS(${name}, ${value})`);
    } else {
      const subQuery = sqliteExistQuery(value, ctx);
      where = import_sequelize.Sequelize.literal(`not ${subQuery}`);
    }
    return {
      [import_sequelize.Op.or]: [where, { [import_sequelize.Op.is]: null }]
    };
  },
  $arrayEmpty(value, ctx) {
    const subQuery = emptyQuery(ctx, "=");
    return {
      [import_sequelize.Op.and]: [import_sequelize.Sequelize.literal(`${subQuery}`)]
    };
  },
  $arrayNotEmpty(value, ctx) {
    const subQuery = emptyQuery(ctx, ">");
    return {
      [import_sequelize.Op.and]: [import_sequelize.Sequelize.literal(`${subQuery}`)]
    };
  }
};
