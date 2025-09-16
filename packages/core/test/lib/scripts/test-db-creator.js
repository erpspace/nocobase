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
var import_dotenv = __toESM(require("dotenv"));
var import_http = __toESM(require("http"));
var import_mariadb = __toESM(require("mariadb"));
var import_promise = __toESM(require("mysql2/promise"));
var import_path = __toESM(require("path"));
var import_pg = __toESM(require("pg"));
var import_url = __toESM(require("url"));
import_dotenv.default.config({ path: import_path.default.resolve(process.cwd(), ".env.test") });
const _BaseClient = class _BaseClient {
  _client = null;
  createdDBs = /* @__PURE__ */ new Set();
  async createDB(name) {
    if (this.createdDBs.has(name)) {
      return;
    }
    if (!this._client) {
      this._client = await this._createConnection();
    }
    await this._createDB(name);
    this.createdDBs.add(name);
    setTimeout(
      async () => {
        await this.removeDB(name);
      },
      3 * 60 * 1e3
    );
  }
  async releaseAll() {
    if (!this._client) {
      return;
    }
    const dbNames = Array.from(this.createdDBs);
    for (const name of dbNames) {
      console.log(`Removing database: ${name}`);
      await this._removeDB(name);
      this.createdDBs.delete(name);
    }
  }
  async removeDB(name) {
    if (!this._client) {
      return;
    }
    if (this.createdDBs.has(name)) {
      await this._removeDB(name);
      this.createdDBs.delete(name);
    }
  }
};
__name(_BaseClient, "BaseClient");
let BaseClient = _BaseClient;
const _PostgresClient = class _PostgresClient extends BaseClient {
  async _removeDB(name) {
    await this._client.query(`DROP DATABASE IF EXISTS ${name}`);
  }
  async _createDB(name) {
    await this._client.query(`DROP DATABASE IF EXISTS ${name}`);
    await this._client.query(`CREATE DATABASE ${name};`);
  }
  async _createConnection() {
    const client2 = new import_pg.default.Client({
      host: process.env["DB_HOST"],
      port: Number(process.env["DB_PORT"]),
      user: process.env["DB_USER"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"]
    });
    await client2.connect();
    return client2;
  }
};
__name(_PostgresClient, "PostgresClient");
let PostgresClient = _PostgresClient;
const _MySQLClient = class _MySQLClient extends BaseClient {
  async _removeDB(name) {
    await this._client.query(`DROP DATABASE IF EXISTS ${name}`);
  }
  async _createDB(name) {
    await this._client.query(`CREATE DATABASE IF NOT EXISTS ${name}`);
  }
  async _createConnection() {
    return import_promise.default.createConnection({
      host: process.env["DB_HOST"],
      port: Number(process.env["DB_PORT"]),
      user: process.env["DB_USER"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"]
    });
  }
};
__name(_MySQLClient, "MySQLClient");
let MySQLClient = _MySQLClient;
const _MariaDBClient = class _MariaDBClient extends BaseClient {
  async _removeDB(name) {
    await this._client.query(`DROP DATABASE IF EXISTS ${name}`);
  }
  async _createDB(name) {
    await this._client.query(`CREATE DATABASE IF NOT EXISTS ${name}`);
  }
  async _createConnection() {
    return await import_mariadb.default.createConnection({
      host: process.env["DB_HOST"],
      port: Number(process.env["DB_PORT"]),
      user: process.env["DB_USER"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"]
    });
  }
};
__name(_MariaDBClient, "MariaDBClient");
let MariaDBClient = _MariaDBClient;
const client = {
  postgres: /* @__PURE__ */ __name(() => {
    return new PostgresClient();
  }, "postgres"),
  mysql: /* @__PURE__ */ __name(() => {
    return new MySQLClient();
  }, "mysql"),
  mariadb: /* @__PURE__ */ __name(() => {
    return new MariaDBClient();
  }, "mariadb")
};
const dialect = process.env["DB_DIALECT"];
if (!client[dialect]) {
  throw new Error(`Unknown dialect: ${dialect}`);
}
const dbClient = client[dialect]();
const server = import_http.default.createServer((req, res) => {
  const parsedUrl = import_url.default.parse(req.url, true);
  const path2 = parsedUrl.pathname;
  const trimmedPath = path2.replace(/^\/+|\/+$/g, "");
  if (trimmedPath === "acquire") {
    const name = parsedUrl.query.name;
    dbClient.createDB(name).then(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end();
    }).catch((error) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error }));
    });
  } else if (trimmedPath === "release") {
    const name = parsedUrl.query.name;
    dbClient.removeDB(name).then(() => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end();
    }).catch((error) => {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error }));
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found\n");
  }
});
server.listen(23450, "127.0.0.1", () => {
  console.log("Server is running at http://127.0.0.1:23450/");
});
