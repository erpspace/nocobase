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
var notifications_exports = {};
__export(notifications_exports, {
  default: () => notifications_default
});
module.exports = __toCommonJS(notifications_exports);
var import_models = require("../models");
var notifications_default = {
  name: "notifications",
  model: import_models.Notification,
  title: "\u901A\u77E5",
  fields: [
    {
      type: "uid",
      name: "name",
      prefix: "n_"
    },
    {
      title: "\u4E3B\u9898",
      type: "string",
      name: "subject"
    },
    {
      title: "\u5185\u5BB9",
      type: "text",
      name: "body"
    },
    {
      title: "\u63A5\u6536\u4EBA\u914D\u7F6E",
      type: "json",
      name: "receiver_options"
    },
    {
      title: "\u53D1\u9001\u670D\u52A1",
      type: "belongsTo",
      name: "service",
      target: "notification_services"
    },
    {
      title: "\u65E5\u5FD7",
      type: "hasMany",
      name: "logs",
      target: "notification_logs"
    }
  ]
};
