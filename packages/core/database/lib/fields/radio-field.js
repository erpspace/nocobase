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
var radio_field_exports = {};
__export(radio_field_exports, {
  RadioField: () => RadioField
});
module.exports = __toCommonJS(radio_field_exports);
var import_sequelize = require("sequelize");
var import_field = require("./field");
const _RadioField = class _RadioField extends import_field.Field {
  get dataType() {
    return import_sequelize.DataTypes.BOOLEAN;
  }
  listener = /* @__PURE__ */ __name(async (model, { transaction }) => {
    const { name } = this.options;
    if (!model.changed(name)) {
      return;
    }
    const value = model.get(name);
    if (value) {
      const M = this.collection.model;
      await M.update(
        { [name]: false },
        {
          where: {
            [name]: true
          },
          transaction,
          hooks: false
        }
      );
    }
  }, "listener");
  bind() {
    super.bind();
    this.on("beforeCreate", this.listener);
    this.on("beforeUpdate", this.listener);
  }
  unbind() {
    super.unbind();
    this.off("beforeCreate", this.listener);
    this.off("beforeUpdate", this.listener);
  }
};
__name(_RadioField, "RadioField");
let RadioField = _RadioField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RadioField
});
