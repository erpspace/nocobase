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
  submit: () => submit
});
module.exports = __toCommonJS(actions_exports);
var import_actions = require("@nocobase/actions");
var import_plugin_workflow = __toESM(require("@nocobase/plugin-workflow"));
async function submit(context, next) {
  var _a, _b, _c;
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { filterByTk, values } = context.action.params;
  const { currentUser } = context.state;
  if (!currentUser) {
    return context.throw(401);
  }
  const plugin = context.app.getPlugin(import_plugin_workflow.default);
  const instruction = plugin.instructions.get("manual");
  const task = await repository.findOne({
    filterByTk,
    // filter: {
    //   userId: currentUser?.id
    // },
    appends: ["job", "node", "execution", "workflow"],
    context
  });
  if (!task) {
    return context.throw(404);
  }
  const { forms = {} } = task.node.config;
  const [formKey] = Object.keys(values.result ?? {}).filter((key) => key !== "_");
  const actionKey = (_a = values.result) == null ? void 0 : _a._;
  const actionItem = (_c = (_b = forms[formKey]) == null ? void 0 : _b.actions) == null ? void 0 : _c.find((item) => item.key === actionKey);
  if (task.status !== import_plugin_workflow.JOB_STATUS.PENDING || task.job.status !== import_plugin_workflow.JOB_STATUS.PENDING || task.execution.status !== import_plugin_workflow.EXECUTION_STATUS.STARTED || !task.workflow.enabled || !actionKey || (actionItem == null ? void 0 : actionItem.status) == null) {
    return context.throw(400);
  }
  task.execution.workflow = task.workflow;
  const processor = plugin.createProcessor(task.execution);
  await processor.prepare();
  const assignees = processor.getParsedValue(task.node.config.assignees ?? [], task.nodeId).flat().filter(Boolean);
  if (!assignees.includes(currentUser.id) || task.userId !== currentUser.id) {
    return context.throw(403);
  }
  const presetValues = processor.getParsedValue(actionItem.values ?? {}, task.nodeId, {
    additionalScope: {
      // @deprecated
      currentUser,
      // @deprecated
      currentRecord: values.result[formKey],
      // @deprecated
      currentTime: /* @__PURE__ */ new Date(),
      $user: currentUser,
      $nForm: values.result[formKey],
      $nDate: {
        now: /* @__PURE__ */ new Date()
      }
    }
  });
  task.set({
    status: actionItem.status,
    result: actionItem.status ? { [formKey]: Object.assign(values.result[formKey], presetValues), _: actionKey } : Object.assign(task.result ?? {}, values.result)
  });
  const handler = instruction.formTypes.get(forms[formKey].type);
  if (handler && task.status) {
    await handler.call(instruction, task, forms[formKey], processor);
  }
  await task.save();
  await processor.exit();
  context.body = task;
  context.status = 202;
  await next();
  task.job.execution = task.execution;
  task.job.latestTask = task;
  processor.logger.info(`manual node (${task.nodeId}) action trigger execution (${task.execution.id}) to resume`);
  plugin.resume(task.job);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  submit
});
