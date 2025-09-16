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
var rename_charttype_exports = {};
__export(rename_charttype_exports, {
  default: () => rename_charttype_default
});
module.exports = __toCommonJS(rename_charttype_exports);
var import_server = require("@nocobase/server");
class rename_charttype_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<=1.5.0-beta";
  async up() {
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-decorator": "ChartRendererProvider"
      }
    });
    await this.db.sequelize.transaction(async (transaction) => {
      var _a, _b;
      for (const item of items) {
        const schema = item.schema;
        const chartType = (_b = (_a = schema["x-decorator-props"]) == null ? void 0 : _a.config) == null ? void 0 : _b.chartType;
        if (!chartType) {
          continue;
        }
        if (chartType.startsWith("Built-in.")) {
          if (chartType === "Built-in.statistic" || chartType === "Built-in.table") {
            schema["x-decorator-props"].config.chartType = chartType.replace("Built-in", "antd");
          } else {
            schema["x-decorator-props"].config.chartType = chartType.replace("Built-in", "ant-design-charts");
          }
          item.set("schema", schema);
          await item.save({ transaction });
        }
      }
    });
  }
}
