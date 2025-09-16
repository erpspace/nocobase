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
var handlebars_exports = {};
__export(handlebars_exports, {
  Handlebars: () => import_handlebars.default
});
module.exports = __toCommonJS(handlebars_exports);
var import_url = __toESM(require("url"));
var import_handlebars = __toESM(require("handlebars"));
var import_handlebars_helpers = __toESM(require("@budibase/handlebars-helpers"));
var import_lodash = __toESM(require("lodash"));
var import_dayjs = require("./dayjs");
const allHelpers = (0, import_handlebars_helpers.default)();
Object.keys(allHelpers).forEach(function(helperName) {
  import_handlebars.default.registerHelper(helperName, allHelpers[helperName]);
});
import_handlebars.default.registerHelper("json", function(context) {
  return JSON.stringify(context);
});
import_handlebars.default.registerHelper("urlParse", function(str) {
  try {
    return JSON.stringify(import_url.default.parse(str));
  } catch (error) {
    return `Invalid URL: ${str}`;
  }
});
import_handlebars.default.registerHelper("dateFormat", (date, format, tz) => {
  if (typeof tz === "string") {
    return (0, import_dayjs.dayjs)(date).tz(tz).format(format);
  }
  return (0, import_dayjs.dayjs)(date).format(format);
});
import_handlebars.default.registerHelper("isNull", (value) => {
  return import_lodash.default.isNull(value);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Handlebars
});
