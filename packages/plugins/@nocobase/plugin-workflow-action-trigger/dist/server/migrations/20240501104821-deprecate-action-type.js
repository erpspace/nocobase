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
var deprecate_action_type_exports = {};
__export(deprecate_action_type_exports, {
  default: () => deprecate_action_type_default
});
module.exports = __toCommonJS(deprecate_action_type_exports);
var import_server = require("@nocobase/server");
class deprecate_action_type_default extends import_server.Migration {
  appVersion = "<1.0.0-alpha.7";
  on = "afterSync";
  async up() {
    const { db } = this.context;
    const UiSchemaRepo = db.getRepository("uiSchemas");
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await UiSchemaRepo.find({
        filter: {
          "schema.x-component": "Action",
          "schema.x-designer": "Action.Designer",
          "schema.x-action": "customize:triggerWorkflows",
          $or: [
            {
              "schema.x-component-props.useProps": "useTriggerWorkflowsActionProps"
            },
            {
              "schema.x-component-props.useProps": "useRecordTriggerWorkflowsActionProps"
            },
            {
              "schema.x-use-component-props": "useTriggerWorkflowsActionProps"
            },
            {
              "schema.x-use-component-props": "useRecordTriggerWorkflowsActionProps"
            }
          ]
        },
        transaction
      });
      for (const node of nodes) {
        const schema = node.get("schema");
        schema["x-action"] = "customize:triggerWorkflows_deprecated";
        node.set("schema", { ...schema });
        node.changed("schema", true);
        await node.save({ transaction });
      }
    });
  }
}
