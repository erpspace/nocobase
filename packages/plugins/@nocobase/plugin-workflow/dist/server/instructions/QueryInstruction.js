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
var QueryInstruction_exports = {};
__export(QueryInstruction_exports, {
  QueryInstruction: () => QueryInstruction,
  default: () => QueryInstruction_default
});
module.exports = __toCommonJS(QueryInstruction_exports);
var import_actions = require("@nocobase/actions");
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_constants = require("../constants");
var import_utils = require("../utils");
var import__ = require(".");
class QueryInstruction extends import__.Instruction {
  async run(node, input, processor) {
    const { collection, multiple, params = {}, failOnEmpty = false } = node.config;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const { repository } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName).collectionManager.getCollection(collectionName);
    const {
      page = import_actions.DEFAULT_PAGE,
      pageSize = import_actions.DEFAULT_PER_PAGE,
      sort = [],
      ...options
    } = processor.getParsedValue(params, node.id);
    const appends = options.appends ? Array.from(
      options.appends.reduce((set, field) => {
        set.add(field.split(".")[0]);
        set.add(field);
        return set;
      }, /* @__PURE__ */ new Set())
    ) : options.appends;
    const result = await (multiple ? repository.find : repository.findOne).call(repository, {
      ...options,
      ...import_actions.utils.pageArgsToLimitArgs(page, pageSize),
      sort: sort.filter((item) => item.field).map((item) => {
        var _a;
        return `${((_a = item.direction) == null ? void 0 : _a.toLowerCase()) === "desc" ? "-" : ""}${item.field}`;
      }),
      appends,
      transaction: this.workflow.useDataSourceTransaction(dataSourceName, processor.transaction)
    });
    if (failOnEmpty && (multiple ? !result.length : !result)) {
      return {
        result,
        status: import_constants.JOB_STATUS.FAILED
      };
    }
    return {
      result: (0, import_utils.toJSON)(result),
      status: import_constants.JOB_STATUS.RESOLVED
    };
  }
}
var QueryInstruction_default = QueryInstruction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QueryInstruction
});
