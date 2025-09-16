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
var notification_services_exports = {};
__export(notification_services_exports, {
  default: () => notification_services_default
});
module.exports = __toCommonJS(notification_services_exports);
var import_models = require("../models");
var notification_services_default = {
  name: "notification_services",
  model: import_models.NotificationService,
  title: "\u901A\u77E5\u670D\u52A1",
  fields: [
    {
      title: "\u7C7B\u578B",
      type: "string",
      name: "type"
    },
    {
      title: "\u670D\u52A1\u540D\u79F0",
      type: "string",
      name: "title"
    },
    {
      title: "\u914D\u7F6E\u4FE1\u606F",
      type: "json",
      name: "options"
    }
  ]
};
