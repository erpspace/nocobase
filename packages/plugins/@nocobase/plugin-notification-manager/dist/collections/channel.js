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
var channel_exports = {};
__export(channel_exports, {
  default: () => channel_default
});
module.exports = __toCommonJS(channel_exports);
var import_constant = require("../constant");
var channel_default = {
  name: import_constant.COLLECTION_NAME.channels,
  migrationRules: ["overwrite", "schema-only"],
  filterTargetKey: "name",
  autoGenId: false,
  createdAt: true,
  createdBy: true,
  updatedAt: true,
  updatedBy: true,
  fields: [
    {
      name: "name",
      type: "uid",
      prefix: "s_",
      primaryKey: true,
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("Channel name")}}',
        "x-component": "Input",
        required: true,
        description: "{{t('Randomly generated and can not be modified. Support letters, numbers and underscores, must start with an letter.')}}"
      }
    },
    {
      name: "title",
      type: "string",
      interface: "input",
      uiSchema: {
        type: "string",
        "x-component": "Input",
        title: '{{t("Channel display name")}}',
        required: true
      }
    },
    {
      name: "options",
      type: "json",
      interface: "json",
      uiSchema: {
        type: "object",
        "x-component": "ConfigForm"
      }
    },
    {
      name: "meta",
      type: "json",
      interface: "json"
    },
    {
      interface: "input",
      type: "string",
      name: "notificationType",
      uiSchema: {
        type: "string",
        title: '{{t("Notification type")}}',
        "x-component": "Select",
        enum: "{{notificationTypeOptions}}",
        required: true
      }
    },
    {
      name: "description",
      type: "text",
      interface: "textarea",
      uiSchema: {
        type: "string",
        "x-component": "Input.TextArea",
        title: '{{t("Description")}}'
      }
    }
  ]
};
