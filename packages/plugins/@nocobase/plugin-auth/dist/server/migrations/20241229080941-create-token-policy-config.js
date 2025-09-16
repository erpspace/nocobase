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
var create_token_policy_config_exports = {};
__export(create_token_policy_config_exports, {
  default: () => create_token_policy_config_default
});
module.exports = __toCommonJS(create_token_policy_config_exports);
var import_server = require("@nocobase/server");
var import_constants = require("../../constants");
class create_token_policy_config_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.6.1";
  async up() {
    const tokenPolicyRepo = this.app.db.getRepository(import_constants.tokenPolicyCollectionName);
    const tokenPolicy = await tokenPolicyRepo.findOne({ filterByTk: import_constants.tokenPolicyRecordKey });
    if (tokenPolicy) {
      this.app.authManager.tokenController.setConfig(tokenPolicy.config);
    } else {
      const config = {
        tokenExpirationTime: "1d",
        sessionExpirationTime: "7d",
        expiredTokenRenewLimit: "1d"
      };
      await tokenPolicyRepo.create({
        values: {
          key: import_constants.tokenPolicyRecordKey,
          config
        }
      });
      this.app.authManager.tokenController.setConfig(config);
    }
  }
}
