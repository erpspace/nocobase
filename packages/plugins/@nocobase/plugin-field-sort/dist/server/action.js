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
var action_exports = {};
__export(action_exports, {
  SortableCollection: () => SortableCollection,
  move: () => move
});
module.exports = __toCommonJS(action_exports);
var import_lodash = require("lodash");
var import_database = require("@nocobase/database");
var import_sort_field = require("./sort-field");
async function move(ctx, next) {
  const repository = ctx.getCurrentRepository();
  if (repository.move) {
    ctx.body = await repository.move(ctx.action.params);
    return next();
  }
  if (!repository.database) {
    return ctx.throw(new Error(`Repository can not handle action move for ${ctx.action.resourceName}`));
  }
  const { sourceId, targetId, targetScope, sticky, method } = ctx.action.params;
  let sortField = ctx.action.params.sortField;
  if (repository instanceof import_database.BelongsToManyRepository) {
    throw new Error("Sorting association as 'belongs-to-many' type is not supported.");
  }
  if (repository instanceof import_database.HasManyRepository && !sortField) {
    sortField = `${repository.association.foreignKey}Sort`;
  }
  const sortableCollection = new SortableCollection(repository.collection, sortField);
  if (sourceId && targetId) {
    await sortableCollection.move(sourceId, targetId, {
      insertAfter: method === "insertAfter"
    });
  }
  if (sourceId && targetScope) {
    await sortableCollection.changeScope(sourceId, targetScope, method);
  }
  if (sourceId && sticky) {
    await sortableCollection.sticky(sourceId);
  }
  ctx.body = "ok";
  await next();
}
class SortableCollection {
  collection;
  field;
  scopeKey;
  constructor(collection, fieldName = "sort") {
    this.collection = collection;
    this.field = collection.getField(fieldName);
    if (!(this.field instanceof import_sort_field.SortField)) {
      throw new Error(`${fieldName} is not a sort field`);
    }
    this.scopeKey = this.field.get("scopeKey");
  }
  // insert source position to target position
  async move(sourceInstanceId, targetInstanceId, options = {}) {
    let sourceInstance = await this.collection.repository.findByTargetKey(sourceInstanceId);
    const targetInstance = await this.collection.repository.findByTargetKey(targetInstanceId);
    if (this.scopeKey && sourceInstance.get(this.scopeKey) !== targetInstance.get(this.scopeKey)) {
      [sourceInstance] = await this.collection.repository.update({
        filterByTk: sourceInstanceId,
        values: {
          [this.scopeKey]: targetInstance.get(this.scopeKey)
        }
      });
    }
    await this.sameScopeMove(sourceInstance, targetInstance, options);
  }
  async changeScope(sourceInstanceId, targetScope, method) {
    let sourceInstance = await this.collection.repository.findByTargetKey(sourceInstanceId);
    const targetScopeValue = targetScope[this.scopeKey];
    if (targetScopeValue && sourceInstance.get(this.scopeKey) !== targetScopeValue) {
      [sourceInstance] = await this.collection.repository.update({
        filterByTk: sourceInstanceId,
        values: {
          [this.scopeKey]: targetScopeValue
        },
        silent: false
      });
      if (method === "prepend") {
        await this.sticky(sourceInstanceId);
      }
    }
  }
  async sticky(sourceInstanceId) {
    await this.collection.repository.update({
      filterByTk: sourceInstanceId,
      values: {
        [this.field.get("name")]: 0
      },
      silent: true
    });
  }
  async sameScopeMove(sourceInstance, targetInstance, options) {
    const fieldName = this.field.get("name");
    const sourceSort = sourceInstance.get(fieldName);
    let targetSort = targetInstance.get(fieldName);
    if (options.insertAfter) {
      targetSort = targetSort + 1;
    }
    const scopeValue = this.scopeKey ? sourceInstance.get(this.scopeKey) : null;
    let updateCondition;
    let change;
    if (targetSort > sourceSort) {
      updateCondition = {
        [import_database.Op.gt]: sourceSort,
        [import_database.Op.lte]: targetSort
      };
      change = -1;
    } else {
      updateCondition = {
        [import_database.Op.lt]: sourceSort,
        [import_database.Op.gte]: targetSort
      };
      change = 1;
    }
    const where = {
      [fieldName]: updateCondition
    };
    if (scopeValue) {
      where[this.scopeKey] = {
        [import_database.Op.eq]: scopeValue
      };
    }
    await this.collection.model.increment(fieldName, {
      where,
      by: change,
      silent: true
    });
    await this.collection.repository.update({
      filterByTk: this.collection.isMultiFilterTargetKey() ? (0, import_lodash.pick)(sourceInstance, this.collection.filterTargetKey) : sourceInstance.get(this.collection.filterTargetKey),
      values: {
        [fieldName]: targetSort
      },
      silent: true
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SortableCollection,
  move
});
