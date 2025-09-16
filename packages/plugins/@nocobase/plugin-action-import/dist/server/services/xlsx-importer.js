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
var import_database = require("@nocobase/database");
var import_events = __toESM(require("events"));
var import_errors = require("../errors");
var import_lodash2 = __toESM(require("lodash"));
var import_utils = require("../utils");
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
    this.logger = options.logger;
    this.loggerService = new import_utils.LoggerService({ logger: this.logger });
  }
  repository;
  loggerService;
  logger;
  async beforePerformImport(data, options) {
    return data;
  }
  async validate(ctx) {
    const columns = this.getColumnsByPermission(ctx);
    if (columns.length == 0) {
      throw new import_errors.ImportValidationError("Columns configuration is empty");
    }
    for (const column of this.options.columns) {
      const field = this.options.collection.getField(column.dataIndex[0]);
      if (!field) {
        throw new import_errors.ImportValidationError("Field not found: {{field}}", { field: column.dataIndex[0] });
      }
    }
    const data = await this.getData(ctx);
    return data;
  }
  async run(options = {}) {
    var _a, _b;
    let transaction = options.transaction;
    if (!transaction && this.options.collectionManager.db) {
      transaction = options.transaction = await this.options.collectionManager.db.sequelize.transaction();
    }
    try {
      const data = await this.loggerService.measureExecutedTime(
        async () => this.validate(options.context),
        "Validation completed in {time}ms"
      );
      const imported = await this.loggerService.measureExecutedTime(
        async () => this.performImport(data, options),
        "Data import completed in {time}ms"
      );
      (_a = this.logger) == null ? void 0 : _a.info(`Import completed successfully, imported ${imported} records`);
      if (this.options.collectionManager.db) {
        await this.loggerService.measureExecutedTime(
          async () => this.resetSeq(options),
          "Sequence reset completed in {time}ms"
        );
      }
      transaction && await transaction.commit();
      return imported;
    } catch (error) {
      transaction && await transaction.rollback();
      (_b = this.logger) == null ? void 0 : _b.error(`Import failed: ${this.renderErrorMessage(error)}`, {
        originalError: error.stack || error.toString()
      });
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
    const field = this.options.collection.getField(autoIncrementAttribute);
    if (field && !(field instanceof import_database.NumberField)) {
      return;
    }
    let hasImportedAutoIncrementPrimary = false;
    for (const importedDataIndex of this.getColumnsByPermission(options == null ? void 0 : options.context)) {
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
  getColumnsByPermission(ctx) {
    const columns = this.options.columns;
    return columns.filter(
      (x) => {
        var _a, _b, _c, _d, _e;
        return import_lodash2.default.isEmpty((_b = (_a = ctx == null ? void 0 : ctx.permission) == null ? void 0 : _a.can) == null ? void 0 : _b.params) ? true : import_lodash2.default.includes(((_e = (_d = (_c = ctx == null ? void 0 : ctx.permission) == null ? void 0 : _c.can) == null ? void 0 : _d.params) == null ? void 0 : _e.fields) || [], x.dataIndex[0]);
      }
    );
  }
  async performImport(data, options) {
    const chunkSize = this.options.chunkSize || 1e3;
    const chunks = import_lodash.default.chunk(data.slice(1), chunkSize);
    let handingRowIndex = 1;
    let imported = 0;
    const total = data.length - 1;
    if (this.options.explain) {
      handingRowIndex += 1;
    }
    for (const chunkRows of chunks) {
      await this.handleChuckRows(chunkRows, options, { handingRowIndex, context: options == null ? void 0 : options.context });
      imported += chunkRows.length;
      this.emit("progress", {
        total,
        current: imported
      });
    }
    return imported;
  }
  getModel() {
    return this.repository instanceof import_database.RelationRepository ? this.repository.targetModel : this.repository.model;
  }
  async handleRowValuesWithColumns(row, rowValues, options) {
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
        transaction: options.transaction,
        field
      };
      if (column.dataIndex.length > 1) {
        ctx.associationField = field;
        ctx.targetCollection = field.targetCollection();
        ctx.filterKey = column.dataIndex[1];
      }
      rowValues[dataKey] = await interfaceInstance.toValue(this.trimString(str), ctx);
    }
    const model = this.getModel();
    const guard = import_database.UpdateGuard.fromOptions(model, {
      ...options,
      action: "create",
      underscored: this.repository.collection.options.underscored
    });
    rowValues = this.repository instanceof import_database.RelationRepository ? model.callSetters(guard.sanitize(rowValues || {}), options) : guard.sanitize(rowValues);
  }
  async handleChuckRows(chunkRows, runOptions, options) {
    var _a, _b;
    let { handingRowIndex = 1 } = options;
    const { transaction } = runOptions;
    const rows = [];
    for (const row of chunkRows) {
      const rowValues = {};
      await this.handleRowValuesWithColumns(row, rowValues, runOptions);
      rows.push(rowValues);
    }
    try {
      await this.loggerService.measureExecutedTime(
        async () => this.performInsert({
          values: rows,
          transaction,
          context: options == null ? void 0 : options.context
        }),
        "Record insertion completed in {time}ms"
      );
      await new Promise((resolve) => setTimeout(resolve, 5));
      handingRowIndex += chunkRows.length;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error(
          `${(_a = options.context) == null ? void 0 : _a.t("Unique constraint error, fields:", { ns: "action-import" })} ${JSON.stringify(
            error.fields
          )}`
        );
      }
      (_b = this.logger) == null ? void 0 : _b.error(`Import error at row ${handingRowIndex}: ${error.message}`, {
        rowIndex: handingRowIndex,
        rowData: rows[handingRowIndex],
        originalError: error.stack || error.toString()
      });
      throw new import_errors.ImportError(`Import failed at row ${handingRowIndex}`, {
        rowIndex: handingRowIndex,
        rowData: rows[handingRowIndex],
        cause: error
      });
    }
    return;
  }
  async performInsert(insertOptions) {
    const { values, transaction, context } = insertOptions;
    const instances = await this.loggerService.measureExecutedTime(
      async () => this.getModel().bulkCreate(values, {
        transaction,
        hooks: insertOptions.hooks == void 0 ? true : insertOptions.hooks,
        returning: true,
        context
      }),
      "Row {{rowIndex}}: bulkCreate completed in {time}ms"
    );
    if (this.repository instanceof import_database.RelationRepository) {
      await this.associateRecords(instances, import_lodash2.default.omit(insertOptions, "values"));
    }
    const db = this.options.collectionManager.db;
    for (let i = 0; i < instances.length; i++) {
      const instance = instances[i];
      const value = values[i];
      await this.loggerService.measureExecutedTime(
        async () => (0, import_database.updateAssociations)(instance, value, { transaction }),
        `Row ${i + 1}: updateAssociations completed in {time}ms`,
        "debug"
      );
      if (insertOptions.hooks !== false) {
        await this.loggerService.measureExecutedTime(
          async () => {
            await db.emit(`${this.repository.collection.name}.afterCreate`, instance, {
              transaction
            });
            await db.emitAsync(`${this.repository.collection.name}.afterSave`, instance, {
              transaction
            });
            instance.clearChangedWithAssociations();
          },
          `Row ${i + 1}: afterSave event emitted in {time}ms`,
          "debug"
        );
      }
      if ((context == null ? void 0 : context.skipWorkflow) !== true) {
        await this.loggerService.measureExecutedTime(
          async () => {
            await db.emitAsync(`${this.repository.collection.name}.afterCreateWithAssociations`, instance, {
              transaction
            });
            await db.emitAsync(`${this.repository.collection.name}.afterSaveWithAssociations`, instance, {
              transaction
            });
            instance.clearChangedWithAssociations();
          },
          `Row ${i + 1}: afterCreate event emitted in {time}ms`,
          "debug"
        );
      }
    }
    return instances;
  }
  async associateRecords(targets, options = {}) {
    if (!(this.repository instanceof import_database.RelationRepository)) {
      return;
    }
    const accessors = this.repository.accessors();
    const sourceModel = await this.repository.getSourceModel();
    if (!accessors || !sourceModel) {
      throw new Error("Missing accessors or source model.");
    }
    if (accessors.addMultiple) {
      await sourceModel[accessors.addMultiple](targets, options);
    } else if (accessors.add) {
      await Promise.all(
        targets.map((target) => sourceModel[accessors.add](target, options))
      );
    } else if (accessors.set) {
      if (targets.length > 1) {
        throw new Error("Cannot associate multiple records to a single-valued relation.");
      }
      await sourceModel[accessors.set](targets[0], options);
    } else {
      throw new Error(`Unsupported association or no usable accessor on ${this.repository["association"]}`);
    }
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
  getExpectedHeaders(ctx) {
    const columns = this.getColumnsByPermission(ctx);
    return columns.map((col) => col.title || col.defaultTitle);
  }
  async getData(ctx) {
    const workbook = this.options.workbook;
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    let data = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: null, blankrows: false });
    const expectedHeaders = this.getExpectedHeaders(ctx);
    const { headerRowIndex, headers } = this.findAndValidateHeaders({ data, expectedHeaders });
    if (headerRowIndex === -1) {
      throw new import_errors.ImportValidationError("Headers not found. Expected headers: {{headers}}", {
        headers: expectedHeaders.join(", ")
      });
    }
    data = this.alignWithHeaders({ data, expectedHeaders, headers });
    const rows = data.slice(headerRowIndex + 1);
    if (rows.length === 0) {
      throw new import_errors.ImportValidationError("No data to import");
    }
    return [headers, ...rows];
  }
  alignWithHeaders(params) {
    const { expectedHeaders, headers, data } = params;
    const keepCols = headers.map((x, i) => expectedHeaders.includes(x) ? i : -1).filter((i) => i > -1);
    return data.map((row) => keepCols.map((i) => row[i]));
  }
  findAndValidateHeaders(options) {
    const { data, expectedHeaders } = options;
    for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
      const row = data[rowIndex];
      const actualHeaders = row.filter((cell) => cell !== null && cell !== "");
      const allHeadersFound = expectedHeaders.every((header) => actualHeaders.includes(header));
      if (allHeadersFound) {
        const orderedHeaders = expectedHeaders.filter((h) => actualHeaders.includes(h));
        return { headerRowIndex: rowIndex, headers: orderedHeaders };
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  XlsxImporter
});
