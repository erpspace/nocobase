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
var data_source_factory_exports = {};
__export(data_source_factory_exports, {
  DataSourceFactory: () => DataSourceFactory
});
module.exports = __toCommonJS(data_source_factory_exports);
const _DataSourceFactory = class _DataSourceFactory {
  constructor(dataSourceManager) {
    this.dataSourceManager = dataSourceManager;
  }
  collectionTypes = /* @__PURE__ */ new Map();
  register(type, dataSourceClass) {
    this.collectionTypes.set(type, dataSourceClass);
  }
  getClass(type) {
    return this.collectionTypes.get(type);
  }
  create(type, options = {}) {
    var _a;
    const klass = this.collectionTypes.get(type);
    if (!klass) {
      throw new Error(`Data source type "${type}" not found`);
    }
    const environment = (_a = this.dataSourceManager.options.app) == null ? void 0 : _a.environment;
    const { logger, sqlLogger, ...others } = options;
    const opts = { logger, sqlLogger, ...others };
    if (environment) {
      Object.assign(opts, environment.renderJsonTemplate(others));
    }
    const dataSource = new klass(opts);
    dataSource.setDataSourceManager(this.dataSourceManager);
    return dataSource;
  }
};
__name(_DataSourceFactory, "DataSourceFactory");
let DataSourceFactory = _DataSourceFactory;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataSourceFactory
});
