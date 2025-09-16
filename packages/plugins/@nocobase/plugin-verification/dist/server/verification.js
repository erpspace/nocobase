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
var verification_exports = {};
__export(verification_exports, {
  Verification: () => Verification
});
module.exports = __toCommonJS(verification_exports);
class Verification {
  verifier;
  ctx;
  options;
  constructor({ ctx, verifier, options }) {
    this.ctx = ctx;
    this.verifier = verifier;
    this.options = options;
  }
  get throughRepo() {
    return this.ctx.db.getRepository("usersVerifiers");
  }
  async onActionComplete(options) {
  }
  async bind(userId, resource, action) {
    throw new Error("Not implemented");
  }
  async getBoundInfo(userId) {
    return this.throughRepo.findOne({
      filter: {
        verifier: this.verifier.name,
        userId
      }
    });
  }
  async getPublicBoundInfo(userId) {
    const boundInfo = await this.getBoundInfo(userId);
    return {
      bound: boundInfo ? true : false
    };
  }
  async validateBoundInfo(boundInfo) {
    return true;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Verification
});
