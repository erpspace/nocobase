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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var repository_exports = {};
__export(repository_exports, {
  UiSchemaRepository: () => UiSchemaRepository,
  default: () => repository_default
});
module.exports = __toCommonJS(repository_exports);
var import_database = require("@nocobase/database");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
const nodeKeys = ["properties", "definitions", "patternProperties", "additionalProperties", "items"];
function transaction(transactionAbleArgPosition) {
  return (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = async function(...args) {
      if (!import_lodash.default.isNumber(transactionAbleArgPosition)) {
        transactionAbleArgPosition = originalMethod.length - 1;
      }
      let transaction2 = import_lodash.default.get(args, [transactionAbleArgPosition, "transaction"]);
      let handleTransaction = false;
      if (!transaction2) {
        transaction2 = await this.database.sequelize.transaction();
        handleTransaction = true;
        import_lodash.default.set(args, transactionAbleArgPosition, {
          ...import_lodash.default.get(args, transactionAbleArgPosition, {}),
          transaction: transaction2
        });
      }
      if (handleTransaction) {
        try {
          const results = await originalMethod.apply(this, args);
          await transaction2.commit();
          return results;
        } catch (e) {
          await transaction2.rollback();
          throw e;
        }
      } else {
        return await originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}
const _UiSchemaRepository = class _UiSchemaRepository extends import_database.Repository {
  cache;
  get uiSchemasTableName() {
    return this.tableNameAdapter(this.model.tableName);
  }
  get uiSchemaTreePathTableName() {
    const model = this.database.getCollection("uiSchemaTreePath").model;
    return this.tableNameAdapter(model.tableName);
  }
  static schemaToSingleNodes(schema, carry = [], childOptions = null) {
    const node = import_lodash.default.cloneDeep(
      import_lodash.default.isString(schema) ? {
        "x-uid": schema
      } : schema
    );
    if (!import_lodash.default.get(node, "name")) {
      node.name = (0, import_utils.uid)();
    }
    if (!import_lodash.default.get(node, "x-uid")) {
      node["x-uid"] = (0, import_utils.uid)();
    }
    if (childOptions) {
      node.childOptions = childOptions;
    }
    carry.push(node);
    for (const nodeKey of nodeKeys) {
      const nodeProperty = import_lodash.default.get(node, nodeKey);
      const childNodeChildOptions = {
        parentUid: node["x-uid"],
        parentPath: [node["x-uid"], ...import_lodash.default.get(childOptions, "parentPath", [])],
        type: nodeKey
      };
      if (nodeKey === "items" && nodeProperty) {
        const handleItems = import_lodash.default.isArray(nodeProperty) ? nodeProperty : [nodeProperty];
        for (const [i, item] of handleItems.entries()) {
          carry = this.schemaToSingleNodes(item, carry, { ...childNodeChildOptions, sort: i + 1 });
        }
      } else if (import_lodash.default.isPlainObject(nodeProperty)) {
        const subNodeNames = import_lodash.default.keys(import_lodash.default.get(node, nodeKey));
        delete node[nodeKey];
        for (const [i, subNodeName] of subNodeNames.entries()) {
          const subSchema = {
            name: subNodeName,
            ...import_lodash.default.get(nodeProperty, subNodeName)
          };
          carry = this.schemaToSingleNodes(subSchema, carry, { ...childNodeChildOptions, sort: i + 1 });
        }
      }
    }
    return carry;
  }
  // if you need to handle cache in repo method, so you must set cache first
  setCache(cache) {
    this.cache = cache;
  }
  /**
   * clear cache with xUid which in uiSchemaTreePath's Path
   * @param {string} xUid
   * @param {Transaction} transaction
   * @returns {Promise<void>}
   */
  async clearXUidPathCache(xUid, transaction2) {
    if (!this.cache || !xUid) {
      return;
    }
    const uiSchemaNodes = await this.database.getRepository("uiSchemaTreePath").find({
      filter: {
        descendant: xUid
      },
      transaction: transaction2
    });
    for (const uiSchemaNode of uiSchemaNodes) {
      await this.cache.del(`p_${uiSchemaNode["ancestor"]}`);
      await this.cache.del(`s_${uiSchemaNode["ancestor"]}`);
    }
  }
  tableNameAdapter(tableName) {
    if (this.database.sequelize.getDialect() === "postgres") {
      return `"${this.database.options.schema || "public"}"."${tableName}"`;
    }
    return tableName;
  }
  sqlAdapter(sql) {
    if (this.database.isMySQLCompatibleDialect()) {
      return import_lodash.default.replace(sql, /"/g, "`");
    }
    return sql;
  }
  async getProperties(uid2, options = {}) {
    if ((options == null ? void 0 : options.readFromCache) && this.cache) {
      return this.cache.wrap(`p_${uid2}`, () => {
        return this.doGetProperties(uid2, options);
      });
    }
    return this.doGetProperties(uid2, options);
  }
  async getParentJsonSchema(uid2, options = {}) {
    const parentUid = await this.findParentUid(uid2, options.transaction);
    if (!parentUid) {
      return null;
    }
    return this.getJsonSchema(parentUid, options);
  }
  async getParentProperty(uid2, options = {}) {
    const parentUid = await this.findParentUid(uid2, options.transaction);
    if (!parentUid) {
      return null;
    }
    return this.getJsonSchema(parentUid, options);
  }
  async getJsonSchema(uid2, options) {
    if ((options == null ? void 0 : options.readFromCache) && this.cache) {
      return this.cache.wrap(`s_${uid2}`, () => {
        return this.doGetJsonSchema(uid2, options);
      });
    }
    return this.doGetJsonSchema(uid2, options);
  }
  nodesToSchema(nodes, rootUid) {
    const nodeAttributeSanitize = (node) => {
      const schema = {
        ...this.ignoreSchemaProperties(import_lodash.default.isPlainObject(node.schema) ? node.schema : JSON.parse(node.schema)),
        ...import_lodash.default.pick(node, [...nodeKeys, "name"]),
        ["x-uid"]: node["x-uid"],
        ["x-async"]: !!node.async
      };
      if (import_lodash.default.isNumber(node.sort)) {
        schema["x-index"] = node.sort;
      }
      return schema;
    };
    const buildTree = (rootNode) => {
      const children = nodes.filter((node) => node.parent == rootNode["x-uid"]);
      if (children.length > 0) {
        const childrenGroupByType = import_lodash.default.groupBy(children, "type");
        for (const childType of Object.keys(childrenGroupByType)) {
          const properties = childrenGroupByType[childType].map((child) => buildTree(child)).sort((a, b) => a["x-index"] - b["x-index"]);
          rootNode[childType] = childType == "items" ? properties.length == 1 ? properties[0] : properties : properties.reduce((carry, item) => {
            carry[item.name] = item;
            delete item["name"];
            return carry;
          }, {});
        }
      }
      return nodeAttributeSanitize(rootNode);
    };
    return buildTree(nodes.find((node) => node["x-uid"] == rootUid));
  }
  async clearAncestor(uid2, options) {
    await this.clearXUidPathCache(uid2, options == null ? void 0 : options.transaction);
    const db = this.database;
    const treeTable = this.uiSchemaTreePathTableName;
    await db.sequelize.query(
      `DELETE
       FROM ${treeTable}
       WHERE descendant IN
             (SELECT descendant FROM (SELECT descendant FROM ${treeTable} WHERE ancestor = :uid) as descendantTable)
         AND ancestor IN (SELECT ancestor
                          FROM (SELECT ancestor FROM ${treeTable} WHERE descendant = :uid AND ancestor != descendant) as ancestorTable)
      `,
      {
        type: "DELETE",
        replacements: {
          uid: uid2
        },
        transaction: options.transaction
      }
    );
  }
  async patch(newSchema, options) {
    const { transaction: transaction2 } = options;
    const rootUid = newSchema["x-uid"];
    await this.clearXUidPathCache(rootUid, transaction2);
    if (!newSchema["properties"]) {
      const s = await this.model.findByPk(rootUid, { transaction: transaction2 });
      s.set("schema", { ...s.toJSON(), ...newSchema });
      await s.save({ transaction: transaction2, hooks: false });
      if (newSchema["x-server-hooks"]) {
        await this.database.emitAsync(`${this.collection.name}.afterSave`, s, options);
      }
      return;
    }
    const oldTree = await this.getJsonSchema(rootUid, { transaction: transaction2 });
    const traverSchemaTree = async (schema, path = []) => {
      const node = schema;
      const oldNode = path.length == 0 ? oldTree : import_lodash.default.get(oldTree, path);
      const oldNodeUid = oldNode["x-uid"];
      await this.updateNode(oldNodeUid, node, transaction2);
      const properties = node.properties;
      if (import_lodash.default.isPlainObject(properties)) {
        for (const name of Object.keys(properties)) {
          await traverSchemaTree(properties[name], [...path, "properties", name]);
        }
      }
    };
    await traverSchemaTree(newSchema);
  }
  async initializeActionContext(newSchema, options = {}) {
    if (!newSchema["x-uid"] || !newSchema["x-action-context"]) {
      return;
    }
    const { transaction: transaction2 } = options;
    const nodeModel = await this.findOne({
      filter: {
        "x-uid": newSchema["x-uid"]
      },
      transaction: transaction2
    });
    if (!import_lodash.default.isEmpty(nodeModel == null ? void 0 : nodeModel.get("schema")["x-action-context"])) {
      return;
    }
    return this.patch(import_lodash.default.pick(newSchema, ["x-uid", "x-action-context"]), options);
  }
  async batchPatch(schemas, options) {
    const { transaction: transaction2 } = options;
    for (const schema of schemas) {
      await this.patch(schema, { ...options, transaction: transaction2 });
    }
  }
  async removeEmptyParents(options) {
    const { transaction: transaction2, uid: uid2, breakRemoveOn } = options;
    await this.clearXUidPathCache(uid2, transaction2);
    const removeParent = async (nodeUid) => {
      const parent = await this.isSingleChild(nodeUid, transaction2);
      if (parent && !this.breakOnMatched(parent, breakRemoveOn)) {
        await removeParent(parent.get("x-uid"));
      } else {
        await this.remove(nodeUid, { transaction: transaction2 });
      }
    };
    await removeParent(uid2);
  }
  async recursivelyRemoveIfNoChildren(options) {
    const { uid: uid2, transaction: transaction2, breakRemoveOn } = options;
    await this.clearXUidPathCache(uid2, transaction2);
    const removeLeafNode = async (nodeUid) => {
      const isLeafNode = await this.isLeafNode(nodeUid, transaction2);
      if (isLeafNode) {
        const { parentUid, schema } = await this.findNodeSchemaWithParent(nodeUid, transaction2);
        if (this.breakOnMatched(schema, breakRemoveOn)) {
          return;
        } else {
          await this.remove(nodeUid, {
            transaction: transaction2
          });
          await removeLeafNode(parentUid);
        }
      }
    };
    await removeLeafNode(uid2);
  }
  async remove(uid2, options) {
    const { transaction: transaction2 } = options;
    await this.clearXUidPathCache(uid2, transaction2);
    if (options == null ? void 0 : options.removeParentsIfNoChildren) {
      await this.removeEmptyParents({ transaction: transaction2, uid: uid2, breakRemoveOn: options.breakRemoveOn });
      return;
    }
    await this.database.sequelize.query(
      this.sqlAdapter(`DELETE FROM ${this.uiSchemasTableName} WHERE "x-uid" IN (
            SELECT descendant FROM ${this.uiSchemaTreePathTableName} WHERE ancestor = :uid
        )`),
      {
        replacements: {
          uid: uid2
        },
        transaction: transaction2
      }
    );
    await this.database.sequelize.query(
      ` DELETE FROM ${this.uiSchemaTreePathTableName}
            WHERE descendant IN (
                select descendant FROM
                    (SELECT descendant
                     FROM ${this.uiSchemaTreePathTableName}
                     WHERE ancestor = :uid)as descendantTable) `,
      {
        replacements: {
          uid: uid2
        },
        transaction: transaction2
      }
    );
  }
  async insertAdjacent(position, target, schema, options) {
    const { transaction: transaction2 } = options;
    await this.clearXUidPathCache(schema["x-uid"], transaction2);
    if (options.wrap) {
      const wrapSchemaNodes = await this.insertNewSchema(options.wrap, {
        transaction: transaction2,
        returnNode: true
      });
      const lastWrapNode = wrapSchemaNodes[wrapSchemaNodes.length - 1];
      await this.insertAdjacent("afterBegin", lastWrapNode["x-uid"], schema, import_lodash.default.omit(options, "wrap"));
      schema = wrapSchemaNodes[0]["x-uid"];
      options.removeParentsIfNoChildren = false;
    } else {
      const schemaExists = await this.schemaExists(schema, { transaction: transaction2 });
      if (schemaExists) {
        schema = import_lodash.default.isString(schema) ? schema : schema["x-uid"];
      } else {
        const insertedSchema = await this.insertNewSchema(schema, {
          transaction: transaction2,
          returnNode: true
        });
        schema = insertedSchema[0]["x-uid"];
      }
    }
    const result = await this[`insert${import_lodash.default.upperFirst(position)}`](target, schema, options);
    await this.clearXUidPathCache(result["x-uid"], transaction2);
    return result;
  }
  async duplicate(uid2, options) {
    const s = await this.getJsonSchema(uid2, { ...options, includeAsyncNode: true });
    if (!(s == null ? void 0 : s["x-uid"])) {
      return null;
    }
    this.regenerateUid(s);
    return this.insert(s, options);
  }
  async insert(schema, options) {
    const nodes = _UiSchemaRepository.schemaToSingleNodes(schema);
    const insertedNodes = await this.insertNodes(nodes, options);
    const result = await this.getJsonSchema(insertedNodes[0].get("x-uid"), {
      transaction: options == null ? void 0 : options.transaction
    });
    await this.clearXUidPathCache(result["x-uid"], options == null ? void 0 : options.transaction);
    return result;
  }
  async insertNewSchema(schema, options) {
    const { transaction: transaction2 } = options;
    const nodes = _UiSchemaRepository.schemaToSingleNodes(schema);
    await this.database.sequelize.query(
      this.sqlAdapter(
        `INSERT INTO ${this.uiSchemasTableName} ("x-uid", "name", "schema") VALUES ${nodes.map((n) => "(?)").join(",")};`
      ),
      {
        replacements: import_lodash.default.cloneDeep(nodes).map((node) => {
          const { uid: uid2, name } = this.prepareSingleNodeForInsert(node);
          return [uid2, name, JSON.stringify(node)];
        }),
        type: "insert",
        transaction: transaction2
      }
    );
    const treePathData = import_lodash.default.cloneDeep(nodes).reduce((carry, item) => {
      const { uid: uid2, childOptions, async } = this.prepareSingleNodeForInsert(item);
      return [
        ...carry,
        // self reference
        [uid2, uid2, 0, (childOptions == null ? void 0 : childOptions.type) || null, async, null],
        // parent references
        ...import_lodash.default.get(childOptions, "parentPath", []).map((parentUid, index) => {
          return [parentUid, uid2, index + 1, null, null, childOptions.sort];
        })
      ];
    }, []);
    await this.database.sequelize.query(
      this.sqlAdapter(
        `INSERT INTO ${this.uiSchemaTreePathTableName} (ancestor, descendant, depth, type, async, sort) VALUES ${treePathData.map((item) => "(?)").join(",")}`
      ),
      {
        replacements: treePathData,
        type: "insert",
        transaction: transaction2
      }
    );
    const rootNode = nodes[0];
    if (rootNode["x-server-hooks"]) {
      const rootModel = await this.findOne({ filter: { "x-uid": rootNode["x-uid"] }, transaction: transaction2 });
      await this.database.emitAsync(`${this.collection.name}.afterCreateWithAssociations`, rootModel, options);
      await this.database.emitAsync(`${this.collection.name}.afterSave`, rootModel, options);
    }
    if (options == null ? void 0 : options.returnNode) {
      return nodes;
    }
    const result = await this.getJsonSchema(nodes[0]["x-uid"], {
      transaction: transaction2
    });
    await this.clearXUidPathCache(result["x-uid"], transaction2);
    return result;
  }
  async insertSingleNode(schema, options) {
    const { transaction: transaction2 } = options;
    const db = this.database;
    const { uid: uid2, name, async, childOptions } = this.prepareSingleNodeForInsert(schema);
    let savedNode;
    const existsNode = await this.findOne({
      filter: {
        "x-uid": uid2
      },
      transaction: transaction2
    });
    const treeTable = this.uiSchemaTreePathTableName;
    if (existsNode) {
      savedNode = existsNode;
    } else {
      savedNode = await this.insertSchemaRecord(name, uid2, schema, transaction2);
    }
    if (childOptions) {
      const oldParentUid = await this.findParentUid(uid2, transaction2);
      const parentUid = childOptions.parentUid;
      const childrenCount = await this.childrenCount(uid2, transaction2);
      const isTree = childrenCount > 0;
      if (isTree) {
        await this.clearAncestor(uid2, { transaction: transaction2 });
        await db.sequelize.query(
          `INSERT INTO ${treeTable} (ancestor, descendant, depth)
           SELECT supertree.ancestor, subtree.descendant, supertree.depth + subtree.depth + 1
           FROM ${treeTable} AS supertree
                    CROSS JOIN ${treeTable} AS subtree
           WHERE supertree.descendant = :parentUid
             AND subtree.ancestor = :uid;`,
          {
            type: "INSERT",
            replacements: {
              uid: uid2,
              parentUid
            },
            transaction: transaction2
          }
        );
      }
      await db.sequelize.query(
        `UPDATE ${treeTable} SET type = :type WHERE depth = 0 AND ancestor = :uid AND descendant = :uid`,
        {
          type: "update",
          transaction: transaction2,
          replacements: {
            type: childOptions.type,
            uid: uid2
          }
        }
      );
      if (!isTree) {
        if (existsNode) {
          await db.sequelize.query(`DELETE FROM ${treeTable} WHERE descendant = :uid AND ancestor != descendant`, {
            type: "DELETE",
            replacements: {
              uid: uid2
            },
            transaction: transaction2
          });
        }
        await db.sequelize.query(
          `INSERT INTO ${treeTable} (ancestor, descendant, depth)
           SELECT t.ancestor, :modelKey, depth + 1 FROM ${treeTable} AS t  WHERE t.descendant = :modelParentKey `,
          {
            type: "INSERT",
            transaction: transaction2,
            replacements: {
              modelKey: savedNode.get("x-uid"),
              modelParentKey: parentUid
            }
          }
        );
      }
      if (!existsNode) {
        await db.sequelize.query(
          `INSERT INTO ${treeTable}(ancestor, descendant, depth, type, async) VALUES (:modelKey, :modelKey, 0, :type, :async )`,
          {
            type: "INSERT",
            replacements: {
              modelKey: savedNode.get("x-uid"),
              type: childOptions.type,
              async
            },
            transaction: transaction2
          }
        );
      }
      const nodePosition = childOptions.position || "last";
      let sort;
      if (nodePosition === "first") {
        sort = 1;
        let updateSql2 = `UPDATE ${treeTable} as TreeTable
                SET sort = TreeTable.sort + 1
                FROM ${treeTable} as NodeInfo
                WHERE NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0
                AND TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor and NodeInfo.type = :type`;
        if (this.database.isMySQLCompatibleDialect()) {
          updateSql2 = `UPDATE ${treeTable} as TreeTable
          JOIN ${treeTable} as NodeInfo ON (NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0)
          SET TreeTable.sort = TreeTable.sort + 1
          WHERE TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor and NodeInfo.type = :type`;
        }
        await db.sequelize.query(updateSql2, {
          replacements: {
            ancestor: childOptions.parentUid,
            type: childOptions.type
          },
          transaction: transaction2
        });
      }
      if (nodePosition === "last") {
        const maxSort = await db.sequelize.query(
          `SELECT ${this.database.sequelize.getDialect() === "postgres" ? "coalesce" : "ifnull"}(MAX(TreeTable.sort), 0) as maxsort FROM ${treeTable} as TreeTable
                                                        LEFT JOIN ${treeTable} as NodeInfo
                                                                  ON NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0
           WHERE TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor and NodeInfo.type = :type`,
          {
            type: "SELECT",
            replacements: {
              ancestor: childOptions.parentUid,
              type: childOptions.type
            },
            transaction: transaction2
          }
        );
        sort = parseInt(maxSort[0]["maxsort"]) + 1;
      }
      if (import_lodash.default.isPlainObject(nodePosition)) {
        const targetPosition = nodePosition;
        const target = targetPosition.target;
        const targetSort = await db.sequelize.query(
          `SELECT TreeTable.sort  as sort FROM ${treeTable} as TreeTable
                                 LEFT JOIN ${treeTable} as NodeInfo
                                           ON NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0   WHERE TreeTable.depth = 1 AND TreeTable.ancestor = :ancestor AND TreeTable.descendant = :descendant and NodeInfo.type = :type`,
          {
            type: "SELECT",
            replacements: {
              ancestor: childOptions.parentUid,
              descendant: target,
              type: childOptions.type
            },
            transaction: transaction2
          }
        );
        sort = targetSort[0].sort;
        if (targetPosition.type == "after") {
          sort += 1;
        }
        let updateSql2 = `UPDATE ${treeTable} as TreeTable
                         SET sort = TreeTable.sort + 1
                             FROM ${treeTable} as NodeInfo
                         WHERE NodeInfo.descendant = TreeTable.descendant
                           and NodeInfo.depth = 0
                           AND TreeTable.depth = 1
                           AND TreeTable.ancestor = :ancestor
                           and TreeTable.sort >= :sort
                           and NodeInfo.type = :type`;
        if (this.database.isMySQLCompatibleDialect()) {
          updateSql2 = `UPDATE  ${treeTable} as TreeTable
JOIN ${treeTable} as NodeInfo ON (NodeInfo.descendant = TreeTable.descendant and NodeInfo.depth = 0)
SET TreeTable.sort = TreeTable.sort + 1
WHERE TreeTable.depth = 1 AND  TreeTable.ancestor = :ancestor and TreeTable.sort >= :sort and NodeInfo.type = :type`;
        }
        await db.sequelize.query(updateSql2, {
          replacements: {
            ancestor: childOptions.parentUid,
            sort,
            type: childOptions.type
          },
          transaction: transaction2
        });
      }
      const updateSql = `UPDATE ${treeTable} SET sort = :sort WHERE depth = 1 AND ancestor = :ancestor AND descendant = :descendant`;
      await db.sequelize.query(updateSql, {
        type: "UPDATE",
        replacements: {
          ancestor: childOptions.parentUid,
          sort,
          descendant: uid2
        },
        transaction: transaction2
      });
      if (oldParentUid !== null && oldParentUid !== parentUid) {
        await this.database.emitAsync("uiSchemaMove", savedNode, {
          transaction: transaction2,
          oldParentUid,
          parentUid
        });
        if (options.removeParentsIfNoChildren) {
          await this.recursivelyRemoveIfNoChildren({
            transaction: transaction2,
            uid: oldParentUid,
            breakRemoveOn: options.breakRemoveOn
          });
        }
      }
    } else {
      await db.sequelize.query(
        `INSERT INTO ${treeTable}(ancestor, descendant, depth, async) VALUES (:modelKey, :modelKey, 0, :async )`,
        {
          type: "INSERT",
          replacements: {
            modelKey: savedNode.get("x-uid"),
            async
          },
          transaction: transaction2
        }
      );
    }
    await this.clearXUidPathCache(uid2, transaction2);
    return savedNode;
  }
  async updateNode(uid2, schema, transaction2) {
    const nodeModel = await this.findOne({
      filter: {
        "x-uid": uid2
      }
    });
    await nodeModel.update(
      {
        schema: {
          ...nodeModel.get("schema"),
          ...import_lodash.default.omit(schema, ["x-async", "name", "x-uid", "properties"])
        }
      },
      {
        hooks: false,
        transaction: transaction2
      }
    );
    if (schema["x-server-hooks"]) {
      await this.database.emitAsync(`${this.collection.name}.afterSave`, nodeModel, { transaction: transaction2 });
    }
  }
  async childrenCount(uid2, transaction2) {
    const db = this.database;
    const countResult = await db.sequelize.query(
      `SELECT COUNT(*) as count FROM ${this.uiSchemaTreePathTableName} where ancestor = :ancestor and depth  = 1`,
      {
        replacements: {
          ancestor: uid2
        },
        type: "SELECT",
        transaction: transaction2
      }
    );
    return parseInt(countResult[0]["count"]);
  }
  async isLeafNode(uid2, transaction2) {
    const childrenCount = await this.childrenCount(uid2, transaction2);
    return childrenCount === 0;
  }
  async findParentUid(uid2, transaction2) {
    const parent = await this.database.getRepository("uiSchemaTreePath").findOne({
      filter: {
        descendant: uid2,
        depth: 1
      },
      transaction: transaction2
    });
    return parent ? parent.get("ancestor") : null;
  }
  async findNodeSchemaWithParent(uid2, transaction2) {
    const schema = await this.database.getRepository("uiSchemas").findOne({
      filter: {
        "x-uid": uid2
      },
      transaction: transaction2
    });
    return {
      parentUid: await this.findParentUid(uid2, transaction2),
      schema
    };
  }
  async isSingleChild(uid2, transaction2) {
    const db = this.database;
    const parent = await this.findParentUid(uid2, transaction2);
    if (!parent) {
      return null;
    }
    const parentChildrenCount = await this.childrenCount(parent, transaction2);
    if (parentChildrenCount == 1) {
      const schema = await db.getRepository("uiSchemas").findOne({
        filter: {
          "x-uid": parent
        },
        transaction: transaction2
      });
      return schema;
    }
    return null;
  }
  async insertBeside(targetUid, schema, side, options) {
    const { transaction: transaction2 } = options;
    const targetParent = await this.findParentUid(targetUid, transaction2);
    const db = this.database;
    const treeTable = this.uiSchemaTreePathTableName;
    const typeQuery = await db.sequelize.query(`SELECT type from ${treeTable} WHERE ancestor = :uid AND depth = 0;`, {
      type: "SELECT",
      replacements: {
        uid: targetUid
      },
      transaction: transaction2
    });
    const nodes = _UiSchemaRepository.schemaToSingleNodes(schema);
    const rootNode = nodes[0];
    rootNode.childOptions = {
      parentUid: targetParent,
      type: typeQuery[0]["type"],
      position: {
        type: side,
        target: targetUid
      }
    };
    const insertedNodes = await this.insertNodes(nodes, options);
    return await this.getJsonSchema(insertedNodes[0].get("x-uid"), {
      transaction: transaction2
    });
  }
  async insertInner(targetUid, schema, position, options) {
    const { transaction: transaction2 } = options;
    const nodes = _UiSchemaRepository.schemaToSingleNodes(schema);
    const rootNode = nodes[0];
    rootNode.childOptions = {
      parentUid: targetUid,
      type: import_lodash.default.get(schema, "x-node-type", "properties"),
      position
    };
    const insertedNodes = await this.insertNodes(nodes, options);
    return await this.getJsonSchema(insertedNodes[0].get("x-uid"), {
      transaction: transaction2
    });
  }
  async insertAfterBegin(targetUid, schema, options) {
    return await this.insertInner(targetUid, schema, "first", options);
  }
  async insertBeforeEnd(targetUid, schema, options) {
    return await this.insertInner(targetUid, schema, "last", options);
  }
  async insertBeforeBegin(targetUid, schema, options) {
    return await this.insertBeside(targetUid, schema, "before", options);
  }
  async insertAfterEnd(targetUid, schema, options) {
    return await this.insertBeside(targetUid, schema, "after", options);
  }
  async insertNodes(nodes, options) {
    const { transaction: transaction2 } = options;
    const insertedNodes = [];
    for (const node of nodes) {
      insertedNodes.push(
        await this.insertSingleNode(node, {
          ...options,
          transaction: transaction2
        })
      );
    }
    return insertedNodes;
  }
  async doGetProperties(uid2, options = {}) {
    const { transaction: transaction2 } = options;
    const db = this.database;
    const rawSql = `
        SELECT "SchemaTable"."x-uid" as "x-uid", "SchemaTable"."name" as "name", "SchemaTable"."schema" as "schema",
               TreePath.depth as depth,
               NodeInfo.type as type, NodeInfo.async as async,  ParentPath.ancestor as parent, ParentPath.sort as sort
        FROM ${this.uiSchemaTreePathTableName} as TreePath
                 LEFT JOIN ${this.uiSchemasTableName} as "SchemaTable" ON "SchemaTable"."x-uid" =  TreePath.descendant
                 LEFT JOIN ${this.uiSchemaTreePathTableName} as NodeInfo ON NodeInfo.descendant = "SchemaTable"."x-uid" and NodeInfo.descendant = NodeInfo.ancestor and NodeInfo.depth = 0
                 LEFT JOIN ${this.uiSchemaTreePathTableName} as ParentPath ON (ParentPath.descendant = "SchemaTable"."x-uid" AND ParentPath.depth = 1)
        WHERE TreePath.ancestor = :ancestor  AND (NodeInfo.async = false or TreePath.depth <= 1)`;
    const nodes = await db.sequelize.query(this.sqlAdapter(rawSql), {
      replacements: {
        ancestor: uid2
      },
      transaction: transaction2
    });
    if (nodes[0].length == 0) {
      return {};
    }
    const schema = this.nodesToSchema(nodes[0], uid2);
    return import_lodash.default.pick(schema, ["type", "properties"]);
  }
  async doGetJsonSchema(uid2, options) {
    const db = this.database;
    const treeTable = this.uiSchemaTreePathTableName;
    const rawSql = `
        SELECT "SchemaTable"."x-uid" as "x-uid", "SchemaTable"."name" as name, "SchemaTable"."schema" as "schema" ,
               TreePath.depth as depth,
               NodeInfo.type as type, NodeInfo.async as async,  ParentPath.ancestor as parent, ParentPath.sort as sort
        FROM ${treeTable} as TreePath
                 LEFT JOIN ${this.uiSchemasTableName} as "SchemaTable" ON "SchemaTable"."x-uid" =  TreePath.descendant
                 LEFT JOIN ${treeTable} as NodeInfo ON NodeInfo.descendant = "SchemaTable"."x-uid" and NodeInfo.descendant = NodeInfo.ancestor and NodeInfo.depth = 0
                 LEFT JOIN ${treeTable} as ParentPath ON (ParentPath.descendant = "SchemaTable"."x-uid" AND ParentPath.depth = 1)
        WHERE TreePath.ancestor = :ancestor  ${(options == null ? void 0 : options.includeAsyncNode) ? "" : "AND (NodeInfo.async != true or TreePath.depth = 0)"}
    `;
    const nodes = await db.sequelize.query(this.sqlAdapter(rawSql), {
      replacements: {
        ancestor: uid2
      },
      transaction: options == null ? void 0 : options.transaction
    });
    if (nodes[0].length == 0) {
      return {};
    }
    return this.nodesToSchema(nodes[0], uid2);
  }
  ignoreSchemaProperties(schemaProperties) {
    return import_lodash.default.omit(schemaProperties, nodeKeys);
  }
  breakOnMatched(schemaInstance, breakRemoveOn) {
    if (!breakRemoveOn) {
      return false;
    }
    for (const key of Object.keys(breakRemoveOn)) {
      const instanceValue = schemaInstance.get(key);
      const breakRemoveOnValue = breakRemoveOn[key];
      if (instanceValue !== breakRemoveOnValue) {
        return false;
      }
    }
    return true;
  }
  async schemaExists(schema, options) {
    if (import_lodash.default.isObject(schema) && !schema["x-uid"]) {
      return false;
    }
    const { transaction: transaction2 } = options;
    const result = await this.database.sequelize.query(
      this.sqlAdapter(`select "x-uid" from ${this.uiSchemasTableName} where "x-uid" = :uid`),
      {
        type: "SELECT",
        replacements: {
          uid: import_lodash.default.isString(schema) ? schema : schema["x-uid"]
        },
        transaction: transaction2
      }
    );
    return result.length > 0;
  }
  regenerateUid(s) {
    s["x-uid"] = (0, import_utils.uid)();
    Object.keys(s.properties || {}).forEach((key) => {
      this.regenerateUid(s.properties[key]);
    });
  }
  async insertSchemaRecord(name, uid2, schema, transaction2) {
    const serverHooks = schema["x-server-hooks"] || [];
    const node = await this.create({
      values: {
        name,
        ["x-uid"]: uid2,
        schema,
        serverHooks
      },
      transaction: transaction2,
      context: {
        disableInsertHook: true
      }
    });
    return node;
  }
  prepareSingleNodeForInsert(schema) {
    const uid2 = schema["x-uid"];
    const name = schema["name"];
    const async = import_lodash.default.get(schema, "x-async", false);
    const childOptions = schema["childOptions"];
    delete schema["x-uid"];
    delete schema["x-async"];
    delete schema["name"];
    delete schema["childOptions"];
    return { uid: uid2, name, async, childOptions };
  }
};
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "clearAncestor", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "patch", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "initializeActionContext", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "batchPatch", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "remove", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertAdjacent", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "duplicate", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insert", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertNewSchema", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertBeside", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertInner", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertAfterBegin", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertBeforeEnd", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertBeforeBegin", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertAfterEnd", 1);
__decorateClass([
  transaction()
], _UiSchemaRepository.prototype, "insertNodes", 1);
let UiSchemaRepository = _UiSchemaRepository;
var repository_default = UiSchemaRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UiSchemaRepository
});
