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
var renderHookWithApp_exports = {};
__export(renderHookWithApp_exports, {
  renderHookWithApp: () => renderHookWithApp
});
module.exports = __toCommonJS(renderHookWithApp_exports);
var import_react = __toESM(require("react"));
var import_react_hooks = require("@testing-library/react-hooks");
var import_web = require("../web");
var import_utils = require("./utils");
const renderHookWithApp = /* @__PURE__ */ __name(async (options) => {
  const { hook: useHook, props, Wrapper = import_react.Fragment, ...otherOptions } = options;
  const { App } = (0, import_web.getApp)(otherOptions);
  const WrapperValue = /* @__PURE__ */ __name(({ children }) => /* @__PURE__ */ import_react.default.createElement(App, null, /* @__PURE__ */ import_react.default.createElement(Wrapper, null, children)), "WrapperValue");
  const res = (0, import_react_hooks.renderHook)(() => useHook(), { wrapper: WrapperValue, initialProps: props });
  await (0, import_utils.WaitApp)();
  return res;
}, "renderHookWithApp");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  renderHookWithApp
});
