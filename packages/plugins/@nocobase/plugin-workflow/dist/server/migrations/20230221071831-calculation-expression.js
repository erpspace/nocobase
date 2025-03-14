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
var calculation_expression_exports = {};
__export(calculation_expression_exports, {
  default: () => calculation_expression_default
});
module.exports = __toCommonJS(calculation_expression_exports);
var import_server = require("@nocobase/server");
function addQuote(v) {
  if (typeof v !== "string") {
    return v;
  }
  if (v.match(/^{{\s*([^{}]+)\s*}}$/)) {
    return v;
  }
  return `'${v}'`;
}
const calculatorsMap = {
  equal: "==",
  "===": "==",
  notEqual: "!=",
  "!==": "!=",
  gt: ">",
  gte: ">=",
  lt: "<",
  lte: "<=",
  add: "+",
  minus: "-",
  multiple: "*",
  divide: "/",
  mod: "%",
  includes(a, b) {
    return `SEARCH(${b}, ${a}) >= 0`;
  },
  notIncludes(a, b) {
    return `SEARCH(${b}, ${a}) < 0`;
  },
  startsWith(a, b) {
    return `SEARCH(${b}, ${a}) == 0`;
  },
  endsWith(a, b) {
    return `RIGHT(${a}, LEN(${b})) == ${b}`;
  },
  notStartsWith(a, b) {
    return `SEARCH(${b}, ${a}) != 0`;
  },
  notEndsWith(a, b) {
    return `RIGHT(${a}, LEN(${b})) != ${b}`;
  },
  concat(a, b) {
    return `CONCATENATE(${a}, ${b})`;
  }
};
function migrateConfig({ calculation, ...config } = {}) {
  var _a;
  if (!(calculation == null ? void 0 : calculation.calculator) || !((_a = calculation == null ? void 0 : calculation.operands) == null ? void 0 : _a.length)) {
    return config;
  }
  const calculator = calculatorsMap[calculation.calculator];
  const operands = (calculator.operands ?? []).map((operand) => addQuote(operand));
  return {
    engine: "formula.js",
    expression: typeof calculator === "function" ? calculator(...operands) : operands.join(` ${calculator ?? calculation.calculator} `)
  };
}
class calculation_expression_default extends import_server.Migration {
  appVersion = "<0.9.0-alpha.3";
  async up() {
    const match = await this.app.version.satisfies("<0.9.0-alpha.3");
    if (!match) {
      return;
    }
    const NodeRepo = this.context.db.getRepository("flow_nodes");
    await this.context.db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: "calculation"
        },
        transaction
      });
      console.log("%d nodes need to be migrated.", nodes.length);
      await nodes.reduce(
        (promise, node) => promise.then(() => {
          return node.update(
            {
              config: migrateConfig(node.config)
            },
            {
              transaction
            }
          );
        }),
        Promise.resolve()
      );
    });
  }
}
