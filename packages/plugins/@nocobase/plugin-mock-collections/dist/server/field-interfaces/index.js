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
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var field_interfaces_exports = {};
module.exports = __toCommonJS(field_interfaces_exports);
__reExport(field_interfaces_exports, require("./association"), module.exports);
__reExport(field_interfaces_exports, require("./attachment"), module.exports);
__reExport(field_interfaces_exports, require("./checkbox"), module.exports);
__reExport(field_interfaces_exports, require("./checkboxGroup"), module.exports);
__reExport(field_interfaces_exports, require("./chinaRegion"), module.exports);
__reExport(field_interfaces_exports, require("./circle"), module.exports);
__reExport(field_interfaces_exports, require("./collection"), module.exports);
__reExport(field_interfaces_exports, require("./color"), module.exports);
__reExport(field_interfaces_exports, require("./createdAt"), module.exports);
__reExport(field_interfaces_exports, require("./createdBy"), module.exports);
__reExport(field_interfaces_exports, require("./datetime"), module.exports);
__reExport(field_interfaces_exports, require("./email"), module.exports);
__reExport(field_interfaces_exports, require("./formula"), module.exports);
__reExport(field_interfaces_exports, require("./icon"), module.exports);
__reExport(field_interfaces_exports, require("./id"), module.exports);
__reExport(field_interfaces_exports, require("./input"), module.exports);
__reExport(field_interfaces_exports, require("./integer"), module.exports);
__reExport(field_interfaces_exports, require("./json"), module.exports);
__reExport(field_interfaces_exports, require("./lineString"), module.exports);
__reExport(field_interfaces_exports, require("./markdown"), module.exports);
__reExport(field_interfaces_exports, require("./multipleSelect"), module.exports);
__reExport(field_interfaces_exports, require("./number"), module.exports);
__reExport(field_interfaces_exports, require("./password"), module.exports);
__reExport(field_interfaces_exports, require("./percent"), module.exports);
__reExport(field_interfaces_exports, require("./phone"), module.exports);
__reExport(field_interfaces_exports, require("./point"), module.exports);
__reExport(field_interfaces_exports, require("./polygon"), module.exports);
__reExport(field_interfaces_exports, require("./radioGroup"), module.exports);
__reExport(field_interfaces_exports, require("./richText"), module.exports);
__reExport(field_interfaces_exports, require("./select"), module.exports);
__reExport(field_interfaces_exports, require("./sequence"), module.exports);
__reExport(field_interfaces_exports, require("./snapshot"), module.exports);
__reExport(field_interfaces_exports, require("./tableoid"), module.exports);
__reExport(field_interfaces_exports, require("./textarea"), module.exports);
__reExport(field_interfaces_exports, require("./time"), module.exports);
__reExport(field_interfaces_exports, require("./updatedAt"), module.exports);
__reExport(field_interfaces_exports, require("./updatedBy"), module.exports);
__reExport(field_interfaces_exports, require("./url"), module.exports);
__reExport(field_interfaces_exports, require("./sort"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./association"),
  ...require("./attachment"),
  ...require("./checkbox"),
  ...require("./checkboxGroup"),
  ...require("./chinaRegion"),
  ...require("./circle"),
  ...require("./collection"),
  ...require("./color"),
  ...require("./createdAt"),
  ...require("./createdBy"),
  ...require("./datetime"),
  ...require("./email"),
  ...require("./formula"),
  ...require("./icon"),
  ...require("./id"),
  ...require("./input"),
  ...require("./integer"),
  ...require("./json"),
  ...require("./lineString"),
  ...require("./markdown"),
  ...require("./multipleSelect"),
  ...require("./number"),
  ...require("./password"),
  ...require("./percent"),
  ...require("./phone"),
  ...require("./point"),
  ...require("./polygon"),
  ...require("./radioGroup"),
  ...require("./richText"),
  ...require("./select"),
  ...require("./sequence"),
  ...require("./snapshot"),
  ...require("./tableoid"),
  ...require("./textarea"),
  ...require("./time"),
  ...require("./updatedAt"),
  ...require("./updatedBy"),
  ...require("./url"),
  ...require("./sort")
});
