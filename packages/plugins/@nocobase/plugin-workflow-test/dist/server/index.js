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
var server_exports = {};
__export(server_exports, {
  default: () => WorkflowTestPlugin,
  getApp: () => getApp,
  getCluster: () => getCluster,
  sleep: () => import_test2.sleep
});
module.exports = __toCommonJS(server_exports);
var import_path = __toESM(require("path"));
var import_server = require("@nocobase/server");
var import_test = require("@nocobase/test");
var import_functions = __toESM(require("./functions"));
var import_triggers = __toESM(require("./triggers"));
var import_instructions = __toESM(require("./instructions"));
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_utils = require("@nocobase/utils");
var import_test2 = require("@nocobase/test");
class TestCollectionPlugin extends import_server.Plugin {
  async load() {
    if (this.options.collectionsPath) {
      await this.db.import({ directory: this.options.collectionsPath });
    }
  }
}
async function getApp({
  plugins = [],
  collectionsPath,
  ...options
} = {}) {
  const app = await (0, import_test.createMockServer)({
    ...options,
    plugins: [
      "field-sort",
      [
        "workflow",
        {
          triggers: import_triggers.default,
          instructions: import_instructions.default,
          functions: import_functions.default
        }
      ],
      "workflow-test",
      [TestCollectionPlugin, { collectionsPath }],
      ...plugins
    ]
  });
  await app.dataSourceManager.add(
    new import_data_source_manager.SequelizeDataSource({
      name: "another",
      collectionManager: {
        database: (0, import_test.mockDatabase)({
          tablePrefix: `t${(0, import_utils.uid)(5)}`
        })
      },
      resourceManager: {}
    })
  );
  const another = app.dataSourceManager.dataSources.get("another");
  const anotherDB = another.collectionManager.db;
  await anotherDB.import({
    directory: import_path.default.resolve(__dirname, "collections")
  });
  await anotherDB.sync();
  another.acl.allow("*", "*", "loggedIn");
  return app;
}
async function getCluster({ plugins = [], collectionsPath, ...options }) {
  return (0, import_test.createMockCluster)({
    ...options,
    plugins: [
      [
        "workflow",
        {
          triggers: import_triggers.default,
          instructions: import_instructions.default,
          functions: import_functions.default
        }
      ],
      "workflow-test",
      [TestCollectionPlugin, { collectionsPath }],
      ...plugins
    ]
  });
}
class WorkflowTestPlugin extends import_server.Plugin {
  async load() {
    await this.importCollections(import_path.default.resolve(__dirname, "collections"));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getApp,
  getCluster,
  sleep
});
