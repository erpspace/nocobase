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
var server_exports = {};
__export(server_exports, {
  PresetNocoBase: () => PresetNocoBase,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
const _PresetNocoBase = class _PresetNocoBase extends import_server.Plugin {
  splitNames(name) {
    return (name || "").split(",").filter(Boolean);
  }
  async getBuiltInPlugins() {
    return await (0, import_server.findBuiltInPlugins)();
  }
  async getLocalPlugins() {
    return [];
    return (await (0, import_server.findLocalPlugins)()).map((name) => name.split(">="));
  }
  async findLocalPlugins() {
    return await (0, import_server.findLocalPlugins)();
  }
  async getAllPluginNames() {
    const plugins1 = await (0, import_server.findBuiltInPlugins)();
    const plugins2 = await (0, import_server.findLocalPlugins)();
    return [...plugins1, ...plugins2];
  }
  async getAllPluginNamesAndDB() {
    const items = await this.pm.repository.find({
      filter: {
        enabled: true
      }
    });
    const plugins1 = await (0, import_server.findBuiltInPlugins)();
    const plugins2 = await (0, import_server.findLocalPlugins)();
    return (0, import_server.packageNameTrim)(import_lodash.default.uniq([...plugins1, ...plugins2, ...items.map((item) => item.name)]));
  }
  async getAllPlugins(locale = "en-US") {
    const plugins = await this.getAllPluginNamesAndDB();
    const packageJsons = [];
    for (const name of plugins) {
      packageJsons.push(await this.getPluginInfo(name, locale));
    }
    return packageJsons;
  }
  async getPluginInfo(name, locale = "en-US") {
    const repository = this.app.db.getRepository("applicationPlugins");
    const { packageName } = await import_server.PluginManager.parseName(name);
    const packageJson = require(`${packageName}/package.json`);
    const deps = await import_server.PluginManager.checkAndGetCompatible(packageJson.name);
    const instance = await repository.findOne({
      filter: {
        packageName: packageJson.name
      }
    });
    return {
      packageName: packageJson.name,
      name,
      version: packageJson.version,
      enabled: !!(instance == null ? void 0 : instance.enabled),
      installed: !!(instance == null ? void 0 : instance.installed),
      builtIn: !!(instance == null ? void 0 : instance.builtIn),
      keywords: packageJson.keywords,
      author: packageJson.author,
      homepage: packageJson[`homepage.${locale}`] || packageJson.homepage,
      packageJson,
      removable: !(instance == null ? void 0 : instance.enabled) && !this.app.db.hasCollection("applications"),
      displayName: (packageJson == null ? void 0 : packageJson[`displayName.${locale}`]) || (packageJson == null ? void 0 : packageJson.displayName) || name,
      description: (packageJson == null ? void 0 : packageJson[`description.${locale}`]) || packageJson.description,
      ...deps
    };
  }
  async getPackageJson(name) {
    const { packageName } = await import_server.PluginManager.parseName(name);
    const packageJson = await import_server.PluginManager.getPackageJson(packageName);
    return { ...packageJson, name: packageName };
  }
  async allPlugins() {
    const builtInPlugins = await this.getBuiltInPlugins();
    const localPlugins = await this.getLocalPlugins();
    return (await Promise.all(
      builtInPlugins.map(async (pkgOrName) => {
        const { name } = await import_server.PluginManager.parseName(pkgOrName);
        const packageJson = await this.getPackageJson(pkgOrName);
        return {
          name,
          packageName: packageJson.name,
          enabled: true,
          builtIn: true,
          version: packageJson.version
        };
      })
    )).concat(
      await Promise.all(
        localPlugins.map(async (plugin) => {
          const { name } = await import_server.PluginManager.parseName(plugin[0]);
          const packageJson = await this.getPackageJson(plugin[0]);
          return { name, packageName: packageJson.name, version: packageJson.version };
        })
      )
    );
  }
  async getPluginToBeUpgraded() {
    const repository = this.app.db.getRepository("applicationPlugins");
    const items = (await repository.find()).map((item) => item.name);
    const builtInPlugins = await this.getBuiltInPlugins();
    const localPlugins = await this.getLocalPlugins();
    const plugins = await Promise.all(
      builtInPlugins.map(async (pkgOrName) => {
        const { name } = await import_server.PluginManager.parseName(pkgOrName);
        const packageJson = await this.getPackageJson(pkgOrName);
        return {
          name,
          packageName: packageJson.name,
          enabled: true,
          builtIn: true,
          version: packageJson.version
        };
      })
    );
    for (const plugin of localPlugins) {
      if (plugin[1]) {
        if (!items.includes(plugin[0]) && await this.app.version.satisfies(`>${plugin[1]}`)) {
          continue;
        }
      }
      const pkgOrName = plugin[0];
      const { name } = await import_server.PluginManager.parseName(pkgOrName);
      const packageJson = await this.getPackageJson(pkgOrName);
      plugins.push({ name, packageName: packageJson.name, version: packageJson.version });
    }
    return plugins;
  }
  async updateOrCreatePlugins() {
    const repository = this.pm.repository;
    const plugins = await this.getPluginToBeUpgraded();
    await this.db.sequelize.transaction((transaction) => {
      return Promise.all(
        plugins.map(
          (values) => repository.updateOrCreate({
            transaction,
            values,
            filterKeys: ["name"]
          })
        )
      );
    });
  }
  async createIfNotExists() {
    const repository = this.pm.repository;
    const existPlugins = await repository.find();
    const existPluginNames = existPlugins.map((item) => item.name);
    const plugins = (await this.allPlugins()).filter((item) => !existPluginNames.includes(item.name));
    await repository.create({ values: plugins });
  }
  async install() {
    await this.createIfNotExists();
    this.log.info("start install built-in plugins");
    await this.pm.repository.init();
    await this.pm.load();
    await this.pm.install();
    this.log.info("finish install built-in plugins");
  }
  async upgrade() {
    this.log.info("update built-in plugins");
    await this.updateOrCreatePlugins();
  }
};
__name(_PresetNocoBase, "PresetNocoBase");
let PresetNocoBase = _PresetNocoBase;
var server_default = PresetNocoBase;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PresetNocoBase
});
