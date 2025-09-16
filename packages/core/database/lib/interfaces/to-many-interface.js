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
var to_many_interface_exports = {};
__export(to_many_interface_exports, {
  ToManyInterface: () => ToManyInterface
});
module.exports = __toCommonJS(to_many_interface_exports);
var import_base_interface = require("./base-interface");
const _ToManyInterface = class _ToManyInterface extends import_base_interface.BaseInterface {
  async toValue(str, ctx) {
    if (!str) {
      return null;
    }
    str = `${str}`.trim();
    const items = str.split(",");
    const { filterKey, targetCollection, transaction, field } = ctx;
    const targetInstances = await targetCollection.repository.find({
      filter: {
        [filterKey]: items
      },
      transaction
    });
    items.forEach((item) => {
      if (!targetInstances.find((targetInstance) => targetInstance[filterKey] == item)) {
        throw new Error(`"${item}" not found in ${targetCollection.model.name} ${filterKey}`);
      }
    });
    const primaryKeyAttribute = targetCollection.model.primaryKeyAttribute;
    const targetKey = field.options.targetKey;
    const values = targetInstances.map((targetInstance) => {
      const result = {
        [targetKey]: targetInstance[targetKey]
      };
      if (targetKey !== primaryKeyAttribute) {
        result[primaryKeyAttribute] = targetInstance[primaryKeyAttribute];
      }
      return result;
    });
    return values;
  }
};
__name(_ToManyInterface, "ToManyInterface");
let ToManyInterface = _ToManyInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToManyInterface
});
