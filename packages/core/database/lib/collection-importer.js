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
var collection_importer_exports = {};
__export(collection_importer_exports, {
  ImporterReader: () => ImporterReader
});
module.exports = __toCommonJS(collection_importer_exports);
var import_utils = require("@nocobase/utils");
var import_fs = require("fs");
var import_promises = require("fs/promises");
var import_lodash = require("lodash");
var import_path = __toESM(require("path"));
const _ImporterReader = class _ImporterReader {
  directory;
  extensions;
  constructor(directory, extensions) {
    this.directory = directory;
    if (!extensions) {
      extensions = ["js", "ts", "json"];
    }
    this.extensions = new Set(extensions);
  }
  async read() {
    if (!(0, import_fs.existsSync)(this.directory)) {
      return [];
    }
    const files = await (0, import_promises.readdir)(this.directory, {
      encoding: "utf-8"
    });
    const modules = files.filter((fileName) => {
      if (fileName.endsWith(".d.ts")) {
        return false;
      }
      const ext = import_path.default.parse(fileName).ext.replace(".", "");
      return this.extensions.has(ext);
    }).map(async (fileName) => {
      const mod = await (0, import_utils.importModule)(import_path.default.join(this.directory, fileName));
      return typeof mod === "function" ? mod() : mod;
    });
    return (await Promise.all(modules)).filter((module2) => (0, import_lodash.isPlainObject)(module2)).map((module2) => (0, import_lodash.cloneDeep)(module2));
  }
};
__name(_ImporterReader, "ImporterReader");
let ImporterReader = _ImporterReader;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImporterReader
});
