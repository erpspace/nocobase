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
__reExport(src_exports, require("./acl"), module.exports);
__reExport(src_exports, require("./acl-available-action"), module.exports);
__reExport(src_exports, require("./acl-available-strategy"), module.exports);
__reExport(src_exports, require("./acl-resource"), module.exports);
__reExport(src_exports, require("./acl-role"), module.exports);
__reExport(src_exports, require("./skip-middleware"), module.exports);
__reExport(src_exports, require("./errors"), module.exports);
__reExport(src_exports, require("./utils"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./acl"),
  ...require("./acl-available-action"),
  ...require("./acl-available-strategy"),
  ...require("./acl-resource"),
  ...require("./acl-role"),
  ...require("./skip-middleware"),
  ...require("./errors"),
  ...require("./utils")
});
