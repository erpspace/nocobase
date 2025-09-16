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
var proxy_to_repository_exports = {};
__export(proxy_to_repository_exports, {
  proxyToRepository: () => proxyToRepository
});
module.exports = __toCommonJS(proxy_to_repository_exports);
var import_lodash = __toESM(require("lodash"));
function proxyToRepository(paramKeys, repositoryMethod) {
  return async function(ctx, next) {
    const repository = ctx.getCurrentRepository();
    const callObj = typeof paramKeys === "function" ? paramKeys(ctx) : { ...import_lodash.default.pick(ctx.action.params, paramKeys), context: ctx };
    const dataSource = ctx.dataSource;
    if (!repository[repositoryMethod]) {
      throw new Error(
        `Repository can not handle action ${repositoryMethod} for ${ctx.action.resourceName} in ${dataSource.name}`
      );
    }
    ctx.body = await repository[repositoryMethod](callObj);
    await next();
  };
}
__name(proxyToRepository, "proxyToRepository");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  proxyToRepository
});
