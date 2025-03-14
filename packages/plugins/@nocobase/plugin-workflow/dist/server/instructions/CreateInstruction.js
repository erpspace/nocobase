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
var CreateInstruction_exports = {};
__export(CreateInstruction_exports, {
  CreateInstruction: () => CreateInstruction,
  default: () => CreateInstruction_default
});
module.exports = __toCommonJS(CreateInstruction_exports);
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_constants = require("../constants");
var import_utils = require("../utils");
var import__ = require(".");
class CreateInstruction extends import__.Instruction {
  async run(node, input, processor) {
    const { collection, params: { appends = [], ...params } = {} } = node.config;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const { repository, filterTargetKey } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName).collectionManager.getCollection(collectionName);
    const options = processor.getParsedValue(params, node.id);
    const transaction = this.workflow.useDataSourceTransaction(dataSourceName, processor.transaction);
    const created = await repository.create({
      ...options,
      context: {
        stack: Array.from(new Set((processor.execution.stack ?? []).concat(processor.execution.id)))
      },
      transaction
    });
    let result = created;
    if (created && appends.length) {
      const includeFields = appends.reduce((set, field) => {
        set.add(field.split(".")[0]);
        set.add(field);
        return set;
      }, /* @__PURE__ */ new Set());
      result = await repository.findOne({
        filterByTk: created[filterTargetKey],
        appends: Array.from(includeFields),
        transaction
      });
    }
    return {
      // NOTE: get() for non-proxied instance (#380)
      result: (0, import_utils.toJSON)(result),
      status: import_constants.JOB_STATUS.RESOLVED
    };
  }
}
var CreateInstruction_default = CreateInstruction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateInstruction
});
