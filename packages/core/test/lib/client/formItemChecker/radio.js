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
var radio_exports = {};
__export(radio_exports, {
  radioChecker: () => radioChecker
});
module.exports = __toCommonJS(radio_exports);
var import_user_event = __toESM(require("@testing-library/user-event"));
var import_common = require("./common");
var import_react = require("@testing-library/react");
var import_utils = require("../utils");
async function radioChecker(options) {
  const formItem = (0, import_common.getFormItemElement)({ Component: "Radio.Group", ...options });
  const radioGroup = formItem.querySelector(".ant-radio-group");
  if (options.oldValue) {
    (0, import_utils.expectNoTsError)(radioGroup.querySelector(".ant-radio-wrapper-checked")).toHaveTextContent(options.oldValue);
  }
  if (options.newValue) {
    const el = [...radioGroup.querySelectorAll(".ant-radio-wrapper")].find((el2) => el2.textContent === options.newValue);
    (0, import_utils.expectNoTsError)(el).toBeInTheDocument();
    await import_user_event.default.click(el);
    await (0, import_react.waitFor)(() => {
      (0, import_utils.expectNoTsError)(radioGroup.querySelector(".ant-radio-wrapper-checked")).toHaveTextContent(options.newValue);
    });
  }
}
__name(radioChecker, "radioChecker");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  radioChecker
});
