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
var AggregateInstruction_exports = {};
__export(AggregateInstruction_exports, {
  default: () => AggregateInstruction_default
});
module.exports = __toCommonJS(AggregateInstruction_exports);
var import_mathjs = require("mathjs");
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_database = require("@nocobase/database");
var import_plugin_workflow = require("@nocobase/plugin-workflow");
const aggregators = {
  count: "count",
  sum: "sum",
  avg: "avg",
  min: "min",
  max: "max"
};
class AggregateInstruction_default extends import_plugin_workflow.Instruction {
  async run(node, input, processor) {
    const { aggregator, associated, collection, association = {}, params = {} } = node.config;
    const options = processor.getParsedValue(params, node.id);
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const { collectionManager } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
    if (!collectionManager.db) {
      throw new Error("aggregate instruction can only work with data source of type database");
    }
    const repo = associated ? collectionManager.getRepository(
      `${association == null ? void 0 : association.associatedCollection}.${association.name}`,
      processor.getParsedValue(association == null ? void 0 : association.associatedKey, node.id)
    ) : collectionManager.getRepository(collectionName);
    if (!options.dataType && aggregator === "avg") {
      options.dataType = import_database.DataTypes.DOUBLE;
    }
    const result = await repo.aggregate({
      ...options,
      method: aggregators[aggregator],
      transaction: this.workflow.useDataSourceTransaction(dataSourceName, processor.transaction)
    });
    return {
      result: (0, import_mathjs.round)(options.dataType === import_database.DataTypes.DOUBLE ? Number(result) : result, 14),
      status: import_plugin_workflow.JOB_STATUS.RESOLVED
    };
  }
}
