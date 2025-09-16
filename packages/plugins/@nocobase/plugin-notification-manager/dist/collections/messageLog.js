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
var messageLog_exports = {};
__export(messageLog_exports, {
  default: () => messageLog_default
});
module.exports = __toCommonJS(messageLog_exports);
var import_constant = require("../constant");
var messageLog_default = {
  name: import_constant.COLLECTION_NAME.logs,
  migrationRules: ["schema-only"],
  title: "MessageLogs",
  fields: [
    {
      name: "id",
      type: "uuid",
      primaryKey: true,
      allowNull: false,
      interface: "uuid",
      uiSchema: {
        type: "string",
        title: '{{t("ID")}}',
        "x-component": "Input",
        "x-read-pretty": true
      }
    },
    {
      name: "channelName",
      type: "string",
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("Channel name")}}',
        "x-component": "Input"
      }
    },
    {
      name: "channelTitle",
      type: "string",
      interface: "input",
      uiSchema: {
        type: "string",
        "x-component": "Input",
        title: '{{t("Channel display name")}}'
      }
    },
    {
      name: "triggerFrom",
      type: "string",
      interface: "input",
      uiSchema: {
        type: "string",
        "x-component": "Input",
        title: '{{t("Trigger from")}}'
      }
    },
    {
      name: "notificationType",
      type: "string",
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("Notification type")}}',
        "x-component": "Select",
        enum: "{{notificationTypeOptions}}",
        required: true
      }
    },
    {
      name: "status",
      type: "string",
      interface: "select",
      uiSchema: {
        type: "string",
        "x-component": "Select",
        enum: [
          { label: '{{t("Success")}}', value: "success", color: "green" },
          { label: '{{t("Failure")}}', value: "failure", color: "red" }
        ],
        title: '{{t("Status")}}'
      }
    },
    {
      name: "message",
      type: "json",
      interface: "json",
      uiSchema: {
        "x-component": "Input.JSON",
        title: '{{t("Message")}}',
        "x-component-props": { autoSize: { minRows: 5 } },
        autoSize: { minRows: 5 }
      }
    },
    {
      name: "reason",
      type: "text",
      interface: "input",
      uiSchema: {
        type: "string",
        "x-component": "Input",
        title: '{{t("Failed reason")}}'
      }
    },
    {
      name: "createdAt",
      type: "date",
      interface: "createdAt",
      field: "createdAt",
      uiSchema: {
        type: "datetime",
        title: '{{t("Created at")}}',
        "x-component": "DatePicker",
        "x-component-props": {},
        "x-read-pretty": true
      }
    },
    {
      name: "updatedAt",
      type: "date",
      interface: "updatedAt",
      field: "updatedAt",
      uiSchema: {
        type: "datetime",
        title: '{{t("Last updated at")}}',
        "x-component": "DatePicker",
        "x-component-props": {},
        "x-read-pretty": true
      }
    }
  ]
};
