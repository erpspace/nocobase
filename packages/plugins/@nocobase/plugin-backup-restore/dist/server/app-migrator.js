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
var app_migrator_exports = {};
__export(app_migrator_exports, {
  AppMigrator: () => AppMigrator
});
module.exports = __toCommonJS(app_migrator_exports);
var import_utils = require("@nocobase/utils");
var import_crypto = __toESM(require("crypto"));
var import_events = __toESM(require("events"));
var import_promises = __toESM(require("fs/promises"));
var os = __toESM(require("os"));
var import_path = __toESM(require("path"));
class AppMigrator extends import_events.default {
  workDir;
  app;
  constructor(app, options) {
    super();
    this.app = app;
    this.workDir = (options == null ? void 0 : options.workDir) || this.tmpDir();
  }
  tmpDir() {
    return import_path.default.resolve(os.tmpdir(), `nocobase-${import_crypto.default.randomUUID()}`);
  }
  async rmDir(dir) {
    await import_promises.default.rm(dir, { recursive: true, force: true });
  }
  async clearWorkDir() {
    await this.rmDir(this.workDir);
  }
}
(0, import_utils.applyMixins)(AppMigrator, [import_utils.AsyncEmitter]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppMigrator
});
