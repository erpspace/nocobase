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
var DestroyInstruction_exports = {};
__export(DestroyInstruction_exports, {
  DestroyInstruction: () => DestroyInstruction,
  default: () => DestroyInstruction_default
});
module.exports = __toCommonJS(DestroyInstruction_exports);
var import_data_source_manager = require("@nocobase/data-source-manager");
var import__ = require(".");
var import_constants = require("../constants");
class DestroyInstruction extends import__.Instruction {
  async run(node, input, processor) {
    const { collection, params = {} } = node.config;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const { repository } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName).collectionManager.getCollection(collectionName);
    const options = processor.getParsedValue(params, node.id);
    const result = await repository.destroy({
      ...options,
      context: {
        stack: Array.from(new Set((processor.execution.stack ?? []).concat(processor.execution.id)))
      },
      transaction: this.workflow.useDataSourceTransaction(dataSourceName, processor.transaction)
    });
    return {
      result,
      status: import_constants.JOB_STATUS.RESOLVED
    };
  }
}
var DestroyInstruction_default = DestroyInstruction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DestroyInstruction
});
