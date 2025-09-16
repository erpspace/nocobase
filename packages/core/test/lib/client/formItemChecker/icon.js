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
var icon_exports = {};
__export(icon_exports, {
  iconChecker: () => iconChecker
});
module.exports = __toCommonJS(icon_exports);
var import_user_event = __toESM(require("@testing-library/user-event"));
var import_common = require("./common");
var import_react = require("@testing-library/react");
var import_utils = require("../utils");
async function iconChecker(options) {
  const formItem = (0, import_common.getFormItemElement)({ Component: "IconPicker", ...options });
  if (options.oldValue) {
    (0, import_utils.expectNoTsError)(formItem.querySelector("span[role=img]")).toHaveAttribute("aria-label", options.oldValue);
  }
  if (options.newValue) {
    await import_user_event.default.click(formItem.querySelector("span[role=img]") || formItem.querySelector("button"));
    await (0, import_react.waitFor)(() => {
      (0, import_utils.expectNoTsError)(import_react.screen.queryByRole("tooltip")).toBeInTheDocument();
    });
    await import_user_event.default.click(import_react.screen.getByRole("tooltip").querySelector(`span[aria-label="${options.newValue}"]`));
    await (0, import_react.waitFor)(() => {
      (0, import_utils.expectNoTsError)(import_react.screen.queryByRole("tooltip")).not.toBeInTheDocument();
    });
    (0, import_utils.expectNoTsError)(formItem.querySelector("span[role=img]")).toHaveAttribute("aria-label", options.newValue);
  }
}
__name(iconChecker, "iconChecker");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  iconChecker
});
