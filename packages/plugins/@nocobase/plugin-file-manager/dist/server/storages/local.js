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
var local_exports = {};
__export(local_exports, {
  default: () => local_default
});
module.exports = __toCommonJS(local_exports);
var import_utils = require("@nocobase/utils");
var import_fs = __toESM(require("fs"));
var import_promises = __toESM(require("fs/promises"));
var import_multer = __toESM(require("multer"));
var import_path = __toESM(require("path"));
var import_url_join = __toESM(require("url-join"));
var import__ = require(".");
var import_constants = require("../../constants");
var import_utils2 = require("../utils");
const DEFAULT_BASE_URL = "/storage/uploads";
function getDocumentRoot(storage) {
  const { documentRoot = process.env.LOCAL_STORAGE_DEST || "storage/uploads" } = storage.options || {};
  return import_path.default.resolve(import_path.default.isAbsolute(documentRoot) ? documentRoot : import_path.default.join(process.cwd(), documentRoot));
}
class local_default extends import__.StorageType {
  static defaults() {
    return {
      title: "Local storage",
      type: import_constants.STORAGE_TYPE_LOCAL,
      name: `local`,
      baseUrl: DEFAULT_BASE_URL,
      options: {
        documentRoot: "storage/uploads"
      },
      path: "",
      rules: {
        size: import_constants.FILE_SIZE_LIMIT_DEFAULT
      }
    };
  }
  make() {
    return import_multer.default.diskStorage({
      destination: (req, file, cb) => {
        const destPath = import_path.default.join(getDocumentRoot(this.storage), this.storage.path || "");
        const mkdirp = require("mkdirp");
        mkdirp(destPath, (err) => cb(err, destPath));
      },
      filename: import_utils2.getFilename
    });
  }
  async delete(records) {
    const documentRoot = getDocumentRoot(this.storage);
    let count = 0;
    const undeleted = [];
    await records.reduce(
      (promise, record) => promise.then(async () => {
        try {
          await import_promises.default.unlink(import_path.default.join(documentRoot, record.path, record.filename));
          count += 1;
        } catch (ex) {
          if (ex.code === "ENOENT") {
            console.warn(ex.message);
            count += 1;
          } else {
            console.error(ex);
            undeleted.push(record);
          }
        }
      }),
      Promise.resolve()
    );
    return [count, undeleted];
  }
  async getFileURL(file, preview = false) {
    const url = await super.getFileURL(file, preview);
    if ((0, import_utils.isURL)(url)) {
      return url;
    }
    return (0, import_url_join.default)(process.env.APP_PUBLIC_PATH, url);
  }
  async getFileStream(file) {
    const filePath = import_path.default.join(process.cwd(), "storage", "uploads", file.path || "", file.filename);
    if (await import_promises.default.stat(filePath)) {
      return {
        stream: import_fs.default.createReadStream(filePath),
        contentType: file.mimetype
      };
    }
    throw new Error(`File not found: ${filePath}`);
  }
}
