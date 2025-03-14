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
var after_create_exports = {};
__export(after_create_exports, {
  afterCreate: () => afterCreate
});
module.exports = __toCommonJS(after_create_exports);
var import_constants = require("../constants");
async function afterCreate(model, options) {
  var _a, _b, _c;
  if (options.logging === false) {
    return;
  }
  const { collection } = model.constructor;
  if (!collection || !collection.options.logging) {
    return;
  }
  const transaction = options.transaction;
  const AuditLog = model.constructor.database.getCollection("auditLogs");
  const currentUserId = (_c = (_b = (_a = options == null ? void 0 : options.context) == null ? void 0 : _a.state) == null ? void 0 : _b.currentUser) == null ? void 0 : _c.id;
  try {
    const changes = [];
    const changed = model.changed();
    if (changed) {
      changed.forEach((key) => {
        const field = collection.findField((field2) => {
          return field2.name === key || field2.options.field === key;
        });
        if (field && !field.options.hidden) {
          changes.push({
            field: field.options,
            after: model.get(key)
          });
        }
      });
    }
    await AuditLog.repository.create({
      values: {
        type: import_constants.LOG_TYPE_CREATE,
        collectionName: model.constructor.name,
        recordId: model.get(model.constructor.primaryKeyAttribute),
        createdAt: model.get("createdAt"),
        userId: currentUserId,
        changes
      },
      transaction,
      hooks: false
    });
  } catch (error) {
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterCreate
});
