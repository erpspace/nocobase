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
var server_exports = {};
__export(server_exports, {
  PluginFileManagerServer: () => PluginFileManagerServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_fs = __toESM(require("fs"));
var import_path = require("path");
var import_mime_match = __toESM(require("mime-match"));
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_constants = require("../constants");
var import_actions = __toESM(require("./actions"));
var import_attachment_interface = require("./interfaces/attachment-interface");
var import_ali_oss = __toESM(require("./storages/ali-oss"));
var import_local = __toESM(require("./storages/local"));
var import_s3 = __toESM(require("./storages/s3"));
var import_tx_cos = __toESM(require("./storages/tx-cos"));
var import_utils2 = require("./utils");
const DEFAULT_STORAGE_TYPE = import_constants.STORAGE_TYPE_LOCAL;
class FileDeleteError extends Error {
  data;
  constructor(message, data) {
    super(message);
    this.name = "FileDeleteError";
    this.data = data;
  }
}
class PluginFileManagerServer extends import_server.Plugin {
  storageTypes = new import_utils.Registry();
  storagesCache = /* @__PURE__ */ new Map();
  afterDestroy = async (record, options) => {
    var _a;
    const { collection } = record.constructor;
    if (((_a = collection == null ? void 0 : collection.options) == null ? void 0 : _a.template) !== "file" && collection.name !== "attachments") {
      return;
    }
    if (!record.get("storageId")) {
      return;
    }
    const storage = this.storagesCache.get(record.get("storageId"));
    if (!storage) {
      return;
    }
    if (storage == null ? void 0 : storage.paranoid) {
      return;
    }
    const Type = this.storageTypes.get(storage.type);
    if (!Type) {
      return;
    }
    const storageConfig = new Type(storage);
    const result = await storageConfig.delete([record]);
    if (!result[0]) {
      throw new FileDeleteError("Failed to delete file", record);
    }
  };
  registerStorageType(type, Type) {
    this.storageTypes.register(type, Type);
  }
  async createFileRecord(options) {
    const { values, storageName, collectionName, filePath, transaction } = options;
    const collection = this.db.getCollection(collectionName);
    if (!collection) {
      throw new Error(`collection does not exist`);
    }
    const collectionRepository = this.db.getRepository(collectionName);
    const name = storageName || collection.options.storage;
    const data = await this.uploadFile({ storageName: name, filePath });
    return await collectionRepository.create({ values: { ...data, ...values }, transaction });
  }
  parseStorage(instance) {
    return this.app.environment.renderJsonTemplate(instance.toJSON());
  }
  async uploadFile(options) {
    const { storageName, filePath, documentRoot } = options;
    if (!this.storagesCache.size) {
      await this.loadStorages();
    }
    const storages = Array.from(this.storagesCache.values());
    const storage = storages.find((item) => item.name === storageName) || storages.find((item) => item.default);
    if (!storage) {
      throw new Error("[file-manager] no linked or default storage provided");
    }
    const fileStream = import_fs.default.createReadStream(filePath);
    if (documentRoot) {
      storage.options["documentRoot"] = documentRoot;
    }
    const StorageType = this.storageTypes.get(storage.type);
    const storageInstance = new StorageType(storage);
    if (!storageInstance) {
      throw new Error(`[file-manager] storage type "${storage.type}" is not defined`);
    }
    const engine = storageInstance.make();
    const file = {
      originalname: (0, import_path.basename)(filePath),
      path: filePath,
      stream: fileStream
    };
    await new Promise((resolve, reject) => {
      engine._handleFile({}, file, (error, info) => {
        if (error) {
          reject(error);
        }
        Object.assign(file, info);
        resolve(info);
      });
    });
    return storageInstance.getFileData(file, {});
  }
  async loadStorages(options) {
    const repository = this.db.getRepository("storages");
    const storages = await repository.find({
      transaction: options == null ? void 0 : options.transaction
    });
    this.storagesCache = /* @__PURE__ */ new Map();
    for (const storage of storages) {
      this.storagesCache.set(storage.get("id"), this.parseStorage(storage));
    }
  }
  async install() {
    const defaultStorageType = this.storageTypes.get(DEFAULT_STORAGE_TYPE);
    if (defaultStorageType) {
      const Storage = this.db.getCollection("storages");
      if (await Storage.repository.findOne({
        filter: {
          name: defaultStorageType.defaults().name
        }
      })) {
        return;
      }
      await Storage.repository.create({
        values: {
          ...defaultStorageType.defaults(),
          type: DEFAULT_STORAGE_TYPE,
          default: true
        }
      });
    }
  }
  async handleSyncMessage(message) {
    if (message.type === "reloadStorages") {
      await this.loadStorages();
    }
  }
  async beforeLoad() {
    this.db.registerModels({ FileModel: import_database.Model });
    this.db.on("beforeDefineCollection", (options) => {
      if (options.template === "file") {
        options.model = "FileModel";
      }
    });
    this.db.on("afterDefineCollection", (collection) => {
      if (collection.options.template !== "file") {
        return;
      }
      collection.model.beforeUpdate((model) => {
        if (!model.changed("url") || !model.changed("preview")) {
          return;
        }
        model.set("url", model.previous("url"));
        model.set("preview", model.previous("preview"));
        model.changed("url", false);
        model.changed("preview", false);
      });
    });
    this.app.on("afterStart", async () => {
      await this.loadStorages();
    });
  }
  async load() {
    this.db.on("afterDestroy", this.afterDestroy);
    this.storageTypes.register(import_constants.STORAGE_TYPE_LOCAL, import_local.default);
    this.storageTypes.register(import_constants.STORAGE_TYPE_ALI_OSS, import_ali_oss.default);
    this.storageTypes.register(import_constants.STORAGE_TYPE_S3, import_s3.default);
    this.storageTypes.register(import_constants.STORAGE_TYPE_TX_COS, import_tx_cos.default);
    const Storage = this.db.getModel("storages");
    Storage.afterSave(async (m, { transaction }) => {
      await this.loadStorages({ transaction });
      this.sendSyncMessage({ type: "reloadStorages" }, { transaction });
    });
    Storage.afterDestroy(async (m, { transaction }) => {
      var _a, _b;
      for (const collection of this.db.collections.values()) {
        if (((_a = collection == null ? void 0 : collection.options) == null ? void 0 : _a.template) === "file" && ((_b = collection == null ? void 0 : collection.options) == null ? void 0 : _b.storage) === m.name) {
          throw new Error(
            this.t(
              `The storage "${m.name}" is in use in collection "${collection.name}" and cannot be deleted.`
            )
          );
        }
      }
      await this.loadStorages({ transaction });
      this.sendSyncMessage({ type: "reloadStorages" }, { transaction });
    });
    this.db.on("afterDefineCollection", (collection) => {
      const { template } = collection.options;
      if (template === "file") {
        collection.setField("storageId", {
          type: "bigInt",
          createOnly: true,
          visible: true,
          index: true
        });
      }
    });
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.storages`,
      actions: ["storages:*"]
    });
    (0, import_actions.default)(this);
    this.app.acl.allow("attachments", ["upload", "create"], "loggedIn");
    this.app.acl.allow("storages", "getBasicInfo", "loggedIn");
    this.app.acl.appendStrategyResource("attachments");
    const defaultStorageName = this.storageTypes.get(DEFAULT_STORAGE_TYPE).defaults().name;
    this.app.acl.addFixedParams("storages", "destroy", () => {
      return {
        filter: { "name.$ne": defaultStorageName }
      };
    });
    const ownMerger = () => {
      return {
        filter: {
          createdById: "{{ctx.state.currentUser.id}}"
        }
      };
    };
    this.app.acl.addFixedParams("attachments", "update", ownMerger);
    this.app.acl.addFixedParams("attachments", "create", ownMerger);
    this.app.acl.addFixedParams("attachments", "destroy", ownMerger);
    this.app.db.interfaceManager.registerInterfaceType("attachment", import_attachment_interface.AttachmentInterface);
    this.db.on("afterFind", async (instances) => {
      var _a, _b, _c;
      if (!instances) {
        return;
      }
      const records = Array.isArray(instances) ? instances : [instances];
      const name = (_b = (_a = records[0]) == null ? void 0 : _a.constructor) == null ? void 0 : _b.name;
      if (name) {
        const collection = this.db.getCollection(name);
        if ((collection == null ? void 0 : collection.name) === "attachments" || ((_c = collection == null ? void 0 : collection.options) == null ? void 0 : _c.template) === "file") {
          for (const record of records) {
            const url = await this.getFileURL(record);
            const previewUrl = await this.getFileURL(record, true);
            record.set("url", url);
            record.set("preview", previewUrl);
            record.dataValues.preview = previewUrl;
          }
        }
      }
    });
  }
  async getFileURL(file, preview = false) {
    if (!file.storageId) {
      return (0, import_utils2.encodeURL)(file.url);
    }
    const storage = this.storagesCache.get(file.storageId);
    if (!storage) {
      return (0, import_utils2.encodeURL)(file.url);
    }
    const storageType = this.storageTypes.get(storage.type);
    return new storageType(storage).getFileURL(
      file,
      Boolean(file.mimetype && (0, import_mime_match.default)(file.mimetype, "image/*") && preview && storage.options.thumbnailRule)
    );
  }
  async isPublicAccessStorage(storageName) {
    var _a;
    const storageRepository = this.db.getRepository("storages");
    const storages = await storageRepository.findOne({
      filter: { default: true }
    });
    let storage;
    if (!storageName) {
      storage = storages;
    } else {
      storage = await storageRepository.findOne({
        filter: {
          name: storageName
        }
      });
    }
    storage = this.parseStorage(storage);
    if (["local", "ali-oss", "s3", "tx-cos"].includes(storage.type)) {
      return true;
    }
    return !!((_a = storage.options) == null ? void 0 : _a.public);
  }
  async getFileStream(file) {
    if (!file.storageId) {
      throw new Error("File storageId not found");
    }
    const storage = this.storagesCache.get(file.storageId);
    if (!storage) {
      throw new Error("[file-manager] no linked or default storage provided");
    }
    const StorageType = this.storageTypes.get(storage.type);
    if (!StorageType) {
      throw new Error(`[file-manager] storage type "${storage.type}" is not defined`);
    }
    const storageInstance = new StorageType(storage);
    if (!storageInstance) {
      throw new Error(`[file-manager] storage type "${storage.type}" is not defined`);
    }
    return storageInstance.getFileStream(file);
  }
}
var server_default = PluginFileManagerServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginFileManagerServer
});
