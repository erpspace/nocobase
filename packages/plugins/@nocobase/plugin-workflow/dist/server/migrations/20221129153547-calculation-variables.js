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
var calculation_variables_exports = {};
__export(calculation_variables_exports, {
  default: () => calculation_variables_default
});
module.exports = __toCommonJS(calculation_variables_exports);
var import_server = require("@nocobase/server");
const VTypes = {
  constant(operand) {
    return operand.value;
  },
  $jobsMapByNodeId({ options }) {
    const paths = [options.nodeId, options.path].filter(Boolean);
    return paths ? `{{$jobsMapByNodeId.${paths.join(".")}}}` : null;
  },
  $context({ options }) {
    return `{{$context.${options.path}}}`;
  }
};
function migrateConfig(config) {
  if (Array.isArray(config)) {
    return config.map((item) => migrateConfig(item));
  }
  if (typeof config !== "object") {
    return config;
  }
  if (!config) {
    return config;
  }
  if (config.type && VTypes[config.type] && (config.options || config.value)) {
    return VTypes[config.type](config);
  }
  return Object.keys(config).reduce((memo, key) => ({ ...memo, [key]: migrateConfig(config[key]) }), {});
}
class calculation_variables_default extends import_server.Migration {
  appVersion = "<=0.8.0-alpha.13";
  async up() {
    const match = await this.app.version.satisfies("<=0.8.0-alpha.13");
    if (!match) {
      return;
    }
    const NodeRepo = this.context.db.getRepository("flow_nodes");
    await this.context.db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: {
            $or: ["calculation", "condition"]
          }
        },
        transaction
      });
      console.log("%d nodes need to be migrated.", nodes.length);
      await nodes.reduce((promise, node) => {
        return node.update(
          {
            config: migrateConfig(node.config)
          },
          {
            transaction
          }
        );
      }, Promise.resolve());
    });
  }
  async down() {
  }
}
