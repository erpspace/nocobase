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
var xlsx_importer_exports = {};
__export(xlsx_importer_exports, {
  XlsxImporter: () => XlsxImporter
});
module.exports = __toCommonJS(xlsx_importer_exports);
var XLSX = __toESM(require("xlsx"));
var import_lodash = __toESM(require("lodash"));
var import_events = __toESM(require("events"));
var import_errors = require("../errors");
class XlsxImporter extends import_events.default {
  constructor(options) {
    super();
    this.options = options;
    if (typeof options.columns === "string") {
      options.columns = JSON.parse(options.columns);
    }
    if (options.columns.length == 0) {
      throw new Error(`columns is empty`);
    }
    this.repository = options.repository ? options.repository : options.collection.repository;
  }
  repository;
  async validate() {
    if (this.options.columns.length == 0) {
      throw new import_errors.ImportValidationError("Columns configuration is empty");
    }
    for (const column of this.options.columns) {
      const field = this.options.collection.getField(column.dataIndex[0]);
      if (!field) {
        throw new import_errors.ImportValidationError("Field not found: {{field}}", { field: column.dataIndex[0] });
      }
    }
    const data = await this.getData();
    return data;
  }
  async run(options = {}) {
    let transaction = options.transaction;
    if (!transaction && this.options.collectionManager.db) {
      transaction = options.transaction = await this.options.collectionManager.db.sequelize.transaction();
    }
    try {
      await this.validate();
      const imported = await this.performImport(options);
      if (this.options.collectionManager.db) {
        await this.resetSeq(options);
      }
      transaction && await transaction.commit();
      return imported;
    } catch (error) {
      transaction && await transaction.rollback();
      throw error;
    }
  }
  async resetSeq(options) {
    const { transaction } = options;
    const db = this.options.collectionManager.db;
    const collection = this.options.collection;
    const autoIncrementAttribute = collection.model.autoIncrementAttribute;
    if (!autoIncrementAttribute) {
      return;
    }
    let hasImportedAutoIncrementPrimary = false;
    for (const importedDataIndex of this.options.columns) {
      if (importedDataIndex.dataIndex[0] === autoIncrementAttribute) {
        hasImportedAutoIncrementPrimary = true;
        break;
      }
    }
    if (!hasImportedAutoIncrementPrimary) {
      return;
    }
    let tableInfo = collection.getTableNameWithSchema();
    if (typeof tableInfo === "string") {
      tableInfo = {
        tableName: tableInfo
      };
    }
    const autoIncrInfo = await db.queryInterface.getAutoIncrementInfo({
      tableInfo,
      fieldName: autoIncrementAttribute,
      transaction
    });
    const maxVal = await collection.model.max(autoIncrementAttribute, { transaction });
    const queryInterface = db.queryInterface;
    await queryInterface.setAutoIncrementVal({
      tableInfo,
      columnName: collection.model.rawAttributes[autoIncrementAttribute].field,
      currentVal: maxVal,
      seqName: autoIncrInfo.seqName,
      transaction
    });
    this.emit("seqReset", { maxVal, seqName: autoIncrInfo.seqName });
  }
  async performImport(options) {
    const transaction = options == null ? void 0 : options.transaction;
    const data = await this.getData();
    const chunks = import_lodash.default.chunk(data.slice(1), this.options.chunkSize || 200);
    let handingRowIndex = 1;
    let imported = 0;
    const total = data.length - 1;
    if (this.options.explain) {
      handingRowIndex += 1;
    }
    for (const chunkRows of chunks) {
      for (const row of chunkRows) {
        const rowValues = {};
        handingRowIndex += 1;
        try {
          for (let index = 0; index < this.options.columns.length; index++) {
            const column = this.options.columns[index];
            const field = this.options.collection.getField(column.dataIndex[0]);
            if (!field) {
              throw new import_errors.ImportValidationError("Import validation.Field not found", {
                field: column.dataIndex[0]
              });
            }
            const str = row[index];
            const dataKey = column.dataIndex[0];
            const fieldOptions = field.options;
            const interfaceName = fieldOptions.interface;
            const InterfaceClass = this.options.collectionManager.getFieldInterface(interfaceName);
            if (!InterfaceClass) {
              rowValues[dataKey] = str;
              continue;
            }
            const interfaceInstance = new InterfaceClass(field.options);
            const ctx = {
              transaction,
              field
            };
            if (column.dataIndex.length > 1) {
              ctx.associationField = field;
              ctx.targetCollection = field.targetCollection();
              ctx.filterKey = column.dataIndex[1];
            }
            rowValues[dataKey] = await interfaceInstance.toValue(this.trimString(str), ctx);
          }
          await this.performInsert({
            values: rowValues,
            transaction,
            context: options == null ? void 0 : options.context
          });
          imported += 1;
          this.emit("progress", {
            total,
            current: imported
          });
          await new Promise((resolve) => setTimeout(resolve, 5));
        } catch (error) {
          throw new import_errors.ImportError(`Import failed at row ${handingRowIndex}`, {
            rowIndex: handingRowIndex,
            rowData: Object.entries(rowValues).map(([key, value]) => `${key}: ${value}`).join(", "),
            cause: error
          });
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
    return imported;
  }
  async performInsert(insertOptions) {
    const { values, transaction, context } = insertOptions;
    return this.repository.create({
      values,
      context,
      transaction,
      hooks: insertOptions.hooks == void 0 ? true : insertOptions.hooks
    });
  }
  renderErrorMessage(error) {
    let message = error.message;
    if (error.parent) {
      message += `: ${error.parent.message}`;
    }
    return message;
  }
  trimString(str) {
    if (typeof str === "string") {
      return str.trim();
    }
    return str;
  }
  getExpectedHeaders() {
    return this.options.columns.map((col) => col.title || col.defaultTitle);
  }
  async getData() {
    const workbook = this.options.workbook;
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null });
    const expectedHeaders = this.getExpectedHeaders();
    const { headerRowIndex, headers } = this.findAndValidateHeaders(data);
    if (headerRowIndex === -1) {
      throw new import_errors.ImportValidationError("Headers not found. Expected headers: {{headers}}", {
        headers: expectedHeaders.join(", ")
      });
    }
    const rows = data.slice(headerRowIndex + 1);
    if (rows.length === 0) {
      throw new import_errors.ImportValidationError("No data to import");
    }
    return [headers, ...rows];
  }
  findAndValidateHeaders(data) {
    const expectedHeaders = this.getExpectedHeaders();
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      const actualHeaders = row.filter((cell) => cell !== null && cell !== "");
      const allHeadersFound = expectedHeaders.every((header) => actualHeaders.includes(header));
      const noExtraHeaders = actualHeaders.length === expectedHeaders.length;
      if (allHeadersFound && noExtraHeaders) {
        const mismatchIndex = expectedHeaders.findIndex((title, index) => actualHeaders[index] !== title);
        if (mismatchIndex === -1) {
          return { headerRowIndex: rowIndex, headers: actualHeaders };
        } else {
          throw new import_errors.ImportValidationError(
            'Header mismatch at column {{column}}: expected "{{expected}}", but got "{{actual}}"',
            {
              column: mismatchIndex + 1,
              expected: expectedHeaders[mismatchIndex],
              actual: actualHeaders[mismatchIndex] || "empty"
            }
          );
        }
      }
    }
    throw new import_errors.ImportValidationError("Headers not found. Expected headers: {{headers}}", {
      headers: expectedHeaders.join(", ")
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  XlsxImporter
});
