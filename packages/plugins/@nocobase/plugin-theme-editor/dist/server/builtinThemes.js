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
var builtinThemes_exports = {};
__export(builtinThemes_exports, {
  compact: () => compact,
  compactDark: () => compactDark,
  dark: () => dark,
  defaultTheme: () => defaultTheme
});
module.exports = __toCommonJS(builtinThemes_exports);
const defaultTheme = {
  config: {
    name: "Default"
  },
  optional: true,
  isBuiltIn: true,
  uid: "default",
  default: process.env.__E2E__ ? true : false
};
const dark = {
  config: {
    name: "Dark",
    // @ts-ignore
    algorithm: "darkAlgorithm"
  },
  optional: true,
  isBuiltIn: true,
  uid: "dark",
  default: false
};
const compact = {
  config: {
    name: "Compact",
    // @ts-ignore
    algorithm: "compactAlgorithm",
    token: {
      fontSize: 16
    }
  },
  optional: true,
  isBuiltIn: true,
  uid: "compact",
  default: process.env.__E2E__ ? false : true
};
const compactDark = {
  config: {
    name: "Compact dark",
    // @ts-ignore
    algorithm: ["compactAlgorithm", "darkAlgorithm"],
    token: {
      fontSize: 16
    }
  },
  optional: true,
  isBuiltIn: true,
  uid: "compact_dark",
  default: false
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  compact,
  compactDark,
  dark,
  defaultTheme
});
