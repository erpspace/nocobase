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
var to_one_interface_exports = {};
__export(to_one_interface_exports, {
  ToOneInterface: () => ToOneInterface
});
module.exports = __toCommonJS(to_one_interface_exports);
var import_base_interface = require("./base-interface");
const _ToOneInterface = class _ToOneInterface extends import_base_interface.BaseInterface {
  toString(value, ctx) {
    return value;
  }
  async toValue(str, ctx) {
    if (!str) {
      return null;
    }
    const { filterKey, associationField, targetCollection, transaction } = ctx;
    const targetInstance = await targetCollection.repository.findOne({
      filter: {
        [filterKey]: str
      },
      transaction
    });
    if (!targetInstance) {
      throw new Error(`"${str}" not found in ${targetCollection.model.name} ${filterKey}`);
    }
    const targetKey = associationField.targetKey || targetCollection.model.primaryKeyAttribute;
    return targetInstance[targetKey];
  }
};
__name(_ToOneInterface, "ToOneInterface");
let ToOneInterface = _ToOneInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToOneInterface
});
