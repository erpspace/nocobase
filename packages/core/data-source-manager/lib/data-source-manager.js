/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var data_source_manager_exports = {};
__export(data_source_manager_exports, {
  DataSourceManager: () => DataSourceManager
});
module.exports = __toCommonJS(data_source_manager_exports);
var import_logger = require("@nocobase/logger");
var import_data_source_factory = require("./data-source-factory");
const _DataSourceManager = class _DataSourceManager {
  constructor(options = {}) {
    this.options = options;
    this.dataSources = /* @__PURE__ */ new Map();
    this.factory = new import_data_source_factory.DataSourceFactory(this);
    this.middlewares = [];
    if (options.app) {
      options.app.on("beforeStop", async () => {
        for (const dataSource of this.dataSources.values()) {
          await dataSource.close();
        }
      });
    }
  }
  dataSources;
  /**
   * @internal
   */
  factory;
  middlewares = [];
  onceHooks = [];
  beforeAddHooks = [];
  get(dataSourceKey) {
    return this.dataSources.get(dataSourceKey);
  }
  async add(dataSource, options = {}) {
    let logger;
    if (this.options.logger) {
      if (typeof this.options.logger["log"] === "function") {
        logger = this.options.logger;
      } else {
        logger = (0, import_logger.createLogger)(this.options.logger);
      }
    } else {
      logger = (0, import_logger.createConsoleLogger)();
    }
    dataSource.setLogger(logger);
    for (const hook of this.beforeAddHooks) {
      hook(dataSource);
    }
    await dataSource.load(options);
    const oldDataSource = this.dataSources.get(dataSource.name);
    if (oldDataSource) {
      await oldDataSource.close();
    }
    this.dataSources.set(dataSource.name, dataSource);
    for (const hook of this.onceHooks) {
      hook(dataSource);
    }
  }
  use(fn, options) {
    this.middlewares.push([fn, options]);
  }
  middleware() {
    const self = this;
    return /* @__PURE__ */ __name(async function dataSourceManager(ctx, next) {
      const name = ctx.get("x-data-source") || "main";
      if (!self.dataSources.has(name)) {
        ctx.throw(`data source ${name} does not exist`);
      }
      const ds = self.dataSources.get(name);
      ctx.dataSource = ds;
      const composedFn = ds.middleware(self.middlewares);
      return composedFn(ctx, next);
    }, "dataSourceManager");
  }
  registerDataSourceType(type, DataSourceClass) {
    this.factory.register(type, DataSourceClass);
  }
  getDataSourceType(type) {
    return this.factory.getClass(type);
  }
  buildDataSourceByType(type, options = {}) {
    return this.factory.create(type, options);
  }
  beforeAddDataSource(hook) {
    this.beforeAddHooks.push(hook);
    for (const dataSource of this.dataSources.values()) {
      hook(dataSource);
    }
  }
  afterAddDataSource(hook) {
    this.addHookAndRun(hook);
  }
  addHookAndRun(hook) {
    this.onceHooks.push(hook);
    for (const dataSource of this.dataSources.values()) {
      hook(dataSource);
    }
  }
};
__name(_DataSourceManager, "DataSourceManager");
let DataSourceManager = _DataSourceManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataSourceManager
});
