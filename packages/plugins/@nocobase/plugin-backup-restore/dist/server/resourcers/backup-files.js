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
var backup_files_exports = {};
__export(backup_files_exports, {
  default: () => backup_files_default
});
module.exports = __toCommonJS(backup_files_exports);
var import_dumper = require("../dumper");
var import_fs = __toESM(require("fs"));
var import_utils = require("@nocobase/utils");
var import_os = __toESM(require("os"));
var import_path = __toESM(require("path"));
var import_promises = __toESM(require("fs/promises"));
var import_restorer = require("../restorer");
var import_actions = require("@nocobase/actions");
var import_utils2 = require("../utils");
var backup_files_default = {
  name: "backupFiles",
  middleware: async (ctx, next) => {
    if (ctx.action.actionName !== "upload") {
      return next();
    }
    const storage = import_utils.koaMulter.diskStorage({
      destination: import_os.default.tmpdir(),
      filename: function(req, file, cb) {
        const randomName = Date.now().toString() + Math.random().toString().slice(2);
        cb(null, randomName);
      }
    });
    const upload = (0, import_utils.koaMulter)({ storage }).single("file");
    return upload(ctx, next);
  },
  actions: {
    async list(ctx, next) {
      const { page = import_actions.DEFAULT_PAGE, pageSize = import_actions.DEFAULT_PER_PAGE } = ctx.action.params;
      const dumper = new import_dumper.Dumper(ctx.app);
      const backupFiles = await dumper.allBackUpFilePaths({
        includeInProgress: true
      });
      const count = backupFiles.length;
      const rows = await Promise.all(
        backupFiles.slice((page - 1) * pageSize, page * pageSize).map(async (file) => {
          return await import_dumper.Dumper.getFileStatus(file.endsWith(".lock") ? file.replace(".lock", "") : file);
        })
      );
      ctx.body = {
        count,
        rows,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPage: Math.ceil(count / pageSize)
      };
      await next();
    },
    async get(ctx, next) {
      const { filterByTk } = ctx.action.params;
      const dumper = new import_dumper.Dumper(ctx.app);
      const filePath = dumper.backUpFilePath(filterByTk);
      async function sendError(message, status = 404) {
        ctx.body = { status: "error", message };
        ctx.status = status;
      }
      try {
        const fileState = await import_dumper.Dumper.getFileStatus(filePath);
        if (fileState.status !== "ok") {
          await sendError(`Backup file ${filterByTk} not found`);
        } else {
          const restorer = new import_restorer.Restorer(ctx.app, {
            backUpFilePath: filePath
          });
          const restoreMeta = await restorer.parseBackupFile();
          ctx.body = {
            ...fileState,
            meta: restoreMeta
          };
        }
      } catch (e) {
        if (e.code === "ENOENT") {
          await sendError(`Backup file ${filterByTk} not found`);
        }
      }
      await next();
    },
    /**
     * create dump task
     * @param ctx
     * @param next
     */
    async create(ctx, next) {
      const data = ctx.request.body;
      const dumper = new import_dumper.Dumper(ctx.app);
      const taskId = await dumper.runDumpTask({
        groups: new Set(data.dataTypes)
      });
      ctx.body = {
        key: taskId
      };
      await next();
    },
    /**
     * download backup file
     * @param ctx
     * @param next
     */
    async download(ctx, next) {
      const { filterByTk } = ctx.action.params;
      const dumper = new import_dumper.Dumper(ctx.app);
      const filePath = dumper.backUpFilePath(filterByTk);
      const fileState = await import_dumper.Dumper.getFileStatus(filePath);
      if (!filterByTk.endsWith(`.${import_utils2.DUMPED_EXTENSION}`) || fileState.status !== "ok") {
        throw new Error(`Backup file ${filterByTk} not found`);
      }
      ctx.attachment(filePath);
      ctx.body = import_fs.default.createReadStream(filePath);
      await next();
    },
    async restore(ctx, next) {
      const { dataTypes, filterByTk, key } = ctx.action.params.values;
      const filePath = (() => {
        if (key) {
          const tmpDir = import_os.default.tmpdir();
          return import_path.default.resolve(tmpDir, key);
        }
        if (filterByTk) {
          const dumper = new import_dumper.Dumper(ctx.app);
          return dumper.backUpFilePath(filterByTk);
        }
      })();
      if (!filePath) {
        throw new Error(`Backup file ${filterByTk} not found`);
      }
      const args = ["restore", "-f", filePath];
      for (const dataType of dataTypes) {
        args.push("-g", dataType);
      }
      await ctx.app.runCommand(...args);
      await next();
    },
    async destroy(ctx, next) {
      const { filterByTk } = ctx.action.params;
      const dumper = new import_dumper.Dumper(ctx.app);
      const filePath = dumper.backUpFilePath(filterByTk);
      await import_promises.default.unlink(filePath);
      ctx.body = {
        status: "ok"
      };
      await next();
    },
    async upload(ctx, next) {
      const file = ctx.file;
      const fileName = file.filename;
      const restorer = new import_restorer.Restorer(ctx.app, {
        backUpFilePath: file.path
      });
      const restoreMeta = await restorer.parseBackupFile();
      ctx.body = {
        key: fileName,
        meta: restoreMeta
      };
      await next();
    },
    async dumpableCollections(ctx, next) {
      ctx.withoutDataWrapping = true;
      const dumper = new import_dumper.Dumper(ctx.app);
      ctx.body = await dumper.dumpableCollectionsGroupByGroup();
      await next();
    }
  }
};
