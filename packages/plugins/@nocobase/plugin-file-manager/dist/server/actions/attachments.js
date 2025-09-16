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
  createMiddleware: () => createMiddleware
});
module.exports = __toCommonJS(attachments_exports);
var import_stream = require("stream");
var import_mime_match = __toESM(require("mime-match"));
var import_mime_types = __toESM(require("mime-types"));
var import_utils = require("@nocobase/utils");
var import__ = __toESM(require(".."));
var import_constants = require("../../constants");
function makeMulterStorage(storage) {
  const innerStorage = storage.make();
  return {
    _handleFile(req, file, cb) {
      const pattern = storage.storage.rules.mimetype;
      const peekSize = 4100;
      const originalStream = file.stream;
      const passThrough = new import_stream.PassThrough();
      const proxyFile = { ...file, stream: passThrough };
      let detectedMime = null;
      const finalCallback = (err, result) => {
        if (err) {
          return cb(err);
        }
        if (detectedMime && result) {
          result.mimetype = detectedMime;
        }
        cb(null, result);
      };
      innerStorage._handleFile(req, proxyFile, finalCallback);
      const chunks = [];
      let bytesRead = 0;
      let validationTriggered = false;
      const cleanup = () => {
        originalStream.removeListener("data", onData);
        originalStream.removeListener("end", onEnd);
        originalStream.removeListener("error", onError);
      };
      const onData = (chunk) => {
        if (validationTriggered) return;
        chunks.push(chunk);
        bytesRead += chunk.length;
        if (bytesRead >= peekSize) {
          validationTriggered = true;
          cleanup();
          originalStream.pause();
          validate(Buffer.concat(chunks));
        }
      };
      const onEnd = () => {
        if (!validationTriggered) {
          validationTriggered = true;
          cleanup();
          validate(Buffer.concat(chunks));
        }
      };
      const onError = (err) => {
        cleanup();
        passThrough.destroy(err);
      };
      const validate = async (header) => {
        try {
          const { fileTypeFromBuffer } = await import("file-type");
          const type = await fileTypeFromBuffer(new Uint8Array(header));
          if (type) {
            detectedMime = type.mime;
          } else {
            const fromFilename = import_mime_types.default.lookup(file.originalname);
            if (fromFilename) {
              detectedMime = fromFilename;
            }
          }
          if (!detectedMime || pattern !== "*" && !pattern.toString().split(",").some((0, import_mime_match.default)(detectedMime))) {
            const err = new Error("Mime type not allowed by storage rule");
            err.name = "MulterError";
            originalStream.destroy();
            passThrough.destroy();
            return cb(err);
          }
          passThrough.write(header, (writeErr) => {
            if (writeErr) {
              originalStream.destroy();
              passThrough.destroy();
              return cb(writeErr);
            }
            if (originalStream.readableEnded) {
              passThrough.end();
            } else {
              originalStream.pipe(passThrough);
              originalStream.resume();
            }
          });
        } catch (err) {
          originalStream.destroy();
          passThrough.destroy();
          return cb(err);
        }
      };
      originalStream.on("data", onData);
      originalStream.on("end", onEnd);
      originalStream.on("error", onError);
    },
    _removeFile(req, file, cb) {
      innerStorage._removeFile(req, file, cb);
    }
  };
}
async function multipart(ctx, next) {
  var _a;
  const { storage } = ctx;
  if (!storage) {
    ctx.logger.error("[file-manager] no linked or default storage provided");
    return ctx.throw(500);
  }
  const StorageClass = ctx.app.pm.get(import__.default).storageTypes.get(storage.type);
  if (!StorageClass) {
    ctx.logger.error(`[file-manager] storage type "${storage.type}" is not defined`);
    return ctx.throw(500);
  }
  const storageInstance = new StorageClass(storage);
  const multerOptions = {
    // fileFilter: getFileFilter(storageInstance),
    limits: {
      // 每次只允许提交一个文件
      files: import_constants.LIMIT_FILES
    },
    storage: ((_a = storage.rules) == null ? void 0 : _a.mimetype) ? makeMulterStorage(storageInstance) : storageInstance.make()
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
  const { [import_constants.FILE_FIELD_NAME]: file } = ctx;
  if (!file) {
    return ctx.throw(400, "file validation failed");
  }
  const values = storageInstance.getFileData(file, ctx.request.body);
  ctx.action.mergeParams({
    values: {
      ...values,
      storage: { id: storage.id }
    }
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
  const storageName = resourceName === "attachments" ? (_c = (_b = ctx.db.getFieldByPath(attachmentField)) == null ? void 0 : _b.options) == null ? void 0 : _c.storage : collection.options.storage;
  const plugin = ctx.app.pm.get(import__.default);
  const storage = Array.from(plugin.storagesCache.values()).find(
    (storage2) => storageName ? storage2.name === storageName : storage2.default
  );
  if (!storage) {
    ctx.logger.error(`[file-manager] no storage found`);
    return ctx.throw(500);
  }
  ctx.storage = storage;
  if (ctx == null ? void 0 : ctx.request.is("multipart/*")) {
    await multipart(ctx, next);
  } else {
    ctx.action.mergeParams({
      values: {
        storage: { id: storage.id }
      }
    });
    await next();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMiddleware
});
