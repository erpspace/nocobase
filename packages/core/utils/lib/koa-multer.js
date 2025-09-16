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
var koa_multer_exports = {};
__export(koa_multer_exports, {
  koaMulter: () => multer
});
module.exports = __toCommonJS(koa_multer_exports);
var import_multer = __toESM(require("multer"));
function multer(options) {
  const m = (0, import_multer.default)(options);
  makePromise(m, "any");
  makePromise(m, "array");
  makePromise(m, "fields");
  makePromise(m, "none");
  makePromise(m, "single");
  return m;
}
__name(multer, "multer");
function makePromise(multer2, name) {
  if (!multer2[name]) return;
  const fn = multer2[name];
  multer2[name] = function(...args) {
    const middleware = Reflect.apply(fn, this, args);
    return async (ctx, next) => {
      await new Promise((resolve, reject) => {
        middleware(ctx.req, ctx.res, (err) => {
          if (err) return reject(err);
          if ("request" in ctx) {
            if (ctx.req.body) {
              ctx.request.body = ctx.req.body;
              delete ctx.req.body;
            }
            if (ctx.req.file) {
              ctx.request.file = ctx.req.file;
              ctx.file = ctx.req.file;
              delete ctx.req.file;
            }
            if (ctx.req.files) {
              ctx.request.files = ctx.req.files;
              ctx.files = ctx.req.files;
              delete ctx.req.files;
            }
          }
          resolve(ctx);
        });
      });
      return next();
    };
  };
}
__name(makePromise, "makePromise");
multer.diskStorage = import_multer.default.diskStorage;
multer.memoryStorage = import_multer.default.memoryStorage;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  koaMulter
});
