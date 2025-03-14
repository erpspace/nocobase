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
var constants_exports = {};
__export(constants_exports, {
  FILE_FIELD_NAME: () => FILE_FIELD_NAME,
  FILE_SIZE_LIMIT_DEFAULT: () => FILE_SIZE_LIMIT_DEFAULT,
  FILE_SIZE_LIMIT_MAX: () => FILE_SIZE_LIMIT_MAX,
  FILE_SIZE_LIMIT_MIN: () => FILE_SIZE_LIMIT_MIN,
  LIMIT_FILES: () => LIMIT_FILES,
  STORAGE_TYPE_ALI_OSS: () => STORAGE_TYPE_ALI_OSS,
  STORAGE_TYPE_LOCAL: () => STORAGE_TYPE_LOCAL,
  STORAGE_TYPE_S3: () => STORAGE_TYPE_S3,
  STORAGE_TYPE_TX_COS: () => STORAGE_TYPE_TX_COS
});
module.exports = __toCommonJS(constants_exports);
const FILE_FIELD_NAME = "file";
const LIMIT_FILES = 1;
const FILE_SIZE_LIMIT_MIN = 1;
const FILE_SIZE_LIMIT_MAX = Number.POSITIVE_INFINITY;
const FILE_SIZE_LIMIT_DEFAULT = 1024 * 1024 * 20;
const STORAGE_TYPE_LOCAL = "local";
const STORAGE_TYPE_ALI_OSS = "ali-oss";
const STORAGE_TYPE_S3 = "s3";
const STORAGE_TYPE_TX_COS = "tx-cos";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FILE_FIELD_NAME,
  FILE_SIZE_LIMIT_DEFAULT,
  FILE_SIZE_LIMIT_MAX,
  FILE_SIZE_LIMIT_MIN,
  LIMIT_FILES,
  STORAGE_TYPE_ALI_OSS,
  STORAGE_TYPE_LOCAL,
  STORAGE_TYPE_S3,
  STORAGE_TYPE_TX_COS
});
