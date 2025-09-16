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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var client_exports = {};
__export(client_exports, {
  dayjs: () => import_dayjs.dayjs,
  getDayRangeByParams: () => import_dateRangeUtils.getDayRangeByParams,
  getOffsetRangeByParams: () => import_dateRangeUtils.getOffsetRangeByParams,
  lodash: () => import_lodash.default
});
module.exports = __toCommonJS(client_exports);
var import_lodash = __toESM(require("lodash"));
var import_dayjs = require("./dayjs");
var import_dateRangeUtils = require("./dateRangeUtils");
__reExport(client_exports, require("./collections-graph"), module.exports);
__reExport(client_exports, require("./common"), module.exports);
__reExport(client_exports, require("./date"), module.exports);
__reExport(client_exports, require("./forEach"), module.exports);
__reExport(client_exports, require("./getValuesByPath"), module.exports);
__reExport(client_exports, require("./handlebars"), module.exports);
__reExport(client_exports, require("./isValidFilter"), module.exports);
__reExport(client_exports, require("./json-templates"), module.exports);
__reExport(client_exports, require("./log"), module.exports);
__reExport(client_exports, require("./merge"), module.exports);
__reExport(client_exports, require("./notification"), module.exports);
__reExport(client_exports, require("./number"), module.exports);
__reExport(client_exports, require("./parse-filter"), module.exports);
__reExport(client_exports, require("./registry"), module.exports);
__reExport(client_exports, require("./i18n"), module.exports);
__reExport(client_exports, require("./isPortalInBody"), module.exports);
__reExport(client_exports, require("./parseHTML"), module.exports);
__reExport(client_exports, require("./uid"), module.exports);
__reExport(client_exports, require("./url"), module.exports);
__reExport(client_exports, require("./transformMultiColumnToSingleColumn"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dayjs,
  getDayRangeByParams,
  getOffsetRangeByParams,
  lodash,
  ...require("./collections-graph"),
  ...require("./common"),
  ...require("./date"),
  ...require("./forEach"),
  ...require("./getValuesByPath"),
  ...require("./handlebars"),
  ...require("./isValidFilter"),
  ...require("./json-templates"),
  ...require("./log"),
  ...require("./merge"),
  ...require("./notification"),
  ...require("./number"),
  ...require("./parse-filter"),
  ...require("./registry"),
  ...require("./i18n"),
  ...require("./isPortalInBody"),
  ...require("./parseHTML"),
  ...require("./uid"),
  ...require("./url"),
  ...require("./transformMultiColumnToSingleColumn")
});
