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
var mock_server_exports = {};
__export(mock_server_exports, {
  MockServer: () => MockServer,
  createMockCluster: () => createMockCluster,
  createMockServer: () => createMockServer,
  default: () => mock_server_default,
  mockServer: () => mockServer,
  startMockServer: () => startMockServer
});
module.exports = __toCommonJS(mock_server_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_qs = __toESM(require("qs"));
var import_supertest = __toESM(require("supertest"));
var import_memory_pub_sub_adapter = require("./memory-pub-sub-adapter");
var import_mock_data_source = require("./mock-data-source");
var import_path = __toESM(require("path"));
var import_node_process = __toESM(require("node:process"));
var import_fs = require("fs");
const _MockServer = class _MockServer extends import_server.Application {
  registerMockDataSource() {
    this.dataSourceManager.factory.register("mock", import_mock_data_source.MockDataSource);
  }
  async loadAndInstall(options = {}) {
    await this.load({ method: "install" });
    if (options.afterLoad) {
      await options.afterLoad(this);
    }
    await this.install({
      ...options,
      sync: {
        force: false,
        alter: {
          drop: false
        }
      }
    });
  }
  async cleanDb() {
    await this.db.clean({ drop: true });
  }
  async quickstart(options = {}) {
    const { clean } = options;
    if (clean) {
      await this.cleanDb();
    }
    await this.runCommand("start", "--quickstart");
  }
  async destroy(options = {}) {
    await super.destroy(options);
    import_server.Gateway.getInstance().destroy();
    await import_server.AppSupervisor.getInstance().destroy();
  }
  agent(callback) {
    const agent = import_supertest.default.agent(callback || this.callback());
    const prefix = this.resourcer.options.prefix;
    const authManager = this.authManager;
    const proxy = new Proxy(agent, {
      get(target, method, receiver) {
        if (["login", "loginUsingId"].includes(method)) {
          return async (userOrId, roleName) => {
            const userId = typeof userOrId === "number" ? userOrId : userOrId == null ? void 0 : userOrId.id;
            const tokenInfo = await authManager.tokenController.add({ userId });
            const expiresIn = (await authManager.tokenController.getConfig()).tokenExpirationTime;
            return proxy.auth(
              import_jsonwebtoken.default.sign(
                {
                  userId,
                  temp: true,
                  roleName,
                  signInTime: Date.now()
                },
                import_node_process.default.env.APP_KEY,
                {
                  jwtid: tokenInfo.jti,
                  expiresIn
                }
              ),
              { type: "bearer" }
            ).set("X-Authenticator", "basic");
          };
        }
        if (method === "resource") {
          return (name, resourceOf) => {
            const keys = name.split(".");
            const proxy2 = new Proxy(
              {},
              {
                get(target2, method2, receiver2) {
                  return (params = {}) => {
                    let { filterByTk } = params;
                    const { values = {}, file, ...restParams } = params;
                    if (params.associatedIndex) {
                      resourceOf = params.associatedIndex;
                    }
                    if (params.resourceIndex) {
                      filterByTk = params.resourceIndex;
                    }
                    let url = prefix || "";
                    if (keys.length > 1) {
                      url += `/${keys[0]}/${resourceOf}/${keys[1]}`;
                    } else {
                      url += `/${name}`;
                    }
                    url += `:${method2}`;
                    if (filterByTk) {
                      url += `/${filterByTk}`;
                    }
                    if (restParams.filter) {
                      restParams.filter = JSON.stringify(restParams.filter);
                    }
                    const queryString = import_qs.default.stringify(restParams, { arrayFormat: "brackets" });
                    let request;
                    switch (method2) {
                      case "list":
                      case "get":
                        request = agent.get(`${url}?${queryString}`);
                        break;
                      default:
                        request = agent.post(`${url}?${queryString}`);
                        break;
                    }
                    return file ? request.attach("file", file).field(values) : request.send(values);
                  };
                }
              }
            );
            return proxy2;
          };
        }
        return agent[method];
      }
    });
    return proxy;
  }
  createDatabase(options) {
    const oldDatabase = this.db;
    const databaseOptions = oldDatabase ? oldDatabase.options : (options == null ? void 0 : options.database) || {};
    const database = (0, import_database.mockDatabase)(databaseOptions);
    database.setContext({ app: this });
    return database;
  }
};
__name(_MockServer, "MockServer");
let MockServer = _MockServer;
function mockServer(options = {}) {
  var _a;
  if (typeof TextEncoder === "undefined") {
    global.TextEncoder = require("util").TextEncoder;
  }
  if (typeof TextDecoder === "undefined") {
    global.TextDecoder = require("util").TextDecoder;
  }
  import_server.Gateway.getInstance().reset();
  if (!import_server.PluginManager.findPackagePatched) {
    import_server.PluginManager.getPackageJson = async () => {
      return {
        version: "0.0.0"
      };
    };
    import_server.PluginManager.findPackagePatched = true;
  }
  const mockServerOptions = {
    acl: false,
    syncMessageManager: {
      debounce: 500
    },
    ...options
  };
  const app = new MockServer(mockServerOptions);
  const basename = (_a = app.options.pubSubManager) == null ? void 0 : _a.channelPrefix;
  if (basename) {
    app.pubSubManager.setAdapter(
      import_memory_pub_sub_adapter.MemoryPubSubAdapter.create(basename, {
        debounce: 500
      })
    );
  }
  return app;
}
__name(mockServer, "mockServer");
async function startMockServer(options = {}) {
  const app = mockServer(options);
  await app.runCommand("start");
  return app;
}
__name(startMockServer, "startMockServer");
async function createMockCluster({
  number = 2,
  clusterName = `cluster_${(0, import_utils.uid)()}`,
  appName = `app_${(0, import_utils.uid)()}`,
  ...options
} = {}) {
  const nodes = [];
  let dbOptions;
  for (let i = 0; i < number; i++) {
    if (dbOptions) {
      options["database"] = {
        ...dbOptions
      };
    }
    const app = await createMockServer({
      ...options,
      skipSupervisor: true,
      name: clusterName + "_" + appName,
      instanceId: `${clusterName}_${appName}_${i}`,
      pubSubManager: {
        channelPrefix: clusterName
      }
    });
    if (!dbOptions) {
      dbOptions = app.db.options;
    }
    nodes.push(app);
  }
  return {
    nodes,
    async destroy() {
      for (const node of nodes) {
        await node.destroy();
      }
    }
  };
}
__name(createMockCluster, "createMockCluster");
async function createMockServer(options = {}) {
  const cachePath = import_path.default.join(import_node_process.default.cwd(), "storage", "cache");
  try {
    await import_fs.promises.rm(cachePath, { recursive: true, force: true });
    await import_fs.promises.mkdir(cachePath, { recursive: true });
  } catch (e) {
  }
  const { version, beforeInstall, skipInstall, skipStart, ...others } = options;
  const app = mockServer(others);
  if (!skipInstall) {
    if (beforeInstall) {
      await beforeInstall(app);
    }
    await app.runCommandThrowError("install", "-f");
  }
  if (version) {
    await app.version.update(version);
  }
  if (!skipStart) {
    await app.runCommandThrowError("start");
  }
  return app;
}
__name(createMockServer, "createMockServer");
var mock_server_default = mockServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockServer,
  createMockCluster,
  createMockServer,
  mockServer,
  startMockServer
});
