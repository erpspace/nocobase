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
var config_exports = {};
__export(config_exports, {
  buildRedisUrl: () => buildRedisUrl,
  defaultOptions: () => defaultOptions
});
module.exports = __toCommonJS(config_exports);
const defaultOptions = {
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: parseInt(process.env.REDIS_PORT || "6379"),
  redisPassword: process.env.REDIS_PASSWORD,
  redisDb: parseInt(process.env.REDIS_DB || "0"),
  enableWebSocketManager: true,
  cacheTtl: 3600,
  // 1 hour
  keyPrefix: "nocobase:multicore"
};
function buildRedisUrl(options) {
  if (options.redisUrl) {
    return options.redisUrl;
  }
  let url = "redis://";
  if (options.redisPassword) {
    url += `:${options.redisPassword}@`;
  }
  url += `${options.redisHost}:${options.redisPort}`;
  if (options.redisDb) {
    url += `/${options.redisDb}`;
  }
  return url;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildRedisUrl,
  defaultOptions
});
