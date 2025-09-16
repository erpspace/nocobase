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
var server_exports = {};
__export(server_exports, {
  MockDatabase: () => import_database.MockDatabase,
  createMockDatabase: () => import_database.createMockDatabase,
  createWsClient: () => createWsClient,
  isMysql: () => isMysql,
  isPg: () => isPg,
  mockDatabase: () => import_database.mockDatabase,
  randomStr: () => randomStr,
  sleep: () => sleep,
  startServerWithRandomPort: () => startServerWithRandomPort,
  supertest: () => import_supertest.default,
  waitSecond: () => waitSecond
});
module.exports = __toCommonJS(server_exports);
var import_ws = __toESM(require("ws"));
var import_database = require("@nocobase/database");
var import_supertest = __toESM(require("supertest"));
__reExport(server_exports, require("./memory-pub-sub-adapter"), module.exports);
__reExport(server_exports, require("./mock-isolated-cluster"), module.exports);
__reExport(server_exports, require("./mock-server"), module.exports);
const isPg = /* @__PURE__ */ __name(() => process.env.DB_DIALECT == "postgres", "isPg");
const isMysql = /* @__PURE__ */ __name(() => process.env.DB_DIALECT == "mysql", "isMysql");
function randomStr() {
  return Math.random().toString(36).substring(2);
}
__name(randomStr, "randomStr");
function sleep(ms = 1e3) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
__name(sleep, "sleep");
const waitSecond = sleep;
const startServerWithRandomPort = /* @__PURE__ */ __name(async (startServer) => {
  return await new Promise((resolve) => {
    startServer({
      port: 0,
      host: "localhost",
      callback(server) {
        const port = server.address().port;
        resolve(port);
      }
    });
  });
}, "startServerWithRandomPort");
const createWsClient = /* @__PURE__ */ __name(async ({ serverPort, options = {} }) => {
  console.log(`connect to ws://localhost:${serverPort}${process.env.WS_PATH}`, options);
  const wsc = new import_ws.default(`ws://localhost:${serverPort}${process.env.WS_PATH}`, options);
  const messages = [];
  wsc.on("message", (data) => {
    const message = data.toString();
    messages.push(message);
  });
  await new Promise((resolve) => {
    wsc.on("open", resolve);
  });
  return {
    wsc,
    messages,
    async stop() {
      const promise = new Promise((resolve) => {
        wsc.on("close", resolve);
      });
      wsc.close();
      await promise;
    },
    lastMessage() {
      return JSON.parse(messages[messages.length - 1]);
    }
  };
}, "createWsClient");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockDatabase,
  createMockDatabase,
  createWsClient,
  isMysql,
  isPg,
  mockDatabase,
  randomStr,
  sleep,
  startServerWithRandomPort,
  supertest,
  waitSecond,
  ...require("./memory-pub-sub-adapter"),
  ...require("./mock-isolated-cluster"),
  ...require("./mock-server")
});
