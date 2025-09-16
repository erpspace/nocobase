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
var interfaces_exports = {};
__export(interfaces_exports, {
  CircleInterface: () => CircleInterface,
  LineStringInterface: () => LineStringInterface,
  PointInterface: () => PointInterface,
  PolygonInterface: () => PolygonInterface
});
module.exports = __toCommonJS(interfaces_exports);
var import_database = require("@nocobase/database");
class PointInterface extends import_database.BaseInterface {
  async toValue(str, ctx) {
    if (!str) return null;
    return str.split(",").map((v) => parseFloat(v));
  }
  toString(value, ctx) {
    if (!value) return null;
    return value.join(",");
  }
}
class PolygonInterface extends import_database.BaseInterface {
  async toValue(str, ctx) {
    if (!str) return null;
    return str.substring(1, str.length - 1).split("),(").map((v) => v.split(",").map((v2) => parseFloat(v2)));
  }
  toString(value, ctx) {
    if (!value) return null;
    return `(${value.map((v) => v.join(",")).join("),(")})`;
  }
}
class LineStringInterface extends PolygonInterface {
}
class CircleInterface extends import_database.BaseInterface {
  async toValue(str, ctx) {
    if (!str) return null;
    return str.split(",").map((v) => parseFloat(v));
  }
  toString(value, ctx) {
    if (!value) return null;
    return value.join(",");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CircleInterface,
  LineStringInterface,
  PointInterface,
  PolygonInterface
});
