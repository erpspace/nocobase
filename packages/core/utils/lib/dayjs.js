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
var dayjs_exports = {};
__export(dayjs_exports, {
  dayjs: () => import_dayjs.default
});
module.exports = __toCommonJS(dayjs_exports);
var import_dayjs = __toESM(require("dayjs"));
var import_advancedFormat = __toESM(require("dayjs/plugin/advancedFormat"));
var import_customParseFormat = __toESM(require("dayjs/plugin/customParseFormat"));
var import_duration = __toESM(require("dayjs/plugin/duration"));
var import_isBetween = __toESM(require("dayjs/plugin/isBetween"));
var import_isSameOrAfter = __toESM(require("dayjs/plugin/isSameOrAfter"));
var import_isSameOrBefore = __toESM(require("dayjs/plugin/isSameOrBefore"));
var import_isoWeek = __toESM(require("dayjs/plugin/isoWeek"));
var import_localeData = __toESM(require("dayjs/plugin/localeData"));
var import_quarterOfYear = __toESM(require("dayjs/plugin/quarterOfYear"));
var import_timezone = __toESM(require("dayjs/plugin/timezone"));
var import_utc = __toESM(require("dayjs/plugin/utc"));
var import_weekOfYear = __toESM(require("dayjs/plugin/weekOfYear"));
var import_weekYear = __toESM(require("dayjs/plugin/weekYear"));
var import_weekday = __toESM(require("dayjs/plugin/weekday"));
import_dayjs.default.extend(import_weekday.default);
import_dayjs.default.extend(import_localeData.default);
import_dayjs.default.extend(import_timezone.default);
import_dayjs.default.extend(import_utc.default);
import_dayjs.default.extend(import_quarterOfYear.default);
import_dayjs.default.extend(import_isoWeek.default);
import_dayjs.default.extend(import_isBetween.default);
import_dayjs.default.extend(import_isSameOrAfter.default);
import_dayjs.default.extend(import_isSameOrBefore.default);
import_dayjs.default.extend(import_weekOfYear.default);
import_dayjs.default.extend(import_weekYear.default);
import_dayjs.default.extend(import_customParseFormat.default);
import_dayjs.default.extend(import_advancedFormat.default);
import_dayjs.default.extend(import_duration.default);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dayjs
});
