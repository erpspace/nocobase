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
var import_xlsx = __toESM(require("xlsx"));
var import_base_exporter = require("./base-exporter");
var import_database = require("@nocobase/database");
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
  startRowNumber;
  constructor(options) {
    const fields = options.columns.map((col) => col.dataIndex);
    super({ ...options, fields });
  }
  async init(ctx) {
    this.workbook = import_xlsx.default.utils.book_new();
    this.worksheet = import_xlsx.default.utils.sheet_new();
    import_xlsx.default.utils.sheet_add_aoa(this.worksheet, [this.renderHeaders(this.options.columns)], {
      origin: "A1"
    });
    this.startRowNumber = 2;
  }
  async handleRow(row, ctx) {
    const rowData = [
      this.options.columns.map((col) => {
        return this.formatValue(row, col.dataIndex, ctx);
      })
    ];
    import_xlsx.default.utils.sheet_add_aoa(this.worksheet, rowData, {
      origin: `A${this.startRowNumber}`
    });
    this.startRowNumber += 1;
  }
  async finalize() {
    for (const col of this.options.columns) {
      const fieldInstance = this.findFieldByDataIndex(col.dataIndex);
      if (fieldInstance instanceof import_database.NumberField) {
        const colIndex = this.options.columns.indexOf(col);
        const cellRange = import_xlsx.default.utils.decode_range(this.worksheet["!ref"]);
        for (let r = 1; r <= cellRange.e.r; r++) {
          const cell = this.worksheet[import_xlsx.default.utils.encode_cell({ c: colIndex, r })];
          if (cell && isNumeric(cell.v)) {
            cell.t = "n";
          }
        }
      }
    }
    import_xlsx.default.utils.book_append_sheet(this.workbook, this.worksheet, "Data");
    return this.workbook;
  }
  renderHeaders(columns) {
    return columns.map((col) => {
      const fieldInstance = this.findFieldByDataIndex(col.dataIndex);
      return col.title || (fieldInstance == null ? void 0 : fieldInstance.options.title) || col.defaultTitle;
    });
  }
}
function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  XlsxExporter
});
