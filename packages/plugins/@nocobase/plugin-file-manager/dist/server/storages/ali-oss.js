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
var ali_oss_exports = {};
__export(ali_oss_exports, {
  default: () => ali_oss_default
});
module.exports = __toCommonJS(ali_oss_exports);
var import__ = require(".");
var import_constants = require("../../constants");
var import_utils = require("../utils");
class ali_oss_default extends import__.StorageType {
  static defaults() {
    return {
      title: "\u963F\u91CC\u4E91\u5BF9\u8C61\u5B58\u50A8",
      type: import_constants.STORAGE_TYPE_ALI_OSS,
      name: "ali-oss-1",
      baseUrl: process.env.ALI_OSS_STORAGE_BASE_URL,
      options: {
        region: process.env.ALI_OSS_REGION,
        accessKeyId: process.env.ALI_OSS_ACCESS_KEY_ID,
        accessKeySecret: process.env.ALI_OSS_ACCESS_KEY_SECRET,
        bucket: process.env.ALI_OSS_BUCKET
      }
    };
  }
  make() {
    const createAliOssStorage = require("multer-aliyun-oss");
    return new createAliOssStorage({
      config: this.storage.options,
      filename: (0, import_utils.cloudFilenameGetter)(this.storage)
    });
  }
  async delete(records) {
    const { client } = this.make();
    const { deleted } = await client.deleteMulti(records.map(import_utils.getFileKey));
    return [deleted.length, records.filter((record) => !deleted.find((item) => item.Key === (0, import_utils.getFileKey)(record)))];
  }
}
