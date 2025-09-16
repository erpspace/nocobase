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
var to_many_value_parser_exports = {};
__export(to_many_value_parser_exports, {
  ToManyValueParser: () => ToManyValueParser
});
module.exports = __toCommonJS(to_many_value_parser_exports);
var import_path = require("path");
var import_base_value_parser = require("./base-value-parser");
const _ToManyValueParser = class _ToManyValueParser extends import_base_value_parser.BaseValueParser {
  setAccessors = {
    attachment: "setAttachments",
    chinaRegion: "setChinaRegion"
  };
  async setAttachments(value) {
    this.value = this.toArr(value).map((url) => {
      return {
        title: (0, import_path.basename)(url),
        extname: (0, import_path.extname)(url),
        filename: (0, import_path.basename)(url),
        url
      };
    });
  }
  async setChinaRegion(value) {
    const repository = this.field.database.getRepository(this.field.target);
    try {
      const values = [];
      const names = this.toArr(value, "/");
      let parentCode = null;
      for (const name of names) {
        const instance = await repository.findOne({
          filter: {
            name: name.trim(),
            parentCode
          }
        });
        if (!instance) {
          throw new Error(`"${value}" does not exist`);
        }
        parentCode = instance.get("code");
        values.push(parentCode);
      }
      if (values.length !== names.length) {
        throw new Error(`"${value}" does not exist`);
      }
      this.value = values;
    } catch (error) {
      this.errors.push(error.message);
    }
  }
  async setAssociations(value) {
    var _a, _b;
    const dataIndex = ((_b = (_a = this.ctx) == null ? void 0 : _a.column) == null ? void 0 : _b.dataIndex) || [];
    if (Array.isArray(dataIndex) && dataIndex.length < 2) {
      this.errors.push(`data index invalid`);
      return;
    }
    const key = this.ctx.column.dataIndex[1];
    const repository = this.field.database.getRepository(this.field.target);
    try {
      this.value = await Promise.all(
        this.toArr(value).map(async (v) => {
          const instance = await repository.findOne({ filter: { [key]: v } });
          if (!instance) {
            throw new Error(`"${v}" does not exist`);
          }
          return instance.get(this.field.targetKey || "id");
        })
      );
    } catch (error) {
      this.errors.push(error.message);
    }
  }
  async setValue(value) {
    const setAccessor = this.setAccessors[this.getInterface()] || "setAssociations";
    await this[setAccessor](value);
  }
  getInterface() {
    var _a, _b;
    return (_b = (_a = this.field) == null ? void 0 : _a.options) == null ? void 0 : _b.interface;
  }
  isInterface(name) {
    return this.getInterface() === name;
  }
};
__name(_ToManyValueParser, "ToManyValueParser");
let ToManyValueParser = _ToManyValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToManyValueParser
});
