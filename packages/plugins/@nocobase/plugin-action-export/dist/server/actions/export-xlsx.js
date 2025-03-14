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
var export_xlsx_exports = {};
__export(export_xlsx_exports, {
  exportXlsx: () => exportXlsx
});
module.exports = __toCommonJS(export_xlsx_exports);
var import_xlsx_exporter = require("../services/xlsx-exporter");
var import_xlsx = __toESM(require("xlsx"));
var import_async_mutex = require("async-mutex");
const mutex = new import_async_mutex.Mutex();
async function exportXlsxAction(ctx, next) {
  var _a, _b;
  const { title, filter, sort, fields, except } = ctx.action.params;
  let columns = ((_a = ctx.action.params.values) == null ? void 0 : _a.columns) || ((_b = ctx.action.params) == null ? void 0 : _b.columns);
  if (typeof columns === "string") {
    columns = JSON.parse(columns);
  }
  const repository = ctx.getCurrentRepository();
  const dataSource = ctx.dataSource;
  const collection = repository.collection;
  const xlsxExporter = new import_xlsx_exporter.XlsxExporter({
    collectionManager: dataSource.collectionManager,
    collection,
    repository,
    columns,
    findOptions: {
      filter,
      fields,
      except,
      sort
    }
  });
  const wb = await xlsxExporter.run(ctx);
  ctx.body = import_xlsx.default.write(wb, { type: "buffer", bookType: "xlsx" });
  ctx.set({
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename=${encodeURI(title)}.xlsx`
  });
}
async function exportXlsx(ctx, next) {
  if (ctx.exportHandled) {
    return await next();
  }
  if (mutex.isLocked()) {
    throw new Error(
      ctx.t(`another export action is running, please try again later.`, {
        ns: "action-export"
      })
    );
  }
  const release = await mutex.acquire();
  try {
    await exportXlsxAction(ctx, next);
  } finally {
    release();
  }
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exportXlsx
});
