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
var helper_exports = {};
__export(helper_exports, {
  createAppProxy: () => createAppProxy,
  createI18n: () => createI18n,
  createResourcer: () => createResourcer,
  enablePerfHooks: () => enablePerfHooks,
  getBodyLimit: () => getBodyLimit,
  getCommandFullName: () => getCommandFullName,
  registerMiddlewares: () => registerMiddlewares,
  tsxRerunning: () => tsxRerunning
});
module.exports = __toCommonJS(helper_exports);
var import_cors = __toESM(require("@koa/cors"));
var import_logger = require("@nocobase/logger");
var import_resourcer = require("@nocobase/resourcer");
var import_utils = require("@nocobase/utils");
var import_crypto = require("crypto");
var import_fs = __toESM(require("fs"));
var import_i18next = __toESM(require("i18next"));
var import_koa_bodyparser = __toESM(require("koa-bodyparser"));
var import_perf_hooks = require("perf_hooks");
var import_data_wrapping = require("./middlewares/data-wrapping");
var import_extract_client_ip = require("./middlewares/extract-client-ip");
var import_i18n = require("./middlewares/i18n");
function createI18n(options) {
  const instance = import_i18next.default.createInstance();
  instance.init({
    lng: process.env.INIT_LANG || "en-US",
    resources: {},
    keySeparator: false,
    nsSeparator: false,
    ...options.i18n
  });
  return instance;
}
__name(createI18n, "createI18n");
function createResourcer(options) {
  return new import_resourcer.Resourcer({ ...options.resourcer });
}
__name(createResourcer, "createResourcer");
function registerMiddlewares(app, options) {
  var _a;
  app.use(
    /* @__PURE__ */ __name(async function generateReqId(ctx, next) {
      app.context.reqId = (0, import_crypto.randomUUID)();
      await next();
    }, "generateReqId"),
    { tag: "generateReqId" }
  );
  app.use(app.auditManager.middleware(), { tag: "audit", after: "generateReqId" });
  app.use((0, import_logger.requestLogger)(app.name, app.requestLogger, (_a = options.logger) == null ? void 0 : _a.request), { tag: "logger" });
  app.use(
    (0, import_cors.default)({
      exposeHeaders: ["content-disposition"],
      origin(ctx) {
        return ctx.get("origin");
      },
      ...options.cors
    }),
    {
      tag: "cors",
      after: "bodyParser"
    }
  );
  if (options.bodyParser !== false) {
    const bodyLimit = getBodyLimit();
    app.use(
      (0, import_koa_bodyparser.default)({
        jsonLimit: bodyLimit,
        formLimit: bodyLimit,
        textLimit: bodyLimit,
        ...options.bodyParser
      }),
      {
        tag: "bodyParser",
        after: "logger"
      }
    );
  }
  app.use(/* @__PURE__ */ __name(async function getBearerToken(ctx, next) {
    ctx.getBearerToken = () => {
      const token = ctx.get("Authorization").replace(/^Bearer\s+/gi, "");
      return token || ctx.query.token;
    };
    await next();
  }, "getBearerToken"));
  app.use(import_i18n.i18n, { tag: "i18n", before: "cors" });
  if (options.dataWrapping !== false) {
    app.use((0, import_data_wrapping.dataWrapping)(), { tag: "dataWrapping", after: "cors" });
  }
  app.use(app.dataSourceManager.middleware(), { tag: "dataSource", after: "dataWrapping" });
  app.use((0, import_extract_client_ip.extractClientIp)(), { tag: "extractClientIp", before: "cors" });
}
__name(registerMiddlewares, "registerMiddlewares");
const createAppProxy = /* @__PURE__ */ __name((app) => {
  return new Proxy(app, {
    get(target, prop, ...args) {
      if (typeof prop === "string" && ["on", "once", "addListener"].includes(prop)) {
        return (eventName, listener) => {
          listener["_reinitializable"] = true;
          return target[prop](eventName, listener);
        };
      }
      return Reflect.get(target, prop, ...args);
    }
  });
}, "createAppProxy");
const getCommandFullName = /* @__PURE__ */ __name((command) => {
  const names = [];
  names.push(command.name());
  let parent = command == null ? void 0 : command.parent;
  while (parent) {
    if (!(parent == null ? void 0 : parent.parent)) {
      break;
    }
    names.unshift(parent.name());
    parent = parent.parent;
  }
  return names.join(".");
}, "getCommandFullName");
/* istanbul ignore next -- @preserve */
const tsxRerunning = /* @__PURE__ */ __name(async () => {
  await import_fs.default.promises.writeFile(process.env.WATCH_FILE, `export const watchId = '${(0, import_utils.uid)()}';`, "utf-8");
}, "tsxRerunning");
/* istanbul ignore next -- @preserve */
const enablePerfHooks = /* @__PURE__ */ __name((app) => {
  app.context.getPerfHistogram = (name) => {
    if (!app.perfHistograms.has(name)) {
      app.perfHistograms.set(name, (0, import_perf_hooks.createHistogram)());
    }
    return app.perfHistograms.get(name);
  };
  app.resourcer.define({
    name: "perf",
    actions: {
      view: /* @__PURE__ */ __name(async (ctx, next) => {
        const result = {};
        const histograms = ctx.app.perfHistograms;
        const sortedHistograms = [...histograms.entries()].sort(([i, a], [j, b]) => b.mean - a.mean);
        sortedHistograms.forEach(([name, histogram]) => {
          result[name] = histogram;
        });
        ctx.body = result;
        await next();
      }, "view"),
      reset: /* @__PURE__ */ __name(async (ctx, next) => {
        const histograms = ctx.app.perfHistograms;
        histograms.forEach((histogram) => histogram.reset());
        await next();
      }, "reset")
    }
  });
  app.acl.allow("perf", "*", "public");
}, "enablePerfHooks");
function getBodyLimit() {
  return process.env.REQUEST_BODY_LIMIT || "10mb";
}
__name(getBodyLimit, "getBodyLimit");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAppProxy,
  createI18n,
  createResourcer,
  enablePerfHooks,
  getBodyLimit,
  getCommandFullName,
  registerMiddlewares,
  tsxRerunning
});
