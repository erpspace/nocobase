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
var fix_schema_exports = {};
__export(fix_schema_exports, {
  default: () => fix_schema_default
});
module.exports = __toCommonJS(fix_schema_exports);
var import_server = require("@nocobase/server");
function findSchema(root, filter, onlyLeaf = false) {
  const result = [];
  if (!root) {
    return result;
  }
  if (filter(root) && (!onlyLeaf || !root.properties)) {
    result.push(root);
    return result;
  }
  if (root.properties) {
    Object.keys(root.properties).forEach((key) => {
      result.push(...findSchema(root.properties[key], filter));
    });
  }
  return result;
}
function changeToDataPath(item) {
  var _a;
  if (item && ((_a = item["x-decorator-props"]) == null ? void 0 : _a.dataSource)) {
    item["x-decorator-props"].dataPath = item["x-decorator-props"].dataSource.replace(/^{{|}}$/g, "");
    delete item["x-decorator-props"].dataSource;
  }
}
function migrateSchema(schema) {
  const root = { properties: schema };
  const detailNodes = findSchema(root, (item) => {
    return item["x-decorator"] === "DetailsBlockProvider" && item["x-component"] === "CardItem" && item["x-designer"] === "SimpleDesigner";
  });
  detailNodes.forEach(changeToDataPath);
  return schema;
}
class fix_schema_default extends import_server.Migration {
  appVersion = "<0.21.0-alpha.15";
  async up() {
    const { db } = this.context;
    const NodeRepo = db.getRepository("flow_nodes");
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: "manual"
        },
        transaction
      });
      console.log("%d nodes need to be migrated.", nodes.length);
      await nodes.reduce(
        (promise, node) => promise.then(() => {
          const { assignees, forms, schema = {}, ...tabs } = node.config;
          return node.update(
            {
              config: {
                assignees,
                forms,
                schema: migrateSchema({ ...tabs, ...schema })
              }
            },
            {
              silent: true,
              transaction
            }
          );
        }),
        Promise.resolve()
      );
    });
  }
}
