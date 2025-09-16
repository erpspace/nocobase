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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
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
var utils_exports = {};
__export(utils_exports, {
  aesCheckKey: () => aesCheckKey,
  aesDecrypt: () => aesDecrypt,
  aesEncrypt: () => aesEncrypt,
  aesEncryptSync: () => aesEncryptSync,
  aseDecryptSync: () => aseDecryptSync,
  checkValueAndIv: () => checkValueAndIv
});
module.exports = __toCommonJS(utils_exports);
var import_crypto = __toESM(require("crypto"));
var import_EncryptionError = require("./errors/EncryptionError");
const algorithm = "aes-256-cbc";
const keyString = process.env.ENCRYPTION_FIELD_KEY || "";
const defaultIvString = process.env.ENCRYPTION_FIELD_IV || "Vc53-4G(rTi0vg@a";
const key = Buffer.from(keyString, "utf8");
function aesEncrypt(text, ivString = defaultIvString) {
  checkValueAndIv("Encrypt", text, ivString);
  return new Promise((resolve, reject) => {
    const iv = Buffer.from(ivString, "utf8");
    const cipher = import_crypto.default.createCipheriv(algorithm, key, iv);
    let encrypted = "";
    cipher.setEncoding("hex");
    cipher.on("data", (chunk) => {
      encrypted += chunk;
    });
    cipher.on("end", () => {
      resolve(encrypted);
    });
    cipher.on("error", (err) => {
      reject(err);
    });
    cipher.write(text);
    cipher.end();
  });
}
__name(aesEncrypt, "aesEncrypt");
function aesDecrypt(encrypted, ivString = defaultIvString) {
  checkValueAndIv("Decrypt", encrypted, ivString);
  return new Promise((resolve, reject) => {
    const iv = Buffer.from(ivString, "utf8");
    const decipher = import_crypto.default.createDecipheriv(algorithm, key, iv);
    let decrypted = "";
    decipher.setEncoding("utf8");
    decipher.on("data", (chunk) => {
      decrypted += chunk;
    });
    decipher.on("end", () => {
      resolve(decrypted);
    });
    decipher.on("error", (err) => {
      reject(err);
    });
    decipher.write(encrypted, "hex");
    decipher.end();
  });
}
__name(aesDecrypt, "aesDecrypt");
function aesEncryptSync(text, ivString = defaultIvString) {
  checkValueAndIv("Encrypt", text, ivString);
  const iv = Buffer.from(ivString, "utf8");
  const cipher = import_crypto.default.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
__name(aesEncryptSync, "aesEncryptSync");
function aseDecryptSync(encrypted, ivString = defaultIvString) {
  checkValueAndIv("Decrypt", encrypted, ivString);
  const iv = Buffer.from(ivString, "utf8");
  const decipher = import_crypto.default.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
__name(aseDecryptSync, "aseDecryptSync");
function aesCheckKey() {
  if (!keyString) {
    throw new import_EncryptionError.EncryptionError("The environment variable `ENCRYPTION_FIELD_KEY` is required, please set it");
  }
  if (typeof keyString !== "string") {
    throw new import_EncryptionError.EncryptionError("The environment variable `ENCRYPTION_FIELD_KEY` must be a string");
  }
  if (keyString.length !== 32) {
    throw new import_EncryptionError.EncryptionError("The environment variable `ENCRYPTION_FIELD_KEY` must be a 32-character string");
  }
}
__name(aesCheckKey, "aesCheckKey");
function checkValueAndIv(type, value, iv) {
  const msg = `${type} Failed: `;
  if (typeof value !== "string") {
    throw new import_EncryptionError.EncryptionError(msg + "The value must be a string, but got " + typeof value);
  }
  if (type === "Decrypt") {
    if (value.length % 2 !== 0) {
      throw new import_EncryptionError.EncryptionError(msg + `The encrypted value is invalid, not a hex string. The value is "${value}"`);
    }
  }
  if (typeof iv !== "string") {
    throw new import_EncryptionError.EncryptionError(msg + "The `iv` must be a string, but got " + typeof iv);
  }
  if (iv.length !== 16) {
    throw new import_EncryptionError.EncryptionError(msg + "The `iv` must be a 16-character string");
  }
}
__name(checkValueAndIv, "checkValueAndIv");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aesCheckKey,
  aesDecrypt,
  aesEncrypt,
  aesEncryptSync,
  aseDecryptSync,
  checkValueAndIv
});
