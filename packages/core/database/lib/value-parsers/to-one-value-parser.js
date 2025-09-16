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
var to_one_value_parser_exports = {};
__export(to_one_value_parser_exports, {
  ToOneValueParser: () => ToOneValueParser
});
module.exports = __toCommonJS(to_one_value_parser_exports);
var import_base_value_parser = require("./base-value-parser");
const _ToOneValueParser = class _ToOneValueParser extends import_base_value_parser.BaseValueParser {
  async setValue(value) {
    var _a, _b;
    const dataIndex = ((_b = (_a = this.ctx) == null ? void 0 : _a.column) == null ? void 0 : _b.dataIndex) || [];
    if (Array.isArray(dataIndex) && dataIndex.length < 2) {
      this.errors.push(`data index invalid`);
      return;
    }
    const key = this.ctx.column.dataIndex[1];
    const repository = this.field.database.getRepository(this.field.target);
    const instance = await repository.findOne({ filter: { [key]: this.trim(value) } });
    if (instance) {
      this.value = instance.get(this.field.targetKey || "id");
    } else {
      this.errors.push(`"${value}" does not exist`);
    }
  }
};
__name(_ToOneValueParser, "ToOneValueParser");
let ToOneValueParser = _ToOneValueParser;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToOneValueParser
});
