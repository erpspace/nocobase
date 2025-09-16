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
var resource_exports = {};
__export(resource_exports, {
  default: () => resource_default
});
module.exports = __toCommonJS(resource_exports);
var import_utils = require("@nocobase/utils");
var import_fs = __toESM(require("fs"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
var resource_default = {
  name: "pm",
  actions: {
    async add(ctx, next) {
      const app = ctx.app;
      const { values = {} } = ctx.action.params;
      if (values == null ? void 0 : values.packageName) {
        const args = [];
        if (values.registry) {
          args.push("--registry=" + values.registry);
        }
        if (values.version) {
          args.push("--version=" + values.version);
        }
        if (values.authToken) {
          args.push("--auth-token=" + values.authToken);
        }
        app.runAsCLI(["pm", "add", values.packageName, ...args], { from: "user" });
      } else if (ctx.file) {
        const tmpDir = import_path.default.resolve(process.cwd(), "storage", "tmp");
        try {
          await import_fs.default.promises.mkdir(tmpDir, { recursive: true });
        } catch (error) {
        }
        const tempFile = import_path.default.join(process.cwd(), "storage/tmp", (0, import_utils.uid)() + import_path.default.extname(ctx.file.originalname));
        await import_fs.default.promises.writeFile(tempFile, ctx.file.buffer, "binary");
        app.runAsCLI(["pm", "add", tempFile], { from: "user" });
      } else if (values.compressedFileUrl) {
        app.runAsCLI(["pm", "add", values.compressedFileUrl], { from: "user" });
      }
      ctx.body = "ok";
      await next();
    },
    async update(ctx, next) {
      const app = ctx.app;
      const values = ctx.action.params.values || {};
      const args = [];
      if (values.registry) {
        args.push("--registry=" + values.registry);
      }
      if (values.version) {
        args.push("--version=" + values.version);
      }
      if (values.authToken) {
        args.push("--auth-token=" + values.authToken);
      }
      if (ctx.file) {
        values.packageName = ctx.request.body.packageName;
        const tmpDir = import_path.default.resolve(process.cwd(), "storage", "tmp");
        try {
          await import_fs.default.promises.mkdir(tmpDir, { recursive: true });
        } catch (error) {
        }
        const tempFile = import_path.default.join(process.cwd(), "storage/tmp", (0, import_utils.uid)() + import_path.default.extname(ctx.file.originalname));
        await import_fs.default.promises.writeFile(tempFile, ctx.file.buffer, "binary");
        values.compressedFileUrl = tempFile;
      }
      app.runAsCLI(["pm", "update", values.compressedFileUrl || values.packageName, ...args], { from: "user" });
      ctx.body = "ok";
      await next();
    },
    async npmVersionList(ctx, next) {
      const { filterByTk } = ctx.action.params;
      if (!filterByTk) {
        ctx.throw(400, "plugin name invalid");
      }
      const pm = ctx.app.pm;
      ctx.body = await pm.getNpmVersionList(filterByTk);
      await next();
    },
    async enable(ctx, next) {
      const { filterByTk } = ctx.action.params;
      const app = ctx.app;
      if (!filterByTk) {
        ctx.throw(400, "plugin name invalid");
      }
      const keys = Array.isArray(filterByTk) ? filterByTk : [filterByTk];
      app.runAsCLI(["pm", "enable", ...keys], { from: "user" });
      ctx.body = filterByTk;
      await next();
    },
    async disable(ctx, next) {
      const { filterByTk } = ctx.action.params;
      if (!filterByTk) {
        ctx.throw(400, "plugin name invalid");
      }
      const app = ctx.app;
      app.runAsCLI(["pm", "disable", filterByTk], { from: "user" });
      ctx.body = filterByTk;
      await next();
    },
    async remove(ctx, next) {
      const { filterByTk } = ctx.action.params;
      if (!filterByTk) {
        ctx.throw(400, "plugin name invalid");
      }
      const app = ctx.app;
      app.runAsCLI(["pm", "remove", filterByTk], { from: "user" });
      ctx.body = filterByTk;
      await next();
    },
    async list(ctx, next) {
      const locale = ctx.getCurrentLocale();
      const pm = ctx.app.pm;
      const plugin = pm.get("nocobase");
      ctx.body = await plugin.getAllPlugins(locale);
      await next();
    },
    async listEnabled(ctx, next) {
      const pm = ctx.db.getRepository("applicationPlugins");
      const PLUGIN_CLIENT_ENTRY_FILE = "dist/client/index.js";
      const items = await pm.find({
        filter: {
          enabled: true
        }
      });
      const arr = [];
      for (const item of items) {
        const pkgPath = import_path.default.resolve(process.env.NODE_MODULES_PATH, item.packageName);
        const r = await import_fs_extra.default.exists(pkgPath);
        if (r) {
          let t = "";
          const dist = import_path.default.resolve(pkgPath, PLUGIN_CLIENT_ENTRY_FILE);
          const distExists = await import_fs_extra.default.exists(dist);
          if (distExists) {
            const fsState = await import_fs_extra.default.stat(distExists ? dist : pkgPath);
            t = `&t=${fsState.mtime.getTime()}`;
          }
          const url = `${process.env.APP_SERVER_BASE_URL}${process.env.PLUGIN_STATICS_PATH}${item.packageName}/${PLUGIN_CLIENT_ENTRY_FILE}?version=${item.version}${t}`;
          arr.push({
            ...item.toJSON(),
            url
          });
        }
      }
      ctx.body = arr;
      await next();
    },
    async get(ctx, next) {
      const locale = ctx.getCurrentLocale();
      const pm = ctx.app.pm;
      const { filterByTk } = ctx.action.params;
      if (!filterByTk) {
        ctx.throw(400, "plugin name invalid");
      }
      const plugin = pm.get("nocobase");
      ctx.body = await plugin.getPluginInfo(filterByTk, locale);
      await next();
    }
  }
};
