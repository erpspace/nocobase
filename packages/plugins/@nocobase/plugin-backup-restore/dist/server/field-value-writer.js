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
var field_value_writer_exports = {};
__export(field_value_writer_exports, {
  FieldValueWriter: () => FieldValueWriter
});
module.exports = __toCommonJS(field_value_writer_exports);
var import_database = require("@nocobase/database");
var import_lodash = __toESM(require("lodash"));
var import_moment = __toESM(require("moment/moment"));
const getMapFieldWriter = (field) => {
  return (val) => {
    const mockObj = {
      setDataValue: (name, newVal) => {
        val = newVal;
      }
    };
    field.options.set.call(mockObj, val);
    return val;
  };
};
class FieldValueWriter {
  static writers = /* @__PURE__ */ new Map();
  static write(field, val, database) {
    if (val === null) return val;
    if (field.type == "point" || field.type == "lineString" || field.type == "circle" || field.type === "polygon") {
      return getMapFieldWriter(field)(import_lodash.default.isString(val) ? JSON.parse(val) : val);
    }
    const fieldType = field.typeToString();
    const writer = FieldValueWriter.writers[fieldType];
    if (writer) {
      val = writer(val, database);
    }
    return val;
  }
  static toDumpedValue(field, val) {
    if (val === null) return val;
    if (field.type == "point" || field.type == "lineString" || field.type == "circle" || field.type === "polygon") {
      const mockObj = {
        getDataValue: () => val
      };
      const newValue = field.options.get.call(mockObj);
      return newValue;
    }
    return val;
  }
  static registerWriter(types, writer) {
    for (const type of import_lodash.default.castArray(types)) {
      FieldValueWriter.writers[type] = writer;
    }
  }
}
function isJSONObjectOrArrayString(str) {
  try {
    const parsed = JSON.parse(str);
    return typeof parsed === "object" && parsed !== null;
  } catch (e) {
    return false;
  }
}
FieldValueWriter.registerWriter([import_database.DataTypes.JSON.toString(), import_database.DataTypes.JSONB.toString()], (val) => {
  try {
    return isJSONObjectOrArrayString(val) ? JSON.parse(val) : val;
  } catch (err) {
    if (err instanceof SyntaxError && err.message.includes("Unexpected")) {
      return val;
    }
    throw err;
  }
});
FieldValueWriter.registerWriter("DatetimeNoTzTypeMySQL", (val, database) => {
  const timezone = database.options.rawTimezone || "+00:00";
  if (typeof val === "string" && isIso8601(val)) {
    const momentVal = (0, import_moment.default)(val).utcOffset(timezone);
    val = momentVal.format("YYYY-MM-DD HH:mm:ss");
  }
  return val;
});
FieldValueWriter.registerWriter(import_database.DataTypes.BOOLEAN.toString(), (val) => Boolean(val));
function isIso8601(str) {
  const iso8601StrictRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return iso8601StrictRegex.test(str);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FieldValueWriter
});
