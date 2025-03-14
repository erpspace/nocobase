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
var create_exports = {};
__export(create_exports, {
  default: () => create_default
});
module.exports = __toCommonJS(create_exports);
async function create_default(instance, { dataSource = "main", collection }, processor) {
  const repo = this.workflow.app.dataSourceManager.dataSources.get(dataSource).collectionManager.getRepository(collection);
  if (!repo) {
    throw new Error(`collection ${collection} for create data on manual node not found`);
  }
  const { _, ...form } = instance.result;
  const [values] = Object.values(form);
  await repo.create({
    values: {
      ...values ?? {},
      createdBy: instance.userId,
      updatedBy: instance.userId
    },
    context: {
      executionId: processor.execution.id
    },
    transaction: processor.transaction
  });
}
