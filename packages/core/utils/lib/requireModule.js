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
var requireModule_exports = {};
__export(requireModule_exports, {
  default: () => requireModule_default,
  importModule: () => importModule,
  requireModule: () => requireModule,
  requireResolve: () => requireResolve
});
module.exports = __toCommonJS(requireModule_exports);
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_url = require("url");
async function requireResolve(m) {
  if (!process.env.VITEST) {
    return require.resolve(m);
  }
  const json = JSON.parse(
    await import_fs.default.promises.readFile(import_path.default.resolve(process.cwd(), "./tsconfig.paths.json"), { encoding: "utf8" })
  );
  const paths = json.compilerOptions.paths;
  if (paths[m]) {
    return require.resolve(import_path.default.resolve(process.cwd(), paths[m][0], "index.ts"));
  }
  return require.resolve(m);
}
__name(requireResolve, "requireResolve");
function requireModule(m) {
  if (typeof m === "string") {
    m = require(m);
  }
  if (typeof m !== "object") {
    return m;
  }
  return m.__esModule ? m.default : m;
}
__name(requireModule, "requireModule");
var requireModule_default = requireModule;
async function importModule(m) {
  if (!process.env.VITEST) {
    return requireModule(m);
  }
  if (import_path.default.isAbsolute(m)) {
    m = (0, import_url.pathToFileURL)(m).href;
  }
  const r = (await import(m)).default;
  return r.__esModule ? r.default : r;
}
__name(importModule, "importModule");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  importModule,
  requireModule,
  requireResolve
});
