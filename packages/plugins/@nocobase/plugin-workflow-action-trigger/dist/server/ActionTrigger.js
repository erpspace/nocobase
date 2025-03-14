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
var ActionTrigger_exports = {};
__export(ActionTrigger_exports, {
  default: () => ActionTrigger_default
});
module.exports = __toCommonJS(ActionTrigger_exports);
var import_lodash = require("lodash");
var import_database = require("@nocobase/database");
var import_plugin_error_handler = __toESM(require("@nocobase/plugin-error-handler"));
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_data_source_manager = require("@nocobase/data-source-manager");
class RequestOnActionTriggerError extends Error {
  status = 400;
  messages = [];
  constructor(message) {
    super(message);
    this.name = "RequestOnActionTriggerError";
  }
}
class ActionTrigger_default extends import_plugin_workflow.Trigger {
  static TYPE = "action";
  constructor(workflow) {
    super(workflow);
    const self = this;
    async function triggerWorkflowActionMiddleware(context, next) {
      await next();
      const { actionName } = context.action;
      if (!["create", "update"].includes(actionName)) {
        return;
      }
      return self.collectionTriggerAction(context);
    }
    workflow.app.dataSourceManager.use(triggerWorkflowActionMiddleware);
    workflow.app.pm.get(import_plugin_error_handler.default).errorHandler.register(
      (err) => err instanceof RequestOnActionTriggerError || err.name === "RequestOnActionTriggerError",
      async (err, ctx) => {
        ctx.body = {
          errors: err.messages
        };
        ctx.status = err.status;
      }
    );
  }
  getTargetCollection(collection, association) {
    if (!association) {
      return collection;
    }
    let targetCollection = collection;
    for (const key of association.split(".")) {
      targetCollection = collection.db.getCollection(targetCollection.getField(key).target);
    }
    return targetCollection;
  }
  async collectionTriggerAction(context) {
    const {
      resourceName,
      actionName,
      params: { triggerWorkflows = "", values }
    } = context.action;
    const dataSourceHeader = context.get("x-data-source") || "main";
    const collection = context.app.dataSourceManager.dataSources.get(dataSourceHeader).collectionManager.getCollection(resourceName);
    if (!collection) {
      return;
    }
    const { currentUser, currentRole } = context.state;
    const { model: UserModel } = this.workflow.db.getCollection("users");
    const userInfo = {
      user: UserModel.build(currentUser).desensitize(),
      roleName: currentRole
    };
    const triggers = triggerWorkflows.split(",").map((trigger) => trigger.split("!"));
    const triggersKeysMap = new Map(triggers);
    const workflows = Array.from(this.workflow.enabledCache.values()).filter(
      (item) => item.type === "action" && item.config.collection
    );
    const globalWorkflows = /* @__PURE__ */ new Map();
    const localWorkflows = /* @__PURE__ */ new Map();
    workflows.forEach((item) => {
      var _a;
      const targetCollection = this.getTargetCollection(collection, triggersKeysMap.get(item.key));
      if (item.config.collection === (0, import_data_source_manager.joinCollectionName)(dataSourceHeader, targetCollection.name)) {
        if (item.config.global) {
          if ((_a = item.config.actions) == null ? void 0 : _a.includes(actionName)) {
            globalWorkflows.set(item.key, item);
          }
        } else {
          localWorkflows.set(item.key, item);
        }
      }
    });
    const triggeringLocalWorkflows = [];
    const uniqueTriggersMap = /* @__PURE__ */ new Map();
    triggers.forEach((trigger) => {
      const [key] = trigger;
      const workflow = localWorkflows.get(key);
      if (workflow && !uniqueTriggersMap.has(key)) {
        triggeringLocalWorkflows.push(workflow);
        uniqueTriggersMap.set(key, true);
      }
    });
    const syncGroup = [];
    const asyncGroup = [];
    for (const workflow of triggeringLocalWorkflows.concat(...globalWorkflows.values())) {
      const { appends = [] } = workflow.config;
      const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
      const dataPath = triggersKeysMap.get(workflow.key);
      const event = [workflow];
      if (context.action.resourceName !== "workflows") {
        if (!context.body) {
          continue;
        }
        if (dataSourceName !== dataSourceHeader) {
          continue;
        }
        const { body: data } = context;
        for (const row of Array.isArray(data) ? data : [data]) {
          let payload = row;
          if (dataPath) {
            const paths = dataPath.split(".");
            for (const field of paths) {
              if (!payload) {
                break;
              }
              if (payload.get(field)) {
                payload = payload.get(field);
              } else {
                const association = (0, import_database.modelAssociationByKey)(payload, field);
                payload = await payload[association.accessors.get]();
              }
            }
          }
          if (payload instanceof import_database.Model) {
            const model = payload.constructor;
            if (collectionName !== model.collection.name) {
              continue;
            }
            if (appends.length) {
              payload = await model.collection.repository.findOne({
                filterByTk: payload.get(model.collection.filterTargetKey),
                appends
              });
            }
          }
          event.push({ data: (0, import_plugin_workflow.toJSON)(payload), ...userInfo });
        }
      } else {
        const { filterTargetKey, repository } = context.app.dataSourceManager.dataSources.get(dataSourceName).collectionManager.getCollection(collectionName);
        let data = dataPath ? (0, import_lodash.get)(values, dataPath) : values;
        const pk = (0, import_lodash.get)(data, filterTargetKey);
        if (appends.length && pk != null) {
          data = await repository.findOne({
            filterByTk: pk,
            appends
          });
        }
        event.push({ data, ...userInfo });
      }
      (workflow.sync ? syncGroup : asyncGroup).push(event);
    }
    for (const event of syncGroup) {
      const processor = await this.workflow.trigger(event[0], event[1], { httpContext: context });
      if (!processor) {
        return context.throw(500);
      }
      const { lastSavedJob, nodesMap } = processor;
      const lastNode = nodesMap.get(lastSavedJob == null ? void 0 : lastSavedJob.nodeId);
      if (processor.execution.status === import_plugin_workflow.EXECUTION_STATUS.RESOLVED) {
        if ((lastNode == null ? void 0 : lastNode.type) === "end") {
          return;
        }
        continue;
      }
      if (processor.execution.status < import_plugin_workflow.EXECUTION_STATUS.STARTED) {
        if ((lastNode == null ? void 0 : lastNode.type) !== "end") {
          return context.throw(500, "Workflow on your action failed, please contact the administrator");
        }
        const err = new RequestOnActionTriggerError("Request failed");
        err.status = 400;
        err.messages = context.state.messages;
        return context.throw(err.status, err);
      }
      return context.throw(500, "Workflow on your action hangs, please contact the administrator");
    }
    for (const event of asyncGroup) {
      this.workflow.trigger(event[0], event[1]);
    }
  }
  async execute(workflow, values, options) {
    var _a, _b;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
    const { collectionManager } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
    const { filterTargetKey, repository } = collectionManager.getCollection(collectionName);
    let { data } = values;
    let filterByTk;
    let loadNeeded = false;
    if (data && typeof data === "object") {
      filterByTk = Array.isArray(filterTargetKey) ? (0, import_lodash.pick)(
        data,
        filterTargetKey.sort((a, b) => a.localeCompare(b))
      ) : data[filterTargetKey];
    } else {
      filterByTk = data;
      loadNeeded = true;
    }
    const UserRepo = this.workflow.app.db.getRepository("users");
    const actor = await UserRepo.findOne({
      filterByTk: values.userId,
      appends: ["roles"]
    });
    if (!actor) {
      throw new Error("user not found");
    }
    const { roles, ...user } = actor.desensitize().get();
    const roleName = values.roleName || ((_a = roles == null ? void 0 : roles[0]) == null ? void 0 : _a.name);
    if (loadNeeded || ((_b = workflow.config.appends) == null ? void 0 : _b.length)) {
      data = await repository.findOne({
        filterByTk,
        appends: workflow.config.appends
      });
    }
    return this.workflow.trigger(
      workflow,
      {
        data,
        user,
        roleName
      },
      options
    );
  }
  validateContext(values) {
    if (!values.data) {
      return {
        data: "Data is required"
      };
    }
    if (!values.userId) {
      return {
        userId: "UserId is required"
      };
    }
    return null;
  }
}
