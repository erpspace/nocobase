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
var circle_exports = {};
__export(circle_exports, {
  CircleField: () => CircleField
});
module.exports = __toCommonJS(circle_exports);
var import_database = require("@nocobase/database");
var import_helpers = require("../helpers");
class Circle extends import_database.DataTypes.ABSTRACT {
  key = "Circle";
}
class CircleField extends import_database.Field {
  constructor(options, context) {
    const { name } = options;
    super(
      {
        get() {
          const value = this.getDataValue(name);
          if ((0, import_helpers.isPg)(context)) {
            if (typeof value === "string") {
              return (0, import_helpers.toValue)(`(${value})`);
            }
            return value ? [value.x, value.y, value.radius] : null;
          } else {
            return value;
          }
        },
        set(value) {
          if (!(value == null ? void 0 : value.length)) value = null;
          else if ((0, import_helpers.isPg)(context)) {
            value = value.join(",");
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
      return Circle;
    } else {
      return import_database.DataTypes.JSON;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CircleField
});
