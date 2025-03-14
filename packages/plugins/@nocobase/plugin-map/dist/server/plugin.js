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
var plugin_exports = {};
__export(plugin_exports, {
  PluginMapServer: () => PluginMapServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_actions = require("./actions");
var import_fields = require("./fields");
var import_interfaces = require("./interfaces");
var import_value_parsers = require("./value-parsers");
class PluginMapServer extends import_server.Plugin {
  afterAdd() {
  }
  beforeLoad() {
    const fields = {
      point: import_fields.PointField,
      polygon: import_fields.PolygonField,
      lineString: import_fields.LineStringField,
      circle: import_fields.CircleField
    };
    this.db.registerFieldTypes(fields);
    this.db.registerFieldValueParsers({
      point: import_value_parsers.PointValueParser,
      polygon: import_value_parsers.PolygonValueParser,
      lineString: import_value_parsers.LineStringValueParser,
      circle: import_value_parsers.CircleValueParser
    });
    this.db.interfaceManager.registerInterfaceType("point", import_interfaces.PointInterface);
    this.db.interfaceManager.registerInterfaceType("polygon", import_interfaces.PolygonInterface);
    this.db.interfaceManager.registerInterfaceType("lineString", import_interfaces.LineStringInterface);
    this.db.interfaceManager.registerInterfaceType("circle", import_interfaces.CircleInterface);
  }
  async load() {
    this.app.resourceManager.define({
      name: "map-configuration",
      actions: {
        get: import_actions.getConfiguration,
        set: import_actions.setConfiguration
      },
      only: ["get", "set"]
    });
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.configuration`,
      actions: ["map-configuration:set"]
    });
    this.app.acl.allow("map-configuration", "get", "loggedIn");
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
var plugin_default = PluginMapServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginMapServer
});
