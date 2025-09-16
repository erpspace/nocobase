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
var request_logger_exports = {};
__export(request_logger_exports, {
  requestLogger: () => requestLogger
});
module.exports = __toCommonJS(request_logger_exports);
var import_lodash = require("lodash");
const defaultRequestWhitelist = [
  "action",
  "header.x-role",
  "header.x-hostname",
  "header.x-timezone",
  "header.x-locale",
  "header.x-authenticator",
  "header.x-data-source",
  "referer"
];
const defaultResponseWhitelist = ["status"];
const defaultActionBlackList = [
  "params.values.password",
  "params.values.confirmPassword",
  "params.values.oldPassword",
  "params.values.newPassword"
];
const requestLogger = /* @__PURE__ */ __name((appName, requestLogger2, options) => {
  return /* @__PURE__ */ __name(async function requestLoggerMiddleware(ctx, next) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const reqId = ctx.reqId;
    const path = /^\/api\/(.+):(.+)/.exec(ctx.path);
    const contextLogger = ctx.app.log.child({ reqId, module: path == null ? void 0 : path[1], submodule: path == null ? void 0 : path[2] });
    ctx.logger = ctx.log = contextLogger;
    const startTime = Date.now();
    const requestInfo = {
      method: ctx.method,
      path: ctx.url
    };
    requestLogger2.info({
      message: `request ${ctx.method} ${ctx.url}`,
      ...requestInfo,
      req: (0, import_lodash.pick)(ctx.request.toJSON(), (options == null ? void 0 : options.requestWhitelist) || defaultRequestWhitelist),
      action: (_b = (_a = ctx.action) == null ? void 0 : _a.toJSON) == null ? void 0 : _b.call(_a),
      app: appName,
      reqId
    });
    let error;
    try {
      await next();
    } catch (e) {
      error = e;
    } finally {
      const cost = Date.now() - startTime;
      const status = ctx.status;
      const info = {
        message: `response ${ctx.url}`,
        ...requestInfo,
        res: (0, import_lodash.pick)(ctx.response.toJSON(), (options == null ? void 0 : options.responseWhitelist) || defaultResponseWhitelist),
        action: (0, import_lodash.omit)((_d = (_c = ctx.action) == null ? void 0 : _c.toJSON) == null ? void 0 : _d.call(_c), defaultActionBlackList),
        userId: (_f = (_e = ctx.auth) == null ? void 0 : _e.user) == null ? void 0 : _f.id,
        status: ctx.status,
        cost,
        app: appName,
        reqId,
        bodySize: ctx.response.length
      };
      if (Math.floor(status / 100) == 5) {
        requestLogger2.error({ ...info, res: ((_g = ctx.body) == null ? void 0 : _g["errors"]) || ctx.body });
      } else if (Math.floor(status / 100) == 4) {
        requestLogger2.warn({ ...info, res: ((_h = ctx.body) == null ? void 0 : _h["errors"]) || ctx.body });
      } else {
        requestLogger2.info(info);
      }
    }
    ctx.res.setHeader("X-Request-Id", reqId);
    if (error) {
      throw error;
    }
  }, "requestLoggerMiddleware");
}, "requestLogger");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  requestLogger
});
