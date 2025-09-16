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
var actions_exports = {};
module.exports = __toCommonJS(actions_exports);
__reExport(actions_exports, require("./list"), module.exports);
__reExport(actions_exports, require("./create"), module.exports);
__reExport(actions_exports, require("./update"), module.exports);
__reExport(actions_exports, require("./destroy"), module.exports);
__reExport(actions_exports, require("./get"), module.exports);
__reExport(actions_exports, require("./add"), module.exports);
__reExport(actions_exports, require("./set"), module.exports);
__reExport(actions_exports, require("./remove"), module.exports);
__reExport(actions_exports, require("./toggle"), module.exports);
__reExport(actions_exports, require("./first-or-create"), module.exports);
__reExport(actions_exports, require("./update-or-create"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./list"),
  ...require("./create"),
  ...require("./update"),
  ...require("./destroy"),
  ...require("./get"),
  ...require("./add"),
  ...require("./set"),
  ...require("./remove"),
  ...require("./toggle"),
  ...require("./first-or-create"),
  ...require("./update-or-create")
});
