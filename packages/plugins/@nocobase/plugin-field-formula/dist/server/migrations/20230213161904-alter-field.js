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
var alter_field_exports = {};
__export(alter_field_exports, {
  default: () => alter_field_default
});
module.exports = __toCommonJS(alter_field_exports);
var import_server = require("@nocobase/server");
class alter_field_default extends import_server.Migration {
  appVersion = "<=0.9.0-alpha.3";
  async up() {
    const result = await this.app.version.satisfies("<=0.9.0-alpha.3");
    if (!result) {
      return;
    }
    const { db } = this.context;
    await db.sequelize.transaction(async (transaction) => {
      const Field = db.getRepository("fields");
      const fields = await Field.find({ transaction });
      for (const field of fields) {
        if (["mathFormula", "excelFormula"].includes(field.get("type"))) {
          const { options } = field;
          field.set({
            type: "formula",
            interface: "formula",
            options: {
              ...options,
              engine: field.get("type") === "mathFormula" ? "math.js" : "formula.js",
              dataType: options.dataType === "number" ? "double" : "string"
            }
          });
          await field.save({ transaction });
          const schema = await field.getUiSchema({ transaction });
          schema.set("x-component", "Formula.Result");
          await schema.save({ transaction });
        }
      }
      const repository = db.getRepository("applicationPlugins");
      await repository.destroy({
        filter: {
          name: ["math-formula-field", "excel-formula-field"]
        },
        transaction
      });
    });
  }
}
