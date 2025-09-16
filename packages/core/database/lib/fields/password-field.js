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
var password_field_exports = {};
__export(password_field_exports, {
  PasswordField: () => PasswordField
});
module.exports = __toCommonJS(password_field_exports);
var import_crypto = __toESM(require("crypto"));
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _PasswordField = class _PasswordField extends import_field.Field {
  get dataType() {
    return import_sequelize.DataTypes.STRING;
  }
  async verify(password, hash) {
    password = password || "";
    hash = hash || "";
    const { length = 64, randomBytesSize = 8 } = this.options;
    return new Promise((resolve, reject) => {
      const salt = hash.substring(0, randomBytesSize * 2);
      const key = hash.substring(randomBytesSize * 2);
      import_crypto.default.scrypt(password, salt, length / 2 - randomBytesSize, (err, derivedKey) => {
        if (err) reject(err);
        resolve(key == derivedKey.toString("hex"));
      });
    });
  }
  async hash(password) {
    const { length = 64, randomBytesSize = 8 } = this.options;
    return new Promise((resolve, reject) => {
      const salt = import_crypto.default.randomBytes(randomBytesSize).toString("hex");
      import_crypto.default.scrypt(password, salt, length / 2 - randomBytesSize, (err, derivedKey) => {
        if (err) reject(err);
        resolve(salt + derivedKey.toString("hex"));
      });
    });
  }
  init() {
    const { name } = this.options;
    this.listener = async (instances) => {
      instances = Array.isArray(instances) ? instances : [instances];
      for (const instance of instances) {
        if (!instance.changed(name)) {
          continue;
        }
        const value = instance.get(name);
        if (value) {
          const hash = await this.hash(value);
          instance.set(name, hash);
        } else {
          instance.set(name, instance.previous(name));
        }
      }
    };
  }
  bind() {
    super.bind();
    this.on("beforeCreate", this.listener);
    this.on("beforeBulkCreate", this.listener);
    this.on("beforeUpdate", this.listener);
  }
  unbind() {
    super.unbind();
    this.off("beforeCreate", this.listener);
    this.off("beforeBulkCreate", this.listener);
    this.off("beforeUpdate", this.listener);
  }
};
__name(_PasswordField, "PasswordField");
let PasswordField = _PasswordField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PasswordField
});
