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
var client_exports = {};
__export(client_exports, {
  NocoBaseClientPresetPlugin: () => NocoBaseClientPresetPlugin
});
module.exports = __toCommonJS(client_exports);
var import_client = require("@nocobase/client");
function offsetToTimeZone(offset) {
  const hours = Math.floor(Math.abs(offset));
  const minutes = Math.abs(offset % 1 * 60);
  const formattedHours = (hours < 10 ? "0" : "") + hours;
  const formattedMinutes = (minutes < 10 ? "0" : "") + minutes;
  const sign = offset >= 0 ? "+" : "-";
  return sign + formattedHours + ":" + formattedMinutes;
}
__name(offsetToTimeZone, "offsetToTimeZone");
const getCurrentTimezone = /* @__PURE__ */ __name(() => {
  const timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset() / -60;
  return offsetToTimeZone(timezoneOffset);
}, "getCurrentTimezone");
function getBasename(app) {
  const publicPath = app.getPublicPath();
  const pattern = `^${publicPath}apps/([^/]*)/`;
  const match = location.pathname.match(new RegExp(pattern));
  return match ? match[0] : publicPath;
}
__name(getBasename, "getBasename");
const _NocoBaseClientPresetPlugin = class _NocoBaseClientPresetPlugin extends import_client.Plugin {
  async afterAdd() {
    this.router.setType("browser");
    this.router.setBasename(getBasename(this.app));
    this.app.apiClient.axios.interceptors.request.use((config) => {
      var _a;
      config.headers["X-Hostname"] = (_a = window == null ? void 0 : window.location) == null ? void 0 : _a.hostname;
      config.headers["X-Timezone"] = getCurrentTimezone();
      return config;
    });
    await this.app.pm.add(import_client.NocoBaseBuildInPlugin);
  }
};
__name(_NocoBaseClientPresetPlugin, "NocoBaseClientPresetPlugin");
let NocoBaseClientPresetPlugin = _NocoBaseClientPresetPlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NocoBaseClientPresetPlugin
});
