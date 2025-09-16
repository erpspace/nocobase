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
var load_default_actions_exports = {};
__export(load_default_actions_exports, {
  loadDefaultActions: () => loadDefaultActions
});
module.exports = __toCommonJS(load_default_actions_exports);
var import_list = require("./default-actions/list");
var import_proxy_to_repository = require("./default-actions/proxy-to-repository");
const actions = {
  add: {
    params(ctx) {
      return ctx.action.params.filterByTk || ctx.action.params.filterByTks || ctx.action.params.values;
    },
    method: "add"
  },
  create: {
    params: ["whitelist", "blacklist", "updateAssociationValues", "values"],
    method: "create"
  },
  get: {
    params: ["filterByTk", "fields", "appends", "except", "filter", "targetCollection"],
    method: "findOne"
  },
  update: {
    params: [
      "filterByTk",
      "values",
      "whitelist",
      "blacklist",
      "filter",
      "updateAssociationValues",
      "forceUpdate",
      "targetCollection"
    ],
    method: "update"
  },
  destroy: {
    params: ["filterByTk", "filter"],
    method: "destroy"
  },
  firstOrCreate: {
    params: ["values", "filterKeys", "whitelist", "blacklist", "updateAssociationValues", "targetCollection"],
    method: "firstOrCreate"
  },
  updateOrCreate: {
    params: ["values", "filterKeys", "whitelist", "blacklist", "updateAssociationValues", "targetCollection"],
    method: "updateOrCreate"
  },
  remove: {
    params(ctx) {
      return ctx.action.params.filterByTk || ctx.action.params.filterByTks || ctx.action.params.values;
    },
    method: "remove"
  },
  set: {
    params(ctx) {
      return ctx.action.params.filterByTk || ctx.action.params.filterByTks || ctx.action.params.values;
    },
    method: "set"
  },
  toggle: {
    params(ctx) {
      return ctx.action.params.values;
    },
    method: "toggle"
  }
};
function loadDefaultActions() {
  return {
    ...Object.keys(actions).reduce((carry, key) => {
      carry[key] = (0, import_proxy_to_repository.proxyToRepository)(actions[key].params, actions[key].method);
      return carry;
    }, {}),
    list: import_list.list
  };
}
__name(loadDefaultActions, "loadDefaultActions");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadDefaultActions
});
