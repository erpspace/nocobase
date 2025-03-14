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
class BaseExporter extends import_events.default {
  constructor(options) {
    super();
    this.options = options;
    this.limit = options.limit ?? (process.env["EXPORT_LIMIT"] ? parseInt(process.env["EXPORT_LIMIT"]) : 15e3);
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
  async run(ctx) {
    await this.init(ctx);
    const { collection, chunkSize, repository } = this.options;
    const total = await (repository || collection.repository).count(this.getFindOptions());
    let current = 0;
    await (repository || collection.repository).chunk({
      ...this.getFindOptions(),
      chunkSize: chunkSize || 200,
      callback: async (rows, options) => {
        for (const row of rows) {
          await this.handleRow(row, ctx);
          current += 1;
          this.emit("progress", {
            total,
            current
          });
        }
      }
    });
    return this.finalize();
  }
  getAppendOptionsFromFields() {
    return this.options.fields.map((field) => {
      const fieldInstance = this.options.collection.getField(field[0]);
      if (!fieldInstance) {
        throw new Error(`Field "${field[0]}" not found: , please check the fields configuration.`);
      }
      if (fieldInstance.isRelationField()) {
        return field.join(".");
      }
      return null;
    }).filter(Boolean);
  }
  getFindOptions() {
    const { findOptions = {} } = this.options;
    if (this.limit) {
      findOptions.limit = this.limit;
    }
    const appendOptions = this.getAppendOptionsFromFields();
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
    const currentField = collection.getField(dataIndex[0]);
    if (dataIndex.length > 1) {
      let targetCollection;
      for (let i = 0; i < dataIndex.length; i++) {
        const isLast = i === dataIndex.length - 1;
        if (isLast) {
          return targetCollection.getField(dataIndex[i]);
        }
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
