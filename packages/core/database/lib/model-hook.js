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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var model_hook_exports = {};
__export(model_hook_exports, {
  ModelHook: () => ModelHook
});
module.exports = __toCommonJS(model_hook_exports);
var import_lodash = __toESM(require("lodash"));
const { hooks } = require("sequelize/lib/hooks");
const _ModelHook = class _ModelHook {
  database;
  boundEvents = /* @__PURE__ */ new Set();
  constructor(database) {
    this.database = database;
  }
  match(event) {
    if (!import_lodash.default.isString(event)) {
      return null;
    }
    const type = event.split(".").pop();
    return type in hooks ? type : null;
  }
  findModelName(hookArgs) {
    for (let arg of hookArgs) {
      if (Array.isArray(arg)) {
        arg = arg[0];
      }
      if (arg == null ? void 0 : arg._previousDataValues) {
        return arg.constructor.name;
      }
      if (import_lodash.default.isPlainObject(arg)) {
        if (arg["model"]) {
          return arg["model"].name;
        }
        const modelName = arg["modelName"];
        if (this.database.sequelize.isDefined(modelName)) {
          return modelName;
        }
      }
    }
    return null;
  }
  bindEvent(type) {
    this.boundEvents.add(type);
  }
  hasBoundEvent(type) {
    return this.boundEvents.has(type);
  }
  buildSequelizeHook(type) {
    return async (...args) => {
      const modelName = this.findModelName(args);
      if (modelName) {
        await this.database.emitAsync(`${modelName}.${type}`, ...args);
      }
      await this.database.emitAsync(type, ...args);
    };
  }
};
__name(_ModelHook, "ModelHook");
let ModelHook = _ModelHook;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ModelHook
});
