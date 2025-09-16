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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var number_field_exports = {};
__export(number_field_exports, {
  BigIntField: () => BigIntField,
  DecimalField: () => DecimalField,
  DoubleField: () => DoubleField,
  FloatField: () => FloatField,
  IntegerField: () => IntegerField,
  NumberField: () => NumberField,
  RealField: () => RealField
});
module.exports = __toCommonJS(number_field_exports);
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _NumberField = class _NumberField extends import_field.Field {
};
__name(_NumberField, "NumberField");
let NumberField = _NumberField;
const _IntegerField = class _IntegerField extends NumberField {
  get dataType() {
    return import_sequelize.DataTypes.INTEGER;
  }
};
__name(_IntegerField, "IntegerField");
let IntegerField = _IntegerField;
const _BigIntField = class _BigIntField extends NumberField {
  get dataType() {
    return import_sequelize.DataTypes.BIGINT;
  }
};
__name(_BigIntField, "BigIntField");
let BigIntField = _BigIntField;
const _FloatField = class _FloatField extends NumberField {
  get dataType() {
    return import_sequelize.DataTypes.FLOAT;
  }
};
__name(_FloatField, "FloatField");
let FloatField = _FloatField;
const _DoubleField = class _DoubleField extends NumberField {
  get dataType() {
    return import_sequelize.DataTypes.DOUBLE;
  }
};
__name(_DoubleField, "DoubleField");
let DoubleField = _DoubleField;
const _RealField = class _RealField extends NumberField {
  get dataType() {
    return import_sequelize.DataTypes.REAL;
  }
};
__name(_RealField, "RealField");
let RealField = _RealField;
const _DecimalField = class _DecimalField extends NumberField {
  get dataType() {
    return import_sequelize.DataTypes.DECIMAL(this.options.precision, this.options.scale);
  }
  static optionsFromRawType(rawType) {
    const matches = rawType.match(/DECIMAL\((\d+),\s*(\d+)\)/);
    if (matches) {
      return {
        precision: parseInt(matches[1]),
        scale: parseInt(matches[2])
      };
    }
  }
};
__name(_DecimalField, "DecimalField");
let DecimalField = _DecimalField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BigIntField,
  DecimalField,
  DoubleField,
  FloatField,
  IntegerField,
  NumberField,
  RealField
});
