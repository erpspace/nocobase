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
var manual_collection_block_exports = {};
__export(manual_collection_block_exports, {
  default: () => manual_collection_block_default
});
module.exports = __toCommonJS(manual_collection_block_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
function findSchema(root, filter, onlyLeaf = false) {
  const result = [];
  if (!root) {
    return result;
  }
  if (filter(root) && (!onlyLeaf || !root.properties)) {
    result.push(root);
    return result;
  }
  if (root.properties) {
    Object.keys(root.properties).forEach((key) => {
      result.push(...findSchema(root.properties[key], filter));
    });
  }
  return result;
}
function migrateSchema(schema = {}) {
  const root = { properties: schema };
  const collectionBlocks = findSchema(root, (item) => {
    return item["x-component"] === "CardItem" && item["x-designer"] === "SimpleDesigner" && item["x-decorator"] === "CollectionProvider_deprecated";
  });
  collectionBlocks.forEach((block) => {
    const id = (0, import_utils.uid)();
    const { grid } = block.properties;
    delete block.properties.grid;
    const fields = findSchema(grid, (item) => {
      return item["x-decorator"] === "FormItem";
    });
    fields.forEach((field) => {
      Object.assign(field, {
        "x-component": "CollectionField",
        "x-collection-field": `${block["x-decorator-props"].collection}.${field["x-collection-field"]}`
      });
    });
    Object.assign(block, {
      "x-decorator": "DetailsBlockProvider",
      "x-decorator-props": {
        ...block["x-decorator-props"],
        dataSource: grid["x-context-datasource"]
      },
      properties: {
        [id]: {
          type: "void",
          name: id,
          "x-component": "FormV2",
          "x-use-component-props": "useDetailsBlockProps",
          properties: {
            grid: {
              type: "void",
              name: "grid",
              "x-component": "Grid",
              "x-initializer": "details:configureFields",
              properties: grid.properties
            }
          }
        }
      }
    });
  });
  const customForms = findSchema(root, (item) => {
    return item["x-decorator"] === "FormCollectionProvider";
  });
  customForms.forEach((item) => {
    Object.assign(item, {
      "x-decorator": "CustomFormBlockProvider"
    });
  });
  const customFormFields = findSchema(root, (item) => {
    return item["x-interface-options"];
  });
  customFormFields.forEach((field) => {
    const options = field["x-interface-options"];
    delete field["x-interface-options"];
    Object.assign(field, {
      "x-component-props": {
        field: options
      }
    });
  });
  return schema;
}
class manual_collection_block_default extends import_server.Migration {
  appVersion = "<0.9.4-alpha.3";
  async up() {
    const match = await this.app.version.satisfies("<0.9.4-alpha.3");
    if (!match) {
      return;
    }
    const { db } = this.context;
    const NodeRepo = db.getRepository("flow_nodes");
    await NodeRepo.collection.sync();
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: "manual"
        },
        transaction
      });
      console.log("%d nodes need to be migrated.", nodes.length);
      await nodes.reduce(
        (promise, node) => promise.then(() => {
          const { schema, ...config } = node.config;
          node.set("config", {
            ...config,
            schema: {
              ...migrateSchema(schema)
            }
          });
          node.changed("config", true);
          return node.save({
            silent: true,
            transaction
          });
        }),
        Promise.resolve()
      );
    });
  }
}
