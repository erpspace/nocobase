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
var actions_exports = {};
__export(actions_exports, {
  initActions: () => initActions
});
module.exports = __toCommonJS(actions_exports);
var import_actions = __toESM(require("@nocobase/actions"));
const workflowCcTasks = {
  async get(context, next) {
    context.action.mergeParams({
      filter: {
        userId: context.state.currentUser.id
      }
    });
    return import_actions.default.get(context, next);
  },
  async listMine(context, next) {
    context.action.mergeParams({
      filter: {
        userId: context.state.currentUser.id
      }
    });
    return import_actions.default.list(context, next);
  },
  async read(context, next) {
    const { filterByTk } = context.action.params;
    if (filterByTk) {
      const repository = context.app.db.getRepository("workflowCcTasks");
      const item = await repository.findOne({ where: { id: filterByTk } });
      if (!item) {
        return context.throw(404, "Task not found");
      }
      if (item.userId !== context.state.currentUser.id) {
        return context.throw(403, "You do not have permission to access this task");
      }
    }
    context.action.mergeParams({
      filterByTk,
      filter: {
        userId: context.state.currentUser.id,
        status: 0
      },
      values: {
        status: 1,
        readAt: /* @__PURE__ */ new Date()
      }
    });
    return import_actions.default.update(context, next);
  },
  async unread(context, next) {
    const { filterByTk } = context.action.params;
    if (!filterByTk) {
      return context.throw(400, "filterByTk is required for unread action");
    }
    context.action.mergeParams({
      filterByTk,
      filter: {
        userId: context.state.currentUser.id
      },
      values: {
        status: 0,
        readAt: null
      }
    });
    return import_actions.default.update(context, next);
  }
};
function make(name, mod) {
  return Object.keys(mod).reduce(
    (result, key) => ({
      ...result,
      [`${name}:${key}`]: mod[key]
    }),
    {}
  );
}
function initActions(app) {
  app.resourceManager.registerActionHandlers({
    ...make("workflowCcTasks", workflowCcTasks)
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initActions
});
