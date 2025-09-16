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
var server_exports = {};
module.exports = __toCommonJS(server_exports);
__reExport(server_exports, require("./date"), module.exports);
__reExport(server_exports, require("./fs-exists"), module.exports);
__reExport(server_exports, require("./merge"), module.exports);
__reExport(server_exports, require("./mixin"), module.exports);
__reExport(server_exports, require("./mixin/AsyncEmitter"), module.exports);
__reExport(server_exports, require("./number"), module.exports);
__reExport(server_exports, require("./registry"), module.exports);
__reExport(server_exports, require("./requireModule"), module.exports);
__reExport(server_exports, require("./toposort"), module.exports);
__reExport(server_exports, require("./uid"), module.exports);
__reExport(server_exports, require("./url"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./date"),
  ...require("./fs-exists"),
  ...require("./merge"),
  ...require("./mixin"),
  ...require("./mixin/AsyncEmitter"),
  ...require("./number"),
  ...require("./registry"),
  ...require("./requireModule"),
  ...require("./toposort"),
  ...require("./uid"),
  ...require("./url")
});
