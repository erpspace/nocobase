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
var transform_exports = {};
__export(transform_exports, {
  _: () => _,
  boolean: () => boolean,
  checkbox: () => checkbox,
  checkboxGroup: () => checkboxGroup,
  checkboxes: () => checkboxes,
  chinaRegion: () => chinaRegion,
  datetime: () => datetime,
  email: () => email,
  m2m: () => m2m,
  m2o: () => m2o,
  multipleSelect: () => multipleSelect,
  o2m: () => o2m,
  o2o: () => o2o,
  obo: () => obo,
  oho: () => oho,
  password: () => password,
  percent: () => percent,
  radio: () => radio,
  radioGroup: () => radioGroup,
  select: () => select,
  time: () => time
});
module.exports = __toCommonJS(transform_exports);
var import_utils = require("@nocobase/utils");
var math = __toESM(require("mathjs"));
var import__ = require("../../");
async function _({ value, field }) {
  return value;
}
async function email({ value, field, ctx }) {
  if (!(value == null ? void 0 : value.trim())) {
    return value;
  }
  const emailReg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
  if (!emailReg.test(value)) {
    throw new Error(ctx.t("Incorrect email format", { ns: import__.namespace }));
  }
  return value;
}
async function password({ value, field, ctx }) {
  if (value === void 0 || value === null) {
    throw new Error(ctx.t("password is empty", { ns: import__.namespace }));
  }
  return `${value}`;
}
async function o2o({ value, column, field, ctx }) {
  const { dataIndex, enum: enumData } = column;
  const repository = ctx.db.getRepository(field.options.target);
  let enumItem = null;
  if ((enumData == null ? void 0 : enumData.length) > 0) {
    enumItem = enumData.find((e) => e.label === value);
  }
  const val = await repository.findOne({ filter: { [dataIndex[1]]: (enumItem == null ? void 0 : enumItem.value) ?? value } });
  return val;
}
const oho = o2o;
const obo = o2o;
async function o2m({ value, column, field, ctx }) {
  let results = [];
  const values = value.split(";").map((val) => val.trim());
  const { dataIndex, enum: enumData } = column;
  const repository = ctx.db.getRepository(field.options.target);
  if ((enumData == null ? void 0 : enumData.length) > 0) {
    const enumValues = values.map((val) => {
      const v = enumData.find((e) => e.label === val);
      if (v === void 0) {
        throw new Error(`not found enum value ${val}`);
      }
      return v.value;
    });
    results = await repository.find({ filter: { [dataIndex[1]]: enumValues } });
  } else {
    results = await repository.find({ filter: { [dataIndex[1]]: values } });
  }
  return results;
}
async function m2o({ value, column, field, ctx }) {
  var _a;
  let results = null;
  const { dataIndex, enum: enumData } = column;
  const repository = ctx.db.getRepository(field.options.target);
  if ((enumData == null ? void 0 : enumData.length) > 0) {
    const enumValue = (_a = enumData.find((e) => e.label === (value == null ? void 0 : value.trim()))) == null ? void 0 : _a.value;
    results = await repository.findOne({ filter: { [dataIndex[1]]: enumValue } });
  } else {
    results = await repository.findOne({ filter: { [dataIndex[1]]: value } });
  }
  return results;
}
async function m2m({ value, column, field, ctx }) {
  let results = [];
  const values = value.split(";").map((val) => val.trim());
  const { dataIndex, enum: enumData } = column;
  const repository = ctx.db.getRepository(field.options.target);
  if ((enumData == null ? void 0 : enumData.length) > 0) {
    const enumValues = values.map((val) => {
      const v = enumData.find((e) => e.label === val);
      if (v === void 0) {
        throw new Error(`not found enum value ${val}`);
      }
      return v.value;
    });
    results = await repository.find({ filter: { [dataIndex[1]]: enumValues } });
  } else {
    results = await repository.find({ filter: { [dataIndex[1]]: values } });
  }
  return results;
}
async function datetime({ value, field, ctx }) {
  var _a, _b;
  if (!value) {
    return "";
  }
  const utcOffset = ctx.get("X-Timezone");
  const props = ((_b = (_a = field.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) ?? {};
  const m = (0, import_utils.str2moment)(value, { ...props, utcOffset });
  if (!m.isValid()) {
    throw new Error(ctx.t("Incorrect date format", { ns: import__.namespace }));
  }
  return m.toDate();
}
async function time({ value, field, ctx }) {
  var _a, _b;
  const { format } = ((_b = (_a = field.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) ?? {};
  if (format) {
    const m = (0, import_utils.dayjs)(value, format);
    if (!m.isValid()) {
      throw new Error(ctx.t("Incorrect time format", { ns: import__.namespace }));
    }
    return m.format(format);
  }
  return value;
}
async function percent({ value, field, ctx }) {
  var _a;
  if (value) {
    const numberValue = Number(((_a = value == null ? void 0 : value.split("%")) == null ? void 0 : _a[0]) ?? value);
    if (isNaN(numberValue)) {
      throw new Error(ctx.t("Illegal percentage format", { ns: import__.namespace }));
    }
    return math.round(numberValue / 100, 9);
  }
  return 0;
}
async function checkbox({ value, column, field, ctx }) {
  return value === ctx.t("Yes", { ns: import__.namespace }) ? 1 : 0;
}
const boolean = checkbox;
async function select({ value, column, field, ctx }) {
  const { enum: enumData } = column;
  const item = enumData.find((item2) => item2.label === value);
  return item == null ? void 0 : item.value;
}
const radio = select;
const radioGroup = select;
async function multipleSelect({ value, column, field, ctx }) {
  const values = value == null ? void 0 : value.split(";");
  const { enum: enumData } = column;
  const results = values == null ? void 0 : values.map((val) => {
    const item = enumData.find((item2) => item2.label === val);
    return item;
  });
  return results == null ? void 0 : results.map((result) => result == null ? void 0 : result.value);
}
const checkboxes = multipleSelect;
const checkboxGroup = multipleSelect;
async function chinaRegion({ value, column, field, ctx }) {
  var _a;
  const values = (_a = value == null ? void 0 : value.split("/")) == null ? void 0 : _a.map((val) => val.trim());
  const repository = ctx.db.getRepository("chinaRegions");
  const results = await repository.find({ filter: { name: values } });
  return results;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _,
  boolean,
  checkbox,
  checkboxGroup,
  checkboxes,
  chinaRegion,
  datetime,
  email,
  m2m,
  m2o,
  multipleSelect,
  o2m,
  o2o,
  obo,
  oho,
  password,
  percent,
  radio,
  radioGroup,
  select,
  time
});
