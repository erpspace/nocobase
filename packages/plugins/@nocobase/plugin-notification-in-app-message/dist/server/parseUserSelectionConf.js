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
var parseUserSelectionConf_exports = {};
__export(parseUserSelectionConf_exports, {
  parseUserSelectionConf: () => parseUserSelectionConf
});
module.exports = __toCommonJS(parseUserSelectionConf_exports);
var import_utils = require("@nocobase/utils");
async function parseUserSelectionConf(userSelectionConfig, UserRepo) {
  const SelectionConfigs = userSelectionConfig.flat().filter(Boolean);
  const users = /* @__PURE__ */ new Set();
  for (const item of SelectionConfigs) {
    if (typeof item === "object") {
      if (!(0, import_utils.isValidFilter)(item.filter)) {
        continue;
      }
      const result = await UserRepo.find({
        ...item,
        fields: ["id"]
      });
      result.forEach((item2) => users.add(item2.id));
    } else {
      users.add(item);
    }
  }
  return [...users];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseUserSelectionConf
});
