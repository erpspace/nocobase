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
var time_exports = {};
__export(time_exports, {
  time: () => time
});
module.exports = __toCommonJS(time_exports);
var import_faker = require("@faker-js/faker");
var import_utils = require("@nocobase/utils");
const time = {
  options: () => ({
    type: "time",
    // name,
    uiSchema: {
      type: "string",
      "x-component": "TimePicker",
      "x-component-props": {
        format: "HH:mm:ss"
      }
    }
  }),
  mock: () => (0, import_utils.dayjs)(import_faker.faker.date.anytime()).format("HH:mm:ss")
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  time
});
