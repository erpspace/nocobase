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
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_path = require("path");
var import_fs = __toESM(require("fs"));
var import_constants = require("../constants");
var import_FileModel = require("./FileModel");
var import_actions = __toESM(require("./actions"));
var import_attachments = require("./actions/attachments");
var import_attachment_interface = require("./interfaces/attachment-interface");
var import_ali_oss = __toESM(require("./storages/ali-oss"));
var import_local = __toESM(require("./storages/local"));
var import_s3 = __toESM(require("./storages/s3"));
var import_tx_cos = __toESM(require("./storages/tx-cos"));
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
    const storage = this.storagesCache.get(record.get("storageId"));
    if (storage == null ? void 0 : storage.paranoid) {
      return;
    }
    const Type = this.storageTypes.get(storage.type);
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
    const storageRepository = this.db.getRepository("storages");
    let storageInstance;
    storageInstance = await storageRepository.findOne({
      filter: storageName ? {
        name: storageName
      } : {
        default: true
      }
    });
    const fileStream = import_fs.default.createReadStream(filePath);
    if (!storageInstance) {
      throw new Error("[file-manager] no linked or default storage provided");
    }
    storageInstance = this.parseStorage(storageInstance);
    if (documentRoot) {
      storageInstance.options["documentRoot"] = documentRoot;
    }
    const storageType = this.storageTypes.get(storageInstance.type);
    const storage = new storageType(storageInstance);
    if (!storage) {
      throw new Error(`[file-manager] storage type "${storageInstance.type}" is not defined`);
    }
    const engine = storage.make();
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
    return (0, import_attachments.getFileData)({ app: this.app, file, storage: storageInstance, request: { body: {} } });
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
    this.db["_fileStorages"] = this.storagesCache;
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
    if (message.type === "storageChange") {
      const storage = await this.db.getRepository("storages").findOne({
        filterByTk: message.storageId
      });
      if (storage) {
        this.storagesCache.set(storage.id, this.parseStorage(storage));
      }
    }
    if (message.type === "storageRemove") {
      const id = message.storageId;
      this.storagesCache.delete(id);
    }
  }
  async beforeLoad() {
    this.db.registerModels({ FileModel: import_FileModel.FileModel });
    this.db.on("beforeDefineCollection", (options) => {
      if (options.template === "file") {
        options.model = "FileModel";
      }
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
    Storage.afterSave((m, { transaction }) => {
      this.storagesCache.set(m.id, m.toJSON());
      this.sendSyncMessage(
        {
          type: "storageChange",
          storageId: m.id
        },
        { transaction }
      );
    });
    Storage.afterDestroy((m, { transaction }) => {
      this.storagesCache.delete(m.id);
      this.sendSyncMessage(
        {
          type: "storageRemove",
          storageId: m.id
        },
        { transaction }
      );
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
  }
  getFileURL(file) {
    const storage = this.storagesCache.get(file.storageId);
    const storageType = this.storageTypes.get(storage.type);
    return new storageType(storage).getFileURL(file);
  }
}
var server_default = PluginFileManagerServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginFileManagerServer
});
