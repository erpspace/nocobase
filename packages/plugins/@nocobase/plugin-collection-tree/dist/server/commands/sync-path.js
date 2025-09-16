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
var sync_path_exports = {};
__export(sync_path_exports, {
  default: () => sync_path_default,
  getTreePath: () => getTreePath
});
module.exports = __toCommonJS(sync_path_exports);
var import_lodash = __toESM(require("lodash"));
async function getTreePath(db, model, path, collection, pathCollectionName, transaction) {
  if (model.get("parentId") !== null) {
    const parent = await db.getRepository(collection).findOne({
      filter: { id: model.get("parentId") },
      transaction
    });
    if (parent && parent.get("parentId") !== model.get("id")) {
      const collectionTreePath = db.getCollection(pathCollectionName);
      const nodePkColumnName = collectionTreePath.getField("nodePk").columnName();
      const parentPathData = await db.getRepository(pathCollectionName).findOne({
        filter: { [nodePkColumnName]: parent.get("id") },
        transaction
      });
      const parentPath = import_lodash.default.get(parentPathData, "path", null);
      if (parentPath == null) {
        const parentFullPath = await getTreePath(
          db,
          parent,
          `/${parent.get("id")}`,
          collection,
          pathCollectionName,
          transaction
        );
        path = `${parentFullPath}/${model.get("id")}`;
      } else {
        path = `${parentPath}/${model.get("id")}`;
      }
    }
  }
  return path;
}
function sync_path_default(app) {
  app.command("tree-collection:sync-path").preload().option("-c, --collection [collection]").action(async (options) => {
    const { collection: name } = options || {};
    const mainData = app.pm.get("data-source-main");
    mainData.setLoadFilter({
      name
    });
    await app.emitAsync("beforeStart");
    if (!name) {
      throw new Error("Collection name is required");
    }
    const collection = app.db.getCollection(name);
    if (!collection) {
      throw new Error(`Collection ${name} not found`);
    }
    const isTree = collection.options.tree;
    if (!isTree) {
      throw new Error(`Collection ${name} is not a tree collection`);
    }
    const pathTableName = `main_${name}_path`;
    const pathRepo = app.db.getRepository(pathTableName);
    const nodeRepo = app.db.getRepository(name);
    const chunkSize = 1e3;
    await app.db.sequelize.transaction(async (transaction) => {
      await pathRepo.destroy({ truncate: true, transaction });
      console.log(`Truncated table ${pathTableName}`);
      await nodeRepo.chunk({
        chunkSize,
        callback: async (records, options2) => {
          const toInsert = [];
          for (const record of records) {
            const id = record.get("id");
            let path = `/${id}`;
            path = await getTreePath(app.db, record, path, name, pathTableName, transaction);
            toInsert.push({
              nodePk: id,
              path,
              rootPk: path.split("/")[1]
            });
          }
          if (toInsert.length > 0) {
            await app.db.getModel(pathTableName).bulkCreate(toInsert, { transaction });
            console.log(`Inserted ${toInsert.length} records into ${pathTableName}`);
          }
        },
        transaction
      });
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getTreePath
});
