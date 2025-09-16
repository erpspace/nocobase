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
var switch_exports = {};
__export(switch_exports, {
  checkSwitchSetting: () => checkSwitchSetting
});
module.exports = __toCommonJS(switch_exports);
var import_vitest = require("vitest");
var import_react = require("@testing-library/react");
var import_user_event = __toESM(require("@testing-library/user-event"));
var import_renderSettings = require("../renderSettings");
async function checkSwitchSetting(options) {
  if (options.beforeClick) {
    await options.beforeClick();
  }
  const formItem = import_react.screen.getByTitle(options.title);
  const switchElement = formItem.querySelector("button[role=switch]");
  let oldChecked = switchElement.getAttribute("aria-checked");
  const afterClick = /* @__PURE__ */ __name(async () => {
    const formItem2 = import_react.screen.queryByTitle(options.title);
    if (formItem2) {
      const switchElement2 = formItem2.querySelector("button[role=switch]");
      const newChecked = switchElement2.getAttribute("aria-checked");
      (0, import_vitest.expect)(newChecked).not.toBe(oldChecked);
      oldChecked = newChecked;
    } else {
      await (0, import_renderSettings.showSettingsMenu)();
    }
  }, "afterClick");
  if (options.afterFirstClick) {
    await import_user_event.default.click(formItem.querySelector("button[role=switch]"));
    await (0, import_react.waitFor)(async () => {
      await afterClick();
    });
    await options.afterFirstClick();
  }
  if (options.afterSecondClick) {
    await import_user_event.default.click(import_react.screen.getByText(options.title));
    await (0, import_react.waitFor)(async () => {
      await afterClick();
    });
    await options.afterSecondClick();
  }
  if (options.afterThirdClick) {
    await import_user_event.default.click(import_react.screen.getByText(options.title));
    await (0, import_react.waitFor)(async () => {
      await afterClick();
    });
    await options.afterThirdClick();
  }
}
__name(checkSwitchSetting, "checkSwitchSetting");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkSwitchSetting
});
