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
var src_exports = {};
__export(src_exports, {
  Schema: () => import_json_schema.Schema,
  dayjs: () => import_dayjs.dayjs,
  lodash: () => import_lodash.default
});
module.exports = __toCommonJS(src_exports);
var import_lodash = __toESM(require("lodash"));
var import_dayjs = require("./dayjs");
__reExport(src_exports, require("./assign"), module.exports);
__reExport(src_exports, require("./collections-graph"), module.exports);
__reExport(src_exports, require("./common"), module.exports);
__reExport(src_exports, require("./crypto"), module.exports);
__reExport(src_exports, require("./date"), module.exports);
__reExport(src_exports, require("./dayjs"), module.exports);
__reExport(src_exports, require("./forEach"), module.exports);
__reExport(src_exports, require("./fs-exists"), module.exports);
__reExport(src_exports, require("./handlebars"), module.exports);
__reExport(src_exports, require("./isValidFilter"), module.exports);
__reExport(src_exports, require("./json-templates"), module.exports);
__reExport(src_exports, require("./koa-multer"), module.exports);
__reExport(src_exports, require("./measure-execution-time"), module.exports);
__reExport(src_exports, require("./merge"), module.exports);
__reExport(src_exports, require("./mixin"), module.exports);
__reExport(src_exports, require("./mixin/AsyncEmitter"), module.exports);
__reExport(src_exports, require("./number"), module.exports);
__reExport(src_exports, require("./parse-date"), module.exports);
__reExport(src_exports, require("./parse-filter"), module.exports);
__reExport(src_exports, require("./perf-hooks"), module.exports);
__reExport(src_exports, require("./registry"), module.exports);
__reExport(src_exports, require("./requireModule"), module.exports);
__reExport(src_exports, require("./toposort"), module.exports);
__reExport(src_exports, require("./uid"), module.exports);
__reExport(src_exports, require("./url"), module.exports);
__reExport(src_exports, require("./i18n"), module.exports);
__reExport(src_exports, require("./wrap-middleware"), module.exports);
__reExport(src_exports, require("./object-to-cli-args"), module.exports);
__reExport(src_exports, require("./parsedValue"), module.exports);
__reExport(src_exports, require("./dateRangeUtils"), module.exports);
var import_json_schema = require("@formily/json-schema");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Schema,
  dayjs,
  lodash,
  ...require("./assign"),
  ...require("./collections-graph"),
  ...require("./common"),
  ...require("./crypto"),
  ...require("./date"),
  ...require("./dayjs"),
  ...require("./forEach"),
  ...require("./fs-exists"),
  ...require("./handlebars"),
  ...require("./isValidFilter"),
  ...require("./json-templates"),
  ...require("./koa-multer"),
  ...require("./measure-execution-time"),
  ...require("./merge"),
  ...require("./mixin"),
  ...require("./mixin/AsyncEmitter"),
  ...require("./number"),
  ...require("./parse-date"),
  ...require("./parse-filter"),
  ...require("./perf-hooks"),
  ...require("./registry"),
  ...require("./requireModule"),
  ...require("./toposort"),
  ...require("./uid"),
  ...require("./url"),
  ...require("./i18n"),
  ...require("./wrap-middleware"),
  ...require("./object-to-cli-args"),
  ...require("./parsedValue"),
  ...require("./dateRangeUtils")
});
