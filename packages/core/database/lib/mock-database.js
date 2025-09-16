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
var mock_database_exports = {};
__export(mock_database_exports, {
  MockDatabase: () => MockDatabase,
  createMockDatabase: () => createMockDatabase,
  getConfigByEnv: () => getConfigByEnv,
  mockDatabase: () => mockDatabase
});
module.exports = __toCommonJS(mock_database_exports);
var import_database = require("@nocobase/database");
var import_utils = require("@nocobase/utils");
var import_nanoid = require("nanoid");
var import_node_fetch = __toESM(require("node-fetch"));
var import_path = __toESM(require("path"));
/* istanbul ignore file -- @preserve */
const _MockDatabase = class _MockDatabase extends import_database.Database {
  constructor(options) {
    super({
      storage: ":memory:",
      dialect: "sqlite",
      ...options
    });
  }
};
__name(_MockDatabase, "MockDatabase");
let MockDatabase = _MockDatabase;
function getConfigByEnv() {
  const options = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "sqlite",
    logging: process.env.DB_LOGGING === "on" ? customLogger : false,
    storage: process.env.DB_STORAGE,
    define: {
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci"
    },
    timezone: process.env.DB_TIMEZONE,
    underscored: process.env.DB_UNDERSCORED === "true",
    schema: process.env.DB_SCHEMA !== "public" ? process.env.DB_SCHEMA : void 0,
    dialectOptions: {}
  };
  if (process.env.DB_DIALECT == "postgres") {
    options.dialectOptions["application_name"] = "nocobase.main";
  }
  return options;
}
__name(getConfigByEnv, "getConfigByEnv");
function customLogger(queryString, queryObject) {
  console.log(queryString);
  if (queryObject == null ? void 0 : queryObject.bind) {
    console.log(queryObject.bind);
  }
}
__name(customLogger, "customLogger");
async function createMockDatabase(options = {}) {
  try {
    const { runPluginStaticImports } = await import("@nocobase/server");
    await runPluginStaticImports();
  } catch (error) {
  }
  return mockDatabase(options);
}
__name(createMockDatabase, "createMockDatabase");
function mockDatabase(options = {}) {
  const dbOptions = (0, import_utils.merge)(getConfigByEnv(), options);
  let db;
  if (process.env["DB_TEST_PREFIX"]) {
    let configKey = "database";
    if (dbOptions.dialect === "sqlite") {
      configKey = "storage";
    } else {
      configKey = "database";
    }
    const shouldChange = /* @__PURE__ */ __name(() => {
      if (dbOptions.dialect === "sqlite") {
        return !dbOptions[configKey].includes(process.env["DB_TEST_PREFIX"]);
      }
      return !dbOptions[configKey].startsWith(process.env["DB_TEST_PREFIX"]);
    }, "shouldChange");
    if (dbOptions[configKey] && shouldChange()) {
      const nanoid = (0, import_nanoid.customAlphabet)("1234567890abcdefghijklmnopqrstuvwxyz", 10);
      const instanceId = `d_${nanoid()}`;
      const databaseName = `${process.env["DB_TEST_PREFIX"]}_${instanceId}`;
      if (dbOptions.dialect === "sqlite") {
        dbOptions.storage = import_path.default.resolve(import_path.default.dirname(dbOptions.storage), databaseName);
      } else {
        dbOptions.database = databaseName;
      }
    }
    if (process.env["DB_TEST_DISTRIBUTOR_PORT"]) {
      dbOptions.hooks = dbOptions.hooks || {};
      dbOptions.hooks.beforeConnect = async (config) => {
        const url = `http://127.0.0.1:${process.env["DB_TEST_DISTRIBUTOR_PORT"]}/acquire?via=${db.instanceId}&name=${config.database}`;
        await (0, import_node_fetch.default)(url);
      };
    }
  }
  db = new MockDatabase(dbOptions);
  return db;
}
__name(mockDatabase, "mockDatabase");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockDatabase,
  createMockDatabase,
  getConfigByEnv,
  mockDatabase
});
