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
var plugin_exports = {};
__export(plugin_exports, {
  PluginAuthServer: () => PluginAuthServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_preset = require("../preset");
var import_auth = __toESM(require("./actions/auth"));
var import_authenticators = __toESM(require("./actions/authenticators"));
var import_basic_auth = require("./basic-auth");
var import_authenticator = require("./model/authenticator");
var import_storer = require("./storer");
var import_token_blacklist = require("./token-blacklist");
var import_token_controller = require("./token-controller");
var import_constants = require("../constants");
class PluginAuthServer extends import_server.Plugin {
  cache;
  afterAdd() {
    this.app.on("afterLoad", async () => {
      if (this.app.authManager.tokenController) {
        return;
      }
      const cache = await this.app.cacheManager.createCache({
        name: "auth-token-controller",
        prefix: "auth-token-controller"
      });
      const tokenController = new import_token_controller.TokenController({ cache, app: this.app, logger: this.app.log });
      this.app.authManager.setTokenControlService(tokenController);
      const tokenPolicyRepo = this.app.db.getRepository(import_constants.tokenPolicyCollectionName);
      try {
        const res = await tokenPolicyRepo.findOne({ filterByTk: import_constants.tokenPolicyRecordKey });
        if (res) {
          this.app.authManager.tokenController.setConfig(res.config);
        }
      } catch (error) {
        this.app.logger.warn("access control config not exist, use default value");
      }
    });
  }
  async beforeLoad() {
    this.app.db.registerModels({ AuthModel: import_authenticator.AuthModel });
  }
  async load() {
    this.cache = await this.app.cacheManager.createCache({
      name: "auth",
      prefix: "auth",
      store: "memory"
    });
    const storer = new import_storer.Storer({
      app: this.app,
      db: this.db,
      cache: this.cache,
      authManager: this.app.authManager
    });
    this.app.authManager.setStorer(storer);
    if (!this.app.authManager.jwt.blacklist) {
      this.app.authManager.setTokenBlacklistService(new import_token_blacklist.TokenBlacklistService(this));
    }
    this.app.authManager.registerTypes(import_preset.presetAuthType, {
      auth: import_basic_auth.BasicAuth,
      title: (0, import_utils.tval)("Password", { ns: import_preset.namespace }),
      getPublicOptions: (options) => {
        var _a;
        const usersCollection = this.db.getCollection("users");
        let signupForm = ((_a = options == null ? void 0 : options.public) == null ? void 0 : _a.signupForm) || [];
        signupForm = signupForm.filter((item) => item.show);
        if (!(signupForm.length && signupForm.some(
          (item) => ["username", "email"].includes(item.field) && item.show && item.required
        ))) {
          signupForm.unshift({ field: "username", show: true, required: true });
        }
        signupForm = signupForm.filter((field) => field.show).map((item) => {
          var _a2;
          const field = usersCollection.getField(item.field);
          return {
            ...item,
            uiSchema: {
              ...(_a2 = field.options) == null ? void 0 : _a2.uiSchema,
              required: item.required
            }
          };
        });
        return {
          ...options == null ? void 0 : options.public,
          signupForm
        };
      }
    });
    Object.entries(import_auth.default).forEach(
      ([action, handler]) => {
        var _a;
        return (_a = this.app.resourceManager.getResource("auth")) == null ? void 0 : _a.addAction(action, handler);
      }
    );
    Object.entries(import_authenticators.default).forEach(
      ([action, handler]) => this.app.resourceManager.registerActionHandler(`authenticators:${action}`, handler)
    );
    ["signIn", "signUp"].forEach((action) => this.app.acl.allow("auth", action));
    ["check", "signOut", "changePassword"].forEach((action) => this.app.acl.allow("auth", action, "loggedIn"));
    this.app.acl.allow("authenticators", "publicList");
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.authenticators`,
      actions: ["authenticators:*"]
    });
    this.app.db.on("users.afterSave", async (user) => {
      const cache = this.app.cache;
      await cache.set(`auth:${user.id}`, user.toJSON());
    });
    this.app.db.on("users.afterDestroy", async (user) => {
      const cache = this.app.cache;
      await cache.del(`auth:${user.id}`);
    });
    this.app.on("cache:del:auth", async ({ userId }) => {
      await this.cache.del(`auth:${userId}`);
    });
    this.app.on("ws:message:auth:token", async ({ clientId, payload }) => {
      if (!payload || !payload.token || !payload.authenticator) {
        this.app.emit(`ws:removeTag`, {
          clientId,
          tagKey: "userId"
        });
        return;
      }
      const auth = await this.app.authManager.get(payload.authenticator, {
        getBearerToken: () => payload.token,
        app: this.app,
        db: this.app.db,
        cache: this.app.cache,
        logger: this.app.logger,
        log: this.app.log,
        throw: (...args) => {
          throw new Error(...args);
        },
        t: this.app.i18n.t
      });
      let user;
      try {
        user = (await auth.checkToken()).user;
      } catch (error) {
        if (!user) {
          this.app.logger.error(error);
          this.app.emit(`ws:removeTag`, {
            clientId,
            tagKey: "userId"
          });
          return;
        }
      }
      this.app.emit(`ws:setTag`, {
        clientId,
        tagKey: "userId",
        tagValue: user.id
      });
      this.app.emit(`ws:authorized`, {
        clientId,
        userId: user.id
      });
    });
    this.app.auditManager.registerActions([
      {
        name: "auth:signIn",
        getMetaData: async (ctx) => {
          var _a;
          let body = {};
          if (ctx.status === 200) {
            body = {
              data: {
                ...ctx.body.data,
                token: void 0
              }
            };
          } else {
            body = ctx.body;
          }
          return {
            request: {
              body: {
                ...(_a = ctx.request) == null ? void 0 : _a.body,
                password: void 0
              }
            }
          };
        },
        getUserInfo: async (ctx) => {
          var _a, _b;
          if (!((_b = (_a = ctx.body) == null ? void 0 : _a.data) == null ? void 0 : _b.user)) {
            return null;
          }
          const userId = ctx.body.data.user.id;
          const user = await ctx.db.getRepository("users").findOne({
            filterByTk: userId
          });
          const roles = await (user == null ? void 0 : user.getRoles());
          if (!roles) {
            return {
              userId
            };
          } else {
            if (roles.length === 1) {
              return {
                userId,
                roleName: roles[0].name
              };
            } else {
              return {
                userId
              };
            }
          }
        }
      },
      {
        name: "auth:signUp",
        getMetaData: async (ctx) => {
          var _a;
          return {
            request: {
              body: {
                ...(_a = ctx.request) == null ? void 0 : _a.body,
                password: void 0,
                confirm_password: void 0
              }
            }
          };
        }
      },
      {
        name: "auth:changePassword",
        getMetaData: async (ctx) => {
          return {
            request: {
              body: {}
            },
            response: {
              body: {}
            }
          };
        },
        getSourceAndTarget: async (ctx) => {
          return {
            targetCollection: "users",
            targetRecordUK: ctx.auth.user.id
          };
        }
      },
      "auth:signOut"
    ]);
    this.app.acl.registerSnippet({
      name: `pm.security.token-policy`,
      actions: [`${import_constants.tokenPolicyCollectionName}:*`]
    });
    this.app.db.on(`${import_constants.tokenPolicyCollectionName}.afterSave`, async (model) => {
      var _a;
      (_a = this.app.authManager.tokenController) == null ? void 0 : _a.setConfig(model.config);
    });
  }
  async install(options) {
    const authRepository = this.db.getRepository("authenticators");
    const exist = await authRepository.findOne({ filter: { name: import_preset.presetAuthenticator } });
    if (!exist) {
      await authRepository.create({
        values: {
          name: import_preset.presetAuthenticator,
          authType: import_preset.presetAuthType,
          description: "Sign in with username/email.",
          enabled: true,
          options: {
            public: {
              allowSignUp: true
            }
          }
        }
      });
    }
    const tokenPolicyRepo = this.app.db.getRepository(import_constants.tokenPolicyCollectionName);
    const res = await tokenPolicyRepo.findOne({ filterByTk: import_constants.tokenPolicyRecordKey });
    if (res) {
      return;
    }
    const config = {
      tokenExpirationTime: "1d",
      sessionExpirationTime: "7d",
      expiredTokenRenewLimit: "1d"
    };
    await tokenPolicyRepo.create({
      values: {
        key: import_constants.tokenPolicyRecordKey,
        config
      }
    });
  }
  async remove() {
  }
}
var plugin_default = PluginAuthServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginAuthServer
});
