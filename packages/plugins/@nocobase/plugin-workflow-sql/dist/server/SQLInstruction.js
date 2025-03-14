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
var SQLInstruction_exports = {};
__export(SQLInstruction_exports, {
  default: () => SQLInstruction_default
});
module.exports = __toCommonJS(SQLInstruction_exports);
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_plugin_workflow = require("@nocobase/plugin-workflow");
class SQLInstruction_default extends import_plugin_workflow.Instruction {
  async run(node, input, processor) {
    const dataSourceName = node.config.dataSource || "main";
    const { collectionManager } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
    if (!(collectionManager instanceof import_data_source_manager.SequelizeCollectionManager)) {
      throw new Error(`type of data source "${node.config.dataSource}" is not database`);
    }
    const sql = processor.getParsedValue(node.config.sql || "", node.id).trim();
    if (!sql) {
      return {
        status: import_plugin_workflow.JOB_STATUS.RESOLVED
      };
    }
    const [result = null, meta = null] = await collectionManager.db.sequelize.query(sql, {
      transaction: this.workflow.useDataSourceTransaction(dataSourceName, processor.transaction)
      // plain: true,
      // model: db.getCollection(node.config.collection).model
    }) ?? [];
    return {
      result: node.config.withMeta ? [result, meta] : result,
      status: import_plugin_workflow.JOB_STATUS.RESOLVED
    };
  }
  async test({ dataSource, sql, withMeta } = {}) {
    if (!sql) {
      return {
        result: null,
        status: import_plugin_workflow.JOB_STATUS.RESOLVED
      };
    }
    const dataSourceName = dataSource || "main";
    const { collectionManager } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
    if (!(collectionManager instanceof import_data_source_manager.SequelizeCollectionManager)) {
      throw new Error(`type of data source "${dataSource}" is not database`);
    }
    try {
      const [result = null, meta = null] = await collectionManager.db.sequelize.query(sql) ?? [];
      return {
        result: withMeta ? [result, meta] : result,
        status: import_plugin_workflow.JOB_STATUS.RESOLVED
      };
    } catch (error) {
      return {
        result: error.message,
        status: import_plugin_workflow.JOB_STATUS.ERROR
      };
    }
  }
}
