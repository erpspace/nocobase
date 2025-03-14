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
var tx_cos_exports = {};
__export(tx_cos_exports, {
  default: () => tx_cos_default
});
module.exports = __toCommonJS(tx_cos_exports);
var import_util = require("util");
var import__ = require(".");
var import_constants = require("../../constants");
var import_utils = require("../utils");
class tx_cos_default extends import__.StorageType {
  static defaults() {
    return {
      title: "\u817E\u8BAF\u4E91\u5BF9\u8C61\u5B58\u50A8",
      type: import_constants.STORAGE_TYPE_TX_COS,
      name: "tx-cos-1",
      baseUrl: process.env.TX_COS_STORAGE_BASE_URL,
      options: {
        Region: process.env.TX_COS_REGION,
        SecretId: process.env.TX_COS_SECRET_ID,
        SecretKey: process.env.TX_COS_SECRET_KEY,
        Bucket: process.env.TX_COS_BUCKET
      }
    };
  }
  static filenameKey = "url";
  make() {
    const createTxCosStorage = require("multer-cos");
    return new createTxCosStorage({
      cos: {
        ...this.storage.options,
        dir: (this.storage.path ?? "").replace(/\/+$/, "")
      },
      filename: import_utils.getFilename
    });
  }
  async delete(records) {
    const { cos } = this.make();
    const { Deleted } = await (0, import_util.promisify)(cos.deleteMultipleObject).call(cos, {
      Region: this.storage.options.Region,
      Bucket: this.storage.options.Bucket,
      Objects: records.map((record) => ({ Key: (0, import_utils.getFileKey)(record) }))
    });
    return [Deleted.length, records.filter((record) => !Deleted.find((item) => item.Key === (0, import_utils.getFileKey)(record)))];
  }
}
