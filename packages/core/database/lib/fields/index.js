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
var fields_exports = {};
module.exports = __toCommonJS(fields_exports);
__reExport(fields_exports, require("./array-field"), module.exports);
__reExport(fields_exports, require("./belongs-to-field"), module.exports);
__reExport(fields_exports, require("./belongs-to-many-field"), module.exports);
__reExport(fields_exports, require("./boolean-field"), module.exports);
__reExport(fields_exports, require("./context-field"), module.exports);
__reExport(fields_exports, require("./date-field"), module.exports);
__reExport(fields_exports, require("./datetime-field"), module.exports);
__reExport(fields_exports, require("./datetime-tz-field"), module.exports);
__reExport(fields_exports, require("./datetime-no-tz-field"), module.exports);
__reExport(fields_exports, require("./date-only-field"), module.exports);
__reExport(fields_exports, require("./field"), module.exports);
__reExport(fields_exports, require("./has-many-field"), module.exports);
__reExport(fields_exports, require("./has-one-field"), module.exports);
__reExport(fields_exports, require("./json-field"), module.exports);
__reExport(fields_exports, require("./number-field"), module.exports);
__reExport(fields_exports, require("./password-field"), module.exports);
__reExport(fields_exports, require("./radio-field"), module.exports);
__reExport(fields_exports, require("./relation-field"), module.exports);
__reExport(fields_exports, require("./set-field"), module.exports);
__reExport(fields_exports, require("./string-field"), module.exports);
__reExport(fields_exports, require("./text-field"), module.exports);
__reExport(fields_exports, require("./time-field"), module.exports);
__reExport(fields_exports, require("./uid-field"), module.exports);
__reExport(fields_exports, require("./uuid-field"), module.exports);
__reExport(fields_exports, require("./virtual-field"), module.exports);
__reExport(fields_exports, require("./nanoid-field"), module.exports);
__reExport(fields_exports, require("./encryption-field"), module.exports);
__reExport(fields_exports, require("./unix-timestamp-field"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./array-field"),
  ...require("./belongs-to-field"),
  ...require("./belongs-to-many-field"),
  ...require("./boolean-field"),
  ...require("./context-field"),
  ...require("./date-field"),
  ...require("./datetime-field"),
  ...require("./datetime-tz-field"),
  ...require("./datetime-no-tz-field"),
  ...require("./date-only-field"),
  ...require("./field"),
  ...require("./has-many-field"),
  ...require("./has-one-field"),
  ...require("./json-field"),
  ...require("./number-field"),
  ...require("./password-field"),
  ...require("./radio-field"),
  ...require("./relation-field"),
  ...require("./set-field"),
  ...require("./string-field"),
  ...require("./text-field"),
  ...require("./time-field"),
  ...require("./uid-field"),
  ...require("./uuid-field"),
  ...require("./virtual-field"),
  ...require("./nanoid-field"),
  ...require("./encryption-field"),
  ...require("./unix-timestamp-field")
});
