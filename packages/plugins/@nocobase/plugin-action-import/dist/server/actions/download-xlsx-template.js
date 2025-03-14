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
var download_xlsx_template_exports = {};
__export(download_xlsx_template_exports, {
  downloadXlsxTemplate: () => downloadXlsxTemplate
});
module.exports = __toCommonJS(download_xlsx_template_exports);
var import_template_creator = require("../services/template-creator");
async function downloadXlsxTemplate(ctx, next) {
  const { resourceName, values = {} } = ctx.action.params;
  const { collection } = ctx.db;
  const templateCreator = new import_template_creator.TemplateCreator({
    collection,
    ...values
  });
  const workbook = await templateCreator.run();
  const buffer = await workbook.xlsx.writeBuffer();
  ctx.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  ctx.set("Content-Disposition", `attachment; filename="${resourceName}-import-template.xlsx"`);
  ctx.body = buffer;
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  downloadXlsxTemplate
});
