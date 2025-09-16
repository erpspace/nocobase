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
var findPackageNames_exports = {};
__export(findPackageNames_exports, {
  appendToBuiltInPlugins: () => appendToBuiltInPlugins,
  findAllPlugins: () => findAllPlugins,
  findBuiltInPlugins: () => findBuiltInPlugins,
  findLocalPlugins: () => findLocalPlugins,
  findPackageNames: () => findPackageNames,
  packageNameTrim: () => packageNameTrim
});
module.exports = __toCommonJS(findPackageNames_exports);
var import_fast_glob = __toESM(require("fast-glob"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_lodash = __toESM(require("lodash"));
var import_path = __toESM(require("path"));
var import__ = require("./");
function splitNames(name) {
  return (name || "").split(",").filter(Boolean);
}
__name(splitNames, "splitNames");
async function trim(packageNames) {
  const nameOrPkgs = import_lodash.default.uniq(packageNames).filter(Boolean);
  const names = [];
  for (const nameOrPkg of nameOrPkgs) {
    const { name, packageName } = await import__.PluginManager.parseName(nameOrPkg);
    try {
      await import__.PluginManager.getPackageJson(packageName);
      names.push(name);
    } catch (error) {
    }
  }
  return names;
}
__name(trim, "trim");
const excludes = [
  "@nocobase/plugin-audit-logs",
  "@nocobase/plugin-backup-restore",
  "@nocobase/plugin-charts",
  "@nocobase/plugin-disable-pm-add",
  "@nocobase/plugin-mobile-client",
  "@nocobase/plugin-mock-collections",
  "@nocobase/plugin-multi-app-share-collection",
  "@nocobase/plugin-notifications",
  "@nocobase/plugin-snapshot-field",
  "@nocobase/plugin-workflow-test"
];
async function findPackageNames() {
  const patterns = [
    "./packages/plugins/*/package.json",
    "./packages/plugins/*/*/package.json",
    "./packages/pro-plugins/*/*/package.json",
    "./storage/plugins/*/package.json",
    "./storage/plugins/*/*/package.json"
  ];
  try {
    const packageJsonPaths = await (0, import_fast_glob.default)(patterns, {
      cwd: process.cwd(),
      absolute: true,
      ignore: ["**/external-db-data-source/**"]
    });
    const packageNames = await Promise.all(
      packageJsonPaths.map(async (packageJsonPath) => {
        const packageJson = await import_fs_extra.default.readJson(packageJsonPath);
        return packageJson.name;
      })
    );
    const nocobasePlugins = await findNocobasePlugins();
    const { APPEND_PRESET_BUILT_IN_PLUGINS = "", APPEND_PRESET_LOCAL_PLUGINS = "" } = process.env;
    return trim(
      packageNames.filter((pkg) => pkg && !excludes.includes(pkg)).concat(nocobasePlugins).concat(splitNames(APPEND_PRESET_BUILT_IN_PLUGINS)).concat(splitNames(APPEND_PRESET_LOCAL_PLUGINS))
    );
  } catch (error) {
    return [];
  }
}
__name(findPackageNames, "findPackageNames");
async function getPackageJson() {
  const packageJson = await import_fs_extra.default.readJson(
    import_path.default.resolve(process.env.NODE_MODULES_PATH, "@nocobase/preset-nocobase/package.json")
  );
  return packageJson;
}
__name(getPackageJson, "getPackageJson");
async function findNocobasePlugins() {
  try {
    const packageJson = await getPackageJson();
    const pluginNames = Object.keys(packageJson.dependencies).filter((name) => name.startsWith("@nocobase/plugin-"));
    return trim(pluginNames.filter((pkg) => pkg && !excludes.includes(pkg)));
  } catch (error) {
    return [];
  }
}
__name(findNocobasePlugins, "findNocobasePlugins");
async function findBuiltInPlugins() {
  const { APPEND_PRESET_BUILT_IN_PLUGINS = "" } = process.env;
  try {
    const packageJson = await getPackageJson();
    return trim(packageJson.builtIn.concat(splitNames(APPEND_PRESET_BUILT_IN_PLUGINS)));
  } catch (error) {
    return [];
  }
}
__name(findBuiltInPlugins, "findBuiltInPlugins");
async function findLocalPlugins() {
  const { APPEND_PRESET_LOCAL_PLUGINS = "" } = process.env;
  const plugins1 = await findNocobasePlugins();
  const plugins2 = await findPackageNames();
  const builtInPlugins = await findBuiltInPlugins();
  const packageJson = await getPackageJson();
  const items = await trim(
    import_lodash.default.difference(
      plugins1.concat(plugins2).concat(splitNames(APPEND_PRESET_LOCAL_PLUGINS)),
      builtInPlugins.concat(await trim(packageJson.deprecated))
    )
  );
  return items;
}
__name(findLocalPlugins, "findLocalPlugins");
async function findAllPlugins() {
  const builtInPlugins = await findBuiltInPlugins();
  const localPlugins = await findLocalPlugins();
  return import_lodash.default.uniq(builtInPlugins.concat(localPlugins));
}
__name(findAllPlugins, "findAllPlugins");
const packageNameTrim = trim;
async function appendToBuiltInPlugins(nameOrPkg) {
  const APPEND_PRESET_BUILT_IN_PLUGINS = process.env.APPEND_PRESET_BUILT_IN_PLUGINS || "";
  const keys = APPEND_PRESET_BUILT_IN_PLUGINS.split(",");
  const { name, packageName } = await import__.PluginManager.parseName(nameOrPkg);
  if (keys.includes(packageName)) {
    return;
  }
  if (keys.includes(name)) {
    return;
  }
  process.env.APPEND_PRESET_BUILT_IN_PLUGINS += "," + nameOrPkg;
}
__name(appendToBuiltInPlugins, "appendToBuiltInPlugins");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appendToBuiltInPlugins,
  findAllPlugins,
  findBuiltInPlugins,
  findLocalPlugins,
  findPackageNames,
  packageNameTrim
});
