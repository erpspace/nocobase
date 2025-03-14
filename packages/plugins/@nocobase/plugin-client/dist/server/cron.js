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
var cron_exports = {};
__export(cron_exports, {
  getCronLocale: () => getCronLocale
});
module.exports = __toCommonJS(cron_exports);
var import_utils = require("@nocobase/utils");
var import_path = require("path");
const getCronLocale = (lang) => {
  const lng = lang.replace("-", "_");
  const files = [(0, import_path.resolve)(__dirname, `./../locale/cron/${lng}`)];
  if (process.env.APP_ENV !== "production") {
    files.push(`@nocobase/client/src/locale/cron/${lng}`, `@nocobase/client/lib/locale/cron/${lng}`);
  }
  for (const file of files) {
    try {
      require.resolve(file);
      return (0, import_utils.requireModule)(file);
    } catch (error) {
      continue;
    }
  }
  return {};
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCronLocale
});
