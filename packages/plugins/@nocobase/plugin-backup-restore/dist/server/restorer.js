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
var restorer_exports = {};
__export(restorer_exports, {
  Restorer: () => Restorer
});
module.exports = __toCommonJS(restorer_exports);
var import_decompress = __toESM(require("decompress"));
var import_fs = __toESM(require("fs"));
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_app_migrator = require("./app-migrator");
var import_utils = require("./utils");
var import_database = require("@nocobase/database");
var import_lodash = __toESM(require("lodash"));
var import_field_value_writer = require("./field-value-writer");
var Topo = __toESM(require("@hapi/topo"));
var import_restore_check_error = require("./errors/restore-check-error");
var import_semver = __toESM(require("semver"));
const renamePlugins = async (app) => {
  const names = {
    oidc: "@nocobase/plugin-auth-oidc",
    cas: "@nocobase/plugin-auth-cas",
    saml: "@nocobase/plugin-auth-saml",
    "collection-manager": "@nocobase/plugin-data-source-main",
    "china-region": "@nocobase/plugin-field-china-region",
    "custom-request": "@nocobase/plugin-action-custom-request",
    export: "@nocobase/plugin-action-export",
    import: "@nocobase/plugin-action-import",
    "formula-field": "@nocobase/plugin-field-formula",
    "iframe-block": "@nocobase/plugin-block-iframe",
    "localization-management": "@nocobase/plugin-localization",
    "sequence-field": "@nocobase/plugin-field-sequence",
    "sms-auth": "@nocobase/plugin-auth-sms"
  };
  for (const original of Object.keys(names)) {
    await app.pm.repository.update({
      filter: {
        name: original
      },
      values: {
        name: names[original].replace("@nocobase/plugin-", ""),
        packageName: names[original]
      }
    });
  }
};
class Restorer extends import_app_migrator.AppMigrator {
  direction = "restore";
  backUpFilePath;
  decompressed = false;
  importedCollections = [];
  constructor(app, options) {
    super(app, options);
    const { backUpFilePath } = options;
    if (backUpFilePath) {
      this.setBackUpFilePath(backUpFilePath);
    }
  }
  static sortCollectionsByInherits(collections) {
    var _a;
    const sorter = new Topo.Sorter();
    for (const collection of collections) {
      const options = {
        group: collection.name
      };
      if ((_a = collection.inherits) == null ? void 0 : _a.length) {
        options.after = collection.inherits;
      }
      sorter.add(collection, options);
    }
    return sorter.sort();
  }
  setBackUpFilePath(backUpFilePath) {
    if (import_path.default.isAbsolute(backUpFilePath)) {
      this.backUpFilePath = backUpFilePath;
    } else if (import_path.default.basename(backUpFilePath) === backUpFilePath) {
      const dirname = import_path.default.resolve(process.cwd(), "storage", "duplicator");
      this.backUpFilePath = import_path.default.resolve(dirname, backUpFilePath);
    } else {
      this.backUpFilePath = import_path.default.resolve(process.cwd(), backUpFilePath);
    }
  }
  async parseBackupFile() {
    await this.decompressBackup(this.backUpFilePath);
    return await this.getImportMeta();
  }
  async restore(options) {
    await this.decompressBackup(this.backUpFilePath);
    await this.checkMeta();
    await this.importCollections(options);
    await this.importDb(options);
    await this.clearWorkDir();
  }
  async getImportMeta() {
    const metaFile = import_path.default.resolve(this.workDir, "meta");
    return JSON.parse(await import_promises.default.readFile(metaFile, "utf8"));
  }
  async checkMeta() {
    const meta = await this.getImportMeta();
    if (!this.app.db.inDialect(meta["dialect"])) {
      throw new import_restore_check_error.RestoreCheckError(`this backup file can only be imported in database ${meta["dialect"]}`);
    }
    const checkEnv = (envName) => {
      const valueInPackage = meta[envName] || "";
      const valueInEnv = process.env[envName] || "";
      if (valueInPackage && valueInEnv !== valueInPackage) {
        throw new import_restore_check_error.RestoreCheckError(`for use this backup file, please set ${envName}=${valueInPackage}`);
      }
    };
    for (const envName of ["DB_UNDERSCORED", "DB_SCHEMA", "COLLECTION_MANAGER_SCHEMA", "DB_TABLE_PREFIX"]) {
      checkEnv(envName);
    }
    const version = meta["version"];
    if (import_semver.default.lt(version, "0.18.0-alpha.2")) {
      throw new import_restore_check_error.RestoreCheckError(`this backup file can only be imported in nocobase ${version}`);
    }
  }
  async importCollections(options) {
    const importCollection = async (collectionName) => {
      await this.importCollection({
        name: collectionName
      });
    };
    const preImportCollections = ["applicationPlugins"];
    const { dumpableCollectionsGroupByGroup, delayCollections } = await this.parseBackupFile();
    for (const collectionName of preImportCollections) {
      await importCollection(collectionName);
    }
    await renamePlugins(this.app);
    await this.app.reload();
    const metaCollections = dumpableCollectionsGroupByGroup.required;
    for (const collection of metaCollections) {
      if (preImportCollections.includes(collection.name)) {
        continue;
      }
      if (delayCollections.includes(collection.name)) {
        continue;
      }
      await importCollection(collection.name);
    }
    options.groups.delete("required");
    const importGroups = [...options.groups];
    for (const group of importGroups) {
      const collections = dumpableCollectionsGroupByGroup[group];
      if (!collections) {
        this.app.log.warn(`group ${group} not found`);
        continue;
      }
      for (const collection of Restorer.sortCollectionsByInherits(collections)) {
        await importCollection(collection.name);
      }
    }
    await this.app.reload();
    await this.app.db.getRepository("collections").load();
    await this.app.db.sync();
    for (const collectionName of delayCollections) {
      const delayRestore = this.app.db.getCollection(collectionName).options.dumpRules["delayRestore"];
      await delayRestore(this);
    }
    await this.emitAsync("restoreCollectionsFinished");
  }
  async decompressBackup(backupFilePath) {
    if (!this.decompressed) await (0, import_decompress.default)(backupFilePath, this.workDir);
  }
  async readCollectionMeta(collectionName) {
    const dir = this.workDir;
    const collectionMetaPath = import_path.default.resolve(dir, "collections", collectionName, "meta");
    const metaContent = await import_promises.default.readFile(collectionMetaPath, "utf8");
    return JSON.parse(metaContent);
  }
  async importCollection(options) {
    const app = this.app;
    const db = app.db;
    const collectionName = options.name;
    if (!collectionName) {
      throw new Error("collection name is required");
    }
    const dir = this.workDir;
    const collectionDataPath = import_path.default.resolve(dir, "collections", collectionName, "data");
    const collectionMetaPath = import_path.default.resolve(dir, "collections", collectionName, "meta");
    try {
      await import_promises.default.stat(collectionMetaPath);
    } catch (e) {
      app.logger.info(`${collectionName} has no meta`);
      return;
    }
    const metaContent = await import_promises.default.readFile(collectionMetaPath, "utf8");
    const meta = JSON.parse(metaContent);
    let addSchemaTableName = meta.tableName;
    if (!this.app.db.inDialect("postgres") && (0, import_lodash.isPlainObject)(addSchemaTableName)) {
      addSchemaTableName = addSchemaTableName.tableName;
    }
    const columns = meta["columns"];
    if (columns.length == 0) {
      app.logger.info(`${collectionName} has no columns`);
      return;
    }
    const fieldAttributes = import_lodash.default.mapValues(meta.attributes, (attr) => {
      if (attr.isCollectionField) {
        const fieldClass = db.fieldTypes.get(attr.type);
        if (!fieldClass) throw new Error(`field type ${attr.type} not found`);
        return new fieldClass(attr.typeOptions, {
          database: db
        });
      }
      return void 0;
    });
    const rawAttributes = import_lodash.default.mapValues(meta.attributes, (attr, key) => {
      if (attr.isCollectionField) {
        const field = fieldAttributes[key];
        return {
          ...field.toSequelize(),
          field: attr.field
        };
      }
      const DataTypeClass = import_database.DataTypes[db.options.dialect][attr.type] || import_database.DataTypes[attr.type];
      const obj = {
        ...attr,
        type: new DataTypeClass()
      };
      if (attr.defaultValue && ["JSON", "JSONB", "JSONTYPE"].includes(attr.type)) {
        obj.defaultValue = JSON.stringify(attr.defaultValue);
      }
      return obj;
    });
    if (options.clear !== false) {
      await db.sequelize.getQueryInterface().dropTable(addSchemaTableName, {
        cascade: true
      });
      await db.sequelize.getQueryInterface().createTable(addSchemaTableName, rawAttributes);
      if (meta.inherits) {
        for (const inherit of import_lodash.default.uniq(meta.inherits)) {
          const parentMeta = await this.readCollectionMeta(inherit);
          const sql2 = `ALTER TABLE ${app.db.utils.quoteTable(addSchemaTableName)} INHERIT ${app.db.utils.quoteTable(
            parentMeta.tableName
          )};`;
          await db.sequelize.query(sql2);
        }
      }
    }
    const rows = await (0, import_utils.readLines)(collectionDataPath);
    if (rows.length == 0) {
      app.logger.info(`${collectionName} has no data to import`);
      this.importedCollections.push(collectionName);
      return;
    }
    const rowsWithMeta = rows.map(
      (row) => JSON.parse(row).map((val, index) => [columns[index], val]).reduce((carry, [column, val]) => {
        const field = fieldAttributes[column];
        carry[column] = field ? import_field_value_writer.FieldValueWriter.write(field, val, app.db) : val;
        return carry;
      }, {})
    ).filter((row) => {
      if (options.rowCondition) {
        return options.rowCondition(row);
      }
      return true;
    });
    if (rowsWithMeta.length == 0) {
      app.logger.info(`${collectionName} has no data to import`);
      this.importedCollections.push(collectionName);
      return;
    }
    const insertGeneratorAttributes = import_lodash.default.mapKeys(rawAttributes, (value, key) => {
      return value.field;
    });
    const sql = db.sequelize.queryInterface.queryGenerator.bulkInsertQuery(
      addSchemaTableName,
      rowsWithMeta,
      {},
      insertGeneratorAttributes
    );
    if (options.insert === false) {
      return sql;
    }
    await app.db.sequelize.query(sql, {
      type: "INSERT"
    });
    app.logger.info(`${collectionName} imported with ${rowsWithMeta.length} rows`);
    if (meta.autoIncrement) {
      const queryInterface = app.db.queryInterface;
      await queryInterface.setAutoIncrementVal({
        tableInfo: (0, import_lodash.isPlainObject)(meta.tableName) ? meta.tableName : {
          schema: "public",
          tableName: meta.tableName
        },
        columnName: meta.autoIncrement.fieldName,
        seqName: meta.autoIncrement.seqName,
        currentVal: meta.autoIncrement.currentVal
      });
    }
    this.importedCollections.push(collectionName);
  }
  async importDb(options) {
    const sqlContentPath = import_path.default.resolve(this.workDir, "sql-content.json");
    if (!import_fs.default.existsSync(sqlContentPath)) {
      return;
    }
    const sqlData = JSON.parse(await import_promises.default.readFile(sqlContentPath, "utf8"));
    const sqlContent = Object.keys(sqlData).filter((key) => options.groups.has(sqlData[key].group)).reduce((acc, key) => {
      acc[key] = sqlData[key];
      return acc;
    }, {});
    const queries = Object.values(
      sqlContent
    );
    for (const sqlData2 of queries) {
      try {
        this.app.log.info(`import sql: ${sqlData2.sql}`);
        for (const sql of import_lodash.default.castArray(sqlData2.sql)) {
          await this.app.db.sequelize.query(sql);
        }
      } catch (e) {
        if (e.name === "SequelizeDatabaseError") {
          this.app.logger.error(e.message);
        } else {
          throw e;
        }
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Restorer
});
