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
var add_task_title_exports = {};
__export(add_task_title_exports, {
  default: () => add_task_title_default
});
module.exports = __toCommonJS(add_task_title_exports);
var import_server = require("@nocobase/server");
class add_task_title_default extends import_server.Migration {
  appVersion = "<1.6.0-alpha.13";
  async up() {
    const { db } = this.context;
    const NodeRepo = db.getRepository("flow_nodes");
    const TaskRepo = db.getRepository("workflowManualTasks");
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: "manual"
        },
        transaction
      });
      await nodes.reduce(
        (promise, node) => promise.then(() => {
          return TaskRepo.update({
            filter: {
              nodeId: node.id
            },
            values: {
              title: node.title
            },
            individualHooks: false,
            silent: true,
            transaction
          });
        }),
        Promise.resolve()
      );
    });
  }
}
