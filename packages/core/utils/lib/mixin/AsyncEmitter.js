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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var AsyncEmitter_exports = {};
__export(AsyncEmitter_exports, {
  AsyncEmitter: () => AsyncEmitter
});
module.exports = __toCommonJS(AsyncEmitter_exports);
const _AsyncEmitter = class _AsyncEmitter {
  async emitAsync(event, ...args) {
    const events = this._events;
    let callbacks = events[event];
    if (!callbacks) {
      return false;
    }
    const run = /* @__PURE__ */ __name((cb) => {
      switch (args.length) {
        case 0:
          cb = cb.call(this);
          break;
        case 1:
          cb = cb.call(this, args[0]);
          break;
        case 2:
          cb = cb.call(this, args[0], args[1]);
          break;
        case 3:
          cb = cb.call(this, args[0], args[1], args[2]);
          break;
        default:
          cb = cb.apply(this, args);
      }
      if (cb && (cb instanceof Promise || typeof cb.then === "function")) {
        return cb;
      }
      return Promise.resolve(true);
    }, "run");
    if (typeof callbacks === "function") {
      await run(callbacks);
    } else if (typeof callbacks === "object") {
      callbacks = callbacks.slice().filter(Boolean);
      await callbacks.reduce((prev, next) => {
        return prev.then((res) => {
          return run(next).then((result) => Promise.resolve(res.concat(result)));
        });
      }, Promise.resolve([]));
    }
    return true;
  }
};
__name(_AsyncEmitter, "AsyncEmitter");
let AsyncEmitter = _AsyncEmitter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AsyncEmitter
});
