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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var fieldTitle_exports = {};
__export(fieldTitle_exports, {
  checkFieldTitle: () => checkFieldTitle
});
module.exports = __toCommonJS(fieldTitle_exports);
var import_react = require("@testing-library/react");
var import_settingsChecker = require("../settingsChecker");
var import_utils = require("../utils");
async function checkFieldTitle(oldValue) {
  const newValue = "new test";
  await (0, import_settingsChecker.checkSettings)([
    {
      type: "modal",
      title: "Edit field title",
      modalChecker: {
        modalTitle: "Edit field title",
        formItems: [
          {
            type: "input",
            label: "Field title",
            oldValue,
            newValue
          }
        ],
        async afterSubmit() {
          await (0, import_react.waitFor)(() => {
            (0, import_utils.expectNoTsError)(import_react.screen.queryByText(newValue)).toBeInTheDocument();
          });
        }
      }
    }
  ]);
}
__name(checkFieldTitle, "checkFieldTitle");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkFieldTitle
});
