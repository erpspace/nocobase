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
var data_source_exports = {};
__export(data_source_exports, {
  DataSource: () => DataSource
});
module.exports = __toCommonJS(data_source_exports);
var import_acl = require("@nocobase/acl");
var import_resourcer = require("@nocobase/resourcer");
var import_utils = require("@nocobase/utils");
var import_events = __toESM(require("events"));
var import_koa_compose = __toESM(require("koa-compose"));
var import_load_default_actions = require("./load-default-actions");
const _DataSource = class _DataSource extends import_events.default {
  constructor(options) {
    super();
    this.options = options;
    this.init(options);
  }
  collectionManager;
  resourceManager;
  acl;
  dataSourceManager;
  logger;
  _sqlLogger;
  get sqlLogger() {
    return this._sqlLogger || this.logger;
  }
  get name() {
    return this.options.name;
  }
  static testConnection(options) {
    return Promise.resolve(true);
  }
  setDataSourceManager(dataSourceManager) {
    this.dataSourceManager = dataSourceManager;
  }
  setLogger(logger) {
    this.logger = logger;
  }
  setSqlLogger(logger) {
    this._sqlLogger = logger;
  }
  init(options = {}) {
    this.acl = this.createACL();
    this.resourceManager = this.createResourceManager({
      prefix: process.env.API_BASE_PATH,
      ...options.resourceManager
    });
    this.collectionManager = this.createCollectionManager(options);
    if (this.collectionManager) {
      this.collectionManager.setDataSource(this);
    }
    this.resourceManager.registerActionHandlers((0, import_load_default_actions.loadDefaultActions)());
    if (options.acl !== false) {
      this.resourceManager.use(this.acl.middleware(), { tag: "acl", after: ["auth"] });
    }
  }
  middleware(middlewares = []) {
    const dataSource = this;
    if (!this["_used"]) {
      for (const [fn, options] of middlewares) {
        this.resourceManager.use(fn, options);
      }
      this["_used"] = true;
    }
    return async (ctx, next) => {
      ctx.dataSource = dataSource;
      ctx.getCurrentRepository = () => {
        const { resourceName, resourceOf } = ctx.action;
        return this.collectionManager.getRepository(resourceName, resourceOf);
      };
      const middlewares2 = [this.collectionToResourceMiddleware(), this.resourceManager.middleware()];
      return (0, import_koa_compose.default)(middlewares2.map((fn) => (0, import_utils.wrapMiddlewareWithLogging)(fn)))(ctx, next);
    };
  }
  createACL() {
    return new import_acl.ACL();
  }
  createResourceManager(options) {
    return new import_resourcer.ResourceManager(options);
  }
  publicOptions() {
    return null;
  }
  emitLoadingProgress(progress) {
    this.emit("loadingProgress", progress);
  }
  async load(options = {}) {
  }
  async close() {
  }
  collectionToResourceMiddleware() {
    const self = this;
    return /* @__PURE__ */ __name(async function collectionToResource(ctx, next) {
      const params = (0, import_resourcer.parseRequest)(
        {
          path: ctx.request.path,
          method: ctx.request.method
        },
        {
          prefix: self.resourceManager.options.prefix,
          accessors: self.resourceManager.options.accessors
        }
      );
      if (!params) {
        return next();
      }
      const resourceName = (0, import_resourcer.getNameByParams)(params);
      if (self.resourceManager.isDefined(resourceName)) {
        return next();
      }
      const splitResult = resourceName.split(".");
      const collectionName = splitResult[0];
      if (!self.collectionManager.hasCollection(collectionName)) {
        return next();
      }
      self.resourceManager.define({
        name: resourceName
      });
      return next();
    }, "collectionToResource");
  }
};
__name(_DataSource, "DataSource");
let DataSource = _DataSource;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataSource
});
