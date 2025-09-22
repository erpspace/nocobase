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
var multicore_info_exports = {};
__export(multicore_info_exports, {
  getMulticoreInfo: () => getMulticoreInfo
});
module.exports = __toCommonJS(multicore_info_exports);
async function getMulticoreInfo(ctx) {
  const { app } = ctx;
  try {
    const multicorePlugin = app.getPlugin("@erpspace/plugin-multicore");
    if (!multicorePlugin) {
      ctx.throw(500, "Multicore plugin not loaded");
    }
    const info = await multicorePlugin.getInstanceInfo();
    ctx.body = {
      data: info
    };
  } catch (error) {
    console.error("[Multicore] Error getting multicore info:", error);
    ctx.throw(500, `Failed to get multicore info: ${error.message}`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMulticoreInfo
});
