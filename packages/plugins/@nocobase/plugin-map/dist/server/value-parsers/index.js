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
var value_parsers_exports = {};
__export(value_parsers_exports, {
  CircleValueParser: () => CircleValueParser,
  LineStringValueParser: () => LineStringValueParser,
  PointValueParser: () => PointValueParser,
  PolygonValueParser: () => PolygonValueParser
});
module.exports = __toCommonJS(value_parsers_exports);
var import_database = require("@nocobase/database");
class PointValueParser extends import_database.BaseValueParser {
  async setValue(value) {
    if (Array.isArray(value)) {
      this.value = value;
    } else if (typeof value === "string") {
      this.value = value.split(",");
    } else {
      this.errors.push("Value invalid");
    }
  }
}
class PolygonValueParser extends import_database.BaseValueParser {
  async setValue(value) {
    if (Array.isArray(value)) {
      this.value = value;
    } else if (typeof value === "string") {
      this.value = value.substring(1, value.length - 1).split("),(").map((v) => v.split(","));
    } else {
      this.errors.push("Value invalid");
    }
  }
}
class LineStringValueParser extends import_database.BaseValueParser {
  async setValue(value) {
    if (Array.isArray(value)) {
      this.value = value;
    } else if (typeof value === "string") {
      this.value = value.substring(1, value.length - 1).split("),(").map((v) => v.split(","));
    } else {
      this.errors.push("Value invalid");
    }
  }
}
class CircleValueParser extends import_database.BaseValueParser {
  async setValue(value) {
    if (Array.isArray(value)) {
      this.value = value;
    } else if (typeof value === "string") {
      this.value = value.split(",");
    } else {
      this.errors.push("Value invalid");
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CircleValueParser,
  LineStringValueParser,
  PointValueParser,
  PolygonValueParser
});
