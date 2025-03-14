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
var StaticScheduleTrigger_exports = {};
__export(StaticScheduleTrigger_exports, {
  default: () => StaticScheduleTrigger
});
module.exports = __toCommonJS(StaticScheduleTrigger_exports);
var import_cron_parser = __toESM(require("cron-parser"));
var import_utils = require("./utils");
const MAX_SAFE_INTERVAL = 2147483647;
class StaticScheduleTrigger {
  constructor(workflow) {
    this.workflow = workflow;
    workflow.app.on("afterStart", async () => {
      const workflows = Array.from(this.workflow.enabledCache.values()).filter(
        (item) => item.type === "schedule" && item.config.mode === import_utils.SCHEDULE_MODE.STATIC
      );
      this.inspect(workflows);
    });
    workflow.app.on("beforeStop", () => {
      for (const timer of this.timers.values()) {
        clearInterval(timer);
      }
    });
  }
  timers = /* @__PURE__ */ new Map();
  inspect(workflows) {
    const now = /* @__PURE__ */ new Date();
    workflows.forEach((workflow) => {
      const nextTime = this.getNextTime(workflow, now);
      if (nextTime) {
        this.workflow.getLogger(workflow.id).info(`caching scheduled workflow will run at: ${new Date(nextTime).toISOString()}`);
      } else {
        this.workflow.getLogger(workflow.id).info("workflow will not be scheduled");
      }
      this.schedule(workflow, nextTime, nextTime >= now.getTime());
    });
  }
  getNextTime({ config, allExecuted }, currentDate, nextSecond = false) {
    if (config.limit && allExecuted >= config.limit) {
      return null;
    }
    if (!config.startsOn) {
      return null;
    }
    currentDate.setMilliseconds(nextSecond ? 1e3 : 0);
    const timestamp = currentDate.getTime();
    const startTime = (0, import_utils.parseDateWithoutMs)(config.startsOn);
    if (startTime > timestamp) {
      return startTime;
    }
    if (config.repeat) {
      const endTime = config.endsOn ? (0, import_utils.parseDateWithoutMs)(config.endsOn) : null;
      if (endTime && endTime < timestamp) {
        return null;
      }
      if (typeof config.repeat === "string") {
        const interval = import_cron_parser.default.parseExpression(config.repeat, { currentDate });
        const next = interval.next();
        return next.getTime();
      } else if (typeof config.repeat === "number") {
        const next = timestamp + config.repeat - (timestamp - startTime) % config.repeat;
        return next;
      } else {
        return null;
      }
    } else {
      if (startTime < timestamp) {
        return null;
      }
      return timestamp;
    }
  }
  schedule(workflow, nextTime, toggle = true) {
    if (toggle) {
      const key = `${workflow.id}@${nextTime}`;
      if (!this.timers.has(key)) {
        const interval = Math.max(nextTime - Date.now(), 0);
        if (interval > MAX_SAFE_INTERVAL) {
          this.timers.set(
            key,
            setTimeout(() => {
              this.timers.delete(key);
              this.schedule(workflow, nextTime);
            }, MAX_SAFE_INTERVAL)
          );
        } else {
          this.timers.set(key, setTimeout(this.trigger.bind(this, workflow, nextTime), interval));
        }
      }
    } else {
      for (const [key, timer] of this.timers.entries()) {
        if (key.startsWith(`${workflow.id}@`)) {
          clearTimeout(timer);
          this.timers.delete(key);
        }
      }
    }
  }
  async trigger(workflow, time) {
    const eventKey = `${workflow.id}@${time}`;
    this.timers.delete(eventKey);
    this.workflow.trigger(workflow, { date: new Date(time) }, { eventKey });
    if (!workflow.config.repeat || workflow.config.limit && workflow.allExecuted >= workflow.config.limit - 1) {
      return;
    }
    const nextTime = this.getNextTime(workflow, /* @__PURE__ */ new Date(), true);
    if (nextTime) {
      this.schedule(workflow, nextTime);
    }
  }
  on(workflow) {
    this.inspect([workflow]);
  }
  off(workflow) {
    this.schedule(workflow, null, false);
  }
  execute(workflow, values, options) {
    return this.workflow.trigger(workflow, { ...values, date: (values == null ? void 0 : values.date) ?? /* @__PURE__ */ new Date() }, options);
  }
}
