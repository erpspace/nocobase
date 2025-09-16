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
var messages_exports = {};
__export(messages_exports, {
  messageCollection: () => messageCollection
});
module.exports = __toCommonJS(messages_exports);
var import_index = require("./index");
const messageCollection = {
  name: import_index.InAppMessagesDefinition.name,
  title: "in-app messages",
  migrationRules: ["schema-only"],
  fields: [
    {
      name: import_index.InAppMessagesDefinition.fieldNameMap.id,
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
      name: import_index.InAppMessagesDefinition.fieldNameMap.userId,
      type: "bigInt",
      uiSchema: {
        type: "number",
        "x-component": "Input",
        title: '{{t("User ID")}}',
        required: true
      }
    },
    {
      name: "channel",
      type: "belongsTo",
      interface: "m2o",
      target: "notificationChannels",
      targetKey: "name",
      foreignKey: import_index.InAppMessagesDefinition.fieldNameMap.channelName,
      uiSchema: {
        type: "string",
        "x-component": "AssociationField",
        title: '{{t("Channel")}}'
      }
    },
    {
      name: import_index.InAppMessagesDefinition.fieldNameMap.title,
      type: "text",
      uiSchema: {
        type: "string",
        "x-component": "Input",
        title: '{{t("Title")}}',
        required: true
      }
    },
    {
      name: import_index.InAppMessagesDefinition.fieldNameMap.content,
      type: "text",
      interface: "string",
      uiSchema: {
        type: "string",
        title: '{{t("Content")}}',
        "x-component": "Input"
      }
    },
    {
      name: import_index.InAppMessagesDefinition.fieldNameMap.status,
      type: "string",
      uiSchema: {
        type: "string",
        "x-component": "Input",
        title: '{{t("Status")}}',
        required: true
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
      name: import_index.InAppMessagesDefinition.fieldNameMap.receiveTimestamp,
      type: "bigInt"
    },
    {
      name: import_index.InAppMessagesDefinition.fieldNameMap.options,
      type: "json"
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  messageCollection
});
