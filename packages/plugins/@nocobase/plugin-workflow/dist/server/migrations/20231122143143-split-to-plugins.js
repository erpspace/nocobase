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
var split_to_plugins_exports = {};
__export(split_to_plugins_exports, {
  default: () => split_to_plugins_default
});
module.exports = __toCommonJS(split_to_plugins_exports);
var import_server = require("@nocobase/server");
class split_to_plugins_default extends import_server.Migration {
  appVersion = "<0.17.0-alpha.4";
  async up() {
    const match = await this.app.version.satisfies("<0.17.0-alpha.4");
    if (!match) {
      return;
    }
    const { db } = this.context;
    const NodeRepo = db.getRepository("flow_nodes");
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        transaction
      });
      await nodes.reduce(
        (promise, node) => promise.then(() => {
          if (node.type === "calculation" && node.config.dynamic) {
            node.set({
              type: "dynamic-calculation",
              config: {
                expression: node.config.dynamic,
                scope: node.config.scope
              }
            });
            node.changed("config", true);
          }
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
