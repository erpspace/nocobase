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
var loader_exports = {};
__export(loader_exports, {
  getPluginsSwagger: () => getPluginsSwagger,
  getSwaggerDocument: () => getSwaggerDocument,
  loadSwagger: () => loadSwagger,
  mergeObjects: () => mergeObjects
});
module.exports = __toCommonJS(loader_exports);
var import_utils = require("@nocobase/utils");
var import_merge = require("./merge");
const loadSwagger = (packageName) => {
  const prefixes = ["src", "lib", "dist"];
  const targets = ["swagger.json", "swagger/index.json", "swagger"];
  for (const prefix of prefixes) {
    for (const dict of targets) {
      try {
        const file = `${packageName}/${prefix}/${dict}`;
        const filePath = require.resolve(file);
        delete require.cache[filePath];
        return (0, import_utils.requireModule)(file);
      } catch (error) {
      }
    }
  }
  return {};
};
const getPluginsSwagger = async (db, pluginNames) => {
  const nameFilter = (pluginNames == null ? void 0 : pluginNames.length) ? { name: { $in: pluginNames } } : {};
  const plugins = await db.getRepository("applicationPlugins").find({
    filter: {
      enabled: true,
      ...nameFilter
    }
  });
  const swaggers = {};
  for (const plugin of plugins) {
    const packageName = plugin.get("packageName");
    if (!packageName) {
      continue;
    }
    const res = loadSwagger(packageName);
    if (Object.keys(res).length) {
      swaggers[plugin.get("name")] = res;
    }
  }
  return swaggers;
};
const mergeObjects = (objs) => {
  return objs.reduce((cur, obj) => {
    return (0, import_merge.merge)(cur, obj);
  }, {});
};
const getSwaggerDocument = async (db, pluginNames) => {
  const swaggers = await getPluginsSwagger(db, pluginNames);
  return mergeObjects(Object.values(swaggers));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getPluginsSwagger,
  getSwaggerDocument,
  loadSwagger,
  mergeObjects
});
