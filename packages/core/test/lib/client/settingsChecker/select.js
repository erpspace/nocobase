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
var select_exports = {};
__export(select_exports, {
  checkSelectSetting: () => checkSelectSetting
});
module.exports = __toCommonJS(select_exports);
var import_react = require("@testing-library/react");
var import_user_event = __toESM(require("@testing-library/user-event"));
var import_utils = require("../utils");
async function checkSelectSetting(options) {
  if (options.beforeSelect) {
    await options.beforeSelect();
  }
  const formItem = import_react.screen.getByTitle(options.title);
  if (options.oldValue) {
    (0, import_utils.expectNoTsError)(formItem).toHaveTextContent(options.oldValue);
  }
  if (options.options) {
    const getListbox = /* @__PURE__ */ __name(() => document.querySelector(`.select-popup-${options.title.replaceAll(" ", "-")}`), "getListbox");
    (0, import_utils.expectNoTsError)(formItem.querySelector(".ant-select-selector")).toBeInTheDocument();
    await import_user_event.default.click(formItem.querySelector(".ant-select-selector"));
    await (0, import_react.waitFor)(() => {
      (0, import_utils.expectNoTsError)(getListbox()).toBeInTheDocument();
    });
    for (const option of options.options) {
      const listbox = getListbox();
      (0, import_utils.expectNoTsError)(listbox).toHaveTextContent(option.label);
      if (option.checker) {
        const item = [...listbox.querySelectorAll(".ant-select-item-option-content")].find(
          (item2) => item2.textContent === option.label
        );
        await import_user_event.default.click(item);
        await (0, import_react.waitFor)(() => {
          (0, import_utils.expectNoTsError)(import_react.screen.getByTitle(options.title)).toHaveTextContent(option.label);
        });
        await option.checker();
        await import_user_event.default.click(import_react.screen.getByTitle(options.title).querySelector(".ant-select-selection-item"));
        await (0, import_react.waitFor)(() => {
          (0, import_utils.expectNoTsError)(getListbox()).toBeInTheDocument();
        });
      }
    }
  }
}
__name(checkSelectSetting, "checkSelectSetting");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkSelectSetting
});
