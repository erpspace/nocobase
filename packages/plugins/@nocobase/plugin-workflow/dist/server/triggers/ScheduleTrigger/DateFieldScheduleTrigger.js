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
var DateFieldScheduleTrigger_exports = {};
__export(DateFieldScheduleTrigger_exports, {
  default: () => DateFieldScheduleTrigger
});
module.exports = __toCommonJS(DateFieldScheduleTrigger_exports);
var import_database = require("@nocobase/database");
var import_cron_parser = __toESM(require("cron-parser"));
var import_utils = require("./utils");
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_lodash = require("lodash");
function getOnTimestampWithOffset({ field, offset = 0, unit = 1e3 }, now) {
  if (!field) {
    return null;
  }
  const timestamp = now.getTime();
  return timestamp - offset * unit;
}
function getDataOptionTime(record, on, dir = 1) {
  if (!on) {
    return null;
  }
  switch (typeof on) {
    case "string": {
      const time = (0, import_utils.parseDateWithoutMs)(on);
      return time ? time : null;
    }
    case "object": {
      const { field, offset = 0, unit = 1e3 } = on;
      if (!field || !record.get(field)) {
        return null;
      }
      const second = new Date(record.get(field));
      second.setMilliseconds(0);
      return second.getTime() + offset * unit * dir;
    }
    default:
      return null;
  }
}
const DialectTimestampFnMap = {
  postgres(col) {
    return `CAST(FLOOR(extract(epoch from ${col})) AS INTEGER)`;
  },
  mysql(col) {
    return `CAST(FLOOR(UNIX_TIMESTAMP(${col})) AS SIGNED INTEGER)`;
  },
  sqlite(col) {
    return `CAST(FLOOR(unixepoch(${col})) AS INTEGER)`;
  }
};
DialectTimestampFnMap.mariadb = DialectTimestampFnMap.mysql;
function getCronNextTime(cron, currentDate) {
  const interval = import_cron_parser.default.parseExpression(cron, { currentDate });
  const next = interval.next();
  return next.getTime();
}
function matchCronNextTime(cron, currentDate, range) {
  return getCronNextTime(cron, currentDate) - currentDate.getTime() <= range;
}
function getHookId(workflow, type) {
  return `${type}#${workflow.id}`;
}
class DateFieldScheduleTrigger {
  constructor(workflow) {
    this.workflow = workflow;
    workflow.app.on("afterStart", async () => {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => this.reload(), this.cacheCycle);
      this.reload();
    });
    workflow.app.on("beforeStop", () => {
      if (this.timer) {
        clearInterval(this.timer);
      }
      for (const [key, timer] of this.cache.entries()) {
        clearTimeout(timer);
        this.cache.delete(key);
      }
    });
  }
  events = /* @__PURE__ */ new Map();
  timer = null;
  cache = /* @__PURE__ */ new Map();
  // caching workflows in range, default to 5min
  cacheCycle = 3e5;
  async reload() {
    const workflows = Array.from(this.workflow.enabledCache.values()).filter(
      (item) => item.type === "schedule" && item.config.mode === import_utils.SCHEDULE_MODE.DATE_FIELD
    );
    this.cache = /* @__PURE__ */ new Map();
    this.inspect(workflows);
  }
  inspect(workflows) {
    const now = /* @__PURE__ */ new Date();
    workflows.forEach(async (workflow) => {
      const records = await this.loadRecordsToSchedule(workflow, now);
      this.workflow.getLogger(workflow.id).info(`[Schedule on date field] ${records.length} records to schedule`);
      records.forEach((record) => {
        const nextTime = this.getRecordNextTime(workflow, record);
        this.schedule(workflow, record, nextTime, Boolean(nextTime));
      });
    });
  }
  // 1. startsOn in range -> yes
  // 2. startsOn before now, has no repeat -> no
  // 3. startsOn before now, and has repeat:
  //   a. repeat out of range -> no
  //   b. repeat in range (number or cron):
  //     i. endsOn after now -> yes
  //     ii. endsOn before now -> no
  async loadRecordsToSchedule({ id, config: { collection, limit, startsOn, repeat, endsOn }, allExecuted }, currentDate) {
    const { dataSourceManager } = this.workflow.app;
    if (limit && allExecuted >= limit) {
      this.workflow.getLogger(id).warn(`[Schedule on date field] limit reached (all executed ${allExecuted})`);
      return [];
    }
    if (!startsOn) {
      this.workflow.getLogger(id).warn(`[Schedule on date field] "startsOn" is not configured`);
      return [];
    }
    const timestamp = currentDate.getTime();
    const startTimestamp = getOnTimestampWithOffset(startsOn, currentDate);
    if (!startTimestamp) {
      this.workflow.getLogger(id).warn(`[Schedule on date field] "startsOn.field" is not configured`);
      return [];
    }
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const { collectionManager } = dataSourceManager.get(dataSourceName);
    if (!(collectionManager instanceof import_data_source_manager.SequelizeCollectionManager)) {
      return [];
    }
    const { db } = collectionManager;
    const { model } = collectionManager.getCollection(collectionName);
    const range = this.cacheCycle * 2;
    const conditions = [
      {
        [startsOn.field]: {
          // cache next 2 cycles
          [import_database.Op.lt]: new Date(startTimestamp + range)
        }
      }
    ];
    if (repeat) {
      if (typeof repeat === "number") {
        const tsFn = DialectTimestampFnMap[db.options.dialect];
        if (repeat > range && tsFn) {
          const { field } = model.getAttributes()[startsOn.field];
          const modExp = (0, import_database.fn)(
            "MOD",
            (0, import_database.literal)(
              `${Math.round(timestamp / 1e3)} - ${tsFn(db.sequelize.getQueryInterface().quoteIdentifiers(field))}`
            ),
            Math.round(repeat / 1e3)
          );
          conditions.push((0, import_database.where)(modExp, { [import_database.Op.lt]: Math.round(range / 1e3) }));
        }
      } else if (typeof repeat === "string") {
        if (!matchCronNextTime(repeat, currentDate, range)) {
          return [];
        }
      }
      if (endsOn) {
        if (typeof endsOn === "string") {
          if ((0, import_utils.parseDateWithoutMs)(endsOn) <= timestamp) {
            return [];
          }
        } else {
          const endTimestamp = getOnTimestampWithOffset(endsOn, currentDate);
          if (endTimestamp) {
            conditions.push({
              [endsOn.field]: {
                [import_database.Op.gte]: new Date(endTimestamp)
              }
            });
          } else {
            this.workflow.getLogger(id).warn(`[Schedule on date field] "endsOn.field" is not configured`);
          }
        }
      }
    } else {
      conditions.push({
        [startsOn.field]: {
          [import_database.Op.gte]: new Date(startTimestamp)
        }
      });
    }
    this.workflow.getLogger(id).debug(`[Schedule on date field] conditions: `, { conditions });
    return model.findAll({
      where: {
        [import_database.Op.and]: conditions
      }
    });
  }
  getRecordNextTime(workflow, record, nextSecond = false) {
    const {
      config: { startsOn, endsOn, repeat, limit },
      allExecuted
    } = workflow;
    if (limit && allExecuted >= limit) {
      return null;
    }
    const range = this.cacheCycle;
    const now = /* @__PURE__ */ new Date();
    now.setMilliseconds(nextSecond ? 1e3 : 0);
    const timestamp = now.getTime();
    const startTime = getDataOptionTime(record, startsOn);
    const endTime = getDataOptionTime(record, endsOn);
    let nextTime = null;
    if (!startTime) {
      return null;
    }
    if (startTime > timestamp + range) {
      return null;
    }
    if (startTime >= timestamp) {
      return !endTime || endTime >= startTime && endTime < timestamp + range ? startTime : null;
    } else {
      if (!repeat) {
        return null;
      }
    }
    if (typeof repeat === "number") {
      const nextRepeatTime = (startTime - timestamp) % repeat + repeat;
      if (nextRepeatTime > range) {
        return null;
      }
      if (endTime && endTime < timestamp + nextRepeatTime) {
        return null;
      }
      nextTime = timestamp + nextRepeatTime;
    } else if (typeof repeat === "string") {
      nextTime = getCronNextTime(repeat, now);
      if (nextTime - timestamp > range) {
        return null;
      }
      if (endTime && endTime < nextTime) {
        return null;
      }
    }
    if (endTime && endTime <= timestamp) {
      return null;
    }
    return nextTime;
  }
  schedule(workflow, record, nextTime, toggle = true, options = {}) {
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
    const { filterTargetKey } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName).collectionManager.getCollection(collectionName);
    const recordPk = record.get(filterTargetKey);
    if (toggle) {
      const nextInterval = Math.max(0, nextTime - Date.now());
      const key = `${workflow.id}:${recordPk}@${nextTime}`;
      if (!this.cache.has(key)) {
        if (nextInterval) {
          this.cache.set(key, setTimeout(this.trigger.bind(this, workflow, record, nextTime), nextInterval));
        } else {
          return this.trigger(workflow, record, nextTime, options);
        }
      }
    } else {
      for (const [key, timer] of this.cache.entries()) {
        if (key.startsWith(`${workflow.id}:${recordPk}@`)) {
          clearTimeout(timer);
          this.cache.delete(key);
        }
      }
    }
  }
  async trigger(workflow, record, nextTime, { transaction } = {}) {
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
    const { repository, filterTargetKey } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName).collectionManager.getCollection(collectionName);
    const recordPk = record.get(filterTargetKey);
    const data = await repository.findOne({
      filterByTk: recordPk,
      appends: workflow.config.appends,
      transaction
    });
    const eventKey = `${workflow.id}:${recordPk}@${nextTime}`;
    this.cache.delete(eventKey);
    this.workflow.trigger(
      workflow,
      {
        data: data.toJSON(),
        date: new Date(nextTime)
      },
      {
        eventKey
      }
    );
    if (!workflow.config.repeat || workflow.config.limit && workflow.allExecuted >= workflow.config.limit - 1) {
      return;
    }
    const n = this.getRecordNextTime(workflow, data, true);
    if (n) {
      this.schedule(workflow, data, n, true);
    }
  }
  on(workflow) {
    this.inspect([workflow]);
    const { collection } = workflow.config;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const event = `${collectionName}.afterSaveWithAssociations`;
    const name = getHookId(workflow, event);
    if (this.events.has(name)) {
      return;
    }
    const listener = async (data, { transaction }) => {
      const nextTime = this.getRecordNextTime(workflow, data);
      return this.schedule(workflow, data, nextTime, Boolean(nextTime), { transaction });
    };
    this.events.set(name, listener);
    const dataSource = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
    const { db } = dataSource.collectionManager;
    db.on(event, listener);
  }
  off(workflow) {
    for (const [key, timer] of this.cache.entries()) {
      if (key.startsWith(`${workflow.id}:`)) {
        clearTimeout(timer);
        this.cache.delete(key);
      }
    }
    const { collection } = workflow.config;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(collection);
    const event = `${collectionName}.afterSaveWithAssociations`;
    const name = getHookId(workflow, event);
    const listener = this.events.get(name);
    if (listener) {
      const dataSource = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
      const { db } = dataSource.collectionManager;
      db.off(event, listener);
      this.events.delete(name);
    }
  }
  async execute(workflow, values, options) {
    var _a;
    const [dataSourceName, collectionName] = (0, import_data_source_manager.parseCollectionName)(workflow.config.collection);
    const { collectionManager } = this.workflow.app.dataSourceManager.dataSources.get(dataSourceName);
    const { filterTargetKey, repository } = collectionManager.getCollection(collectionName);
    let { data } = values;
    let filterByTk;
    let loadNeeded = false;
    if (data && typeof data === "object") {
      filterByTk = Array.isArray(filterTargetKey) ? (0, import_lodash.pick)(
        data,
        filterTargetKey.sort((a, b) => a.localeCompare(b))
      ) : data[filterTargetKey];
    } else {
      filterByTk = data;
      loadNeeded = true;
    }
    if (loadNeeded || ((_a = workflow.config.appends) == null ? void 0 : _a.length)) {
      data = await repository.findOne({
        filterByTk,
        appends: workflow.config.appends
      });
    }
    return this.workflow.trigger(workflow, { ...values, data, date: (values == null ? void 0 : values.date) ?? /* @__PURE__ */ new Date() }, options);
  }
  validateContext(values) {
    if (!(values == null ? void 0 : values.data)) {
      return {
        data: "Data is required"
      };
    }
    return null;
  }
}
