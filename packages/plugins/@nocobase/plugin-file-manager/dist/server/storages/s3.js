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
var s3_exports = {};
__export(s3_exports, {
  default: () => s3_default
});
module.exports = __toCommonJS(s3_exports);
var import_client_s3 = require("@aws-sdk/client-s3");
var import_crypto = __toESM(require("crypto"));
var import__ = require(".");
var import_constants = require("../../constants");
var import_utils = require("../utils");
class s3_default extends import__.StorageType {
  static defaults() {
    return {
      title: "AWS S3",
      name: "aws-s3",
      type: import_constants.STORAGE_TYPE_S3,
      baseUrl: process.env.AWS_S3_STORAGE_BASE_URL,
      options: {
        region: process.env.AWS_S3_REGION,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        bucket: process.env.AWS_S3_BUCKET
      }
    };
  }
  static filenameKey = "key";
  make() {
    const multerS3 = require("multer-s3");
    const { accessKeyId, secretAccessKey, bucket, acl = "public-read", ...options } = this.storage.options;
    if (options.endpoint) {
      options.forcePathStyle = true;
    } else {
      options.endpoint = void 0;
    }
    const s3 = new import_client_s3.S3Client({
      ...options,
      credentials: {
        accessKeyId,
        secretAccessKey
      }
    });
    return multerS3({
      s3,
      bucket,
      acl,
      contentType(req, file, cb) {
        if (file.mimetype) {
          cb(null, file.mimetype);
          return;
        }
        multerS3.AUTO_CONTENT_TYPE(req, file, cb);
      },
      key: (0, import_utils.cloudFilenameGetter)(this.storage)
    });
  }
  calculateContentMD5(body) {
    const hash = import_crypto.default.createHash("md5").update(body).digest("base64");
    return hash;
  }
  async deleteS3Objects(bucketName, objects) {
    const { s3 } = this.make();
    const Deleted = [];
    for (const Key of objects) {
      const deleteCommand = new import_client_s3.DeleteObjectCommand({
        Bucket: bucketName,
        Key
      });
      await s3.send(deleteCommand);
      Deleted.push({ Key });
    }
    return {
      Deleted
    };
  }
  async delete(records) {
    const { Deleted } = await this.deleteS3Objects(
      this.storage.options.bucket,
      records.map((record) => this.getFileKey(record))
    );
    return [Deleted.length, records.filter((record) => !Deleted.find((item) => item.Key === this.getFileKey(record)))];
  }
}
