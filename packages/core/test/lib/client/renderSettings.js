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
var renderSettings_exports = {};
__export(renderSettings_exports, {
  renderReadPrettySettings: () => renderReadPrettySettings,
  renderSettings: () => renderSettings,
  showSettingsMenu: () => showSettingsMenu
});
module.exports = __toCommonJS(renderSettings_exports);
var import_react = require("@testing-library/react");
var import_renderAppOptions = require("./renderAppOptions");
var import_utils = require("./utils");
async function showSettingsMenu(container = document) {
  await (0, import_react.waitFor)(() => {
    return (0, import_utils.expectNoTsError)(container.querySelector('[aria-label^="designer-schema-settings-"]')).toBeInTheDocument();
  });
  const button = await (0, import_react.waitFor)(() => {
    return container.querySelector('[aria-label^="designer-schema-settings-"]');
  });
  import_react.fireEvent.mouseEnter(button);
  import_react.fireEvent.mouseOver(button);
  await (0, import_react.waitFor)(() => {
    return (0, import_utils.expectNoTsError)(import_react.screen.queryByTestId("schema-settings-menu")).toBeInTheDocument();
  });
}
__name(showSettingsMenu, "showSettingsMenu");
const renderSettings = /* @__PURE__ */ __name(async (options = {}) => {
  const { container = /* @__PURE__ */ __name(() => document, "container"), ...appOptions } = options;
  const result = await (0, import_renderAppOptions.renderAppOptions)({ ...appOptions, designable: true });
  const containerElement = container();
  await showSettingsMenu(containerElement);
  return result;
}, "renderSettings");
const renderReadPrettySettings = /* @__PURE__ */ __name(async (options = {}) => {
  const { container = /* @__PURE__ */ __name(() => document, "container"), ...appOptions } = options;
  const result = await (0, import_renderAppOptions.renderReadPrettyApp)({ ...appOptions, designable: true });
  const containerElement = container();
  await showSettingsMenu(containerElement);
  return result;
}, "renderReadPrettySettings");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderReadPrettySettings,
  renderSettings,
  showSettingsMenu
});
