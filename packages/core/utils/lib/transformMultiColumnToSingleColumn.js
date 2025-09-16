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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var transformMultiColumnToSingleColumn_exports = {};
__export(transformMultiColumnToSingleColumn_exports, {
  transformMultiColumnToSingleColumn: () => transformMultiColumnToSingleColumn
});
module.exports = __toCommonJS(transformMultiColumnToSingleColumn_exports);
var import_json_schema = require("@formily/json-schema");
var import_lodash = __toESM(require("lodash"));
var import_uid = require("./uid");
var import_package = __toESM(require("../package.json"));
const transformMultiColumnToSingleColumn = /* @__PURE__ */ __name((schema, ignore) => {
  if (!schema) return schema;
  if (schema["x-component"] !== "Grid") {
    Object.keys(schema.properties || {}).forEach((key) => {
      schema.properties[key] = transformMultiColumnToSingleColumn(schema.properties[key], ignore);
    });
    return schema;
  }
  const parent = schema.parent;
  if (schema.toJSON) {
    schema = schema.toJSON();
  } else {
    schema = import_lodash.default.cloneDeep(schema);
  }
  const newProperties = {};
  const { properties = {} } = schema;
  let index = 0;
  Object.keys(properties).forEach((key, rowIndex) => {
    const row = properties[key];
    if (row["x-component"] !== "Grid.Row") {
      row["x-index"] = ++index;
      newProperties[key] = row;
      return;
    }
    if (!row.properties) {
      return;
    }
    if (Object.keys(row.properties).length === 1) {
      row["x-index"] = ++index;
      newProperties[key] = row;
      return;
    }
    Object.keys(row.properties).forEach((columnKey, colIndex) => {
      const column = row.properties[columnKey];
      import_lodash.default.set(column, "x-component-props.width", 100);
      if (colIndex === 0) {
        row["x-index"] = ++index;
        newProperties[key] = row;
        return;
      }
      if (ignore == null ? void 0 : ignore(column)) {
        return;
      }
      delete row.properties[columnKey];
      newProperties[`${(0, import_uid.uid)()}_${columnKey}`] = createRow(column, columnKey, ++index);
    });
  });
  schema.properties = newProperties;
  if (parent) {
    const result = new import_json_schema.Schema(schema, parent);
    if (parent.properties) {
      Object.keys(parent.properties).forEach((key) => {
        if (key === schema.name) {
          parent.properties[key] = result;
        }
      });
    }
    return result;
  }
  return schema;
}, "transformMultiColumnToSingleColumn");
function createRow(column, key, index) {
  return {
    type: "void",
    version: "2.0",
    "x-component": "Grid.Row",
    "x-app-version": import_package.default.version,
    "x-uid": (0, import_uid.uid)(),
    "x-async": false,
    "x-index": index,
    _isJSONSchemaObject: true,
    properties: {
      [key]: column
    }
  };
}
__name(createRow, "createRow");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  transformMultiColumnToSingleColumn
});
