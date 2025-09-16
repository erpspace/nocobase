/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var checkModal_exports = {};
__export(checkModal_exports, {
  checkModal: () => checkModal
});
module.exports = __toCommonJS(checkModal_exports);
var import_react = require("@testing-library/react");
var import_user_event = __toESM(require("@testing-library/user-event"));
var import_formItemChecker = require("../formItemChecker");
var import_utils = require("./utils");
var import_web = require("../../web");
async function checkModal(options) {
  const { triggerText, modalTitle, confirmTitle, submitText = "OK", formItems = [] } = options;
  await (0, import_react.waitFor)(() => {
    (0, import_utils.expectNoTsError)(import_react.screen.queryByText(triggerText)).toBeInTheDocument();
  });
  await import_user_event.default.click(import_react.screen.getByText(triggerText));
  await (0, import_react.waitFor)(() => {
    (0, import_utils.expectNoTsError)(import_react.screen.queryByRole("dialog")).toBeInTheDocument();
  });
  const dialog = import_react.screen.getByRole("dialog");
  if (modalTitle) {
    (0, import_utils.expectNoTsError)(dialog.querySelector(".ant-modal-title")).toHaveTextContent(modalTitle);
  }
  if (confirmTitle) {
    (0, import_utils.expectNoTsError)(dialog.querySelector(".ant-modal-confirm-title")).toHaveTextContent(confirmTitle);
  }
  if (options.contentText) {
    (0, import_utils.expectNoTsError)(dialog).toHaveTextContent(options.contentText);
  }
  if (options.beforeCheck) {
    await options.beforeCheck();
  }
  if (options.customCheck) {
    await options.customCheck();
  }
  await (0, import_formItemChecker.checkFormItems)(formItems);
  await import_user_event.default.click(import_react.screen.getByText(submitText));
  await (0, import_react.waitFor)(() => {
    (0, import_utils.expectNoTsError)(import_react.screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  if (options.afterSubmit) {
    await (0, import_web.sleep)(100);
    await options.afterSubmit();
  }
}
__name(checkModal, "checkModal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkModal
});
