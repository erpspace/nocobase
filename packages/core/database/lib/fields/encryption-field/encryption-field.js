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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var encryption_field_exports = {};
__export(encryption_field_exports, {
  EncryptionField: () => EncryptionField
});
module.exports = __toCommonJS(encryption_field_exports);
var import_sequelize = require("sequelize");
var import_EncryptionError = require("./errors/EncryptionError");
var import_utils = require("./utils");
var import_field = require("../field");
const _EncryptionField = class _EncryptionField extends import_field.Field {
  get dataType() {
    return import_sequelize.DataTypes.STRING;
  }
  init() {
    (0, import_utils.aesCheckKey)();
    const { name, iv } = this.options;
    this.writeListener = async (model) => {
      (0, import_utils.aesCheckKey)();
      if (!model.changed(name)) {
        return;
      }
      const value = model.get(name);
      if (value !== void 0 && value !== null) {
        try {
          const encrypted = await (0, import_utils.aesEncrypt)(value, iv);
          model.set(name, encrypted);
        } catch (error) {
          console.error(error);
          if (error instanceof import_EncryptionError.EncryptionError) {
            throw error;
          } else {
            throw new import_EncryptionError.EncryptionError("Encryption failed");
          }
        }
      } else {
        model.set(name, null);
      }
    };
    this.findListener = async (instances, options) => {
      (0, import_utils.aesCheckKey)();
      instances = Array.isArray(instances) ? instances : [instances];
      await Promise.all(
        instances.map(async (instance) => {
          var _a;
          const value = (_a = instance.get) == null ? void 0 : _a.call(instance, name);
          if (value !== void 0 && value !== null) {
            try {
              instance.set(name, await (0, import_utils.aesDecrypt)(value, iv));
            } catch (error) {
              console.error(error);
              if (error instanceof import_EncryptionError.EncryptionError) {
                throw error;
              } else {
                throw new import_EncryptionError.EncryptionError(
                  "Decryption failed, the environment variable `ENCRYPTION_FIELD_KEY` may be incorrect"
                );
              }
            }
          }
          return instance;
        })
      );
    };
  }
  bind() {
    super.bind();
    this.on("afterFind", this.findListener);
    this.on("beforeSave", this.writeListener);
    this.on("beforeBulkCreate", this.writeListener);
  }
  unbind() {
    super.unbind();
    this.off("afterFind", this.findListener);
    this.off("beforeSave", this.writeListener);
    this.off("beforeBulkCreate", this.writeListener);
  }
};
__name(_EncryptionField, "EncryptionField");
let EncryptionField = _EncryptionField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EncryptionField
});
