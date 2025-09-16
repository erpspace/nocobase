/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var verification_manager_exports = {};
__export(verification_manager_exports, {
  VerificationManager: () => VerificationManager
});
module.exports = __toCommonJS(verification_manager_exports);
var import_utils = require("@nocobase/utils");
class VerificationManager {
  db;
  verificationTypes = new import_utils.Registry();
  scenes = new import_utils.Registry();
  sceneRules = new Array();
  actions = new import_utils.Registry();
  constructor({ db }) {
    this.db = db;
  }
  registerVerificationType(type, options) {
    this.verificationTypes.register(type, options);
  }
  listTypes() {
    return Array.from(this.verificationTypes.getEntities()).map(([verificationType, options]) => ({
      name: verificationType,
      title: options.title
    }));
  }
  addSceneRule(rule) {
    this.sceneRules.push(rule);
  }
  registerAction(action, options) {
    this.actions.register(action, options);
  }
  registerScene(scene, options) {
    this.scenes.register(scene, options);
    const { actions } = options;
    for (const [action, actionOptions] of Object.entries(actions)) {
      this.actions.register(action, {
        ...actionOptions,
        scene
      });
    }
  }
  getVerificationTypesByScene(scene) {
    const verificationTypes = [];
    for (const [type, options] of this.verificationTypes.getEntities()) {
      const item = { type, title: options.title };
      if (this.sceneRules.some((rule) => rule(scene, type))) {
        verificationTypes.push(item);
      }
    }
    return verificationTypes;
  }
  getVerification(type) {
    const verificationType = this.verificationTypes.get(type);
    if (!verificationType) {
      throw new Error(`Invalid verification type: ${type}`);
    }
    return verificationType.verification;
  }
  async getVerifier(verifierName) {
    return await this.db.getRepository("verifiers").findOne({
      filter: {
        name: verifierName
      }
    });
  }
  async getVerifiers(verifierNames) {
    return await this.db.getRepository("verifiers").find({
      filter: {
        name: verifierNames
      }
    });
  }
  async getBoundRecord(userId, verifier) {
    return await this.db.getRepository("usersVerifiers").findOne({
      filter: {
        userId,
        verifier
      }
    });
  }
  async getAndValidateBoundInfo(ctx, action, verification) {
    var _a, _b;
    let userId;
    let boundInfo;
    if (action.getBoundInfoFromCtx) {
      boundInfo = await action.getBoundInfoFromCtx(ctx);
    } else {
      if (action.getUserIdFromCtx) {
        userId = await action.getUserIdFromCtx(ctx);
      } else {
        userId = (_b = (_a = ctx.auth) == null ? void 0 : _a.user) == null ? void 0 : _b.id;
      }
      if (!userId) {
        ctx.throw(400, "Invalid user id");
      }
      boundInfo = await verification.getBoundInfo(userId);
    }
    await verification.validateBoundInfo(boundInfo);
    return { boundInfo, userId };
  }
  async validateAndGetVerifier(ctx, scene, verifierName) {
    let verifier;
    if (!verifierName) {
      return null;
    }
    if (scene) {
      const sceneOptions = this.scenes.get(scene);
      if (sceneOptions.getVerifiers) {
        const verifiers = await sceneOptions.getVerifiers(ctx);
        if (!verifiers.includes(verifierName)) {
          return null;
        }
        verifier = await this.getVerifier(verifierName);
        if (!verifier) {
          return null;
        }
      } else {
        const verificationTypes = this.getVerificationTypesByScene(scene);
        const verifiers = await this.db.getRepository("verifiers").find({
          filter: {
            verificationType: verificationTypes.map((item) => item.type)
          }
        });
        verifier = verifiers.find((item) => item.name === verifierName);
        if (!verifier) {
          return null;
        }
      }
    } else {
      verifier = await this.getVerifier(verifierName);
      if (!verifier) {
        return null;
      }
    }
    return verifier;
  }
  // verify manually
  async verify(ctx, next) {
    var _a, _b;
    const { resourceName, actionName } = ctx.action;
    const key = `${resourceName}:${actionName}`;
    const action = this.actions.get(key);
    if (!action) {
      ctx.throw(400, "Invalid action");
    }
    const { verifier: verifierName } = ctx.action.params.values || {};
    const verifier = await this.validateAndGetVerifier(ctx, action.scene, verifierName);
    if (!verifier) {
      ctx.throw(400, "Invalid verifier");
    }
    const verifyParams = action.getVerifyParams ? await action.getVerifyParams(ctx) : ctx.action.params.values;
    if (!verifyParams) {
      ctx.throw(400, "Invalid verify params");
    }
    const plugin = ctx.app.pm.get("verification");
    const verificationManager = plugin.verificationManager;
    const Verification2 = verificationManager.getVerification(verifier.verificationType);
    const verification = new Verification2({ ctx, verifier, options: verifier.options });
    const { boundInfo, userId } = await this.getAndValidateBoundInfo(ctx, action, verification);
    try {
      const verifyResult = await verification.verify({
        resource: resourceName,
        action: actionName,
        userId,
        boundInfo,
        verifyParams
      });
      try {
        await ((_a = action.onVerifySuccess) == null ? void 0 : _a.call(action, ctx, userId, verifyResult));
        await next();
      } catch (err) {
        ctx.log.error(err, { module: "verification", method: "verify" });
        throw err;
      } finally {
        await verification.onActionComplete({ userId, verifyResult });
      }
    } catch (err) {
      await ((_b = action.onVerifyFail) == null ? void 0 : _b.call(action, ctx, err, userId));
      throw err;
    }
  }
  middleware() {
    const self = this;
    return async function verificationMiddleware(ctx, next) {
      const { resourceName, actionName } = ctx.action;
      const key = `${resourceName}:${actionName}`;
      const action = self.actions.get(key);
      if (!action || action.manual) {
        return next();
      }
      return self.verify(ctx, next);
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  VerificationManager
});
