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
var xlsx_exporter_exports = {};
__export(xlsx_exporter_exports, {
  XlsxExporter: () => XlsxExporter
});
module.exports = __toCommonJS(xlsx_exporter_exports);
var Excel = __toESM(require("exceljs"));
var import_base_exporter = require("./base-exporter");
var import_fs = __toESM(require("fs"));
const XLSX_LIMIT_CHAER = 32767;
class XlsxExporter extends import_base_exporter.BaseExporter {
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
  workbook;
  worksheet;
  outputPath;
  constructor(options) {
    const fields = options.columns.map((col) => col.dataIndex);
    super({ ...options, fields });
    this.outputPath = options.outputPath || this.generateOutputPath("xlsx", ".xlsx");
  }
  async init(ctx) {
    this.workbook = new Excel.stream.xlsx.WorkbookWriter({
      filename: this.outputPath,
      useStyles: true,
      useSharedStrings: false
      // 减少内存使用
    });
    this.worksheet = this.workbook.addWorksheet("Data", {
      properties: { defaultRowHeight: 20 }
    });
    this.worksheet.columns = this.options.columns.map((x) => ({
      key: x.dataIndex[0],
      header: this.renderHeader(x)
    }));
    this.worksheet.getRow(1).font = { bold: true };
    this.worksheet.getRow(1).commit();
  }
  async handleRow(row, ctx) {
    const rowData = this.options.columns.map((col) => {
      return this.formatValue(row, col.dataIndex, ctx);
    });
    this.worksheet.addRow(rowData).commit();
  }
  async finalize() {
    await this.worksheet.commit();
    await this.workbook.commit();
    return this.workbook;
  }
  cleanOutputFile() {
    import_fs.default.unlink(this.outputPath, (err) => {
    });
  }
  getXlsxBuffer() {
    const buffer = import_fs.default.readFileSync(this.outputPath);
    return buffer;
  }
  renderHeader(col) {
    const fieldInstance = this.findFieldByDataIndex(col.dataIndex);
    return col.title || (fieldInstance == null ? void 0 : fieldInstance.options.title) || col.defaultTitle;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  XlsxExporter
});
