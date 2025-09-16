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
var providers2verificators_exports = {};
__export(providers2verificators_exports, {
  default: () => providers2verificators_default
});
module.exports = __toCommonJS(providers2verificators_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_constants = require("../../constants");
class providers2verificators_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.7.0";
  async up() {
    const verificatorsRepo = this.db.getRepository("verificators");
    if (await verificatorsRepo.count()) {
      return;
    }
    const repo = this.db.getRepository("verifications_providers");
    if (!repo) {
      return;
    }
    const providers = await this.db.getRepository("verifications_providers").find();
    if (!providers.length) {
      return;
    }
    const verificators = [];
    let defaultVerificator;
    providers.forEach((provider) => {
      const verificator = {
        name: `v_${(0, import_utils.uid)()}`,
        title: provider.title,
        verificationType: import_constants.SMS_OTP_VERIFICATION_TYPE,
        options: {
          provider: provider.type,
          settings: provider.options
        }
      };
      verificators.push(verificator);
      if (provider.default) {
        defaultVerificator = verificator;
      }
    });
    if (!defaultVerificator) {
      defaultVerificator = verificators[0];
    }
    const smsAuth = await this.db.getRepository("authenticators").find({
      filter: {
        authType: "SMS"
      }
    });
    await this.db.sequelize.transaction(async (transaction) => {
      var _a;
      const verificatorModel = this.db.getModel("verificators");
      await verificatorModel.bulkCreate(verificators, { transaction });
      for (const item of smsAuth) {
        await item.update(
          {
            options: {
              ...item.options,
              public: {
                ...(_a = item.options) == null ? void 0 : _a.public,
                verificator: defaultVerificator == null ? void 0 : defaultVerificator.name
              }
            }
          },
          { transaction }
        );
      }
    });
  }
}
