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
var chinaRegion_exports = {};
__export(chinaRegion_exports, {
  chinaRegion: () => chinaRegion
});
module.exports = __toCommonJS(chinaRegion_exports);
var import_utils = require("@nocobase/utils");
const chinaRegion = {
  options: (options) => {
    var _a, _b, _c, _d;
    return {
      type: "belongsToMany",
      target: "chinaRegions",
      targetKey: "code",
      sortBy: "level",
      through: options.through || `t_${(0, import_utils.uid)()}`,
      foreignKey: options.foreignKey || `f_${(0, import_utils.uid)()}`,
      otherKey: options.otherKey || `f_${(0, import_utils.uid)()}`,
      sourceKey: options.sourceKey || "id",
      // name,
      uiSchema: {
        type: "array",
        // title,
        "x-component": "Cascader",
        "x-component-props": {
          useDataSource: "{{ useChinaRegionDataSource }}",
          useLoadData: "{{ useChinaRegionLoadData }}",
          changeOnSelectLast: ((_b = (_a = options == null ? void 0 : options.uiSchema) == null ? void 0 : _a["x-component-props"]) == null ? void 0 : _b.changeOnSelectLast) || false,
          labelInValue: true,
          maxLevel: ((_d = (_c = options == null ? void 0 : options.uiSchema) == null ? void 0 : _c["x-component-props"]) == null ? void 0 : _d.maxLevel) || 3,
          fieldNames: {
            label: "name",
            value: "code",
            children: "children"
          }
        }
      }
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  chinaRegion
});
