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
var resourcer_exports = {};
__export(resourcer_exports, {
  ResourceManager: () => ResourceManager,
  Resourcer: () => Resourcer,
  default: () => resourcer_default
});
module.exports = __toCommonJS(resourcer_exports);
var import_utils = require("@nocobase/utils");
var import_glob = __toESM(require("glob"));
var import_koa_compose = __toESM(require("koa-compose"));
var import_path_to_regexp = require("path-to-regexp");
var import_resource = __toESM(require("./resource"));
var import_utils2 = require("./utils");
const _ResourceManager = class _ResourceManager {
  /**
   * @internal
   */
  options;
  resources = /* @__PURE__ */ new Map();
  /**
   * 全局定义的 action handlers
   */
  handlers = /* @__PURE__ */ new Map();
  actionHandlers = /* @__PURE__ */ new Map();
  middlewareHandlers = /* @__PURE__ */ new Map();
  middlewares;
  constructor(options = {}) {
    this.options = options;
    this.middlewares = new import_utils.Toposort();
  }
  /**
   * 载入指定目录下的 resource 配置（配置的文件驱动）
   *
   * TODO: 配置的文件驱动现在会全部初始化，大数据时可能存在性能瓶颈，后续可以加入动态加载
   *
   * @param {object}   [options]
   * @param {string}   [options.directory] 指定配置所在路径
   * @param {array}    [options.extensions = ['js', 'ts', 'json']] 文件后缀
   *
   */
  async import(options) {
    const { extensions = ["js", "ts", "json"], directory } = options;
    const patten = `${directory}/*.{${extensions.join(",")}}`;
    const files = import_glob.default.sync(patten, {
      ignore: ["**/*.d.ts"]
    });
    const resources = /* @__PURE__ */ new Map();
    for (const file of files) {
      const options2 = await (0, import_utils.importModule)(file);
      const table = this.define(typeof options2 === "function" ? options2(this) : options2);
      resources.set(table.getName(), table);
    }
    return resources;
  }
  /**
   * resource 配置
   *
   * @param name
   * @param options
   */
  define(options) {
    const { name } = options;
    const resource = new import_resource.default(options, this);
    this.resources.set(name, resource);
    return resource;
  }
  isDefined(name) {
    return this.resources.has(name);
  }
  /**
   * @internal
   */
  removeResource(name) {
    return this.resources.delete(name);
  }
  /**
   * This method is deprecated and should not be used.
   * Use {@link ResourceManager#registerActionHandler} instead.
   * @deprecated
   */
  registerAction(name, handler) {
    this.registerActionHandler(name, handler);
  }
  /**
   * This method is deprecated and should not be used.
   * Use {@link ResourceManager#registerActionHandlers} instead.
   * @deprecated
   */
  registerActions(handlers) {
    this.registerActionHandlers(handlers);
  }
  /**
   * 注册全局的 action handlers
   *
   * @param handlers
   */
  registerActionHandlers(handlers) {
    for (const [name, handler] of Object.entries(handlers)) {
      this.registerActionHandler(name, handler);
    }
  }
  registerActionHandler(name, handler) {
    this.actionHandlers.set(name, handler);
  }
  /**
   * @internal
   */
  getRegisteredHandler(name) {
    return this.actionHandlers.get(name);
  }
  /**
   * @internal
   */
  getRegisteredHandlers() {
    return this.actionHandlers;
  }
  /**
   * @internal
   */
  getResource(name) {
    if (!this.resources.has(name)) {
      throw new Error(`${name} resource does not exist`);
    }
    return this.resources.get(name);
  }
  /**
   * @internal
   */
  getAction(name, action) {
    if (this.actionHandlers.has(`${name}:${action}`)) {
      return this.getResource(name).getAction(`${name}:${action}`);
    }
    return this.getResource(name).getAction(action);
  }
  /**
   * @internal
   */
  getMiddlewares() {
    return this.middlewares.nodes;
  }
  use(middlewares, options = {}) {
    this.middlewares.add(middlewares, options);
  }
  middleware({ prefix, accessors, skipIfDataSourceExists = false } = {}) {
    const self = this;
    return /* @__PURE__ */ __name(async function resourcerMiddleware(ctx, next) {
      if (skipIfDataSourceExists) {
        const dataSource = ctx.get("x-data-source");
        if (dataSource) {
          return next();
        }
      }
      ctx.resourcer = self;
      let params = (0, import_utils2.parseRequest)(
        {
          path: ctx.request.path,
          method: ctx.request.method
        },
        {
          prefix: self.options.prefix || prefix,
          accessors: self.options.accessors || accessors
        }
      );
      if (!params) {
        return next();
      }
      try {
        const resource = self.getResource((0, import_utils2.getNameByParams)(params));
        if (resource.options.type && resource.options.type !== "single") {
          params = (0, import_utils2.parseRequest)(
            {
              path: ctx.request.path,
              method: ctx.request.method,
              type: resource.options.type
            },
            {
              prefix: self.options.prefix || prefix,
              accessors: self.options.accessors || accessors
            }
          );
          if (!params) {
            return next();
          }
        }
        ctx.action = self.getAction((0, import_utils2.getNameByParams)(params), params.actionName).clone();
        ctx.action.setContext(ctx);
        ctx.action.actionName = params.actionName;
        ctx.action.sourceId = params.associatedIndex;
        ctx.action.resourceOf = params.associatedIndex;
        ctx.action.resourceName = params.associatedName ? `${params.associatedName}.${params.resourceName}` : params.resourceName;
        ctx.action.params.filterByTk = params.resourceIndex;
        const query = (0, import_utils2.parseQuery)(ctx.request.querystring);
        if ((0, import_path_to_regexp.pathToRegexp)("/resourcer/:rest(.*)").test(ctx.request.path)) {
          ctx.action.mergeParams({
            ...query,
            ...params,
            ...ctx.request.body
          });
        } else {
          ctx.action.mergeParams({
            ...query,
            ...params,
            values: ctx.request.body
          });
        }
        return (0, import_koa_compose.default)(ctx.action.getHandlers())(ctx, next);
      } catch (error) {
        console.log(error);
        return next();
      }
    }, "resourcerMiddleware");
  }
  /**
   * This method is deprecated and should not be used.
   * Use {@link ResourceManager#middleware} instead.
   * @deprecated
   */
  restApiMiddleware(options = {}) {
    return this.middleware(options);
  }
  /**
   * @internal
   */
  async execute(options, context = {}, next) {
    const { resource, action } = options;
    context.resourcer = this;
    context.action = this.getAction(resource, action);
    return await context.action.execute(context, next);
  }
};
__name(_ResourceManager, "ResourceManager");
let ResourceManager = _ResourceManager;
const _Resourcer = class _Resourcer extends ResourceManager {
};
__name(_Resourcer, "Resourcer");
let Resourcer = _Resourcer;
var resourcer_default = ResourceManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResourceManager,
  Resourcer
});
