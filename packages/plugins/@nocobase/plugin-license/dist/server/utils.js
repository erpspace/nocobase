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
var utils_exports = {};
__export(utils_exports, {
  createInstanceId: () => createInstanceId,
  getInstanceId: () => getInstanceId,
  isLicenseKeyExists: () => isLicenseKeyExists,
  saveLicenseKey: () => saveLicenseKey
});
module.exports = __toCommonJS(utils_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_child_process = require("child_process");
async function getInstanceId() {
  const dir = import_path.default.resolve(process.cwd(), "storage/.license");
  const filePath = import_path.default.resolve(dir, "instance-id");
  await createInstanceId(true);
  const id = import_fs.default.readFileSync(filePath, "utf-8");
  return id;
}
async function createInstanceId(force = false) {
  return new Promise((resolve, reject) => {
    (0, import_child_process.exec)(`yarn nocobase generate-instance-id ${force ? "--force" : ""}`, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(stdout);
    });
  });
}
async function saveLicenseKey(licenseKey) {
  const dir = import_path.default.resolve(process.cwd(), "storage/.license");
  const filePath = import_path.default.resolve(dir, "license-key");
  import_fs.default.writeFileSync(filePath, licenseKey);
}
async function isLicenseKeyExists() {
  const dir = import_path.default.resolve(process.cwd(), "storage/.license");
  const filePath = import_path.default.resolve(dir, "license-key");
  return import_fs.default.existsSync(filePath);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createInstanceId,
  getInstanceId,
  isLicenseKeyExists,
  saveLicenseKey
});
