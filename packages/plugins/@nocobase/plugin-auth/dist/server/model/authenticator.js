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
var authenticator_exports = {};
__export(authenticator_exports, {
  AuthModel: () => AuthModel
});
module.exports = __toCommonJS(authenticator_exports);
var import_database = require("@nocobase/database");
class AuthModel extends import_database.Model {
  async findUser(uuid) {
    let user;
    const users = await this.getUsers({
      through: {
        where: { uuid }
      }
    });
    if (users.length) {
      user = users[0];
      return user;
    }
  }
  async newUser(uuid, userValues) {
    let user;
    const db = this.constructor.database;
    await this.sequelize.transaction(async (transaction) => {
      user = await this.createUser(
        userValues || {
          nickname: uuid
        },
        {
          through: {
            uuid
          },
          transaction
        }
      );
      await db.emitAsync(`users.afterCreateWithAssociations`, user, {
        transaction
      });
    });
    return user;
  }
  async findOrCreateUser(uuid, userValues) {
    const user = await this.findUser(uuid);
    if (user) {
      return user;
    }
    return await this.newUser(uuid, userValues);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthModel
});
