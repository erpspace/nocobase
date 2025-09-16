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
var import_http = __toESM(require("http"));
var import_url = __toESM(require("url"));
var import_pg = __toESM(require("pg"));
var import_dotenv = __toESM(require("dotenv"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
import_dotenv.default.config({ path: import_path.default.resolve(process.cwd(), ".env.test") });
const delay = /* @__PURE__ */ __name((ms) => new Promise((resolve) => setTimeout(resolve, ms)), "delay");
const _DBManager = class _DBManager {
  acquiredDBs = /* @__PURE__ */ new Map();
  acquire(name, via) {
    console.log("acquire", name, "via", via);
    if (this.acquiredDBs.has(name)) {
      this.acquiredDBs.get(name).add(via);
    } else {
      this.acquiredDBs.set(name, /* @__PURE__ */ new Set([via]));
    }
  }
  async release(name, via, relaseDb) {
    var _a;
    console.log("release", name, "via", via);
    const vias = this.acquiredDBs.get(name);
    if (!vias || !vias.has(via)) {
      console.log(`Cannot release ${name}, it is not acquired via ${via}`);
      return;
    }
    vias.delete(via);
    if (vias.size === 0) {
      console.log("DB", name, "is not used anymore, release it");
      await delay(1e3);
      if (((_a = this.acquiredDBs.get(name)) == null ? void 0 : _a.size) === 0) {
        console.log("start to release DB", name);
        await (relaseDb == null ? void 0 : relaseDb());
        this.acquiredDBs.delete(name);
        console.log("DB", name, "is released, current usesd db count:", this.acquiredDBs.size);
      }
    }
    return null;
  }
  isAcquired(name) {
    return this.acquiredDBs.has(name);
  }
};
__name(_DBManager, "DBManager");
let DBManager = _DBManager;
const getDBNames = /* @__PURE__ */ __name((size, name) => {
  const names = [];
  for (let i = 0; i < size; i++) {
    names.push(`auto_named_${name}_${i}`);
  }
  return names;
}, "getDBNames");
const _BasePool = class _BasePool {
  constructor(size) {
    this.size = size;
  }
  dbManager = new DBManager();
  async init() {
    const promises = [];
    for (const name of getDBNames(this.size, this.getConfiguredDatabaseName())) {
      promises.push(
        (async () => {
          console.log("create database", name);
          await this.createDatabase(name);
        })()
      );
    }
    await Promise.all(promises);
  }
  async acquire(name, via) {
    if (!name) {
      name = getDBNames(this.size, this.getConfiguredDatabaseName()).find((name2) => !this.dbManager.isAcquired(name2));
    }
    if (!name) {
      throw new Error("No available database");
    }
    this.dbManager.acquire(name, via);
    return name;
  }
  async release(name, via) {
    await this.dbManager.release(name, via, async () => {
      await this.cleanDatabase(name);
    });
  }
};
__name(_BasePool, "BasePool");
let BasePool = _BasePool;
const _PostgresPool = class _PostgresPool extends BasePool {
  async _createConnection(options, callback) {
    const config = this.getDatabaseConfiguration();
    const databaseName = this.getConfiguredDatabaseName();
    const client = new import_pg.default.Client({
      host: config["host"],
      port: config["port"],
      user: config["username"],
      password: config["password"],
      database: databaseName,
      ...options
    });
    await client.connect();
    await callback(client);
    await client.end();
  }
  async cleanDatabase(name) {
    await this._createConnection({ database: name }, async (client) => {
      await client.query(`DROP SCHEMA public CASCADE;CREATE SCHEMA public;`);
    });
  }
  async createDatabase(name, options) {
    const { log } = options || {};
    await this._createConnection({}, async (client) => {
      if (log) {
        console.log(`DROP DATABASE IF EXISTS ${name}`);
      }
      await client.query(`DROP DATABASE IF EXISTS ${name}`);
      if (log) {
        console.log(`CREATE DATABASE ${name}`);
      }
      await client.query(`CREATE DATABASE ${name}`);
      if (log) {
        console.log(`end`);
      }
    });
  }
  getDatabaseConfiguration() {
    return {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    };
  }
  getConfiguredDatabaseName() {
    return process.env.DB_DATABASE;
  }
};
__name(_PostgresPool, "PostgresPool");
let PostgresPool = _PostgresPool;
const _SqlitePool = class _SqlitePool extends BasePool {
  async createDatabase(name, options) {
    return import_fs.default.promises.writeFile(import_path.default.resolve(this.getStoragePath(), name), "");
  }
  async cleanDatabase(name) {
    return import_fs.default.promises.unlink(import_path.default.resolve(this.getStoragePath(), name));
  }
  getDatabaseConfiguration() {
    return {
      storage: process.env.DB_STORAGE
    };
  }
  getConfiguredDatabaseName() {
    const storagePath = process.env.DB_STORAGE;
    if (storagePath && storagePath !== ":memory:") {
      return import_path.default.basename(storagePath);
    }
  }
  getStoragePath() {
    const storagePath = process.env.DB_STORAGE;
    if (storagePath && storagePath !== ":memory:") {
      return import_path.default.dirname(storagePath);
    }
  }
};
__name(_SqlitePool, "SqlitePool");
let SqlitePool = _SqlitePool;
const pools = {
  postgres: PostgresPool,
  sqlite: SqlitePool
};
(async () => {
  const poolSize = process.env.TEST_DB_POOL_SIZE || 100;
  const poolClass = pools[process.env.DB_DIALECT];
  if (!poolClass) {
    throw new Error(`Unknown pool class ${process.env.DB_DIALECT}`);
  }
  const pool = new poolClass(poolSize);
  await pool.init();
  return pool;
})().then((pool) => {
  const server = import_http.default.createServer((req, res) => {
    const parsedUrl = import_url.default.parse(req.url, true);
    const path2 = parsedUrl.pathname;
    const trimmedPath = path2.replace(/^\/+|\/+$/g, "");
    if (trimmedPath === "acquire") {
      const via = parsedUrl.query.via;
      const name = parsedUrl.query.name;
      pool.acquire(name, via).then((name2) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ name: name2 }));
      }).catch((err) => {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      });
    } else if (trimmedPath === "release") {
      const via = parsedUrl.query.via;
      const name = parsedUrl.query.name;
      pool.release(name, via);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found\n");
    }
  });
  server.listen(23450, "127.0.0.1", () => {
    console.log("Server is running at http://127.0.0.1:23450/");
  });
}).catch((err) => {
  console.error(err);
  process.exit(1);
});
