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
var china_region_interface_exports = {};
__export(china_region_interface_exports, {
  ChinaRegionInterface: () => ChinaRegionInterface
});
module.exports = __toCommonJS(china_region_interface_exports);
var import_database = require("@nocobase/database");
class ChinaRegionInterface extends import_database.BaseInterface {
  async toValue(str, ctx) {
    if (!str) {
      return null;
    }
    const { field } = ctx;
    const items = str.split("/");
    const repository = field.database.getRepository(field.target);
    const instances = await repository.find({
      filter: {
        name: items
      }
    });
    for (let i = 0; i < items.length; i++) {
      const instance = instances.find((item) => item.name === items[i]);
      if (!instance) {
        throw new Error(`china region "${items[i]}" does not exist`);
      }
      items[i] = instance.get("code");
    }
    return items;
  }
  toString(value, ctx) {
    const values = (Array.isArray(value) ? value : [value]).sort(
      (a, b) => a.level !== b.level ? a.level - b.level : a.sort - b.sort
    );
    return values.map((item) => item.name).join("/");
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ChinaRegionInterface
});
