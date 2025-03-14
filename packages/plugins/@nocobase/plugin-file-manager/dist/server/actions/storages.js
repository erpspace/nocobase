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
var storages_exports = {};
__export(storages_exports, {
  getBasicInfo: () => getBasicInfo
});
module.exports = __toCommonJS(storages_exports);
var import__ = __toESM(require(".."));
async function getBasicInfo(context, next) {
  const { storagesCache } = context.app.pm.get(import__.default);
  let result;
  const { filterByTk } = context.action.params;
  if (!filterByTk) {
    result = Array.from(storagesCache.values()).find((item) => item.default);
  } else {
    const isNumber = /^[1-9]\d*$/.test(filterByTk);
    result = isNumber ? storagesCache.get(Number.parseInt(filterByTk, 10)) : Array.from(storagesCache.values()).find((item) => item.name === filterByTk);
  }
  if (!result) {
    return context.throw(404);
  }
  context.body = {
    id: result.id,
    title: result.title,
    name: result.name,
    type: result.type,
    rules: result.rules
  };
  next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBasicInfo
});
