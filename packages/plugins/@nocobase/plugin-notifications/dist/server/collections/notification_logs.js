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
var notification_logs_exports = {};
__export(notification_logs_exports, {
  default: () => notification_logs_default
});
module.exports = __toCommonJS(notification_logs_exports);
var import_models = require("../models");
var notification_logs_default = {
  name: "notification_logs",
  model: import_models.NotificationLog,
  title: "\u901A\u77E5\u65E5\u5FD7",
  fields: [
    {
      title: "\u63A5\u6536\u4EBA",
      type: "json",
      name: "receiver"
    },
    {
      title: "\u72B6\u6001",
      type: "string",
      name: "state"
    },
    {
      title: "\u8BE6\u60C5",
      type: "json",
      name: "response"
    }
  ]
};
