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
var attachments_exports = {};
__export(attachments_exports, {
  createMiddleware: () => createMiddleware,
  getFileData: () => getFileData
});
module.exports = __toCommonJS(attachments_exports);
var import_utils = require("@nocobase/utils");
var import_path = __toESM(require("path"));
var import__ = __toESM(require(".."));
var import_constants = require("../../constants");
var Rules = __toESM(require("../rules"));
function getFileFilter(storage) {
  return (req, file, cb) => {
    const { size, ...rules } = storage.rules;
    const ruleKeys = Object.keys(rules);
    const result = !ruleKeys.length || !ruleKeys.some((key) => typeof Rules[key] !== "function" || !Rules[key](file, rules[key]));
    cb(null, result);
  };
}
function getFileData(ctx) {
  const { [import_constants.FILE_FIELD_NAME]: file, storage } = ctx;
  if (!file) {
    return ctx.throw(400, "file validation failed");
  }
  const StorageType = ctx.app.pm.get(import__.default).storageTypes.get(storage.type);
  const { [StorageType.filenameKey || "filename"]: name } = file;
  const filename = import_path.default.basename(name);
  const extname = import_path.default.extname(filename);
  const path = (storage.path || "").replace(/^\/|\/$/g, "");
  const baseUrl = storage.baseUrl.replace(/\/+$/, "");
  const pathname = [path, filename].filter(Boolean).join("/");
  const storageInstance = new StorageType(storage);
  return {
    title: Buffer.from(file.originalname, "latin1").toString("utf8").replace(extname, ""),
    filename,
    extname,
    // TODO(feature): 暂时两者相同，后面 storage.path 模版化以后，这里只是 file 实际的 path
    path,
    size: file.size,
    // 直接缓存起来
    url: `${baseUrl}/${pathname}`,
    mimetype: file.mimetype,
    // @ts-ignore
    meta: ctx.request.body,
    storageId: storage.id,
    ...storageInstance.getFileData ? storageInstance.getFileData(file) : {}
  };
}
async function multipart(ctx, next) {
  const { storage } = ctx;
  if (!storage) {
    ctx.logger.error("[file-manager] no linked or default storage provided");
    return ctx.throw(500);
  }
  const StorageType = ctx.app.pm.get(import__.default).storageTypes.get(storage.type);
  if (!StorageType) {
    ctx.logger.error(`[file-manager] storage type "${storage.type}" is not defined`);
    return ctx.throw(500);
  }
  const storageInstance = new StorageType(storage);
  const multerOptions = {
    fileFilter: getFileFilter(storage),
    limits: {
      // 每次只允许提交一个文件
      files: import_constants.LIMIT_FILES
    },
    storage: storageInstance.make()
  };
  multerOptions.limits["fileSize"] = Math.max(import_constants.FILE_SIZE_LIMIT_MIN, storage.rules.size ?? import_constants.FILE_SIZE_LIMIT_DEFAULT);
  const upload = (0, import_utils.koaMulter)(multerOptions).single(import_constants.FILE_FIELD_NAME);
  try {
    await upload(ctx, () => {
    });
  } catch (err) {
    if (err.name === "MulterError") {
      return ctx.throw(400, err);
    }
    ctx.logger.error(err);
    return ctx.throw(500, err);
  }
  const values = getFileData(ctx);
  ctx.action.mergeParams({
    values
  });
  await next();
}
async function createMiddleware(ctx, next) {
  var _a, _b, _c;
  const { resourceName, actionName } = ctx.action;
  const { attachmentField } = ctx.action.params;
  const collection = ctx.db.getCollection(resourceName);
  if (((_a = collection == null ? void 0 : collection.options) == null ? void 0 : _a.template) !== "file" || !["upload", "create"].includes(actionName)) {
    return next();
  }
  const storageName = ((_c = (_b = ctx.db.getFieldByPath(attachmentField)) == null ? void 0 : _b.options) == null ? void 0 : _c.storage) || collection.options.storage;
  const StorageRepo = ctx.db.getRepository("storages");
  const storage = await StorageRepo.findOne({ filter: storageName ? { name: storageName } : { default: true } });
  const plugin = ctx.app.pm.get(import__.default);
  ctx.storage = plugin.parseStorage(storage);
  if (ctx == null ? void 0 : ctx.request.is("multipart/*")) {
    await multipart(ctx, next);
  } else {
    await next();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMiddleware,
  getFileData
});
