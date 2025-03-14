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
var query_generator_exports = {};
__export(query_generator_exports, {
  selectQuery: () => selectQuery
});
module.exports = __toCommonJS(query_generator_exports);
var import_utils = require("@nocobase/utils");
function selectQuery(tableName, options, model) {
  var _a;
  options = options || {};
  if (import_utils.lodash.isEmpty(options)) {
    return `${model.sql};`;
  }
  const queryItems = [];
  let attributes = options.attributes && options.attributes.slice();
  if (attributes) {
    const fields = Array.from(((_a = model.collection) == null ? void 0 : _a.fields.keys()) || []);
    attributes = attributes.filter((attr) => attr === "*" || typeof attr !== "string" || fields.includes(attr));
  }
  attributes = this.escapeAttributes(attributes, { model });
  attributes = attributes || ["*"];
  if (Object.prototype.hasOwnProperty.call(options, "where")) {
    options.where = this.getWhereConditions(options.where, model.name, model, options);
    if (options.where) {
      queryItems.push(` WHERE ${options.where}`);
    }
  }
  if (options.group) {
    options.group = Array.isArray(options.group) ? options.group.map((t) => this.aliasGrouping(t, model, model.name, options)).join(", ") : this.aliasGrouping(options.group, model, model.name, options);
    if (options.group) {
      queryItems.push(` GROUP BY ${options.group}`);
    }
  }
  if (options.order) {
    const orders = this.getQueryOrders(options, model, false);
    if (orders.mainQueryOrder.length) {
      queryItems.push(` ORDER BY ${orders.mainQueryOrder.join(", ")}`);
    }
  }
  const limitOrder = this.addLimitAndOffset(options, model);
  if (limitOrder) {
    queryItems.push(limitOrder);
  }
  const query = `SELECT ${attributes.join(", ")} FROM (${model.sql}) ${this.getAliasToken()} ${this.quoteIdentifier(
    model.name
  )}${queryItems.join("")}`;
  return `${query};`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  selectQuery
});
