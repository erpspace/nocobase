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
var helpers_exports = {};
__export(helpers_exports, {
  checkDatabaseVersion: () => checkDatabaseVersion,
  parseDatabaseOptionsFromEnv: () => parseDatabaseOptionsFromEnv,
  registerDialects: () => registerDialects
});
module.exports = __toCommonJS(helpers_exports);
var import_database = require("./database");
var import_fs = __toESM(require("fs"));
var import_mysql_dialect = require("./dialects/mysql-dialect");
var import_sqlite_dialect = require("./dialects/sqlite-dialect");
var import_mariadb_dialect = require("./dialects/mariadb-dialect");
var import_postgres_dialect = require("./dialects/postgres-dialect");
/* istanbul ignore file -- @preserve */
function getEnvValue(key, defaultValue) {
  return process.env[key] || defaultValue;
}
__name(getEnvValue, "getEnvValue");
function isFilePath(value) {
  return import_fs.default.promises.stat(value).then((stats) => stats.isFile()).catch((err) => {
    if (err.code === "ENOENT") {
      return false;
    }
    throw err;
  });
}
__name(isFilePath, "isFilePath");
function getValueOrFileContent(envVarName) {
  const value = getEnvValue(envVarName);
  if (!value) {
    return Promise.resolve(null);
  }
  return isFilePath(value).then((isFile) => {
    if (isFile) {
      return import_fs.default.promises.readFile(value, "utf8");
    }
    return value;
  }).catch((error) => {
    console.error(`Failed to read file content for environment variable ${envVarName}.`);
    throw error;
  });
}
__name(getValueOrFileContent, "getValueOrFileContent");
function extractSSLOptionsFromEnv() {
  return Promise.all([
    getValueOrFileContent("DB_DIALECT_OPTIONS_SSL_MODE"),
    getValueOrFileContent("DB_DIALECT_OPTIONS_SSL_CA"),
    getValueOrFileContent("DB_DIALECT_OPTIONS_SSL_KEY"),
    getValueOrFileContent("DB_DIALECT_OPTIONS_SSL_CERT"),
    getValueOrFileContent("DB_DIALECT_OPTIONS_SSL_REJECT_UNAUTHORIZED")
  ]).then(([mode, ca, key, cert, rejectUnauthorized]) => {
    const sslOptions = {};
    if (mode) sslOptions["mode"] = mode;
    if (ca) sslOptions["ca"] = ca;
    if (key) sslOptions["key"] = key;
    if (cert) sslOptions["cert"] = cert;
    if (rejectUnauthorized) sslOptions["rejectUnauthorized"] = rejectUnauthorized === "true";
    return sslOptions;
  });
}
__name(extractSSLOptionsFromEnv, "extractSSLOptionsFromEnv");
function getPoolOptions() {
  const options = {};
  if (process.env.DB_POOL_MAX) {
    options.max = Number.parseInt(process.env.DB_POOL_MAX, 10);
  }
  if (process.env.DB_POOL_MIN) {
    options.min = Number.parseInt(process.env.DB_POOL_MIN, 10);
  }
  if (process.env.DB_POOL_IDLE) {
    options.idle = Number.parseInt(process.env.DB_POOL_IDLE, 10);
  }
  if (process.env.DB_POOL_ACQUIRE) {
    options.acquire = Number.parseInt(process.env.DB_POOL_ACQUIRE, 10);
  }
  if (process.env.DB_POOL_EVICT) {
    options.evict = Number.parseInt(process.env.DB_POOL_EVICT, 10);
  }
  if (process.env.DB_POOL_MAX_USES) {
    options.maxUses = Number.parseInt(process.env.DB_POOL_MAX_USES, 10) || Number.POSITIVE_INFINITY;
  }
  return options;
}
__name(getPoolOptions, "getPoolOptions");
async function parseDatabaseOptionsFromEnv() {
  const databaseOptions = {
    logging: process.env.DB_LOGGING == "on" ? customLogger : false,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    timezone: process.env.DB_TIMEZONE,
    tablePrefix: process.env.DB_TABLE_PREFIX,
    schema: process.env.DB_SCHEMA,
    underscored: process.env.DB_UNDERSCORED === "true",
    pool: getPoolOptions()
  };
  const sslOptions = await extractSSLOptionsFromEnv();
  if (Object.keys(sslOptions).length) {
    databaseOptions.dialectOptions = databaseOptions.dialectOptions || {};
    databaseOptions.dialectOptions["ssl"] = sslOptions;
  }
  return databaseOptions;
}
__name(parseDatabaseOptionsFromEnv, "parseDatabaseOptionsFromEnv");
function customLogger(queryString, queryObject) {
  console.log(queryString);
  if (queryObject == null ? void 0 : queryObject.bind) {
    console.log(queryObject.bind);
  }
}
__name(customLogger, "customLogger");
async function checkDatabaseVersion(db) {
  await db.dialect.checkDatabaseVersion(db);
}
__name(checkDatabaseVersion, "checkDatabaseVersion");
function registerDialects() {
  [import_sqlite_dialect.SqliteDialect, import_mysql_dialect.MysqlDialect, import_mariadb_dialect.MariadbDialect, import_postgres_dialect.PostgresDialect].forEach((dialect) => {
    import_database.Database.registerDialect(dialect);
  });
}
__name(registerDialects, "registerDialects");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkDatabaseVersion,
  parseDatabaseOptionsFromEnv,
  registerDialects
});
