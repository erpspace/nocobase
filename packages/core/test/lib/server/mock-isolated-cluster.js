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
var mock_isolated_cluster_exports = {};
__export(mock_isolated_cluster_exports, {
  MockIsolatedCluster: () => MockIsolatedCluster
});
module.exports = __toCommonJS(mock_isolated_cluster_exports);
var import_node_path = __toESM(require("node:path"));
var import_node_child_process = require("node:child_process");
var import_portfinder = require("portfinder");
var import_utils = require("@nocobase/utils");
var import_mock_server = require("./mock-server");
const _MockIsolatedCluster = class _MockIsolatedCluster {
  constructor(options = {}) {
    this.options = options;
    if (options.script) {
      this.script = options.script;
    }
  }
  script = `${process.env.APP_PACKAGE_ROOT}/src/index.ts`;
  processes = [];
  mockApp;
  async start() {
    this.mockApp = await (0, import_mock_server.createMockServer)({
      plugins: this.options.plugins
    });
    this.processes = [];
    const ports = [];
    for (let i = 0; i < (this.options.instances ?? 2); i++) {
      const port = await (0, import_portfinder.getPortPromise)();
      const childProcess = (0, import_node_child_process.spawn)("node", ["./node_modules/tsx/dist/cli.mjs", this.script, "start"], {
        env: {
          ...process.env,
          ...this.options.env,
          APP_PORT: `${port}`,
          APPEND_PRESET_BUILT_IN_PLUGINS: (this.options.plugins ?? []).join(","),
          SOCKET_PATH: `storage/tests/gateway-cluster-${(0, import_utils.uid)()}.sock`,
          PM2_HOME: import_node_path.default.resolve(process.cwd(), `storage/tests/.pm2-${(0, import_utils.uid)()}`)
        }
      });
      await new Promise((resolve, reject) => {
        const startTimer = setTimeout(() => reject(new Error("app not started in 10s")), 1e4);
        childProcess.stdout.on("data", (data) => {
          console.log(data.toString());
          if (data.toString().includes("app has been started")) {
            clearTimeout(startTimer);
            resolve(childProcess);
          }
        });
      });
      this.processes.push({
        childProcess,
        port
      });
      ports.push(port);
    }
    return ports;
  }
  async stop() {
    await this.mockApp.destroy();
    return Promise.all(
      this.processes.map(({ childProcess }) => {
        const promise = new Promise((resolve) => {
          childProcess.on("exit", resolve);
        });
        childProcess.kill();
        return promise;
      })
    );
  }
};
__name(_MockIsolatedCluster, "MockIsolatedCluster");
let MockIsolatedCluster = _MockIsolatedCluster;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockIsolatedCluster
});
