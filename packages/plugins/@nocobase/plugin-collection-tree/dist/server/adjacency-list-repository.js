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
var adjacency_list_repository_exports = {};
__export(adjacency_list_repository_exports, {
  AdjacencyListRepository: () => AdjacencyListRepository
});
module.exports = __toCommonJS(adjacency_list_repository_exports);
var import_database = require("@nocobase/database");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
class AdjacencyListRepository extends import_database.Repository {
  async update(options) {
    return super.update({
      ...options || {},
      addIndex: false
    });
  }
  buildRootNodeDataMap(nodeData) {
    const rootPathDataMap = {};
    for (const node of nodeData) {
      const rootPk = node.get("rootPk");
      const pathSet = new Set(
        node.get("path").split("/").filter((item) => item !== "")
      );
      if (rootPathDataMap[rootPk]) {
        const set = rootPathDataMap[rootPk];
        for (const path of pathSet) {
          set.add(path);
        }
        rootPathDataMap[rootPk] = set;
      } else {
        rootPathDataMap[rootPk] = pathSet;
      }
    }
    return rootPathDataMap;
  }
  async buildTree(paths, options = {}, rootNodes) {
    var _a;
    const collection = this.collection;
    const primaryKey = collection.model.primaryKeyAttribute;
    const foreignKey = collection.treeForeignKey;
    const childrenKey = ((_a = collection.treeChildrenField) == null ? void 0 : _a.name) ?? "children";
    const treePathMap = this.buildRootNodeDataMap(paths);
    if (!rootNodes) {
      const rootIds = Object.keys(treePathMap);
      if (!rootIds.length) {
        this.database.logger.warn("adjacency-list-repository: rootIds is empty");
        return [];
      }
      rootNodes = await super.find({
        filter: {
          [primaryKey]: {
            $in: rootIds
          }
        },
        ...import_lodash.default.omit(options, ["filter", "filterByTk"]),
        transaction: options.transaction
      });
    }
    const childIds = [];
    for (const nodeIdSet of Object.values(treePathMap)) {
      for (const nodeId of nodeIdSet) {
        childIds.push(nodeId);
      }
    }
    const findChildrenOptions = {
      ...import_lodash.default.omit(options, ["limit", "offset", "filterByTk"]),
      filter: {
        [primaryKey]: childIds
      }
    };
    if (findChildrenOptions.fields) {
      [primaryKey, foreignKey].forEach((field) => {
        if (!findChildrenOptions.fields.includes(field)) {
          findChildrenOptions.fields.push(field);
        }
      });
    }
    const childInstances = await super.find(findChildrenOptions);
    const nodeMap = {};
    childInstances.forEach((node) => {
      if (!nodeMap[`${node[foreignKey]}`]) {
        nodeMap[`${node[foreignKey]}`] = [];
      }
      nodeMap[`${node[foreignKey]}`].push(node);
    });
    function buildTree(rootId) {
      const children = nodeMap[rootId];
      if (!children) {
        return [];
      }
      return children.map((child) => {
        const childrenValues = buildTree(child.id);
        if (childrenValues.length > 0) {
          child.setDataValue(childrenKey, childrenValues);
        }
        return child;
      });
    }
    for (const root of rootNodes) {
      const rootId = root[primaryKey];
      const children = buildTree(rootId);
      if (children.length > 0) {
        root.setDataValue(childrenKey, children);
      }
    }
    this.addIndex(rootNodes, childrenKey, options);
    return rootNodes;
  }
  async findWithoutFilter(options = {}) {
    var _a, _b;
    const foreignKey = this.collection.treeForeignKey;
    const rootNodes = await super.find({ ...options, filter: { [foreignKey]: null } });
    if (!rootNodes.length) {
      return [];
    }
    const collection = this.collection;
    const primaryKey = collection.model.primaryKeyAttribute;
    const rootPks = rootNodes.map((node) => node[primaryKey]);
    const paths = await this.queryPathByRoot({
      rootPks,
      dataSourceName: ((_b = (_a = options.context) == null ? void 0 : _a.dataSource) == null ? void 0 : _b.name) ?? "main",
      transaction: options.transaction
    });
    return await this.buildTree(paths, options, rootNodes);
  }
  async countWithoutFilter(options) {
    const foreignKey = this.collection.treeForeignKey;
    return await super.count({ ...options, filter: { [foreignKey]: null } });
  }
  async filterAndGetPaths(options = {}) {
    var _a, _b;
    const primaryKey = this.collection.model.primaryKeyAttribute;
    const filterNodes = await super.find({
      fields: [primaryKey],
      ...import_lodash.default.omit(options, ["limit", "offset", "fields"])
    });
    if (!filterNodes.length) {
      return { filterNodes: [], paths: [] };
    }
    const filterPks = filterNodes.map((node) => node[primaryKey]);
    if (!filterPks.length) {
      this.database.logger.debug("adjacency-list-repository: filterIds is empty");
      return { filterNodes, paths: [] };
    }
    const paths = await this.queryPathByNode({
      nodePks: filterPks,
      dataSourceName: ((_b = (_a = options.context) == null ? void 0 : _a.dataSource) == null ? void 0 : _b.name) ?? "main",
      transaction: options.transaction
    });
    return { filterNodes, paths };
  }
  async find(options = {}) {
    if (options.raw || !options.tree) {
      return await super.find(options);
    }
    const primaryKey = this.collection.model.primaryKeyAttribute;
    if (options.fields && !options.fields.includes(primaryKey)) {
      options.fields.push(primaryKey);
    }
    if (!(0, import_utils.isValidFilter)(options.filter) && !options.filterByTk) {
      return await this.findWithoutFilter(options);
    }
    const { filterNodes, paths } = await this.filterAndGetPaths(options);
    if (!paths.length) {
      return filterNodes;
    }
    return await this.buildTree(paths, options);
  }
  countByPaths(paths) {
    const rootIds = /* @__PURE__ */ new Set();
    for (const path of paths) {
      rootIds.add(path.get("rootPk"));
    }
    return rootIds.size;
  }
  async count(countOptions) {
    countOptions = countOptions || {};
    if ((countOptions == null ? void 0 : countOptions.raw) || !(countOptions == null ? void 0 : countOptions.tree)) {
      return await super.count(countOptions);
    }
    if (!(0, import_utils.isValidFilter)(countOptions.filter) && !countOptions.filterByTk) {
      return await this.countWithoutFilter(countOptions);
    }
    const { paths } = await this.filterAndGetPaths(countOptions);
    return this.countByPaths(paths);
  }
  async findAndCount(options) {
    options = {
      ...options,
      transaction: await this.getTransaction(options.transaction)
    };
    if (options.raw || !options.tree) {
      return await super.findAndCount(options);
    }
    if (!(0, import_utils.isValidFilter)(options.filter) && !options.filterByTk) {
      const count2 = await this.countWithoutFilter(options);
      const results2 = count2 ? await this.findWithoutFilter(options) : [];
      return [results2, count2];
    }
    const { filterNodes, paths } = await this.filterAndGetPaths(options);
    if (!paths.length) {
      return [filterNodes, 0];
    }
    const results = await this.buildTree(paths, options);
    const count = this.countByPaths(paths);
    return [results, count];
  }
  addIndex(treeArray, childrenKey, options) {
    function traverse(node, index) {
      if (node._options.includeNames && !node._options.includeNames.includes(childrenKey)) {
        node._options.includeNames.push(childrenKey);
      }
      if (options.addIndex !== false) {
        node.setDataValue("__index", `${index}`);
      }
      const children = node.getDataValue(childrenKey);
      if (children && children.length === 0) {
        node.setDataValue(childrenKey, void 0);
      }
      if (children && children.length > 0) {
        children.forEach((child, i) => {
          traverse(child, `${index}.${childrenKey}.${i}`);
        });
      }
    }
    treeArray.forEach((tree, i) => {
      traverse(tree, i);
    });
  }
  async queryPathByNode({
    nodePks,
    dataSourceName,
    transaction
  }) {
    const collection = this.collection;
    const pathTableName = `${dataSourceName}_${collection.name}_path`;
    const repo = this.database.getRepository(pathTableName);
    if (repo) {
      return await repo.find({
        filter: {
          nodePk: {
            $in: nodePks
          }
        },
        transaction
      });
    }
    this.database.logger.warn(`Collection tree path table: ${pathTableName} not found`);
    return [];
  }
  async queryPathByRoot({
    rootPks,
    dataSourceName,
    transaction
  }) {
    const collection = this.collection;
    const pathTableName = `${dataSourceName}_${collection.name}_path`;
    const repo = this.database.getRepository(pathTableName);
    if (repo) {
      return await repo.find({
        filter: {
          rootPk: {
            $in: rootPks
          }
        },
        transaction
      });
    }
    this.database.logger.warn(`Collection tree path table: ${pathTableName} not found`);
    return [];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AdjacencyListRepository
});
