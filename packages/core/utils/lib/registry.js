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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var registry_exports = {};
__export(registry_exports, {
  Registry: () => Registry,
  default: () => registry_default
});
module.exports = __toCommonJS(registry_exports);
const _Registry = class _Registry {
  map = /* @__PURE__ */ new Map();
  options;
  constructor(options = { override: false }) {
    this.options = options;
  }
  register(key, value) {
    if (!this.options.override && this.map.has(key)) {
      throw new Error(`this registry does not allow to override existing keys: "${key}"`);
    }
    this.map.set(key, value);
  }
  // async import({ directory, extensions = ['.js', '.ts', '.json'] }) {
  //   const files = await fs.readdir(directory);
  //   return files.filter(file => extensions.includes(path.extname(file)))
  // }
  get(key) {
    return this.map.get(key);
  }
  getKeys() {
    return this.map.keys();
  }
  getValues() {
    return this.map.values();
  }
  getEntities() {
    return this.map.entries();
  }
};
__name(_Registry, "Registry");
let Registry = _Registry;
var registry_default = Registry;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Registry
});
