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
var delete_exports = {};
__export(delete_exports, {
  checkDeleteSetting: () => checkDeleteSetting
});
module.exports = __toCommonJS(delete_exports);
var import_react = require("@testing-library/react");
var import_utils = require("../utils");
async function checkDeleteSetting(options) {
  if (options.modalChecker) {
    await (0, import_utils.checkModal)({
      triggerText: options.title,
      contentText: "Are you sure you want to delete it?",
      ...options.modalChecker,
      async afterSubmit() {
        if (options.modalChecker.afterSubmit) {
          await options.modalChecker.afterSubmit();
        }
        if (options.deletedText) {
          (0, import_utils.expectNoTsError)(import_react.screen.queryByText(options.deletedText)).not.toBeInTheDocument();
        }
      }
    });
  }
  if (options.afterClick) {
    await options.afterClick();
  }
}
__name(checkDeleteSetting, "checkDeleteSetting");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkDeleteSetting
});
