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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var settingsChecker_exports = {};
__export(settingsChecker_exports, {
  checkSettings: () => checkSettings
});
module.exports = __toCommonJS(settingsChecker_exports);
var import_vitest = require("vitest");
var import_react = require("@testing-library/react");
var import_delete = require("./delete");
var import_modal = require("./modal");
var import_switch = require("./switch");
var import_select = require("./select");
var import_renderSettings = require("../renderSettings");
__reExport(settingsChecker_exports, require("./delete"), module.exports);
__reExport(settingsChecker_exports, require("./modal"), module.exports);
__reExport(settingsChecker_exports, require("./switch"), module.exports);
__reExport(settingsChecker_exports, require("./select"), module.exports);
const types = {
  switch: import_switch.checkSwitchSetting,
  modal: import_modal.checkModalSetting,
  delete: import_delete.checkDeleteSetting,
  select: import_select.checkSelectSetting
};
async function checkSettings(list, checkLength = false) {
  if (checkLength) {
    const menuList = import_react.screen.getByTestId("schema-settings-menu");
    (0, import_vitest.expect)(menuList.querySelectorAll('li[role="menuitem"]')).toHaveLength(list.length);
  }
  for (const item of list) {
    if (!import_react.screen.queryByTestId("schema-settings-menu")) {
      await (0, import_renderSettings.showSettingsMenu)();
    }
    const type = item.type;
    const checker = types[type];
    await checker(item);
  }
}
__name(checkSettings, "checkSettings");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkSettings,
  ...require("./delete"),
  ...require("./modal"),
  ...require("./switch"),
  ...require("./select")
});
