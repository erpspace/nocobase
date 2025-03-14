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
var ScheduleTrigger_exports = {};
__export(ScheduleTrigger_exports, {
  default: () => ScheduleTrigger
});
module.exports = __toCommonJS(ScheduleTrigger_exports);
var import__ = __toESM(require(".."));
var import_DateFieldScheduleTrigger = __toESM(require("./DateFieldScheduleTrigger"));
var import_StaticScheduleTrigger = __toESM(require("./StaticScheduleTrigger"));
var import_utils = require("./utils");
class ScheduleTrigger extends import__.default {
  sync = false;
  modes = /* @__PURE__ */ new Map();
  constructor(workflow) {
    super(workflow);
    this.modes.set(import_utils.SCHEDULE_MODE.STATIC, new import_StaticScheduleTrigger.default(workflow));
    this.modes.set(import_utils.SCHEDULE_MODE.DATE_FIELD, new import_DateFieldScheduleTrigger.default(workflow));
  }
  getTrigger(mode) {
    return this.modes.get(mode);
  }
  on(workflow) {
    const mode = workflow.config.mode;
    const trigger = this.getTrigger(mode);
    if (trigger) {
      trigger.on(workflow);
    }
  }
  off(workflow) {
    const mode = workflow.config.mode;
    const trigger = this.getTrigger(mode);
    if (trigger) {
      trigger.off(workflow);
    }
  }
  async execute(workflow, values, options) {
    const mode = workflow.config.mode;
    const trigger = this.getTrigger(mode);
    if (trigger) {
      return trigger.execute(workflow, values, options);
    }
  }
  // async validateEvent(workflow: WorkflowModel, context: any, options: Transactionable): Promise<boolean> {
  //   if (!context.date) {
  //     return false;
  //   }
  //   const existed = await workflow.getExecutions({
  //     attributes: ['id'],
  //     where: {
  //       'context.date': context.date instanceof Date ? context.date.toISOString() : context.date,
  //     },
  //     transaction: options.transaction,
  //   });
  //   return !existed.length;
  // }
  validateContext(values) {
    var _a;
    if (!(values == null ? void 0 : values.mode)) {
      return {
        mode: "Mode is required"
      };
    }
    const trigger = this.getTrigger(values.mode);
    if (!trigger) {
      return {
        mode: "Mode in invalid"
      };
    }
    return (_a = trigger.validateContext) == null ? void 0 : _a.call(trigger, values);
  }
}
