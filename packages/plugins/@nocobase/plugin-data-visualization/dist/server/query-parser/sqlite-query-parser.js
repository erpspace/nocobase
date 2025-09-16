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
var sqlite_query_parser_exports = {};
__export(sqlite_query_parser_exports, {
  SQLiteQueryParser: () => SQLiteQueryParser
});
module.exports = __toCommonJS(sqlite_query_parser_exports);
var import_sqlite_formatter = require("../formatter/sqlite-formatter");
var import_query_parser = require("./query-parser");
class SQLiteQueryParser extends import_query_parser.QueryParser {
  constructor(db) {
    super(db);
    this.formatter = new import_sqlite_formatter.SQLiteFormatter(db.sequelize);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SQLiteQueryParser
});
