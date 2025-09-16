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
var storages_exports = {};
__export(storages_exports, {
  StorageType: () => StorageType
});
module.exports = __toCommonJS(storages_exports);
var import_axios = __toESM(require("axios"));
var import_path = __toESM(require("path"));
var import_url_join = __toESM(require("url-join"));
var import_utils = require("@nocobase/utils");
var import_utils2 = require("../utils");
class StorageType {
  constructor(storage) {
    this.storage = storage;
  }
  static defaults() {
    return {};
  }
  static filenameKey;
  getFileKey(record) {
    return (0, import_utils2.getFileKey)(record);
  }
  getFileData(file, meta = {}) {
    const { [this.constructor.filenameKey || "filename"]: name } = file;
    const filename = import_path.default.basename(name);
    const extname = import_path.default.extname(filename);
    const path = (this.storage.path || "").replace(/^\/|\/$/g, "");
    const data = {
      title: Buffer.from(file.originalname, "latin1").toString("utf8").replace(extname, ""),
      filename,
      extname,
      // TODO(feature): 暂时两者相同，后面 storage.path 模版化以后，这里只是 file 实际的 path
      path,
      size: file.size,
      mimetype: file.mimetype,
      meta,
      storageId: this.storage.id
    };
    return data;
  }
  getFileURL(file, preview) {
    if (file.url && (0, import_utils.isURL)(file.url)) {
      if (preview && this.storage.options.thumbnailRule) {
        return (0, import_utils2.encodeURL)(file.url) + this.storage.options.thumbnailRule;
      }
      return (0, import_utils2.encodeURL)(file.url);
    }
    const keys = [
      this.storage.baseUrl,
      file.path && encodeURI(file.path),
      (0, import_utils2.ensureUrlEncoded)(file.filename),
      preview && this.storage.options.thumbnailRule
    ].filter(Boolean);
    return (0, import_url_join.default)(keys);
  }
  async getFileStream(file) {
    try {
      const fileURL = await this.getFileURL(file);
      const requestOptions = {
        responseType: "stream",
        validateStatus: (status) => status === 200,
        timeout: 3e4
        // 30 seconds timeout
      };
      const response = await import_axios.default.get(fileURL, requestOptions);
      return {
        stream: response.data,
        contentType: response.headers["content-type"]
      };
    } catch (err) {
      throw new Error(`fetch file failed: ${err}`);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StorageType
});
