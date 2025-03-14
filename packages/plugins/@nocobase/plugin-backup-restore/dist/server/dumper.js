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
var dumper_exports = {};
__export(dumper_exports, {
  Dumper: () => Dumper
});
module.exports = __toCommonJS(dumper_exports);
var import_database = require("@nocobase/database");
var import_archiver = __toESM(require("archiver"));
var import_dayjs = __toESM(require("dayjs"));
var import_fs = __toESM(require("fs"));
var import_promises = __toESM(require("fs/promises"));
var import_lodash = __toESM(require("lodash"));
var import_mkdirp = __toESM(require("mkdirp"));
var import_path = __toESM(require("path"));
var process = __toESM(require("process"));
var import_stream = __toESM(require("stream"));
var import_util = __toESM(require("util"));
var import_app_migrator = require("./app-migrator");
var import_field_value_writer = require("./field-value-writer");
var import_utils = require("./utils");
const finished = import_util.default.promisify(import_stream.default.finished);
class Dumper extends import_app_migrator.AppMigrator {
  static dumpTasks = /* @__PURE__ */ new Map();
  direction = "dump";
  sqlContent = {};
  static getTaskPromise(taskId) {
    return this.dumpTasks.get(taskId);
  }
  static async getFileStatus(filePath) {
    const lockFile = filePath + ".lock";
    const fileName = import_path.default.basename(filePath);
    return import_fs.default.promises.stat(lockFile).then((lockFileStat) => {
      if (lockFileStat.isFile()) {
        return {
          name: fileName,
          inProgress: true,
          status: "in_progress"
        };
      } else {
        throw new Error("Lock file is not a file");
      }
    }).catch((error) => {
      if (error.code === "ENOENT") {
        return import_fs.default.promises.stat(filePath).then((backupFileStat) => {
          if (backupFileStat.isFile()) {
            return {
              name: fileName,
              createdAt: backupFileStat.ctime,
              fileSize: (0, import_utils.humanFileSize)(backupFileStat.size),
              status: "ok"
            };
          } else {
            throw new Error("Path is not a file");
          }
        });
      }
      throw error;
    });
  }
  static generateFileName() {
    return `backup_${(0, import_dayjs.default)().format(`YYYYMMDD_HHmmss_${Math.floor(1e3 + Math.random() * 9e3)}`)}.${import_utils.DUMPED_EXTENSION}`;
  }
  writeSQLContent(key, data) {
    this.sqlContent[key] = data;
  }
  getSQLContent(key) {
    return this.sqlContent[key];
  }
  async getCollectionsByDataTypes(groups) {
    const dumpableCollectionsGroupByDataTypes = await this.collectionsGroupByDataTypes();
    return [...groups].reduce((acc, key) => {
      return acc.concat(dumpableCollectionsGroupByDataTypes[key] || []);
    }, []);
  }
  async dumpableCollections() {
    return (await Promise.all(
      [...this.app.db.collections.values()].map(async (c) => {
        try {
          const dumpRules = import_database.CollectionGroupManager.unifyDumpRules(c.options.dumpRules);
          const options = {
            name: c.name,
            title: c.options.title || c.name,
            options: c.options,
            group: dumpRules == null ? void 0 : dumpRules.group,
            isView: c.isView(),
            origin: c.origin
          };
          if (c.options.inherits && c.options.inherits.length > 0) {
            options.inherits = c.options.inherits;
          }
          return options;
        } catch (e) {
          console.error(e);
          throw new Error(`collection ${c.name} has invalid dumpRules option`, { cause: e });
        }
      })
    )).map((item) => {
      if (!item.group) {
        item.group = "unknown";
      }
      return item;
    });
  }
  async collectionsGroupByDataTypes() {
    const grouped = import_lodash.default.groupBy(await this.dumpableCollections(), "group");
    return Object.fromEntries(Object.entries(grouped).map(([key, value]) => [key, value.map((item) => item.name)]));
  }
  backUpStorageDir() {
    const paths = [process.cwd(), "storage", "backups"];
    if (this.app.name !== "main") {
      paths.push(this.app.name);
    }
    return import_path.default.resolve(...paths);
  }
  async allBackUpFilePaths(options) {
    const dirname = (options == null ? void 0 : options.dir) || this.backUpStorageDir();
    const includeInProgress = options == null ? void 0 : options.includeInProgress;
    try {
      const files = await import_promises.default.readdir(dirname);
      const lockFilesSet = new Set(
        files.filter((file) => import_path.default.extname(file) === ".lock").map((file) => import_path.default.basename(file, ".lock"))
      );
      const filteredFiles = files.filter((file) => {
        const baseName = import_path.default.basename(file);
        const isLockFile = import_path.default.extname(file) === ".lock";
        const isDumpFile = import_path.default.extname(file) === `.${import_utils.DUMPED_EXTENSION}`;
        return includeInProgress && isLockFile || isDumpFile && !lockFilesSet.has(baseName);
      }).map(async (file) => {
        const filePath = import_path.default.resolve(dirname, file);
        const stats = await import_promises.default.stat(filePath);
        return { filePath, birthtime: stats.birthtime.getTime() };
      });
      const filesData = await Promise.all(filteredFiles);
      filesData.sort((a, b) => b.birthtime - a.birthtime);
      return filesData.map((fileData) => fileData.filePath);
    } catch (error) {
      if (!error.message.includes("no such file or directory")) {
        console.error("Error reading directory:", error);
      }
      return [];
    }
  }
  backUpFilePath(fileName) {
    const dirname = this.backUpStorageDir();
    return import_path.default.resolve(dirname, fileName);
  }
  lockFilePath(fileName) {
    const lockFile = fileName + ".lock";
    const dirname = this.backUpStorageDir();
    return import_path.default.resolve(dirname, lockFile);
  }
  async writeLockFile(fileName) {
    const dirname = this.backUpStorageDir();
    await (0, import_mkdirp.default)(dirname);
    const filePath = this.lockFilePath(fileName);
    await import_promises.default.writeFile(filePath, "lock", "utf8");
  }
  async cleanLockFile(fileName) {
    const filePath = this.lockFilePath(fileName);
    await import_promises.default.unlink(filePath);
  }
  async runDumpTask(options) {
    const backupFileName = Dumper.generateFileName();
    await this.writeLockFile(backupFileName);
    const promise = this.dump({
      groups: options.groups,
      fileName: backupFileName
    }).finally(() => {
      this.cleanLockFile(backupFileName);
      Dumper.dumpTasks.delete(backupFileName);
    });
    Dumper.dumpTasks.set(backupFileName, promise);
    return backupFileName;
  }
  async dumpableCollectionsGroupByGroup() {
    return (0, import_lodash.default)(await this.dumpableCollections()).map((c) => import_lodash.default.pick(c, ["name", "group", "origin", "title", "isView", "inherits"])).groupBy("group").mapValues((items) => import_lodash.default.sortBy(items, (item) => item.name)).value();
  }
  async dump(options) {
    const dumpingGroups = options.groups;
    dumpingGroups.add("required");
    const delayCollections = /* @__PURE__ */ new Set();
    const dumpedCollections = await this.getCollectionsByDataTypes(dumpingGroups);
    for (const collectionName of dumpedCollections) {
      const collection = this.app.db.getCollection(collectionName);
      if (import_lodash.default.get(collection.options, "dumpRules.delayRestore")) {
        delayCollections.add(collectionName);
      }
      await this.dumpCollection({
        name: collectionName
      });
    }
    await this.dumpMeta({
      dumpableCollectionsGroupByGroup: import_lodash.default.pick(await this.dumpableCollectionsGroupByGroup(), [...dumpingGroups]),
      dumpedGroups: [...dumpingGroups],
      delayCollections: [...delayCollections]
    });
    await this.dumpDb(options);
    const backupFileName = options.fileName || Dumper.generateFileName();
    const filePath = await this.packDumpedDir(backupFileName);
    await this.clearWorkDir();
    return filePath;
  }
  async dumpDb(options) {
    var _a;
    for (const collection of this.app.db.collections.values()) {
      const collectionOnDumpOption = (_a = this.app.db.collectionFactory.collectionTypes.get(
        collection.constructor
      )) == null ? void 0 : _a.onDump;
      if (collectionOnDumpOption) {
        await collectionOnDumpOption(this, collection);
      }
    }
    if (this.hasSqlContent()) {
      const dbDumpPath = import_path.default.resolve(this.workDir, "sql-content.json");
      await import_promises.default.writeFile(
        dbDumpPath,
        JSON.stringify(
          Object.keys(this.sqlContent).filter((key) => options.groups.has(this.sqlContent[key].group)).reduce((acc, key) => {
            acc[key] = this.sqlContent[key];
            return acc;
          }, {})
        ),
        "utf8"
      );
    }
  }
  hasSqlContent() {
    return Object.keys(this.sqlContent).length > 0;
  }
  async dumpMeta(additionalMeta = {}) {
    const metaPath = import_path.default.resolve(this.workDir, "meta");
    const metaObj = {
      version: await this.app.version.get(),
      dialect: this.app.db.sequelize.getDialect(),
      DB_UNDERSCORED: process.env.DB_UNDERSCORED,
      DB_TABLE_PREFIX: process.env.DB_TABLE_PREFIX,
      DB_SCHEMA: process.env.DB_SCHEMA,
      COLLECTION_MANAGER_SCHEMA: process.env.COLLECTION_MANAGER_SCHEMA,
      ...additionalMeta
    };
    if (this.app.db.inDialect("postgres")) {
      if (this.app.db.inheritanceMap.nodes.size > 0) {
        metaObj["dialectOnly"] = true;
      }
    }
    if (this.hasSqlContent()) {
      metaObj["dialectOnly"] = true;
    }
    await import_promises.default.writeFile(metaPath, JSON.stringify(metaObj), "utf8");
  }
  async dumpCollection(options) {
    var _a;
    const app = this.app;
    const dir = this.workDir;
    const collectionName = options.name;
    app.log.info(`dumping collection ${collectionName}`);
    const collection = app.db.getCollection(collectionName);
    if (!collection) {
      this.app.log.warn(`collection ${collectionName} not found`);
      return;
    }
    const collectionOnDumpOption = (_a = this.app.db.collectionFactory.collectionTypes.get(
      collection.constructor
    )) == null ? void 0 : _a.onDump;
    if (collectionOnDumpOption) {
      return;
    }
    const attributes = collection.model.tableAttributes;
    const columns = [...new Set(import_lodash.default.map(attributes, "field"))];
    const collectionDataDir = import_path.default.resolve(dir, "collections", collectionName);
    await import_promises.default.mkdir(collectionDataDir, { recursive: true });
    let count = 0;
    if (columns.length !== 0) {
      const dataFilePath = import_path.default.resolve(collectionDataDir, "data");
      const dataStream = import_fs.default.createWriteStream(dataFilePath);
      const rows = await app.db.sequelize.query(
        (0, import_utils.sqlAdapter)(
          app.db,
          `SELECT *
           FROM ${collection.isParent() ? "ONLY" : ""} ${collection.quotedTableName()}`
        ),
        {
          type: "SELECT"
        }
      );
      for (const row of rows) {
        const rowData = JSON.stringify(
          columns.map((col) => {
            const val = row[col];
            const field = collection.getField(col);
            return field ? import_field_value_writer.FieldValueWriter.toDumpedValue(field, val) : val;
          })
        );
        dataStream.write(rowData + "\r\n", "utf8");
      }
      dataStream.end();
      await finished(dataStream);
      count = rows.length;
    }
    const metaAttributes = import_lodash.default.mapValues(attributes, (attr, key) => {
      var _a2, _b, _c;
      const collectionField = collection.getField(key);
      const fieldOptionKeys = ["field", "primaryKey", "autoIncrement", "allowNull", "defaultValue", "unique"];
      if (collectionField) {
        const fieldAttributes = {
          field: attr.field,
          isCollectionField: true,
          type: collectionField.type,
          typeOptions: collectionField.options
        };
        if (((_c = (_b = (_a2 = fieldAttributes.typeOptions) == null ? void 0 : _a2.defaultValue) == null ? void 0 : _b.constructor) == null ? void 0 : _c.name) === "UUIDV4") {
          delete fieldAttributes.typeOptions.defaultValue;
        }
        return fieldAttributes;
      }
      return {
        ...import_lodash.default.pick(attr, fieldOptionKeys),
        type: attr.type.constructor.toString(),
        isCollectionField: false,
        typeOptions: attr.type.options
      };
    });
    const meta = {
      name: collectionName,
      tableName: collection.getTableNameWithSchema(),
      count,
      columns,
      attributes: metaAttributes
    };
    if (collection.options.inherits) {
      meta["inherits"] = import_lodash.default.uniq(collection.options.inherits);
    }
    const autoIncrAttr = collection.model.autoIncrementAttribute;
    if (autoIncrAttr && collection.model.rawAttributes[autoIncrAttr] && collection.model.rawAttributes[autoIncrAttr].autoIncrement) {
      const queryInterface = app.db.queryInterface;
      const autoIncrInfo = await queryInterface.getAutoIncrementInfo({
        tableInfo: {
          tableName: collection.model.tableName,
          schema: collection.collectionSchema()
        },
        fieldName: autoIncrAttr
      });
      meta["autoIncrement"] = {
        ...autoIncrInfo,
        fieldName: autoIncrAttr
      };
    }
    await import_promises.default.writeFile(import_path.default.resolve(collectionDataDir, "meta"), JSON.stringify(meta), "utf8");
  }
  async packDumpedDir(fileName) {
    const dirname = this.backUpStorageDir();
    await (0, import_mkdirp.default)(dirname);
    const filePath = import_path.default.resolve(dirname, fileName);
    const output = import_fs.default.createWriteStream(filePath);
    const archive = (0, import_archiver.default)("zip", {
      zlib: { level: 9 }
    });
    const onClose = new Promise((resolve, reject) => {
      output.on("close", function() {
        console.log("dumped file size: " + (0, import_utils.humanFileSize)(archive.pointer(), true));
        resolve(true);
      });
      output.on("end", function() {
        console.log("Data has been drained");
      });
      archive.on("warning", function(err) {
        if (err.code === "ENOENT") {
        } else {
          reject(err);
        }
      });
      archive.on("error", function(err) {
        reject(err);
      });
    });
    archive.pipe(output);
    archive.directory(this.workDir, false);
    await archive.finalize();
    await onClose;
    return {
      filePath,
      dirname
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Dumper
});
