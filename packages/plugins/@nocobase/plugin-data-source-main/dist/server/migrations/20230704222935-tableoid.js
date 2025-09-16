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
var tableoid_exports = {};
__export(tableoid_exports, {
  default: () => tableoid_default
});
module.exports = __toCommonJS(tableoid_exports);
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
/* istanbul ignore file -- @preserve */
class tableoid_default extends import_server.Migration {
  appVersion = "<0.10.1-alpha.1";
  async up() {
    var _a;
    if (!this.db.inDialect("postgres")) {
      return;
    }
    const repository = this.db.getRepository("collections");
    let names = [];
    const items = await repository.find();
    for (const item of items) {
      if (Array.isArray((_a = item.options) == null ? void 0 : _a.inherits) && item.options.inherits.length) {
        names.push(item.name);
        names.push(...item.options.inherits);
      }
    }
    names = import_lodash.default.uniq(names);
    console.log("collection names:", names);
    for (const name of names) {
      const fieldRepository = this.db.getRepository("fields");
      await fieldRepository.firstOrCreate({
        values: {
          collectionName: name,
          name: "__collection",
          type: "virtual",
          interface: "tableoid",
          uiSchema: {
            type: "string",
            title: '{{t("Table OID")}}',
            "x-component": "CollectionSelect",
            "x-component-props": { isTableOid: true },
            "x-read-pretty": true
          }
        },
        filterKeys: ["name", "collectionName"]
      });
    }
  }
}
