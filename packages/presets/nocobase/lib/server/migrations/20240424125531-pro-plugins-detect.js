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
var pro_plugins_detect_exports = {};
__export(pro_plugins_detect_exports, {
  default: () => pro_plugins_detect_default
});
module.exports = __toCommonJS(pro_plugins_detect_exports);
var import_server = require("@nocobase/server");
var import_wording = require("../wording");
const _pro_plugins_detect_default = class _pro_plugins_detect_default extends import_server.Migration {
  on = "beforeLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.0.0-alpha.1";
  oldNames = ["oidc", "cas", "saml"];
  async getSystemLang() {
    var _a;
    const repo = this.db.getRepository("systemSettings");
    if (!repo) {
      return "en-US";
    }
    const systemSettings = await repo.findOne();
    if (!systemSettings) {
      return "en-US";
    }
    return ((_a = systemSettings.enabledLanguages) == null ? void 0 : _a[0]) || process.env.APP_LANG || "en-US";
  }
  async processRemovedPlugins() {
    const repository = this.pm.repository;
    const plugins = await repository.find({
      filter: {
        name: {
          $in: this.oldNames
        }
      }
    });
    if (!plugins.length) {
      return;
    }
    const pluginsToBeDeleted = plugins.filter((plugin) => !plugin.enabled);
    if (pluginsToBeDeleted.length) {
      await repository.destroy({
        filter: {
          name: {
            $in: pluginsToBeDeleted.map((plugin) => plugin.name)
          }
        }
      });
      this.app.log.warn(
        (0, import_wording.getAutoDeletePluginsWarning)(
          pluginsToBeDeleted.map((plugin) => plugin.packageName || plugin.name)
        )
      );
    }
    const enabledPlugins = plugins.filter((plugin) => plugin.enabled);
    if (!enabledPlugins.length) {
      return;
    }
    await this.sequelize.transaction(async (t) => {
      for (const plugin of enabledPlugins) {
        await repository.update({
          filter: {
            name: plugin.name
          },
          values: {
            name: `auth-${plugin.name}`,
            packageName: `@nocobase/plugin-auth-${plugin.name}`
          },
          transaction: t
        });
      }
      const notExistsEnabledPlugins = /* @__PURE__ */ new Map();
      for (const plugin of enabledPlugins) {
        try {
          await import_server.PluginManager.getPackageName(`auth-${plugin.name}`);
        } catch (error2) {
          notExistsEnabledPlugins.set(plugin.name, plugin.packageName || plugin.name);
        }
      }
      if (!notExistsEnabledPlugins.size) {
        return;
      }
      const lang = await this.getSystemLang();
      const errMsg = (0, import_wording.getNotExistsEnabledPluginsError)(notExistsEnabledPlugins, this.app.name);
      const error = new Error(errMsg[lang]);
      error.stack = void 0;
      error.cause = void 0;
      error.onlyLogCause = true;
      throw error;
    });
  }
  async up() {
    await this.processRemovedPlugins();
  }
};
__name(_pro_plugins_detect_default, "default");
let pro_plugins_detect_default = _pro_plugins_detect_default;
