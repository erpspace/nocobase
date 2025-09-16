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
var polygon_exports = {};
__export(polygon_exports, {
  PolygonField: () => PolygonField
});
module.exports = __toCommonJS(polygon_exports);
var import_database = require("@nocobase/database");
var import_helpers = require("../helpers");
class Polygon extends import_database.DataTypes.ABSTRACT {
  key = "Polygon";
}
class PolygonField extends import_database.Field {
  constructor(options, context) {
    const { name } = options;
    super(
      {
        get() {
          const value = this.getDataValue(name);
          if ((0, import_helpers.isPg)(context)) {
            return (0, import_helpers.toValue)(value);
          } else if ((0, import_helpers.isMysql)(context)) {
            return (value == null ? void 0 : value.coordinates[0].slice(0, -1)) || null;
          } else {
            return value;
          }
        },
        set(value) {
          if (!(value == null ? void 0 : value.length)) value = null;
          else if ((0, import_helpers.isPg)(context)) {
            value = (0, import_helpers.joinComma)(value.map((item) => (0, import_helpers.joinComma)(item)));
          } else if ((0, import_helpers.isMysql)(context)) {
            value = {
              type: "Polygon",
              coordinates: [value.concat([value[0]])]
            };
          }
          this.setDataValue(name, value);
        },
        ...options
      },
      context
    );
  }
  get dataType() {
    if ((0, import_helpers.isPg)(this.context)) {
      return Polygon;
    } else if ((0, import_helpers.isMysql)(this.context)) {
      return import_database.DataTypes.GEOMETRY("POLYGON");
    } else {
      return import_database.DataTypes.JSON;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PolygonField
});
