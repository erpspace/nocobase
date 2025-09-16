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
var common_exports = {};
__export(common_exports, {
  getFormItemElement: () => getFormItemElement
});
module.exports = __toCommonJS(common_exports);
var import_utils = require("../utils");
function getFormItemElement({ container = document.body, Component, label }) {
  const preSelector = `div[aria-label^="block-item-${Component}-"]`;
  const selector = label ? `${preSelector}[aria-label$="${label}"]` : preSelector;
  const formItem = container.querySelector(selector);
  (0, import_utils.expectNoTsError)(formItem).toBeInTheDocument();
  return formItem;
}
__name(getFormItemElement, "getFormItemElement");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFormItemElement
});
