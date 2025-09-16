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
var toposort_exports = {};
__export(toposort_exports, {
  Toposort: () => Toposort,
  default: () => toposort_default
});
module.exports = __toCommonJS(toposort_exports);
var import_topo = __toESM(require("@hapi/topo"));
const _Toposort = class _Toposort extends import_topo.default.Sorter {
  unshift(...items) {
    this._items.unshift(
      ...items.map((node) => ({
        node,
        seq: this._items.length,
        sort: 0,
        before: [],
        after: [],
        group: "?"
      }))
    );
  }
  push(...items) {
    this._items.push(
      ...items.map((node) => ({
        node,
        seq: this._items.length,
        sort: 0,
        before: [],
        after: [],
        group: "?"
      }))
    );
  }
  add(nodes, options) {
    if (options == null ? void 0 : options.tag) {
      options.group = options.tag;
    }
    return super.add(nodes, options);
  }
};
__name(_Toposort, "Toposort");
let Toposort = _Toposort;
var toposort_default = Toposort;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Toposort
});
