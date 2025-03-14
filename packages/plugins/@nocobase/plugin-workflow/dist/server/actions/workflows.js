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
var workflows_exports = {};
__export(workflows_exports, {
  destroy: () => destroy,
  execute: () => execute,
  revision: () => revision,
  sync: () => sync,
  update: () => update
});
module.exports = __toCommonJS(workflows_exports);
var import_actions = __toESM(require("@nocobase/actions"));
var import_database = require("@nocobase/database");
var import_Plugin = __toESM(require("../Plugin"));
async function update(context, next) {
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { filterByTk, values } = context.action.params;
  context.action.mergeParams({
    whitelist: ["title", "description", "enabled", "triggerTitle", "config", "options"]
  });
  if (Object.keys(values).includes("config")) {
    const workflow = await repository.findById(filterByTk);
    if (workflow.get("executed")) {
      return context.throw(400, "config of executed workflow can not be updated");
    }
  }
  return import_actions.default.update(context, next);
}
async function destroy(context, next) {
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { filterByTk, filter } = context.action.params;
  await context.db.sequelize.transaction(async (transaction) => {
    const items = await repository.find({
      filterByTk,
      filter,
      fields: ["id", "key", "current"],
      transaction
    });
    const ids = new Set(items.map((item) => item.id));
    const keysSet = new Set(items.filter((item) => item.current).map((item) => item.key));
    const revisions = await repository.find({
      filter: {
        key: Array.from(keysSet),
        current: { [import_database.Op.not]: true }
      },
      fields: ["id"],
      transaction
    });
    revisions.forEach((item) => ids.add(item.id));
    context.body = await repository.destroy({
      filterByTk: Array.from(ids),
      individualHooks: true,
      transaction
    });
  });
  next();
}
async function revision(context, next) {
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { filterByTk, filter = {}, values = {} } = context.action.params;
  context.body = await repository.revision({
    filterByTk,
    filter,
    values,
    context
  });
  await next();
}
async function sync(context, next) {
  const plugin = context.app.getPlugin(import_Plugin.default);
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { filterByTk, filter = {} } = context.action.params;
  const workflows = await repository.find({
    filterByTk,
    filter
  });
  workflows.forEach((workflow) => {
    plugin.toggle(workflow, false);
    plugin.toggle(workflow);
  });
  context.status = 204;
  await next();
}
async function execute(context, next) {
  const plugin = context.app.pm.get(import_Plugin.default);
  const { filterByTk, values, autoRevision } = context.action.params;
  if (!values) {
    return context.throw(400, "values is required");
  }
  if (!filterByTk) {
    return context.throw(400, "filterByTk is required");
  }
  const id = Number.parseInt(filterByTk, 10);
  if (Number.isNaN(id)) {
    return context.throw(400, "filterByTk is invalid");
  }
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const workflow = plugin.enabledCache.get(id) || await repository.findOne({ filterByTk });
  if (!workflow) {
    return context.throw(404, "workflow not found");
  }
  const { executed } = workflow;
  let processor;
  try {
    processor = await plugin.execute(workflow, values, { manually: true });
    if (!processor) {
      return context.throw(400, "workflow not triggered");
    }
  } catch (ex) {
    return context.throw(400, ex.message);
  }
  context.action.mergeParams({
    filter: { key: workflow.key }
  });
  let newVersion;
  if (!executed && autoRevision) {
    newVersion = await repository.revision({
      filterByTk: workflow.id,
      filter: { key: workflow.key },
      values: {
        current: workflow.current,
        enabled: workflow.enabled
      },
      context
    });
  }
  context.body = {
    execution: {
      id: processor.execution.id,
      status: processor.execution.status
    },
    newVersionId: newVersion == null ? void 0 : newVersion.id
  };
  return next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  destroy,
  execute,
  revision,
  sync,
  update
});
