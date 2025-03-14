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
var send_exports = {};
__export(send_exports, {
  getParsedValue: () => getParsedValue,
  send: () => send
});
module.exports = __toCommonJS(send_exports);
var import_utils = require("@nocobase/utils");
var import_evaluators = require("@nocobase/evaluators");
var import_axios = __toESM(require("axios"));
const getHeaders = (headers) => {
  return Object.keys(headers).reduce((hds, key) => {
    if (key.toLocaleLowerCase().startsWith("x-")) {
      hds[key] = headers[key];
    }
    return hds;
  }, {});
};
const arrayToObject = (arr) => {
  return arr.reduce((acc, cur) => {
    acc[cur.name] = cur.value;
    return acc;
  }, {});
};
const omitNullAndUndefined = (obj) => {
  return Object.keys(obj).reduce((acc, cur) => {
    if (obj[cur] !== null && typeof obj[cur] !== "undefined") {
      acc[cur] = obj[cur];
    }
    return acc;
  }, {});
};
const CurrentUserVariableRegExp = /{{\s*(currentUser[^}]+)\s*}}/g;
const getCurrentUserAppends = (str, user) => {
  const matched = str.matchAll(CurrentUserVariableRegExp);
  return Array.from(matched).map((item) => {
    const keys = (item == null ? void 0 : item[1].split(".")) || [];
    const appendKey = keys[1];
    if (keys.length > 2 && !Reflect.has(user || {}, appendKey)) {
      return appendKey;
    }
  }).filter(Boolean);
};
const getParsedValue = (value, variables) => {
  const template = (0, import_utils.parse)(value);
  template.parameters.forEach(({ key }) => {
    (0, import_evaluators.appendArrayColumn)(variables, key);
  });
  return template(variables);
};
async function send(ctx, next) {
  var _a, _b, _c, _d;
  const resourceName = ctx.action.resourceName;
  const { filterByTk, values = {} } = ctx.action.params;
  const {
    currentRecord = {
      id: 0,
      appends: [],
      data: {}
    },
    $nForm
  } = values;
  if (ctx.state.currentRole !== "root") {
    const crRepo = ctx.db.getRepository("uiButtonSchemasRoles");
    const hasRoles = await crRepo.find({
      filter: {
        uid: filterByTk
      }
    });
    if (hasRoles.length) {
      if (!hasRoles.find((item) => item.roleName === ctx.state.currentRole)) {
        return ctx.throw(403, "custom request no permission");
      }
    }
  }
  const repo = ctx.db.getRepository(resourceName);
  const requestConfig = await repo.findOne({
    filter: {
      key: filterByTk
    }
  });
  if (!requestConfig) {
    ctx.throw(404, "request config not found");
  }
  ctx.withoutDataWrapping = true;
  const {
    dataSourceKey,
    collectionName,
    url,
    headers = [],
    params = [],
    data = {},
    ...options
  } = requestConfig.options || {};
  if (!url) {
    return ctx.throw(400, ctx.t("Please configure the request settings first", { ns: "action-custom-request" }));
  }
  let currentRecordValues = {};
  if (collectionName && typeof currentRecord.id !== "undefined") {
    const app = ctx.app;
    const dataSource = app.dataSourceManager.get(dataSourceKey || currentRecord.dataSourceKey || "main");
    const recordRepo = dataSource.collectionManager.getRepository(collectionName);
    currentRecordValues = ((_a = await recordRepo.findOne({
      filterByTk: currentRecord.id,
      appends: currentRecord.appends
    })) == null ? void 0 : _a.toJSON()) || {};
  }
  let currentUser = ctx.auth.user;
  const userAppends = getCurrentUserAppends(
    JSON.stringify(url) + JSON.stringify(headers) + JSON.stringify(params) + JSON.stringify(data),
    ctx.auth.user
  );
  if (userAppends.length) {
    currentUser = ((_b = await ctx.db.getRepository("users").findOne({
      filterByTk: ctx.auth.user.id,
      appends: userAppends
    })) == null ? void 0 : _b.toJSON()) || {};
  }
  const variables = {
    currentRecord: {
      ...currentRecordValues,
      ...currentRecord.data
    },
    currentUser,
    currentTime: (/* @__PURE__ */ new Date()).toISOString(),
    $nToken: ctx.getBearerToken(),
    $nForm,
    $env: ctx.app.environment.getVariables()
  };
  const axiosRequestConfig = {
    baseURL: ctx.origin,
    ...options,
    url: getParsedValue(url, variables),
    headers: {
      Authorization: "Bearer " + ctx.getBearerToken(),
      ...getHeaders(ctx.headers),
      ...omitNullAndUndefined(getParsedValue(arrayToObject(headers), variables))
    },
    params: getParsedValue(arrayToObject(params), variables),
    data: getParsedValue(data, variables)
  };
  const requestUrl = import_axios.default.getUri(axiosRequestConfig);
  this.logger.info(`custom-request:send:${filterByTk} request url ${requestUrl}`);
  this.logger.info(
    `custom-request:send:${filterByTk} request config ${JSON.stringify({
      ...axiosRequestConfig,
      headers: {
        ...axiosRequestConfig.headers,
        Authorization: null
      }
    })}`
  );
  try {
    const res = await (0, import_axios.default)(axiosRequestConfig);
    this.logger.info(`custom-request:send:${filterByTk} success`);
    ctx.body = res.data;
    if (res.headers["content-disposition"]) {
      ctx.set("Content-Disposition", res.headers["content-disposition"]);
    }
  } catch (err) {
    if (import_axios.default.isAxiosError(err)) {
      ctx.status = ((_c = err.response) == null ? void 0 : _c.status) || 500;
      ctx.body = ((_d = err.response) == null ? void 0 : _d.data) || { message: err.message };
      this.logger.error(
        `custom-request:send:${filterByTk} error. status: ${ctx.status}, body: ${typeof ctx.body === "string" ? ctx.body : JSON.stringify(ctx.body)}`
      );
    } else {
      this.logger.error(`custom-request:send:${filterByTk} error. status: ${ctx.status}, message: ${err.message}`);
      ctx.throw(500, err == null ? void 0 : err.message);
    }
  }
  return next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getParsedValue,
  send
});
