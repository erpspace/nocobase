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
var base_exporter_exports = {};
__export(base_exporter_exports, {
  BaseExporter: () => BaseExporter
});
module.exports = __toCommonJS(base_exporter_exports);
var import_events = __toESM(require("events"));
var import_deep_get = require("../utils/deep-get");
var import_path = __toESM(require("path"));
var import_os = __toESM(require("os"));
var import_lodash = __toESM(require("lodash"));
var import_database = require("@nocobase/database");
class BaseExporter extends import_events.default {
  constructor(options) {
    super();
    this.options = options;
    this.limit = options.limit ?? (process.env["EXPORT_LIMIT"] ? parseInt(process.env["EXPORT_LIMIT"]) : 2e3);
    this.logger = options.logger;
  }
  /**
   * You can adjust the maximum number of exported rows based on business needs and system
   * available resources. However, please note that you need to fully understand the risks
   * after the modification. Increasing the maximum number of rows that can be exported may
   * increase system resource usage, leading to increased processing delays for other
   * requests, or even server processes being recycled by the operating system.
   *
   * 您可以根据业务需求和系统可用资源等参数，调整最大导出数量的限制。但请注意，您需要充分了解修改之后的风险，
   * 增加最大可导出的行数可能会导致系统资源占用率升高，导致其他请求处理延迟增加、无法处理、甚至
   * 服务端进程被操作系统回收等问题。
   */
  limit;
  logger;
  _batchQueryStartTime = null;
  async run(ctx) {
    var _a, _b, _c, _d;
    try {
      (_a = this.logger) == null ? void 0 : _a.info("Export started......");
      await this.init(ctx);
      const { collection, chunkSize, repository } = this.options;
      const repo = repository || collection.repository;
      const total = await repo.count(this.getFindOptions(ctx));
      (_b = this.logger) == null ? void 0 : _b.info(`Found ${total} records to export from collection [${collection.name}]`);
      const totalCountStartTime = process.hrtime();
      let current = 0;
      const chunkHandle = (total > 2e5 ? repo.chunkWithCursor : repo.chunk).bind(repo);
      const findOptions = {
        ...this.getFindOptions(ctx),
        chunkSize: chunkSize || 200,
        beforeFind: async (options) => {
          this._batchQueryStartTime = process.hrtime();
        },
        afterFind: async (rows, options) => {
          var _a2, _b2;
          if (this._batchQueryStartTime) {
            const diff = process.hrtime(this._batchQueryStartTime);
            const executionTime = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
            if (Number(executionTime) > 1200) {
              (_a2 = this.logger) == null ? void 0 : _a2.warn(
                `Query took too long: ${executionTime}ms, fetched ${rows.length} records, options: ${JSON.stringify(
                  options
                )}`
              );
            } else {
              (_b2 = this.logger) == null ? void 0 : _b2.info(`Query completed in ${executionTime}ms, fetched ${rows.length} records`);
            }
            this._batchQueryStartTime = null;
          }
        },
        callback: async (rows, options) => {
          var _a2, _b2, _c2;
          for (const row of rows) {
            const startTime = process.hrtime();
            await this.handleRow(row, ctx);
            const diff = process.hrtime(startTime);
            const executionTime = (diff[0] * 1e3 + diff[1] / 1e6).toFixed(2);
            if (Number(executionTime) > 500) {
              (_a2 = this.logger) == null ? void 0 : _a2.info(`HandleRow took too long, completed in ${executionTime}ms`);
            } else {
              (_b2 = this.logger) == null ? void 0 : _b2.info(`HandleRow completed, ${executionTime}ms`);
            }
          }
          this.emit("progress", {
            total,
            current: current += rows.length
          });
          const totalDiff = process.hrtime(totalCountStartTime);
          const elapsedSeconds = totalDiff[0] + totalDiff[1] / 1e9;
          const estimatedTimeRemaining = elapsedSeconds * (total - current) / current;
          (_c2 = this.logger) == null ? void 0 : _c2.info(
            `Processed ${current}/${total} records (${Math.round(current / total * 100)}%), elapsed time: ${elapsedSeconds.toFixed(2)}s, estimated remaining: ${estimatedTimeRemaining.toFixed(2)}s`
          );
        }
      };
      await chunkHandle(findOptions);
      (_c = this.logger) == null ? void 0 : _c.info(`Export completed...... processed ${current} records in total`);
      return this.finalize();
    } catch (error) {
      (_d = this.logger) == null ? void 0 : _d.error(`Export failed: ${error.message}`, { error });
      throw error;
    }
  }
  removePathAfterFileField(fieldPath) {
    let currentCollection = this.options.collection;
    for (let i = 0; i < fieldPath.length; i++) {
      const fieldInstance = currentCollection.getField(fieldPath[i]);
      if (import_lodash.default.get(fieldInstance, "collection.options.template") === "file") {
        return fieldPath.slice(0, i);
      }
      if ((fieldInstance == null ? void 0 : fieldInstance.isRelationField()) && i < fieldPath.length - 1) {
        currentCollection = fieldInstance.targetCollection();
      }
    }
    return fieldPath;
  }
  getAppendOptionsFromFields(ctx) {
    return this.options.fields.filter((fieldPath) => {
      var _a, _b, _c, _d, _e;
      const field = fieldPath[0];
      const hasPermission = import_lodash.default.isEmpty((_b = (_a = ctx == null ? void 0 : ctx.permission) == null ? void 0 : _a.can) == null ? void 0 : _b.params) || (((_e = (_d = (_c = ctx == null ? void 0 : ctx.permission) == null ? void 0 : _c.can) == null ? void 0 : _d.params) == null ? void 0 : _e.appends) || []).includes(field);
      return hasPermission;
    }).map((fieldPath) => {
      const fieldInstance = this.options.collection.getField(fieldPath[0]);
      if (!fieldInstance) {
        throw new Error(`Field "${fieldPath[0]}" not found: , please check the fields configuration.`);
      }
      const cleanedPath = this.removePathAfterFileField([...fieldPath]);
      if (fieldInstance.isRelationField()) {
        return cleanedPath.join(".");
      }
      return null;
    }).filter(Boolean);
  }
  getFindOptions(ctx) {
    const { findOptions = {} } = this.options;
    if (this.limit) {
      findOptions.limit = this.limit;
    }
    const appendOptions = this.getAppendOptionsFromFields(ctx);
    if (appendOptions.length) {
      return {
        ...findOptions,
        appends: appendOptions
      };
    }
    return findOptions;
  }
  findFieldByDataIndex(dataIndex) {
    const { collection } = this.options;
    let currentField = collection.getField(dataIndex[0]);
    if (dataIndex.length === 1) {
      return currentField;
    }
    let targetCollection = currentField.targetCollection();
    for (let i = 1; i < dataIndex.length; i++) {
      currentField = targetCollection.getField(dataIndex[i]);
      const isLast = i === dataIndex.length - 1;
      if (!isLast && currentField instanceof import_database.RelationField) {
        targetCollection = currentField.targetCollection();
      }
    }
    return currentField;
  }
  renderRawValue(value) {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  }
  getFieldRenderer(field, ctx) {
    var _a;
    const InterfaceClass = this.options.collectionManager.getFieldInterface((_a = field == null ? void 0 : field.options) == null ? void 0 : _a.interface);
    if (!InterfaceClass) {
      return this.renderRawValue;
    }
    const fieldInterface = new InterfaceClass(field == null ? void 0 : field.options);
    return (value) => fieldInterface.toString(value, ctx);
  }
  formatValue(rowData, dataIndex, ctx) {
    rowData = rowData.toJSON();
    const value = rowData[dataIndex[0]];
    const field = this.findFieldByDataIndex(dataIndex);
    const render = this.getFieldRenderer(field, ctx);
    if (dataIndex.length > 1) {
      const deepValue = (0, import_deep_get.deepGet)(rowData, dataIndex);
      if (Array.isArray(deepValue)) {
        return deepValue.map(render).join(",");
      }
      return render(deepValue);
    }
    return render(value);
  }
  generateOutputPath(prefix = "export", ext = "", destination = import_os.default.tmpdir()) {
    const fileName = `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
    return import_path.default.join(destination, fileName);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseExporter
});
