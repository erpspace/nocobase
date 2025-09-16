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
var channels_exports = {};
__export(channels_exports, {
  channelsCollection: () => channelsCollection
});
module.exports = __toCommonJS(channels_exports);
var import__ = require(".");
const channelsCollection = {
  name: import__.ChannelsDefinition.name,
  title: "in-app messages",
  fields: [
    {
      name: import__.ChannelsDefinition.fieldNameMap.id,
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
      name: import__.ChannelsDefinition.fieldNameMap.senderId,
      type: "uuid",
      allowNull: false,
      interface: "uuid",
      uiSchema: {
        type: "string",
        title: '{{t("Sender ID")}}',
        "x-component": "Input",
        "x-read-pretty": true
      }
    },
    {
      name: "userId",
      type: "bigInt",
      uiSchema: {
        type: "number",
        "x-component": "Input",
        title: '{{t("User ID")}}',
        required: true
      }
    },
    {
      name: import__.ChannelsDefinition.fieldNameMap.title,
      type: "text",
      interface: "input",
      uiSchema: {
        type: "string",
        "x-component": "Input",
        title: '{{t("Title")}}',
        required: true
      }
    },
    {
      name: "latestMsgId",
      type: "string",
      interface: "input"
    }
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  channelsCollection
});
