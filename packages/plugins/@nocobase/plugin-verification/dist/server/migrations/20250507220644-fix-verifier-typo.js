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
var fix_verifier_typo_exports = {};
__export(fix_verifier_typo_exports, {
  default: () => fix_verifier_typo_default
});
module.exports = __toCommonJS(fix_verifier_typo_exports);
var import_server = require("@nocobase/server");
class fix_verifier_typo_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.7.0";
  async up() {
    const oldRepo = await this.db.getRepository("verificators");
    const newRepo = await this.db.getRepository("verifiers");
    const oldThroughRepo = await this.db.getRepository("usersVerificators");
    const newThroughRepo = await this.db.getRepository("usersVerifiers");
    await this.db.sequelize.transaction(async (transaction) => {
      if (await newRepo.count({ transaction })) {
        return;
      }
      const oldRecords = await oldRepo.find({ transaction });
      if (!oldRecords.length) {
        return;
      }
      const newRecords = oldRecords.map((record) => ({
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        name: record.name,
        title: record.title,
        verificationType: record.verificationType,
        description: record.description,
        options: record.options
      }));
      const model = await this.db.getModel("verifiers");
      await model.bulkCreate(newRecords, {
        transaction
      });
      if (await newThroughRepo.count({ transaction })) {
        return;
      }
      const oldThroughRecords = await oldThroughRepo.find({ transaction });
      if (!oldThroughRecords.length) {
        return;
      }
      const newThroughRecords = oldThroughRecords.map((record) => ({
        createdAt: record.createdAt,
        updatedAt: record.updatedAt,
        userId: record.userId,
        uuid: record.uuid,
        meta: record.meta,
        verifier: record.verificator,
        createdById: record.createdById,
        updatedById: record.updatedById
      }));
      const throughModel = await this.db.getModel("usersVerifiers");
      await throughModel.bulkCreate(newThroughRecords, {
        transaction
      });
    });
  }
}
