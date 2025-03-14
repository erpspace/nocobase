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
var formula_field_exports = {};
__export(formula_field_exports, {
  FormulaField: () => FormulaField
});
module.exports = __toCommonJS(formula_field_exports);
var import_database = require("@nocobase/database");
var import_evaluators = require("@nocobase/evaluators");
var import_utils = require("../utils");
const DataTypeMap = {
  boolean: import_database.DataTypes.BOOLEAN,
  integer: import_database.DataTypes.INTEGER,
  bigInt: import_database.DataTypes.BIGINT,
  double: import_database.DataTypes.DOUBLE,
  decimal: import_database.DataTypes.DECIMAL,
  string: import_database.DataTypes.STRING,
  date: import_database.DataTypes.DATE(3)
};
class FormulaField extends import_database.Field {
  get dataType() {
    const { dataType } = this.options;
    return DataTypeMap[dataType] ?? import_database.DataTypes.DOUBLE;
  }
  calculate(scope) {
    const { expression, engine = "math.js", dataType = "double" } = this.options;
    const evaluate = import_evaluators.evaluators.get(engine);
    try {
      const result = evaluate(expression, scope);
      return (0, import_utils.toDbType)(result, dataType);
    } catch (e) {
      console.error(e);
    }
    return null;
  }
  initFieldData = async ({ transaction }) => {
    const { name } = this.options;
    const records = await this.collection.repository.find({
      order: [this.collection.model.primaryKeyAttribute],
      transaction
    });
    for (const record of records) {
      const scope = record.toJSON();
      const result = this.calculate(scope);
      if (result != null) {
        await record.update(
          {
            [name]: result
          },
          {
            transaction,
            silent: true,
            hooks: false
          }
        );
      }
    }
  };
  calculateField = async (instance) => {
    const { name } = this.options;
    const result = this.calculate(instance.toJSON());
    instance.set(name, result);
  };
  updateFieldData = async (instance, { transaction }) => {
    if (this.collection.name !== instance.collectionName || instance.name !== this.options.name) {
      return;
    }
    this.options = Object.assign(this.options, instance.options);
    const { name } = this.options;
    const records = await this.collection.repository.find({
      order: [this.collection.model.primaryKeyAttribute],
      transaction
    });
    for (const record of records) {
      const scope = record.toJSON();
      const result = this.calculate(scope);
      await record.update(
        {
          [name]: result
        },
        {
          transaction,
          silent: true,
          hooks: false
        }
      );
    }
  };
  bind() {
    super.bind();
    this.database.on("fields.afterUpdate", this.updateFieldData);
    this.on("beforeSave", this.calculateField);
  }
  unbind() {
    super.unbind();
    this.off("beforeSave", this.calculateField);
    this.database.off("fields.afterUpdate", this.updateFieldData);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormulaField
});
