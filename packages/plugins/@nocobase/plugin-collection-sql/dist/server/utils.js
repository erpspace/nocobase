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
var utils_exports = {};
__export(utils_exports, {
  checkSQL: () => checkSQL
});
module.exports = __toCommonJS(utils_exports);
const checkSQL = (sql) => {
  const dangerKeywords = [
    // PostgreSQL
    "pg_read_file",
    "pg_read_binary_file",
    "pg_stat_file",
    "pg_ls_dir",
    "pg_logdir_ls",
    "pg_terminate_backend",
    "pg_cancel_backend",
    "current_setting",
    "set_config",
    "pg_reload_conf",
    "pg_sleep",
    "generate_series",
    // MySQL
    "LOAD_FILE",
    "BENCHMARK",
    "@@global.",
    "@@session.",
    // SQLite
    "sqlite3_load_extension",
    "load_extension"
  ];
  sql = sql.trim().split(";").shift();
  if (!/^select/i.test(sql) && !/^with([\s\S]+)select([\s\S]+)/i.test(sql)) {
    throw new Error("Only supports SELECT statements or WITH clauses");
  }
  if (dangerKeywords.some((keyword) => sql.toLowerCase().includes(keyword.toLowerCase()))) {
    throw new Error("SQL statements contain dangerous keywords");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkSQL
});
