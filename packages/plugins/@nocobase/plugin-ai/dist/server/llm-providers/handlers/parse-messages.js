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
var parse_messages_exports = {};
__export(parse_messages_exports, {
  parseMessages: () => parseMessages
});
module.exports = __toCommonJS(parse_messages_exports);
var import_messages = require("@langchain/core/messages");
async function parseMessage(message) {
  switch (message.role) {
    case "system":
      return new import_messages.SystemMessage(message.message);
    case "assistant":
      return new import_messages.AIMessage(message.message);
    case "user": {
      if (message.content.length === 1) {
        const msg = message.content[0];
        return new import_messages.HumanMessage(msg.content);
      }
      const content = [];
      for (const c of message.content) {
        if (c.type === "text") {
          content.push({
            type: "text",
            text: c.content
          });
        }
      }
      return new import_messages.HumanMessage({
        content
      });
    }
  }
}
async function parseMessages() {
  const msgs = [];
  for (const message of this.messages) {
    const msg = await parseMessage(message);
    msgs.push(msg);
  }
  this.messages = msgs;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseMessages
});
