/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CollectionTrigger_exports = {};
__export(CollectionTrigger_exports, {
  default: () => CollectionTrigger
});
module.exports = __toCommonJS(CollectionTrigger_exports);
var import_lodash = require("lodash");
var import_utils = require("@nocobase/utils");
var import_database = require("@nocobase/database");
var import_data_source_manager = require("@nocobase/data-source-manager");
var import__ = __toESM(require("."));
var import_utils2 = require("../utils");
const MODE_BITMAP = {
  CREATE: 1,
  UPDATE: 2,
  DESTROY: 4
};
const MODE_BITMAP_EVENTS = /* @__PURE__ */ new Map();
MODE_BITMAP_EVENTS.set(MODE_BITMAP.CREATE, "afterCreateWithAssociations");
MODE_BITMAP_EVENTS.set(MODE_BITMAP.UPDATE, "afterUpdateWithAssociations");
MODE_BITMAP_EVENTS.set(MODE_BITMAP.DESTROY, "afterDestroy");
function getHookId(workflow, type) {
  return `${type}#${workflow.id}`;
}
function getFieldRawName(collection, name) {
  const field = collection.getField(name);
  if (field && field.options.type === "belongsTo") {
    return field.options.foreignKey;
  }
  return name;
}
class CollectionTrigger extends import__.default {
  events = /* @__PURE__ */ new Map();
  // async function, should return promise
  static async handler(workflow, data, options) {
    const { skipWorkflow = false, stack } = options.context ?? {};
    if (skipWorkflow) {
      return;
    }
    const [dataSourceName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
    const transaction = this.workflow.useDataSourceTransaction(dataSourceName, options.transaction);
    const ctx = await this.prepare(workflow, data, { ...options, transaction });
    if (!ctx) {
      return;
    }
    if (workflow.sync) {
      await this.workflow.trigger(workflow, ctx, {
        transaction,
        stack
      });
    } else {
      if (transaction) {
        transaction.afterCommit(() => {
          this.workflow.trigger(workflow, ctx, { stack });
        });
      } else {
        this.workflow.trigger(workflow, ctx, { stack });
      }
    }
  }
  async prepare(workflow, data, options) {
    const { condition, changed, mode, appends } = workflow.config;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
    const { collectionManager } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
    const collection = collectionManager.getCollection(collectionName);
    const { transaction, context } = options;
    const { repository, filterTargetKey } = collection;
    let target = data;
    let filterByTk;
    let loadNeeded = false;
    if (target && typeof target === "object") {
      filterByTk = Array.isArray(filterTargetKey) ? (0, import_lodash.pick)(
        target,
        filterTargetKey.sort((a, b) => a.localeCompare(b))
      ) : target[filterTargetKey];
    } else {
      filterByTk = target;
      loadNeeded = true;
    }
    if (target instanceof import_database.Model && changed && changed.length && changed.filter((name) => {
      const field = collection.getField(name);
      return field && !["linkTo", "hasOne", "hasMany", "belongsToMany"].includes(field.options.type);
    }).every((name) => !target.changedWithAssociations(getFieldRawName(collection, name)))) {
      return null;
    }
    if ((0, import_utils.isValidFilter)(condition) && !(mode & MODE_BITMAP.DESTROY)) {
      const count = await repository.count({
        filterByTk,
        filter: condition,
        context,
        transaction
      });
      if (!count) {
        return null;
      }
    }
    if (loadNeeded || (appends == null ? void 0 : appends.length) && !(mode & MODE_BITMAP.DESTROY)) {
      const includeFields = appends.reduce((set, field) => {
        set.add(field.split(".")[0]);
        set.add(field);
        return set;
      }, /* @__PURE__ */ new Set());
      target = await repository.findOne({
        filterByTk,
        appends: Array.from(includeFields),
        transaction
      });
    }
    return {
      data: (0, import_utils2.toJSON)(target)
    };
  }
  on(workflow) {
    var _a, _b;
    const { collection, mode } = workflow.config;
    if (!collection) {
      return;
    }
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const { db } = ((_b = (_a = this.workflow.app.dataSourceManager) == null ? void 0 : _a.dataSources.get(dataSourceName)) == null ? void 0 : _b.collectionManager) ?? {};
    if (!db || !db.getCollection(collectionName)) {
      return;
    }
    for (const [key, type] of MODE_BITMAP_EVENTS.entries()) {
      const event = `${collectionName}.${type}`;
      const name = getHookId(workflow, `${collection}.${type}`);
      if (mode & key) {
        if (!this.events.has(name)) {
          const listener = this.constructor.handler.bind(this, workflow);
          this.events.set(name, listener);
          db.on(event, listener);
        }
      } else {
        const listener = this.events.get(name);
        if (listener) {
          db.off(event, listener);
          this.events.delete(name);
        }
      }
    }
  }
  off(workflow) {
    var _a;
    const { collection, mode } = workflow.config;
    if (!collection) {
      return;
    }
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const { db } = ((_a = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName)) == null ? void 0 : _a.collectionManager) ?? {};
    if (!db || !db.getCollection(collectionName)) {
      return;
    }
    for (const [key, type] of MODE_BITMAP_EVENTS.entries()) {
      const name = getHookId(workflow, `${collection}.${type}`);
      if (mode & key) {
        const listener = this.events.get(name);
        if (listener) {
          db.off(`${collectionName}.${type}`, listener);
          this.events.delete(name);
        }
      }
    }
  }
  // async validateEvent(workflow: WorkflowModel, context: any, options: Transactionable): Promise<boolean> {
  //   if (context.stack) {
  //     const existed = await workflow.countExecutions({
  //       where: {
  //         id: context.stack,
  //       },
  //       transaction: options.transaction,
  //     });
  //     if (existed) {
  //       this.workflow
  //         .getLogger(workflow.id)
  //         .warn(
  //           `workflow ${workflow.id} has already been triggered in stack executions (${context.stack}), and newly triggering will be skipped.`,
  //         );
  //       return false;
  //     }
  //   }
  //   return true;
  // }
  async execute(workflow, values, options) {
    const ctx = await this.prepare(workflow, values == null ? void 0 : values.data, options);
    const [dataSourceName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
    const { transaction } = options;
    return this.workflow.trigger(workflow, ctx, {
      ...options,
      transaction: this.workflow.useDataSourceTransaction(dataSourceName, transaction)
    });
  }
  validateContext(values) {
    if (!values.data) {
      return {
        data: "Data is required"
      };
    }
    return null;
  }
}
