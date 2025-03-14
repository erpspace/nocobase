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
var add_node_key_to_job_exports = {};
__export(add_node_key_to_job_exports, {
  default: () => add_node_key_to_job_default
});
module.exports = __toCommonJS(add_node_key_to_job_exports);
var import_server = require("@nocobase/server");
class add_node_key_to_job_default extends import_server.Migration {
  appVersion = "<0.19.0-alpha.4";
  on = "afterSync";
  async up() {
    const { db } = this.context;
    const JobRepo = db.getRepository("jobs");
    await db.sequelize.transaction(async (transaction) => {
      const jobs = await JobRepo.find({
        appends: ["node.key"]
      });
      await jobs.reduce(
        (promise, job) => promise.then(() => {
          var _a;
          if (job.nodeKey) {
            return;
          }
          return job.update(
            {
              nodeKey: (_a = job.node) == null ? void 0 : _a.key
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
