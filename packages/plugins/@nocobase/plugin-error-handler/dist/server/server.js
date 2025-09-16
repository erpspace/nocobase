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
var server_exports = {};
__export(server_exports, {
  PluginErrorHandlerServer: () => PluginErrorHandlerServer
});
module.exports = __toCommonJS(server_exports);
var import_json_schema = require("@formily/json-schema");
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
var import_error_handler = require("./error-handler");
class PluginErrorHandlerServer extends import_server.Plugin {
  errorHandler = new import_error_handler.ErrorHandler();
  i18nNs = "error-handler";
  beforeLoad() {
    this.registerSequelizeValidationErrorHandler();
  }
  registerSequelizeValidationErrorHandler() {
    const findFieldTitle = (instance, path, tFunc, ctx) => {
      if (!instance) {
        return path;
      }
      const model = instance.constructor;
      const dataSourceKey = ctx.get("x-data-source");
      const dataSource = ctx.app.dataSourceManager.dataSources.get(dataSourceKey);
      const database = dataSource ? dataSource.collectionManager.db : ctx.db;
      const collection = database.modelCollection.get(model);
      if (!collection) {
        return path;
      }
      const field = collection.getField(path);
      const fieldOptions = import_json_schema.Schema.compile(field == null ? void 0 : field.options, { t: tFunc });
      const title = import_lodash.default.get(fieldOptions, "uiSchema.title", path);
      return title;
    };
    this.errorHandler.register(
      (err) => {
        var _a;
        return ((_a = err == null ? void 0 : err.errors) == null ? void 0 : _a.length) && (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError");
      },
      (err, ctx) => {
        ctx.body = {
          errors: err.errors.map((err2) => {
            const t = ctx.i18n.t;
            const title = findFieldTitle(err2.instance, err2.path, t, ctx);
            return {
              message: t(err2.type, {
                ns: this.i18nNs,
                field: t(title, { ns: ["lm-collections", "client"] })
              })
            };
          })
        };
        ctx.status = 400;
      }
    );
  }
  async load() {
    this.app.use(this.errorHandler.middleware(), { after: "i18n", tag: "errorHandler", before: "cors" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginErrorHandlerServer
});
