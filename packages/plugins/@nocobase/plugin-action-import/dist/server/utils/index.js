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
var utils_exports = {};
__export(utils_exports, {
  transform: () => transform
});
module.exports = __toCommonJS(utils_exports);
var import_lodash = __toESM(require("lodash"));
var transforms = __toESM(require("./transform"));
function getTransform(name) {
  return transforms[name] || transforms._;
}
async function transform({ ctx, record, columns, fields }) {
  const newRecord = {};
  for (let index = 0, iLen = record.length; index < iLen; index++) {
    const cell = record[index];
    const column = columns[index] ?? {};
    const { dataIndex } = column;
    const field = fields.find((f) => f.name === dataIndex[0]);
    const t = getTransform(field.options.interface);
    const value = await t({ ctx, column, value: cell, field });
    import_lodash.default.set(newRecord, dataIndex[0], value);
  }
  return newRecord;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transform
});
