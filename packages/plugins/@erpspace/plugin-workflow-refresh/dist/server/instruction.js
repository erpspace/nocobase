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
var instruction_exports = {};
__export(instruction_exports, {
  RefreshInstruction: () => RefreshInstruction
});
module.exports = __toCommonJS(instruction_exports);
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_utils = require("@nocobase/utils");
class RefreshInstruction extends import_plugin_workflow.Instruction {
  constructor(workflow) {
    super(workflow);
    this.workflow = workflow;
    this.plugin = workflow;
  }
  plugin;
  async run(node, input, processor) {
    const { uri } = node.config;
    const scope = processor.getScope(node.id);
    const parsed = (0, import_utils.parse)(uri)(scope) ?? {};
    this.plugin.app.emit("ws:sendToCurrentApp", {
      tagKey: "test",
      tagValue: 123,
      message: {
        type: "refresh",
        payload: {
          uri: parsed
        }
      }
    });
    return {
      result: true,
      status: import_plugin_workflow.JOB_STATUS.RESOLVED
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RefreshInstruction
});
