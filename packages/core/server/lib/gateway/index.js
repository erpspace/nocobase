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
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var gateway_exports = {};
__export(gateway_exports, {
  Gateway: () => Gateway
});
module.exports = __toCommonJS(gateway_exports);
var import_logger = require("@nocobase/logger");
var import_utils = require("@nocobase/utils");
var import_plugin_symlink = require("@nocobase/utils/plugin-symlink");
var import_commander = require("commander");
var import_compression = __toESM(require("compression"));
var import_crypto = require("crypto");
var import_events = require("events");
var import_fs = __toESM(require("fs"));
var import_http = __toESM(require("http"));
var import_koa_compose = __toESM(require("koa-compose"));
var import_node_util = require("node:util");
var import_path = require("path");
var import_qs = __toESM(require("qs"));
var import_serve_handler = __toESM(require("serve-handler"));
var import_url = require("url");
var import_app_supervisor = require("../app-supervisor");
var import_plugin_manager = require("../plugin-manager");
var import_errors = require("./errors");
var import_ipc_socket_client = require("./ipc-socket-client");
var import_ipc_socket_server = require("./ipc-socket-server");
var import_ws_server = require("./ws-server");
var import_node_worker_threads = require("node:worker_threads");
var import_node_process = __toESM(require("node:process"));
const compress = (0, import_node_util.promisify)((0, import_compression.default)());
function getSocketPath() {
  const { SOCKET_PATH } = import_node_process.default.env;
  if ((0, import_path.isAbsolute)(SOCKET_PATH)) {
    return SOCKET_PATH;
  }
  return (0, import_path.resolve)(import_node_process.default.cwd(), SOCKET_PATH);
}
__name(getSocketPath, "getSocketPath");
const _Gateway = class _Gateway extends import_events.EventEmitter {
  /**
   * use main app as default app to handle request
   */
  selectorMiddlewares = new import_utils.Toposort();
  server = null;
  ipcSocketServer = null;
  wsServer;
  loggers = new import_utils.Registry();
  port = import_node_process.default.env.APP_PORT ? parseInt(import_node_process.default.env.APP_PORT) : null;
  host = "0.0.0.0";
  socketPath = (0, import_path.resolve)(import_node_process.default.cwd(), "storage", "gateway.sock");
  constructor() {
    super();
    this.reset();
    this.socketPath = getSocketPath();
  }
  static getInstance(options = {}) {
    if (!_Gateway.instance) {
      _Gateway.instance = new _Gateway();
    }
    return _Gateway.instance;
  }
  static async getIPCSocketClient() {
    const socketPath = getSocketPath();
    try {
      return await import_ipc_socket_client.IPCSocketClient.getConnection(socketPath);
    } catch (error) {
      return false;
    }
  }
  destroy() {
    this.reset();
    _Gateway.instance = null;
  }
  reset() {
    this.selectorMiddlewares = new import_utils.Toposort();
    this.addAppSelectorMiddleware(
      async (ctx, next) => {
        var _a;
        const { req } = ctx;
        const appName = (_a = import_qs.default.parse((0, import_url.parse)(req.url).query)) == null ? void 0 : _a.__appName;
        if (appName) {
          ctx.resolvedAppName = appName;
        }
        if (req.headers["x-app"]) {
          ctx.resolvedAppName = req.headers["x-app"];
        }
        await next();
      },
      {
        tag: "core",
        group: "core"
      }
    );
    if (this.server) {
      this.server.close();
      this.server = null;
    }
    if (this.ipcSocketServer) {
      this.ipcSocketServer.close();
      this.ipcSocketServer = null;
    }
  }
  addAppSelectorMiddleware(middleware, options) {
    if (this.selectorMiddlewares.nodes.some((existingFunc) => existingFunc.toString() === middleware.toString())) {
      return;
    }
    this.selectorMiddlewares.add(middleware, options);
    this.emit("appSelectorChanged");
  }
  getLogger(appName, res) {
    const reqId = (0, import_crypto.randomUUID)();
    res.setHeader("X-Request-Id", reqId);
    let logger = this.loggers.get(appName);
    if (logger) {
      return logger.child({ reqId });
    }
    logger = (0, import_logger.createSystemLogger)({
      dirname: (0, import_logger.getLoggerFilePath)(appName),
      filename: "system",
      defaultMeta: {
        app: appName,
        module: "gateway"
      }
    });
    this.loggers.register(appName, logger);
    return logger.child({ reqId });
  }
  responseError(res, error) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = error.status;
    res.end(JSON.stringify({ error }));
  }
  responseErrorWithCode(code, res, options) {
    const error = (0, import_errors.applyErrorWithArgs)((0, import_errors.getErrorWithCode)(code), options);
    this.responseError(res, error);
  }
  async requestHandler(req, res) {
    const { pathname } = (0, import_url.parse)(req.url);
    const { PLUGIN_STATICS_PATH, APP_PUBLIC_PATH } = import_node_process.default.env;
    if (pathname.endsWith("/__umi/api/bundle-status")) {
      res.statusCode = 200;
      res.end("ok");
      return;
    }
    if (pathname.startsWith(APP_PUBLIC_PATH + "storage/uploads/")) {
      req.url = req.url.substring(APP_PUBLIC_PATH.length - 1);
      await compress(req, res);
      return (0, import_serve_handler.default)(req, res, {
        public: (0, import_path.resolve)(import_node_process.default.cwd()),
        directoryListing: false
      });
    }
    if (pathname.startsWith(PLUGIN_STATICS_PATH) && !pathname.includes("/server/")) {
      await compress(req, res);
      const packageName = (0, import_plugin_manager.getPackageNameByExposeUrl)(pathname);
      const publicDir = (0, import_plugin_manager.getPackageDirByExposeUrl)(pathname);
      const destination = pathname.replace(PLUGIN_STATICS_PATH, "").replace(packageName, "");
      return (0, import_serve_handler.default)(req, res, {
        public: publicDir,
        rewrites: [
          {
            source: pathname,
            destination
          }
        ]
      });
    }
    if (!pathname.startsWith(import_node_process.default.env.API_BASE_PATH)) {
      req.url = req.url.substring(APP_PUBLIC_PATH.length - 1);
      await compress(req, res);
      return (0, import_serve_handler.default)(req, res, {
        public: `${import_node_process.default.env.APP_PACKAGE_ROOT}/dist/client`,
        rewrites: [{ source: "/**", destination: "/index.html" }]
      });
    }
    let handleApp = "main";
    try {
      handleApp = await this.getRequestHandleAppName(req);
    } catch (error) {
      console.log(error);
      this.responseErrorWithCode("APP_INITIALIZING", res, { appName: handleApp });
      return;
    }
    const hasApp = import_app_supervisor.AppSupervisor.getInstance().hasApp(handleApp);
    if (!hasApp) {
      void import_app_supervisor.AppSupervisor.getInstance().bootStrapApp(handleApp);
    }
    let appStatus = import_app_supervisor.AppSupervisor.getInstance().getAppStatus(handleApp, "initializing");
    if (appStatus === "not_found") {
      this.responseErrorWithCode("APP_NOT_FOUND", res, { appName: handleApp });
      return;
    }
    if (appStatus === "initializing") {
      this.responseErrorWithCode("APP_INITIALIZING", res, { appName: handleApp });
      return;
    }
    if (appStatus === "initialized") {
      const appInstance = await import_app_supervisor.AppSupervisor.getInstance().getApp(handleApp);
      appInstance.runCommand("start", "--quickstart");
      appStatus = import_app_supervisor.AppSupervisor.getInstance().getAppStatus(handleApp);
    }
    const app = await import_app_supervisor.AppSupervisor.getInstance().getApp(handleApp);
    if (appStatus !== "running") {
      this.responseErrorWithCode(`${appStatus}`, res, { app, appName: handleApp });
      return;
    }
    if (req.url.endsWith("/__health_check")) {
      res.statusCode = 200;
      res.end("ok");
      return;
    }
    if (handleApp !== "main") {
      import_app_supervisor.AppSupervisor.getInstance().touchApp(handleApp);
    }
    app.callback()(req, res);
  }
  getAppSelectorMiddlewares() {
    return this.selectorMiddlewares;
  }
  async getRequestHandleAppName(req) {
    const appSelectorMiddlewares = this.selectorMiddlewares.sort();
    const ctx = {
      req,
      resolvedAppName: null
    };
    await (0, import_koa_compose.default)(appSelectorMiddlewares)(ctx);
    if (!ctx.resolvedAppName) {
      ctx.resolvedAppName = "main";
    }
    return ctx.resolvedAppName;
  }
  getCallback() {
    return this.requestHandler.bind(this);
  }
  /* istanbul ignore next -- @preserve */
  async watch() {
    if (!import_node_process.default.env.IS_DEV_CMD) {
      return;
    }
    const file = import_node_process.default.env.WATCH_FILE;
    if (!import_fs.default.existsSync(file)) {
      await import_fs.default.promises.writeFile(file, `export const watchId = '${(0, import_utils.uid)()}';`, "utf-8");
    }
    require(file);
  }
  /* istanbul ignore next -- @preserve */
  async run(options) {
    const isStart = this.isStart();
    let ipcClient;
    if (isStart) {
      await this.watch();
      const startOptions = this.getStartOptions();
      const port = startOptions.port || import_node_process.default.env.APP_PORT || 13e3;
      const host = startOptions.host || import_node_process.default.env.APP_HOST || "0.0.0.0";
      this.start({
        port,
        host
      });
    } else if (!this.isHelp()) {
      ipcClient = await this.tryConnectToIPCServer();
      if (ipcClient) {
        const response = await ipcClient.write({ type: "passCliArgv", payload: { argv: import_node_process.default.argv } });
        ipcClient.close();
        if (!["error", "not_found"].includes(response.type)) {
          return;
        }
      }
    }
    if (isStart || !ipcClient) {
      await (0, import_plugin_symlink.createStoragePluginsSymlink)();
    }
    const mainApp = import_app_supervisor.AppSupervisor.getInstance().bootMainApp(options.mainAppOptions);
    mainApp.setMaxListeners(50);
    let runArgs = [import_node_process.default.argv, { throwError: true, from: "node" }];
    if (!import_node_worker_threads.isMainThread) {
      runArgs = [import_node_worker_threads.workerData.argv, { throwError: true, from: "user" }];
    }
    mainApp.runAsCLI(...runArgs).then(async () => {
      if (!isStart && !await mainApp.isStarted()) {
        await mainApp.stop({ logging: false });
      }
    }).catch(async (e) => {
      if (e.code !== "commander.helpDisplayed") {
        if (!import_node_worker_threads.isMainThread) {
          throw e;
        }
        mainApp.log.error(e);
      }
      if (!isStart && !await mainApp.isStarted()) {
        await mainApp.stop({ logging: false });
      }
    });
  }
  isStart() {
    const argv = import_node_process.default.argv;
    return argv[2] === "start";
  }
  isHelp() {
    const argv = import_node_process.default.argv;
    return argv[2] === "help";
  }
  getStartOptions() {
    const program = new import_commander.Command();
    program.allowUnknownOption().option("-s, --silent").option("-p, --port [post]").option("-h, --host [host]").option("--db-sync").parse(import_node_process.default.argv);
    return program.opts();
  }
  start(options) {
    this.startHttpServer(options);
    this.startIPCSocketServer();
  }
  startIPCSocketServer() {
    this.ipcSocketServer = import_ipc_socket_server.IPCSocketServer.buildServer(this.socketPath);
  }
  startHttpServer(options) {
    if ((options == null ? void 0 : options.port) !== null) {
      this.port = options.port;
    }
    if (options == null ? void 0 : options.host) {
      this.host = options.host;
    }
    if (this.port === null) {
      console.log("gateway port is not set, http server will not start");
      return;
    }
    this.server = import_http.default.createServer(this.getCallback());
    this.wsServer = new import_ws_server.WSServer();
    this.server.on("upgrade", (request, socket, head) => {
      const { pathname } = (0, import_url.parse)(request.url);
      if (pathname === import_node_process.default.env.WS_PATH) {
        this.wsServer.wss.handleUpgrade(request, socket, head, (ws) => {
          this.wsServer.wss.emit("connection", ws, request);
        });
      } else {
        socket.destroy();
      }
    });
    this.server.listen(this.port, this.host, () => {
      console.log(`Gateway HTTP Server running at http://${this.host}:${this.port}/`);
      if (options == null ? void 0 : options.callback) {
        options.callback(this.server);
      }
    });
  }
  async tryConnectToIPCServer() {
    try {
      const ipcClient = await this.getIPCSocketClient();
      return ipcClient;
    } catch (e) {
      return false;
    }
  }
  async getIPCSocketClient() {
    return await import_ipc_socket_client.IPCSocketClient.getConnection(this.socketPath);
  }
  close() {
    var _a, _b;
    (_a = this.server) == null ? void 0 : _a.close();
    (_b = this.wsServer) == null ? void 0 : _b.close();
  }
};
__name(_Gateway, "Gateway");
__publicField(_Gateway, "instance");
let Gateway = _Gateway;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Gateway
});
