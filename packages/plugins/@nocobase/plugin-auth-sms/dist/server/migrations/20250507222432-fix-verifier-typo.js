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
var fix_verifier_typo_exports = {};
__export(fix_verifier_typo_exports, {
  default: () => fix_verifier_typo_default
});
module.exports = __toCommonJS(fix_verifier_typo_exports);
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
class fix_verifier_typo_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.7.0";
  async up() {
    var _a, _b;
    const authenticators = await this.db.getRepository("authenticators").find({
      filter: {
        authType: "SMS"
      }
    });
    for (const authenticator of authenticators) {
      if ((_b = (_a = authenticator.options) == null ? void 0 : _a.public) == null ? void 0 : _b.verificator) {
        await authenticator.update({
          options: {
            ...authenticator.options,
            public: {
              ...import_lodash.default.omit(authenticator.options.public, ["verificator"]),
              verifier: authenticator.options.public.verificator
            }
          }
        });
      }
    }
  }
}
