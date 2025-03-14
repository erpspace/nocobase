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
var change_request_body_type_exports = {};
__export(change_request_body_type_exports, {
  default: () => change_request_body_type_default
});
module.exports = __toCommonJS(change_request_body_type_exports);
var import_server = require("@nocobase/server");
const EJS_RE = /"?<%=\s*(ctx|node)([\w\.\[\]-]+)\s*.*%>"?/;
function migrateData(input) {
  if (typeof input !== "string") {
    return input;
  }
  if (!input) {
    return null;
  }
  const typeMap = {
    ctx: "$context",
    node: "$jobsMapByNodeId"
  };
  return input.replace(EJS_RE, (_, type, path) => {
    if (type === "ctx") {
      return `"{{$context${path}}}"`;
    }
    if (type === "node") {
      return `"{{$jobsMapByNodeId${path.replace("[", ".").replace("]", ".").replace(/\.$/, "")}}}"`;
    }
    return _;
  });
}
class change_request_body_type_default extends import_server.Migration {
  appVersion = "<0.9.0-alpha.3";
  async up() {
    const match = await this.app.version.satisfies("<0.9.0-alpha.3");
    if (!match) {
      return;
    }
    const NodeRepo = this.context.db.getRepository("flow_nodes");
    await this.context.db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: "request"
        },
        transaction
      });
      console.log("%d nodes need to be migrated.", nodes.length);
      await nodes.reduce(
        (promise, node) => promise.then(async () => {
          if (typeof node.config.data !== "string") {
            return;
          }
          let data = migrateData(node.config.data);
          try {
            data = JSON.parse(node.config.data);
            return node.update(
              {
                config: {
                  ...node.config,
                  data
                }
              },
              {
                transaction
              }
            );
          } catch (error) {
            console.error(
              `flow_node #${node.id} config migrating failed! you should migrate its format from ejs to json-templates manually in your db.`
            );
          }
        }),
        Promise.resolve()
      );
    });
  }
  async down() {
  }
}
