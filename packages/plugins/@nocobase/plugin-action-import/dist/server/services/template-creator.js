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
var template_creator_exports = {};
__export(template_creator_exports, {
  TemplateCreator: () => TemplateCreator
});
module.exports = __toCommonJS(template_creator_exports);
var import_workbook_converter = require("../utils/workbook-converter");
var import_exceljs = require("exceljs");
class TemplateCreator {
  constructor(options) {
    this.options = options;
  }
  headerRowIndex;
  getHeaderRowIndex() {
    return this.headerRowIndex;
  }
  async run(options) {
    var _a;
    const workbook = new import_exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");
    const headers = this.renderHeaders();
    let currentRow = 1;
    let explainText = "";
    if (this.options.explain && ((_a = this.options.explain) == null ? void 0 : _a.trim()) !== "") {
      explainText = this.options.explain;
    }
    const fieldDescriptions = this.options.columns.filter((col) => col.description).map((col) => `${col.title || col.defaultTitle}\uFF1A${col.description}`);
    if (fieldDescriptions.length > 0) {
      if (explainText) {
        explainText += "\n\n";
      }
      explainText += fieldDescriptions.join("\n");
    }
    if (explainText.trim() !== "") {
      const lines = explainText.split("\n");
      const EXPLAIN_MERGE_COLUMNS = 5;
      const columnsNeeded = Math.max(EXPLAIN_MERGE_COLUMNS, headers.length);
      for (let i = 1; i <= columnsNeeded; i++) {
        const col = worksheet.getColumn(i);
        col.width = i === 1 ? 60 : 30;
      }
      lines.forEach((line, index) => {
        const row = worksheet.getRow(index + 1);
        worksheet.mergeCells(index + 1, 1, index + 1, EXPLAIN_MERGE_COLUMNS);
        const cell = row.getCell(1);
        cell.value = line;
        cell.alignment = {
          vertical: "middle",
          horizontal: "left",
          indent: 1,
          wrapText: true
        };
      });
      currentRow = lines.length + 1;
    }
    const headerRow = worksheet.getRow(currentRow);
    headerRow.height = 25;
    headers.forEach((header, index) => {
      const cell = headerRow.getCell(index + 1);
      cell.value = header;
      cell.font = {
        bold: true,
        size: 10,
        name: "Arial"
      };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" }
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE9ECEF" }
        // Darker gray background for headers
      };
      cell.alignment = {
        vertical: "middle",
        horizontal: "left",
        indent: 1,
        wrapText: true
      };
      if (index === 0) {
        worksheet.getColumn(1).width = 30;
      }
    });
    headers.forEach((_, index) => {
      const col = worksheet.getColumn(index + 1);
      col.width = 30;
      if (index === 0) {
        col.eachCell({ includeEmpty: false }, (cell, rowNumber) => {
          if (rowNumber === currentRow) {
            cell.fill = {
              type: "pattern",
              pattern: "solid",
              fgColor: { argb: "FFE9ECEF" }
            };
          }
        });
      }
    });
    this.headerRowIndex = currentRow;
    if (options == null ? void 0 : options.returnXLSXWorkbook) {
      return await import_workbook_converter.WorkbookConverter.excelJSToXLSX(workbook);
    }
    return workbook;
  }
  renderHeaders() {
    return this.options.columns.map((col) => {
      return col.title || col.defaultTitle;
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TemplateCreator
});
