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
var app_supervisor_exports = {};
__export(app_supervisor_exports, {
  AppSupervisor: () => AppSupervisor
});
module.exports = __toCommonJS(app_supervisor_exports);
var import_utils = require("@nocobase/utils");
var import_async_mutex = require("async-mutex");
var import_events = require("events");
var import_application = __toESM(require("./application"));
var import_handler = require("./errors/handler");
const _AppSupervisor = class _AppSupervisor extends import_events.EventEmitter {
  runningMode = "multiple";
  singleAppName = null;
  apps = {};
  lastSeenAt = /* @__PURE__ */ new Map();
  appErrors = {};
  appStatus = {};
  lastMaintainingMessage = {};
  statusBeforeCommanding = {};
  appMutexes = {};
  appBootstrapper = null;
  constructor() {
    super();
    if (process.env.STARTUP_SUBAPP) {
      this.runningMode = "single";
      this.singleAppName = process.env.STARTUP_SUBAPP;
    }
  }
  static getInstance() {
    if (!_AppSupervisor.instance) {
      _AppSupervisor.instance = new _AppSupervisor();
    }
    return _AppSupervisor.instance;
  }
  setAppError(appName, error) {
    this.appErrors[appName] = error;
    this.emit("appError", {
      appName,
      error
    });
  }
  hasAppError(appName) {
    return !!this.appErrors[appName];
  }
  clearAppError(appName) {
    delete this.appErrors[appName];
  }
  async reset() {
    const appNames = Object.keys(this.apps);
    for (const appName of appNames) {
      await this.removeApp(appName);
    }
    this.appBootstrapper = null;
    this.removeAllListeners();
  }
  async destroy() {
    await this.reset();
    _AppSupervisor.instance = null;
  }
  setAppStatus(appName, status, options = {}) {
    if (this.appStatus[appName] === status) {
      return;
    }
    this.appStatus[appName] = status;
    this.emit("appStatusChanged", {
      appName,
      status,
      options
    });
  }
  getMutexOfApp(appName) {
    if (!this.appMutexes[appName]) {
      this.appMutexes[appName] = new import_async_mutex.Mutex();
    }
    return this.appMutexes[appName];
  }
  async bootStrapApp(appName, options = {}) {
    await this.getMutexOfApp(appName).runExclusive(async () => {
      if (!this.hasApp(appName)) {
        this.setAppStatus(appName, "initializing");
        if (this.appBootstrapper) {
          await this.appBootstrapper({
            appSupervisor: this,
            appName,
            options
          });
        }
        if (!this.hasApp(appName)) {
          this.setAppStatus(appName, "not_found");
        } else if (!this.getAppStatus(appName) || this.getAppStatus(appName) == "initializing") {
          this.setAppStatus(appName, "initialized");
        }
      }
    });
  }
  async getApp(appName, options = {}) {
    if (!options.withOutBootStrap) {
      await this.bootStrapApp(appName, options);
    }
    return this.apps[appName];
  }
  setAppBootstrapper(appBootstrapper) {
    this.appBootstrapper = appBootstrapper;
  }
  getAppStatus(appName, defaultStatus) {
    const status = this.appStatus[appName];
    if (status === void 0 && defaultStatus !== void 0) {
      return defaultStatus;
    }
    return status;
  }
  bootMainApp(options) {
    return new import_application.default(options);
  }
  hasApp(appName) {
    return !!this.apps[appName];
  }
  touchApp(appName) {
    if (!this.hasApp(appName)) {
      return;
    }
    this.lastSeenAt.set(appName, Math.floor(Date.now() / 1e3));
  }
  // add app into supervisor
  addApp(app) {
    if (this.apps[app.name]) {
      throw new Error(`app ${app.name} already exists`);
    }
    app.logger.info(`add app ${app.name} into supervisor`, { submodule: "supervisor", method: "addApp" });
    this.bindAppEvents(app);
    this.apps[app.name] = app;
    this.emit("afterAppAdded", app);
    if (!this.getAppStatus(app.name) || this.getAppStatus(app.name) == "not_found") {
      this.setAppStatus(app.name, "initialized");
    }
    return app;
  }
  // get registered app names
  async getAppsNames() {
    const apps = Object.values(this.apps);
    return apps.map((app) => app.name);
  }
  async removeApp(appName) {
    if (!this.apps[appName]) {
      console.log(`app ${appName} not exists`);
      return;
    }
    await this.apps[appName].runCommand("destroy");
  }
  subApps() {
    return Object.values(this.apps).filter((app) => app.name !== "main");
  }
  on(eventName, listener) {
    const listeners = this.listeners(eventName);
    const listenerName = listener.name;
    if (listenerName !== "") {
      const exists = listeners.find((l) => l.name === listenerName);
      if (exists) {
        super.removeListener(eventName, exists);
      }
    }
    return super.on(eventName, listener);
  }
  bindAppEvents(app) {
    app.on("afterDestroy", () => {
      delete this.apps[app.name];
      delete this.appStatus[app.name];
      delete this.appErrors[app.name];
      delete this.lastMaintainingMessage[app.name];
      delete this.statusBeforeCommanding[app.name];
      this.lastSeenAt.delete(app.name);
    });
    app.on("maintainingMessageChanged", ({ message, maintainingStatus }) => {
      if (this.lastMaintainingMessage[app.name] === message) {
        return;
      }
      this.lastMaintainingMessage[app.name] = message;
      const appStatus = this.getAppStatus(app.name);
      if (!maintainingStatus && appStatus !== "running") {
        return;
      }
      this.emit("appMaintainingMessageChanged", {
        appName: app.name,
        message,
        status: appStatus,
        command: appStatus == "running" ? null : maintainingStatus.command
      });
    });
    app.on("__started", async (_app, options) => {
      const { maintainingStatus, options: startOptions } = options;
      if (maintainingStatus && [
        "install",
        "upgrade",
        "refresh",
        "restore",
        "pm.add",
        "pm.update",
        "pm.enable",
        "pm.disable",
        "pm.remove"
      ].includes(maintainingStatus.command.name) && !startOptions.recover) {
        this.setAppStatus(app.name, "running", {
          refresh: true
        });
      } else {
        this.setAppStatus(app.name, "running");
      }
    });
    app.on("__stopped", async () => {
      this.setAppStatus(app.name, "stopped");
    });
    app.on("maintaining", (maintainingStatus) => {
      const { status, command } = maintainingStatus;
      switch (status) {
        case "command_begin":
          {
            this.statusBeforeCommanding[app.name] = this.getAppStatus(app.name);
            this.setAppStatus(app.name, "commanding");
          }
          break;
        case "command_running":
          break;
        case "command_end":
          {
            const appStatus = this.getAppStatus(app.name);
            this.emit("appMaintainingStatusChanged", maintainingStatus);
            if (appStatus == "commanding") {
              this.setAppStatus(app.name, this.statusBeforeCommanding[app.name]);
            }
          }
          break;
        case "command_error":
          {
            const errorLevel = (0, import_handler.getErrorLevel)(maintainingStatus.error);
            if (errorLevel === "fatal") {
              this.setAppError(app.name, maintainingStatus.error);
              this.setAppStatus(app.name, "error");
              break;
            }
            if (errorLevel === "warn") {
              this.emit("appError", {
                appName: app.name,
                error: maintainingStatus.error
              });
            }
            this.setAppStatus(app.name, this.statusBeforeCommanding[app.name]);
          }
          break;
      }
    });
  }
};
__name(_AppSupervisor, "AppSupervisor");
__publicField(_AppSupervisor, "instance");
let AppSupervisor = _AppSupervisor;
(0, import_utils.applyMixins)(AppSupervisor, [import_utils.AsyncEmitter]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppSupervisor
});
