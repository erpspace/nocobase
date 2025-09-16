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
var mock_data_source_exports = {};
__export(mock_data_source_exports, {
  MockDataSource: () => MockDataSource
});
module.exports = __toCommonJS(mock_data_source_exports);
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_test = require("@nocobase/test");
const _MockDataSource = class _MockDataSource extends import_data_source_manager.DataSource {
  static testConnection(options) {
    return Promise.resolve(true);
  }
  async load() {
    await (0, import_test.waitSecond)(1e3);
  }
  createCollectionManager(options) {
    return new import_data_source_manager.CollectionManager(options);
  }
};
__name(_MockDataSource, "MockDataSource");
let MockDataSource = _MockDataSource;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MockDataSource
});
