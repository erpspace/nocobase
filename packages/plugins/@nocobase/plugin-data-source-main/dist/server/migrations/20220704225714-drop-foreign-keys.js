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
var drop_foreign_keys_exports = {};
__export(drop_foreign_keys_exports, {
  default: () => drop_foreign_keys_default
});
module.exports = __toCommonJS(drop_foreign_keys_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class drop_foreign_keys_default extends import_server.Migration {
  appVersion = "<=0.7.1-alpha.7";
  async up() {
    const result = await this.app.version.satisfies("<=0.7.1-alpha.7");
    if (!result) {
      return;
    }
    const transaction = await this.db.sequelize.transaction();
    try {
      if (this.db.isMySQLCompatibleDialect()) {
        const [results] = await this.db.sequelize.query(
          `
            SELECT CONCAT('ALTER TABLE ', TABLE_SCHEMA, '.', TABLE_NAME, ' DROP FOREIGN KEY ', CONSTRAINT_NAME,
                          ' ;') as q
            FROM information_schema.TABLE_CONSTRAINTS c
            WHERE c.TABLE_SCHEMA = '${this.db.options.database}'
              AND c.CONSTRAINT_TYPE = 'FOREIGN KEY';
          `,
          { transaction }
        );
        for (const result2 of results) {
          await this.db.sequelize.query(result2.q, { transaction });
        }
      } else if (this.db.inDialect("postgres")) {
        const [results] = await this.db.sequelize.query(
          `
            select 'alter table ' || quote_ident(tb.relname) ||
                   ' drop constraint ' || quote_ident(conname) || ';' as q
            from pg_constraint c
                   join pg_class tb on tb.oid = c.conrelid
                   join pg_namespace ns on ns.oid = tb.relnamespace
            where ns.nspname in ('public')
              and c.contype = 'f';
          `,
          { transaction }
        );
        for (const result2 of results) {
          await this.db.sequelize.query(result2.q, { transaction });
        }
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }
  }
}
