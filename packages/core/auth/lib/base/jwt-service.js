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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var jwt_service_exports = {};
__export(jwt_service_exports, {
  JwtService: () => JwtService
});
module.exports = __toCommonJS(jwt_service_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
const _JwtService = class _JwtService {
  constructor(options = {
    secret: process.env.APP_KEY
  }) {
    this.options = options;
    const { secret, expiresIn } = options;
    this.options = {
      secret: secret || process.env.APP_KEY,
      expiresIn: expiresIn || process.env.JWT_EXPIRES_IN || "7d"
    };
  }
  blacklist;
  expiresIn() {
    return this.options.expiresIn;
  }
  secret() {
    return this.options.secret;
  }
  /* istanbul ignore next -- @preserve */
  sign(payload, options) {
    const opt = { expiresIn: this.expiresIn(), ...options };
    if (opt.expiresIn === "never") {
      opt.expiresIn = "1000y";
    }
    return import_jsonwebtoken.default.sign(payload, this.secret(), opt);
  }
  /* istanbul ignore next -- @preserve */
  decode(token) {
    return new Promise((resolve, reject) => {
      import_jsonwebtoken.default.verify(token, this.secret(), (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded);
      });
    });
  }
  /**
   * @description Block a token so that this token can no longer be used
   */
  async block(token) {
    if (!this.blacklist) {
      return null;
    }
    try {
      const { exp, jti } = await this.decode(token);
      return this.blacklist.add({
        token: jti ?? token,
        expiration: new Date(exp * 1e3).toString()
      });
    } catch {
      return null;
    }
  }
};
__name(_JwtService, "JwtService");
let JwtService = _JwtService;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JwtService
});
