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
var import_xlsx_exports = {};
__export(import_xlsx_exports, {
  importXlsx: () => importXlsx
});
module.exports = __toCommonJS(import_xlsx_exports);
var import_xlsx = __toESM(require("xlsx"));
var import_async_mutex = require("async-mutex");
var import_xlsx_importer = require("../services/xlsx-importer");
const IMPORT_LIMIT_COUNT = 15e3;
const mutex = new import_async_mutex.Mutex();
async function importXlsxAction(ctx, next) {
  let columns = ctx.request.body.columns;
  if (typeof columns === "string") {
    columns = JSON.parse(columns);
  }
  let readLimit = IMPORT_LIMIT_COUNT;
  readLimit += 1;
  if (ctx.request.body.explain) {
    readLimit += 1;
  }
  const workbook = import_xlsx.default.read(ctx.file.buffer, {
    type: "buffer",
    sheetRows: readLimit
  });
  const repository = ctx.getCurrentRepository();
  const dataSource = ctx.dataSource;
  const collection = repository.collection;
  const importer = new import_xlsx_importer.XlsxImporter({
    collectionManager: dataSource.collectionManager,
    collection,
    columns,
    workbook,
    explain: ctx.request.body.explain,
    repository
  });
  const importedCount = await importer.run({
    context: ctx
  });
  ctx.bodyMeta = { successCount: importedCount };
  ctx.body = ctx.bodyMeta;
}
async function importXlsx(ctx, next) {
  if (mutex.isLocked()) {
    throw new Error(
      ctx.t(`another import action is running, please try again later.`, {
        ns: "action-import"
      })
    );
  }
  const release = await mutex.acquire();
  try {
    await importXlsxAction(ctx, next);
  } finally {
    release();
  }
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  importXlsx
});
