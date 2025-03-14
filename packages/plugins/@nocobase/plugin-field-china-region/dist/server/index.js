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
var server_exports = {};
__export(server_exports, {
  PluginFieldChinaRegionServer: () => PluginFieldChinaRegionServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_path = require("path");
var import_china_region_interface = require("./interfaces/china-region-interface");
function getChinaDivisionData(key) {
  try {
    require.resolve(`../china-division/${key}.json`);
    return require(`../china-division/${key}.json`);
  } catch (error) {
    return require(`china-division/dist/${key}.json`);
  }
}
class PluginFieldChinaRegionServer extends import_server.Plugin {
  async install() {
    await this.importData();
  }
  async load() {
    await this.importCollections((0, import_path.resolve)(__dirname, "collections"));
    this.app.acl.allow("chinaRegions", "list", "loggedIn");
    this.app.acl.appendStrategyResource("chinaRegions");
    this.app.resourceManager.use(async function blockChinaRegionList(ctx, next) {
      const { resourceName, actionName } = ctx.action.params;
      if (resourceName == "chinaRegions" && actionName !== "list") {
        ctx.throw(404, "Not Found");
      } else {
        await next();
      }
    });
    this.app.db.interfaceManager.registerInterfaceType("chinaRegion", import_china_region_interface.ChinaRegionInterface);
  }
  async importData() {
    const areas = getChinaDivisionData("areas");
    const cities = getChinaDivisionData("cities");
    const provinces = getChinaDivisionData("provinces");
    const timer = Date.now();
    const ChinaRegion = this.db.getModel("chinaRegions");
    await ChinaRegion.bulkCreate(
      provinces.map((item) => ({
        code: item.code,
        name: item.name,
        level: 1
      }))
    );
    await ChinaRegion.bulkCreate(
      cities.map((item) => ({
        code: item.code,
        name: item.name,
        level: 2,
        parentCode: item.provinceCode
      }))
    );
    await ChinaRegion.bulkCreate(
      areas.map((item) => ({
        code: item.code,
        name: item.name,
        level: 3,
        parentCode: item.cityCode
      }))
    );
    const count = await ChinaRegion.count();
  }
}
var server_default = PluginFieldChinaRegionServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginFieldChinaRegionServer
});
