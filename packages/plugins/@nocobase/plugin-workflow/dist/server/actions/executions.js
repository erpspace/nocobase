/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var executions_exports = {};
__export(executions_exports, {
  cancel: () => cancel,
  destroy: () => destroy
});
module.exports = __toCommonJS(executions_exports);
var import_actions = __toESM(require("@nocobase/actions"));
var import_database = require("@nocobase/database");
var import_constants = require("../constants");
async function destroy(context, next) {
  context.action.mergeParams({
    filter: {
      status: {
        [import_database.Op.ne]: import_constants.EXECUTION_STATUS.STARTED
      }
    }
  });
  await import_actions.default.destroy(context, next);
}
async function cancel(context, next) {
  const { filterByTk } = context.action.params;
  const ExecutionRepo = context.db.getRepository("executions");
  const JobRepo = context.db.getRepository("jobs");
  const execution = await ExecutionRepo.findOne({
    filterByTk,
    appends: ["jobs"]
  });
  if (!execution) {
    return context.throw(404);
  }
  if (execution.status) {
    return context.throw(400);
  }
  await context.db.sequelize.transaction(async (transaction) => {
    await execution.update(
      {
        status: import_constants.EXECUTION_STATUS.CANCELED
      },
      { transaction }
    );
    const pendingJobs = execution.jobs.filter((job) => job.status === import_constants.JOB_STATUS.PENDING);
    await JobRepo.update({
      values: {
        status: import_constants.JOB_STATUS.CANCELED
      },
      filter: {
        id: pendingJobs.map((job) => job.id)
      },
      individualHooks: false,
      transaction
    });
  });
  context.body = execution;
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cancel,
  destroy
});
