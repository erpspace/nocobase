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
var src_exports = {};
module.exports = __toCommonJS(src_exports);
__reExport(src_exports, require("./collection-manager"), module.exports);
__reExport(src_exports, require("./collection"), module.exports);
__reExport(src_exports, require("./data-source"), module.exports);
__reExport(src_exports, require("./data-source-manager"), module.exports);
__reExport(src_exports, require("./sequelize-collection-manager"), module.exports);
__reExport(src_exports, require("./sequelize-data-source"), module.exports);
__reExport(src_exports, require("./load-default-actions"), module.exports);
__reExport(src_exports, require("./types"), module.exports);
__reExport(src_exports, require("./utils"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./collection-manager"),
  ...require("./collection"),
  ...require("./data-source"),
  ...require("./data-source-manager"),
  ...require("./sequelize-collection-manager"),
  ...require("./sequelize-data-source"),
  ...require("./load-default-actions"),
  ...require("./types"),
  ...require("./utils")
});
