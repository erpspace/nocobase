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
var FileModel_exports = {};
__export(FileModel_exports, {
  FileModel: () => FileModel
});
module.exports = __toCommonJS(FileModel_exports);
var import_database = require("@nocobase/database");
var import_constants = require("../constants");
const currentStorage = [import_constants.STORAGE_TYPE_LOCAL, import_constants.STORAGE_TYPE_ALI_OSS, import_constants.STORAGE_TYPE_S3, import_constants.STORAGE_TYPE_TX_COS];
class FileModel extends import_database.Model {
  toJSON() {
    var _a, _b, _c, _d, _e;
    const json = super.toJSON();
    const fileStorages = (_a = this.constructor["database"]) == null ? void 0 : _a["_fileStorages"];
    if (json.storageId && fileStorages && fileStorages.has(json.storageId)) {
      const storage = fileStorages.get(json.storageId);
      if (currentStorage.includes(storage == null ? void 0 : storage.type) && ((_b = storage == null ? void 0 : storage.options) == null ? void 0 : _b.thumbnailRule)) {
        json["preview"] = `${json["url"]}${((_c = storage == null ? void 0 : storage.options) == null ? void 0 : _c.thumbnailRule) || ""}`;
      }
      if ((_d = storage == null ? void 0 : storage.options) == null ? void 0 : _d.thumbnailRule) {
        json["thumbnailRule"] = (_e = storage == null ? void 0 : storage.options) == null ? void 0 : _e.thumbnailRule;
      }
      if ((storage == null ? void 0 : storage.type) === "local" && process.env.APP_PUBLIC_PATH) {
        json["url"] = process.env.APP_PUBLIC_PATH.replace(/\/$/g, "") + json.url;
      }
    }
    return json;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileModel
});
