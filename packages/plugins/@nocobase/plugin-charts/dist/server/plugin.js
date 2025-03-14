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
var plugin_exports = {};
__export(plugin_exports, {
  ChartsPlugin: () => ChartsPlugin,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_json5 = __toESM(require("json5"));
var import_path = require("path");
var import_chartsQueries = require("./actions/chartsQueries");
var import_query = require("./query");
class ChartsPlugin extends import_server.Plugin {
  syncFields = async (instance, { transaction }) => {
    const _data = await import_query.query[instance.type](instance.options, { db: this.db, transaction, validateSQL: true });
    let data;
    if (typeof _data === "string") {
      data = import_json5.default.parse(_data);
    } else {
      data = _data;
    }
    const d = Array.isArray(data) ? data == null ? void 0 : data[0] : data;
    const fields = Object.keys(d || {}).map((f) => {
      return {
        name: f
      };
    });
    instance.set("fields", fields);
  };
  afterAdd() {
  }
  beforeLoad() {
    this.app.db.on("chartsQueries.beforeCreate", this.syncFields);
    this.app.db.on("chartsQueries.beforeUpdate", this.syncFields);
  }
  async load() {
    await this.importCollections((0, import_path.resolve)(__dirname, "collections"));
    this.app.resourcer.registerActionHandlers({
      "chartsQueries:getData": import_chartsQueries.getData,
      "chartsQueries:listMetadata": import_chartsQueries.listMetadata,
      "chartsQueries:validate": import_chartsQueries.validate
    });
    this.app.acl.registerSnippet({
      name: "pm.charts.queries",
      actions: ["chartsQueries:*"]
    });
    this.app.acl.allow("chartsQueries", "getData", "loggedIn");
    this.app.acl.allow("chartsQueries", "listMetadata", "loggedIn");
  }
  async install(options) {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = ChartsPlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChartsPlugin
});
