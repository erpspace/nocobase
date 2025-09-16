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
var query_parser_exports = {};
__export(query_parser_exports, {
  QueryParser: () => QueryParser
});
module.exports = __toCommonJS(query_parser_exports);
const AllowedAggFuncs = ["sum", "count", "avg", "min", "max"];
class QueryParser {
  db;
  formatter;
  constructor(db) {
    this.db = db;
    this.formatter = {
      format: ({ field }) => db.sequelize.col(field)
    };
  }
  parseMeasures(ctx, measures) {
    let hasAgg = false;
    const sequelize = this.db.sequelize;
    const attributes = [];
    const fieldMap = {};
    measures.forEach((measure) => {
      const { field, aggregation, alias, distinct } = measure;
      const attribute = [];
      const col = sequelize.col(field);
      if (aggregation) {
        if (!AllowedAggFuncs.includes(aggregation)) {
          throw new Error(`Invalid aggregation function: ${aggregation}`);
        }
        hasAgg = true;
        attribute.push(sequelize.fn(aggregation, distinct ? sequelize.fn("DISTINCT", col) : col));
      } else {
        attribute.push(col);
      }
      if (alias) {
        attribute.push(alias);
      }
      attributes.push(attribute.length > 1 ? attribute : attribute[0]);
      fieldMap[alias || field] = measure;
    });
    return { attributes, fieldMap, hasAgg };
  }
  parseDimensions(ctx, dimensions, hasAgg, timezone) {
    const sequelize = this.db.sequelize;
    const attributes = [];
    const group = [];
    const fieldMap = {};
    dimensions.forEach((dimension) => {
      const { field, format, alias, type, options } = dimension;
      const attribute = [];
      const col = sequelize.col(field);
      if (format) {
        attribute.push(this.formatter.format({ type, field, format, timezone, options }));
      } else {
        attribute.push(col);
      }
      if (alias) {
        attribute.push(alias);
      }
      attributes.push(attribute.length > 1 ? attribute : attribute[0]);
      if (hasAgg) {
        group.push(attribute[0]);
      }
      fieldMap[alias || field] = dimension;
    });
    return { attributes, group, fieldMap };
  }
  parseOrders(ctx, orders, hasAgg) {
    const sequelize = this.db.sequelize;
    const order = [];
    orders.forEach((item) => {
      const alias = sequelize.getQueryInterface().quoteIdentifier(item.alias);
      const name = hasAgg ? sequelize.literal(alias) : sequelize.col(item.field);
      let sort = item.order || "ASC";
      if (item.nulls === "first") {
        sort += " NULLS FIRST";
      }
      if (item.nulls === "last") {
        sort += " NULLS LAST";
      }
      order.push([name, sort]);
    });
    return order;
  }
  parse() {
    return async (ctx, next) => {
      var _a;
      const { measures, dimensions, orders, include, where, limit, offset } = ctx.action.params.values;
      const { attributes: measureAttributes, fieldMap: measureFieldMap, hasAgg } = this.parseMeasures(ctx, measures);
      const {
        attributes: dimensionAttributes,
        group,
        fieldMap: dimensionFieldMap
      } = this.parseDimensions(ctx, dimensions, hasAgg, (_a = ctx.get) == null ? void 0 : _a.call(ctx, "x-timezone"));
      const order = this.parseOrders(ctx, orders, hasAgg);
      const queryParams = {
        where,
        attributes: [...measureAttributes, ...dimensionAttributes],
        include,
        group,
        order,
        subQuery: false,
        raw: true
      };
      if (!hasAgg || dimensions.length) {
        queryParams["limit"] = limit || 2e3;
        queryParams["offset"] = offset || 0;
      }
      ctx.action.params.values = {
        ...ctx.action.params.values,
        queryParams,
        fieldMap: { ...measureFieldMap, ...dimensionFieldMap }
      };
      await next();
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QueryParser
});
