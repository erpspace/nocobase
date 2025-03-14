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
var logger_exports = {};
__export(logger_exports, {
  default: () => logger_default
});
module.exports = __toCommonJS(logger_exports);
var import_logger = require("@nocobase/logger");
var import_promises = require("fs/promises");
var import_path = require("path");
var import_stream = __toESM(require("stream"));
var import_tar_fs = require("tar-fs");
var import_zlib = __toESM(require("zlib"));
var import_lodash = __toESM(require("lodash"));
const envVars = [
  "APP_ENV",
  "APP_PORT",
  "API_BASE_PATH",
  "API_BASE_URL",
  "DB_DIALECT",
  "DB_TABLE_PREFIX",
  "DB_UNDERSCORED",
  "DB_TIMEZONE",
  "DB_LOGGING",
  "LOGGER_TRANSPORT",
  "LOGGER_LEVEL"
];
const getLastestLogs = async (path) => {
  const files = await (0, import_promises.readdir)(path);
  const prefixes = ["request", "sql", "system", "system_error"];
  const logs = files.filter((file) => file.endsWith(".log") && prefixes.some((prefix) => file.startsWith(prefix)));
  if (!logs.length) {
    return [];
  }
  const mtime = async (file) => {
    const info = await (0, import_promises.stat)((0, import_path.join)(path, file));
    return [file, info.mtime];
  };
  const logsWithTime = await Promise.all(logs.map(mtime));
  const getLatestLog = (prefix) => {
    const logs2 = logsWithTime.filter((file) => file[0].startsWith(prefix));
    if (!logs2.length) {
      return null;
    }
    return logs2.reduce((a, b) => a[1] > b[1] ? a : b)[0];
  };
  return prefixes.map(getLatestLog).filter((file) => file);
};
const tarFiles = (path, files) => {
  return new Promise((resolve, reject) => {
    const passthrough = new import_stream.default.PassThrough();
    const gz = import_zlib.default.createGzip();
    (0, import_tar_fs.pack)(path, {
      entries: files
    }).on("data", (chunk) => {
      passthrough.write(chunk);
    }).on("end", () => {
      passthrough.end();
    }).on("error", (err) => reject(err));
    passthrough.on("data", (chunk) => {
      gz.write(chunk);
    }).on("end", () => {
      gz.end();
      resolve(gz);
    }).on("error", (err) => reject(err));
    gz.on("error", (err) => reject(err));
  });
};
var logger_default = {
  name: "logger",
  actions: {
    list: async (ctx, next) => {
      const path = (0, import_logger.getLoggerFilePath)(ctx.app.name || "main");
      const readDir = async (path2) => {
        const fileTree = [];
        try {
          const files2 = await (0, import_promises.readdir)(path2, { withFileTypes: true });
          for (const file of files2) {
            if (file.isDirectory()) {
              const subFiles = await readDir((0, import_path.join)(path2, file.name));
              if (!subFiles.length) {
                continue;
              }
              fileTree.push({
                name: file.name,
                files: subFiles
              });
            } else if (file.name.endsWith(".log")) {
              fileTree.push(file.name);
            }
          }
          return fileTree;
        } catch (err) {
          ctx.log.error("readDir error", { err, path: path2 });
          return [];
        }
      };
      const files = await readDir(path);
      ctx.body = files;
      await next();
    },
    download: async (ctx, next) => {
      const path = (0, import_logger.getLoggerFilePath)(ctx.app.name || "main");
      let { files = [] } = ctx.action.params.values || {};
      const invalid = files.some((file) => !file.endsWith(".log"));
      if (invalid) {
        ctx.throw(400, ctx.t("Invalid file type: ") + invalid);
      }
      files = files.map((file) => {
        if (file.startsWith("/")) {
          return file.slice(1);
        }
        return file;
      });
      try {
        ctx.attachment("logs.tar.gz");
        ctx.body = await tarFiles(path, files);
      } catch (err) {
        ctx.log.error(`download error: ${err.message}`, { files, err: err.stack });
        ctx.throw(500, ctx.t("Download logs failed."));
      }
      await next();
    },
    collect: async (ctx, next) => {
      const { error, ...info } = ctx.action.params.values || {};
      const { message, ...e } = error || {};
      ctx.log.error({ message: `Diagnosis, frontend error, ${message}`, ...e });
      ctx.log.error(`Diagnostic information`, info);
      ctx.log.error("Diagnosis, environment variables", import_lodash.default.pick(process.env, envVars));
      const path = (0, import_logger.getLoggerFilePath)(ctx.app.name || "main");
      const files = await getLastestLogs(path);
      if (!files.length) {
        ctx.throw(
          404,
          ctx.t("No log files found. Please check the LOGGER_TRANSPORTS environment variable configuration.")
        );
      }
      try {
        ctx.attachment("logs.tar.gz");
        ctx.body = await tarFiles(path, files);
      } catch (err) {
        ctx.log.error(`download error: ${err.message}`, { files, err: err.stack });
        ctx.throw(500, ctx.t("Download logs failed."));
      }
      await next();
    }
  }
};
