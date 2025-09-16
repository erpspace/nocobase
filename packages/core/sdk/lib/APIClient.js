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
var APIClient_exports = {};
__export(APIClient_exports, {
  APIClient: () => APIClient,
  Auth: () => Auth,
  MemoryStorage: () => MemoryStorage,
  Storage: () => Storage
});
module.exports = __toCommonJS(APIClient_exports);
var import_axios = __toESM(require("axios"));
var import_qs = __toESM(require("qs"));
const _Auth = class _Auth {
  api;
  get storagePrefix() {
    return this.api.storagePrefix;
  }
  get KEYS() {
    var _a, _b;
    const defaults = {
      locale: this.storagePrefix + "LOCALE",
      role: this.storagePrefix + "ROLE",
      token: this.storagePrefix + "TOKEN",
      authenticator: this.storagePrefix + "AUTH",
      theme: this.storagePrefix + "THEME"
    };
    if (this.api["app"]) {
      const appName = (_b = (_a = this.api["app"]) == null ? void 0 : _a.getName) == null ? void 0 : _b.call(_a);
      if (appName) {
        defaults["role"] = `${appName.toUpperCase()}_` + defaults["role"];
        defaults["locale"] = `${appName.toUpperCase()}_` + defaults["locale"];
      }
    }
    return defaults;
  }
  options = {
    locale: null,
    role: null,
    authenticator: null,
    token: null
  };
  constructor(api) {
    this.api = api;
    this.api.axios.interceptors.request.use(this.middleware.bind(this));
  }
  get locale() {
    return this.getLocale();
  }
  set locale(value) {
    this.setLocale(value);
  }
  get role() {
    return this.getRole();
  }
  set role(value) {
    this.setRole(value);
  }
  get token() {
    return this.getToken();
  }
  set token(value) {
    this.setToken(value);
  }
  get authenticator() {
    return this.getAuthenticator();
  }
  set authenticator(value) {
    this.setAuthenticator(value);
  }
  /**
   * @internal
   */
  getOption(key) {
    if (!this.KEYS[key]) {
      return;
    }
    return this.api.storage.getItem(this.KEYS[key]);
  }
  /**
   * @internal
   */
  setOption(key, value) {
    if (!this.KEYS[key]) {
      return;
    }
    this.options[key] = value;
    return this.api.storage.setItem(this.KEYS[key], value || "");
  }
  /**
   * @internal
   * use {@link Auth#locale} instead
   */
  getLocale() {
    return this.getOption("locale");
  }
  /**
   * @internal
   * use {@link Auth#locale} instead
   */
  setLocale(locale) {
    this.setOption("locale", locale);
  }
  /**
   * @internal
   * use {@link Auth#role} instead
   */
  getRole() {
    return this.getOption("role");
  }
  /**
   * @internal
   * use {@link Auth#role} instead
   */
  setRole(role) {
    this.setOption("role", role);
  }
  /**
   * @internal
   * use {@link Auth#token} instead
   */
  getToken() {
    return this.getOption("token");
  }
  /**
   * @internal
   * use {@link Auth#token} instead
   */
  setToken(token) {
    this.setOption("token", token);
    if (this.api["app"]) {
      this.api["app"].eventBus.dispatchEvent(
        new CustomEvent("auth:tokenChanged", { detail: { token, authenticator: this.authenticator } })
      );
    }
  }
  /**
   * @internal
   * use {@link Auth#authenticator} instead
   */
  getAuthenticator() {
    return this.getOption("authenticator");
  }
  /**
   * @internal
   * use {@link Auth#authenticator} instead
   */
  setAuthenticator(authenticator) {
    this.setOption("authenticator", authenticator);
  }
  middleware(config) {
    if (this.locale) {
      config.headers["X-Locale"] = this.locale;
    }
    if (this.role) {
      config.headers["X-Role"] = this.role;
    }
    if (this.authenticator && !config.headers["X-Authenticator"]) {
      config.headers["X-Authenticator"] = this.authenticator;
    }
    if (this.token) {
      config.headers["Authorization"] = `Bearer ${this.token}`;
    }
    return config;
  }
  async signIn(values, authenticator) {
    var _a;
    const response = await this.api.request({
      method: "post",
      url: "auth:signIn",
      data: values,
      headers: {
        "X-Authenticator": authenticator
      }
    });
    const data = (_a = response == null ? void 0 : response.data) == null ? void 0 : _a.data;
    this.setAuthenticator(authenticator);
    this.setToken(data == null ? void 0 : data.token);
    return response;
  }
  async signUp(values, authenticator) {
    return await this.api.request({
      method: "post",
      url: "auth:signUp",
      data: values,
      headers: {
        "X-Authenticator": authenticator
      }
    });
  }
  async signOut() {
    const response = await this.api.request({
      method: "post",
      url: "auth:signOut"
    });
    this.setToken(null);
    this.setRole(null);
    this.setAuthenticator(null);
    return response;
  }
  async lostPassword(values) {
    const searchParams = new URLSearchParams(window.location.search);
    const paramsObject = Object.fromEntries(searchParams.entries());
    const response = await this.api.request({
      method: "post",
      url: "auth:lostPassword",
      data: {
        ...values,
        baseURL: window.location.href.split("/forgot-password")[0]
      },
      headers: {
        "X-Authenticator": paramsObject.name
      }
    });
    return response;
  }
  async resetPassword(values) {
    const response = await this.api.request({
      method: "post",
      url: "auth:resetPassword",
      data: values
    });
    return response;
  }
  async checkResetToken(values) {
    const response = await this.api.request({
      method: "post",
      url: "auth:checkResetToken",
      data: values
    });
    return response;
  }
};
__name(_Auth, "Auth");
let Auth = _Auth;
const _Storage = class _Storage {
};
__name(_Storage, "Storage");
let Storage = _Storage;
const _MemoryStorage = class _MemoryStorage extends Storage {
  items = /* @__PURE__ */ new Map();
  clear() {
    this.items.clear();
  }
  getItem(key) {
    return this.items.get(key);
  }
  setItem(key, value) {
    return this.items.set(key, value);
  }
  removeItem(key) {
    return this.items.delete(key);
  }
};
__name(_MemoryStorage, "MemoryStorage");
let MemoryStorage = _MemoryStorage;
const _APIClient = class _APIClient {
  options;
  axios;
  auth;
  storage;
  storagePrefix = "NOCOBASE_";
  getHeaders() {
    const headers = {};
    if (this.auth.locale) {
      headers["X-Locale"] = this.auth.locale;
    }
    if (this.auth.role) {
      headers["X-Role"] = this.auth.role;
    }
    if (this.auth.authenticator) {
      headers["X-Authenticator"] = this.auth.authenticator;
    }
    if (this.auth.token) {
      headers["Authorization"] = `Bearer ${this.auth.token}`;
    }
    return headers;
  }
  constructor(options) {
    this.options = options;
    if (typeof options === "function") {
      this.axios = options;
    } else {
      const { authClass, storageType, storageClass, storagePrefix = "NOCOBASE_", ...others } = options || {};
      this.storagePrefix = storagePrefix;
      this.axios = import_axios.default.create(others);
      this.initStorage(storageClass, storageType);
      if (authClass) {
        this.auth = new authClass(this);
      }
    }
    if (!this.storage) {
      this.initStorage();
    }
    if (!this.auth) {
      this.auth = new Auth(this);
    }
    this.interceptors();
  }
  initStorage(storage, storageType = "localStorage") {
    if (storage) {
      this.storage = new storage(this);
      return;
    }
    if (storageType === "localStorage" && typeof localStorage !== "undefined") {
      this.storage = localStorage;
      return;
    }
    if (storageType === "sessionStorage" && typeof sessionStorage !== "undefined") {
      this.storage = sessionStorage;
      return;
    }
    this.storage = new MemoryStorage();
  }
  interceptors() {
    this.axios.interceptors.request.use((config) => {
      config.paramsSerializer = (params) => {
        return import_qs.default.stringify(params, {
          strictNullHandling: true,
          arrayFormat: "brackets"
        });
      };
      return config;
    });
  }
  request(config) {
    const { resource, resourceOf, action, params, headers } = config;
    if (resource) {
      return this.resource(resource, resourceOf, headers)[action](params);
    }
    return this.axios.request(config);
  }
  resource(name, of, headers, cancel) {
    const target = {};
    const handler = {
      get: /* @__PURE__ */ __name((_, actionName) => {
        if (cancel) {
          return;
        }
        let url = name.split(".").join(`/${encodeURIComponent(of) || "_"}/`);
        url += `:${actionName.toString()}`;
        const config = { url };
        if (["get", "list"].includes(actionName)) {
          config["method"] = "get";
        } else {
          config["method"] = "post";
        }
        return async (params, opts) => {
          const { values, filter, ...others } = params || {};
          config["params"] = others;
          if (filter) {
            if (typeof filter === "string") {
              config["params"]["filter"] = filter;
            } else {
              if (filter["*"]) {
                delete filter["*"];
              }
              config["params"]["filter"] = JSON.stringify(filter);
            }
          }
          if (config.method !== "get") {
            config["data"] = values || {};
          }
          return await this.request({
            ...config,
            ...opts,
            headers
          });
        };
      }, "get")
    };
    return new Proxy(target, handler);
  }
};
__name(_APIClient, "APIClient");
let APIClient = _APIClient;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  APIClient,
  Auth,
  MemoryStorage,
  Storage
});
