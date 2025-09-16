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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var client_exports = {};
__export(client_exports, {
  render: () => customRender,
  renderApp: () => renderApp,
  renderHook: () => import_react_hooks.renderHook,
  sleep: () => import_web.sleep,
  userEvent: () => import_user_event.default,
  waitForApp: () => waitForApp
});
module.exports = __toCommonJS(client_exports);
var import_react2 = require("@testing-library/react");
var import_web = require("../web");
__reExport(client_exports, require("./utils"), module.exports);
var import_react_hooks = require("@testing-library/react-hooks");
__reExport(client_exports, require("@testing-library/react"), module.exports);
var import_user_event = __toESM(require("@testing-library/user-event"));
__reExport(client_exports, require("./renderAppOptions"), module.exports);
__reExport(client_exports, require("./renderHookWithApp"), module.exports);
__reExport(client_exports, require("./renderSettings"), module.exports);
__reExport(client_exports, require("./renderSingleSettings"), module.exports);
__reExport(client_exports, require("./settingsChecker"), module.exports);
__reExport(client_exports, require("./commonSettingsChecker"), module.exports);
function customRender(ui, options = {}) {
  return (0, import_react2.render)(ui, {
    // wrap provider(s) here if needed
    wrapper: /* @__PURE__ */ __name(({ children }) => children, "wrapper"),
    ...options
  });
}
__name(customRender, "customRender");
async function waitForApp() {
  return (0, import_react2.waitFor)(() => {
    expect(import_react2.screen.queryByText("Loading...")).not.toBeInTheDocument();
  });
}
__name(waitForApp, "waitForApp");
async function renderApp(element) {
  const res = (0, import_react2.render)(element);
  await waitForApp();
  return res;
}
__name(renderApp, "renderApp");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  render,
  renderApp,
  renderHook,
  sleep,
  userEvent,
  waitForApp,
  ...require("./utils"),
  ...require("@testing-library/react"),
  ...require("./renderAppOptions"),
  ...require("./renderHookWithApp"),
  ...require("./renderSettings"),
  ...require("./renderSingleSettings"),
  ...require("./settingsChecker"),
  ...require("./commonSettingsChecker")
});
