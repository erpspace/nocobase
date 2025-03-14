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
var plugin_exports = {};
__export(plugin_exports, {
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_data_source_manager = require("@nocobase/data-source-manager");
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
var import_tree_collection = require("./tree-collection");
class PluginCollectionTreeServer extends import_server.Plugin {
  async beforeLoad() {
    const condition = (options) => {
      return options.tree;
    };
    this.app.db.collectionFactory.registerCollectionType(import_tree_collection.TreeCollection, {
      condition
    });
    this.app.dataSourceManager.afterAddDataSource((dataSource) => {
      const collectionManager = dataSource.collectionManager;
      if (collectionManager instanceof import_data_source_manager.SequelizeCollectionManager) {
        collectionManager.db.on("afterDefineCollection", (collection) => {
          var _a;
          if (!condition(collection.options)) {
            return;
          }
          const name = `${dataSource.name}_${collection.name}_path`;
          const parentForeignKey = ((_a = collection.treeParentField) == null ? void 0 : _a.foreignKey) || "parentId";
          const options = {};
          options["mainCollection"] = collection.name;
          if (collection.options.schema) {
            options["schema"] = collection.options.schema;
          }
          this.defineTreePathCollection(name, options);
          collectionManager.db.on(`${collection.name}.afterSync`, async ({ transaction }) => {
            await this.db.getCollection(name).sync({ transaction });
          });
          this.db.on(`${collection.name}.afterCreate`, async (model, options2) => {
            const { transaction } = options2;
            const tk = collection.filterTargetKey;
            let path = `/${model.get(tk)}`;
            path = await this.getTreePath(model, path, collection, name, transaction);
            const rootPk = path.split("/")[1];
            await this.app.db.getRepository(name).create({
              values: {
                nodePk: model.get(tk),
                path,
                rootPk: rootPk ? Number(rootPk) : null
              },
              transaction
            });
          });
          this.db.on(`${collection.name}.afterUpdate`, async (model, options2) => {
            const tk = collection.filterTargetKey;
            if (!(model._changed.has(tk) || model._changed.has(parentForeignKey))) {
              return;
            }
            const { transaction } = options2;
            await this.updateTreePath(model, collection, name, transaction);
          });
          this.db.on(`${collection.name}.afterBulkUpdate`, async (options2) => {
            const tk = collection.filterTargetKey;
            if (!(options2.where && options2.where[tk])) {
              return;
            }
            const instances = await this.db.getRepository(collection.name).find({
              where: {
                [tk]: options2.where[tk]
              },
              transaction: options2.transaction
            });
            for (const model of instances) {
              await this.updateTreePath(model, collection, name, options2.transaction);
            }
          });
          this.db.on(`${collection.name}.afterDestroy`, async (model, options2) => {
            const tk = collection.filterTargetKey;
            await this.app.db.getRepository(name).destroy({
              filter: {
                nodePk: model.get(tk)
              },
              transaction: options2.transaction
            });
          });
          this.db.on(`${collection.name}.beforeSave`, async (model) => {
            const tk = collection.filterTargetKey;
            if (model.get(parentForeignKey) === model.get(tk)) {
              throw new Error("Cannot set itself as the parent node");
            }
          });
        });
      }
    });
    this.db.on("collections.afterDestroy", async (collection, { transaction }) => {
      const name = `main_${collection.get("name")}_path`;
      if (!condition(collection.options)) {
        return;
      }
      const collectionTree = this.db.getCollection(name);
      if (collectionTree) {
        await this.db.getCollection(name).removeFromDb({ transaction });
      }
    });
  }
  async defineTreePathCollection(name, options) {
    this.db.collection({
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
      ],
      ...options
    });
  }
  async getTreePath(model, path, collection, pathCollectionName, transaction) {
    var _a;
    const tk = collection.filterTargetKey;
    const parentForeignKey = ((_a = collection.treeParentField) == null ? void 0 : _a.foreignKey) || "parentId";
    if (model.get(parentForeignKey) && model.get(parentForeignKey) !== null) {
      const parent = await this.app.db.getRepository(collection.name).findOne({
        filter: {
          [tk]: model.get(parentForeignKey)
        },
        transaction
      });
      if (parent && parent.get(parentForeignKey) !== model.get(tk)) {
        path = `/${parent.get(tk)}${path}`;
        if (parent.get(parentForeignKey) !== null) {
          const collectionTreePath = this.app.db.getCollection(pathCollectionName);
          const nodePkColumnName = collectionTreePath.getField("nodePk").columnName();
          const parentPathData = await this.app.db.getRepository(pathCollectionName).findOne({
            filter: {
              [nodePkColumnName]: parent.get(tk)
            },
            transaction
          });
          const parentPath = import_lodash.default.get(parentPathData, "path", null);
          if (parentPath == null) {
            path = await this.getTreePath(parent, path, collection, pathCollectionName, transaction);
          } else {
            path = `${parentPath}/${model.get(tk)}`;
          }
        }
      }
    }
    return path;
  }
  async updateTreePath(model, collection, pathCollectionName, transaction) {
    const tk = collection.filterTargetKey;
    let path = `/${model.get(tk)}`;
    path = await this.getTreePath(model, path, collection, pathCollectionName, transaction);
    const collectionTreePath = this.db.getCollection(pathCollectionName);
    const nodePkColumnName = collectionTreePath.getField("nodePk").columnName();
    const pathData = await this.app.db.getRepository(pathCollectionName).findOne({
      filter: {
        [nodePkColumnName]: model.get(tk)
      },
      transaction
    });
    const relatedNodes = await this.app.db.getRepository(pathCollectionName).find({
      filter: {
        path: {
          $startsWith: `${pathData.get("path")}`
        }
      },
      transaction
    });
    const rootPk = path.split("/")[1];
    for (const node of relatedNodes) {
      const newPath = node.get("path").replace(pathData.get("path"), path);
      await this.app.db.getRepository(pathCollectionName).update({
        values: {
          path: newPath,
          rootPk: rootPk ? Number(rootPk) : null
        },
        filter: {
          [nodePkColumnName]: node.get("nodePk")
        },
        transaction
      });
    }
  }
}
var plugin_default = PluginCollectionTreeServer;
