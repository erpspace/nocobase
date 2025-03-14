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
var add_node_key_exports = {};
__export(add_node_key_exports, {
  default: () => add_node_key_default
});
module.exports = __toCommonJS(add_node_key_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_sequelize = require("sequelize");
function migrateNodeConfig(config = {}, nodesMap) {
  Object.keys(config).forEach((key) => {
    const valueType = typeof config[key];
    if (valueType === "string") {
      config[key] = config[key].replace(/{{\s*\$jobsMapByNodeId\.(\d+)(\.[^}]+)?\s*}}/g, (matched, id, path) => {
        return `{{$jobsMapByNodeKey.${nodesMap[id].key}${path || ""}}}`;
      }).replace(/{{\s*\$scopes\.(\d+)(\.[^}]+)?\s*}}/g, (matched, id, path) => {
        return `{{$scopes.${nodesMap[id].key}${path || ""}}}`;
      });
    } else if (valueType === "object" && config[key]) {
      migrateNodeConfig(config[key], nodesMap);
    }
  });
  return config;
}
class add_node_key_default extends import_server.Migration {
  appVersion = "<0.14.0-alpha.8";
  async up() {
    const match = await this.app.version.satisfies("<0.14.0-alpha.8");
    if (!match) {
      return;
    }
    const { db } = this.context;
    const NodeCollection = db.getCollection("flow_nodes");
    const NodeRepo = NodeCollection.repository;
    const tableName = NodeCollection.getTableNameWithSchema();
    await db.sequelize.transaction(async (transaction) => {
      if (!await NodeCollection.getField("key").existsInDb()) {
        await this.queryInterface.addColumn(tableName, "key", import_sequelize.DataTypes.STRING, {
          transaction
        });
      }
      const nodes = await NodeRepo.find({
        transaction
      });
      const nodesMap = nodes.reduce((map, node) => {
        map[node.id] = node;
        if (!node.get("key")) {
          node.set("key", (0, import_utils.uid)());
        }
        return map;
      }, {});
      await nodes.reduce(
        (promise, node) => promise.then(() => {
          node.set("config", migrateNodeConfig(node.config, nodesMap));
          node.changed("config", true);
          return node.save({
            silent: true,
            transaction
          });
        }),
        Promise.resolve()
      );
    });
  }
}
