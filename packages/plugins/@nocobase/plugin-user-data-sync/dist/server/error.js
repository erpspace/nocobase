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
var error_exports = {};
__export(error_exports, {
  ErrorCodes: () => ErrorCodes,
  ExternalAPIError: () => ExternalAPIError
});
module.exports = __toCommonJS(error_exports);
class ExternalAPIError extends Error {
  code;
  constructor(message) {
    super(message);
    this.name = "ExternalAPIError";
    this.code = ErrorCodes.EXTERNAL_API_ERROR;
  }
}
class ErrorCodes {
  static SUCCESS = 0;
  static UNAUTHORIZED = 401;
  static EXTERNAL_API_ERROR = 510;
  static messages = {
    [ErrorCodes.SUCCESS]: "Success",
    [ErrorCodes.UNAUTHORIZED]: "Unauthorized",
    [ErrorCodes.EXTERNAL_API_ERROR]: "External API Error"
  };
  static getErrorMessage(code) {
    return this.messages[code] || "Unknown Error";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorCodes,
  ExternalAPIError
});
