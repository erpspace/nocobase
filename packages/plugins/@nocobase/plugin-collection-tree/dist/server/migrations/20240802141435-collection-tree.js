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
var collection_tree_exports = {};
__export(collection_tree_exports, {
  default: () => collection_tree_default
});
module.exports = __toCommonJS(collection_tree_exports);
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
class collection_tree_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<=1.3.0-beta";
  async getTreeCollections({ transaction }) {
    const treeCollections = await this.app.db.getRepository("collections").find({
      appends: ["fields"],
      filter: {
        "options.tree": "adjacencyList"
      },
      transaction
    });
    return treeCollections;
  }
  async up() {
    await this.db.sequelize.transaction(async (transaction) => {
      const treeCollections = await this.getTreeCollections({ transaction });
      for (const treeCollection of treeCollections) {
        const name = `main_${treeCollection.name}_path`;
        const collectionOptions = {
          name,
          autoGenId: false,
          timestamps: false,
          fields: [
            { type: "integer", name: "nodePk" },
            { type: "string", name: "path", length: 1024 },
            { type: "integer", name: "rootPk" }
          ],
          indexes: [
            {
              fields: [{ name: "path", length: 191 }]
            }
          ]
        };
        const collectionInstance = this.db.getCollection(treeCollection.name);
        const treeCollectionSchema = collectionInstance.collectionSchema();
        if (this.app.db.inDialect("postgres") && treeCollectionSchema != this.app.db.options.schema) {
          collectionOptions["schema"] = treeCollectionSchema;
        }
        this.app.db.collection(collectionOptions);
        const treeExistsInDb = await this.app.db.getCollection(name).existsInDb({ transaction });
        if (!treeExistsInDb) {
          await this.app.db.getCollection(name).sync({ transaction });
          const opts = {
            name: treeCollection.name,
            autoGenId: false,
            timestamps: false,
            fields: [
              { type: "integer", name: "id" },
              { type: "integer", name: "parentId" }
            ]
          };
          if (treeCollectionSchema != this.app.db.options.schema) {
            opts["schema"] = treeCollectionSchema;
          }
          this.app.db.collection(opts);
          const chunkSize = 1e3;
          await this.app.db.getRepository(treeCollection.name).chunk({
            chunkSize,
            callback: async (rows, options) => {
              const pathData = [];
              for (const data of rows) {
                let path = `/${data.get("id")}`;
                path = await this.getTreePath(data, path, treeCollection, name, transaction);
                pathData.push({
                  nodePk: data.get("id"),
                  path,
                  rootPk: path.split("/")[1]
                });
              }
              await this.app.db.getModel(name).bulkCreate(pathData, { transaction });
            },
            transaction
          });
        }
      }
    });
  }
  async getTreePath(model, path, collection, pathCollectionName, transaction) {
    if (model.get("parentId") !== null) {
      const parent = await this.app.db.getRepository(collection.name).findOne({
        filter: {
          id: model.get("parentId")
        },
        transaction
      });
      if (parent && parent.get("parentId") !== model.get("id")) {
        path = `/${parent.get("id")}${path}`;
        const collectionTreePath = this.app.db.getCollection(pathCollectionName);
        const nodePkColumnName = collectionTreePath.getField("nodePk").columnName();
        const parentPathData = await this.app.db.getRepository(pathCollectionName).findOne({
          filter: {
            [nodePkColumnName]: parent.get("id")
          },
          transaction
        });
        const parentPath = import_lodash.default.get(parentPathData, "path", null);
        if (parentPath == null) {
          path = await this.getTreePath(parent, path, collection, pathCollectionName, transaction);
        } else {
          path = `${parentPath}/${model.get("id")}`;
        }
      }
    }
    return path;
  }
}
