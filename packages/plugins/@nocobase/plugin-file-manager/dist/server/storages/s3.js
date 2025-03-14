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
var s3_exports = {};
__export(s3_exports, {
  default: () => s3_default
});
module.exports = __toCommonJS(s3_exports);
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
    const { S3Client } = require("@aws-sdk/client-s3");
    const multerS3 = require("multer-s3");
    const { accessKeyId, secretAccessKey, bucket, acl = "public-read", ...options } = this.storage.options;
    if (options.endpoint) {
      options.forcePathStyle = true;
    } else {
      options.endpoint = void 0;
    }
    const s3 = new S3Client({
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
  async delete(records) {
    const { DeleteObjectsCommand } = require("@aws-sdk/client-s3");
    const { s3 } = this.make();
    const { Deleted } = await s3.send(
      new DeleteObjectsCommand({
        Bucket: this.storage.options.bucket,
        Delete: {
          Objects: records.map((record) => ({ Key: (0, import_utils.getFileKey)(record) }))
        }
      })
    );
    return [Deleted.length, records.filter((record) => !Deleted.find((item) => item.Key === (0, import_utils.getFileKey)(record)))];
  }
}
