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
var afterCreateForReverseField_exports = {};
__export(afterCreateForReverseField_exports, {
  afterCreateForReverseField: () => afterCreateForReverseField
});
module.exports = __toCommonJS(afterCreateForReverseField_exports);
function afterCreateForReverseField(db) {
  return async (model, { transaction }) => {
    const Field = db.getCollection("fields");
    const reverseKey = model.get("reverseKey");
    if (!reverseKey) {
      return;
    }
    const reverse = await Field.model.findByPk(reverseKey, { transaction });
    await reverse.update({ reverseKey: model.get("key") }, { hooks: false, transaction });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterCreateForReverseField
});
