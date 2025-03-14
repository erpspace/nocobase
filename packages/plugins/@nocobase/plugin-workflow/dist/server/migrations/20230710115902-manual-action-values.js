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
var manual_action_values_exports = {};
__export(manual_action_values_exports, {
  default: () => manual_action_values_default
});
module.exports = __toCommonJS(manual_action_values_exports);
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
function migrateConfig(config) {
  const { forms = {}, schema = {} } = config;
  const root = { properties: schema };
  Object.keys(forms).forEach((key) => {
    const form = forms[key];
    const formSchema = findSchema(root, (item) => item.name === key);
    const actions = findSchema(formSchema[0], (item) => item["x-component"] === "Action");
    form.actions = actions.map((action) => {
      action["x-designer"] = "ManualActionDesigner";
      action["x-action-settings"] = {};
      delete action["x-action"];
      return {
        status: action["x-decorator-props"].value,
        values: {},
        key: action.name
      };
    });
  });
  return config;
}
class manual_action_values_default extends import_server.Migration {
  appVersion = "<0.11.0-alpha.2";
  async up() {
    const match = await this.app.version.satisfies("<0.11.0-alpha.2");
    if (!match) {
      return;
    }
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
          node.set("config", {
            ...migrateConfig(node.config)
          });
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
