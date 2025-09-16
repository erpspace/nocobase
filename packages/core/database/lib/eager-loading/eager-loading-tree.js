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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var eager_loading_tree_exports = {};
__export(eager_loading_tree_exports, {
  EagerLoadingTree: () => EagerLoadingTree
});
module.exports = __toCommonJS(eager_loading_tree_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_append_child_collection_name_after_repository_find = require("../listeners/append-child-collection-name-after-repository-find");
var import_options_parser = require("../options-parser");
var import_utils = require("../utils");
const pushAttribute = /* @__PURE__ */ __name((node, attribute) => {
  if (import_lodash.default.isArray(node.attributes) && !node.attributes.includes(attribute)) {
    node.attributes.push(attribute);
  }
}, "pushAttribute");
const EagerLoadingNodeProto = {
  afterBuild(db) {
    const collection = db.modelCollection.get(this.model);
    if (collection && collection.isParent()) {
      if (!this.attributes) {
        this.attributes = {
          include: []
        };
      }
      import_options_parser.OptionsParser.appendInheritInspectAttribute(
        import_lodash.default.isArray(this.attributes) ? this.attributes : this.attributes.include,
        collection
      );
      this.inspectInheritAttribute = true;
    }
  }
};
const queryParentSQL = /* @__PURE__ */ __name((options) => {
  const { collection, db, nodeIds } = options;
  const tableName = collection.quotedTableName();
  const { foreignKey, targetKey } = options;
  const foreignKeyField = collection.model.rawAttributes[foreignKey].field;
  const targetKeyField = collection.model.rawAttributes[targetKey].field;
  const queryInterface = db.sequelize.getQueryInterface();
  const q = queryInterface.quoteIdentifier.bind(queryInterface);
  return `WITH RECURSIVE cte AS (
      SELECT ${q(targetKeyField)}, ${q(foreignKeyField)}
      FROM ${tableName}
      WHERE ${q(targetKeyField)} IN (${nodeIds.join(",")})
      UNION ALL
      SELECT t.${q(targetKeyField)}, t.${q(foreignKeyField)}
      FROM ${tableName} AS t
      INNER JOIN cte ON t.${q(targetKeyField)} = cte.${q(foreignKeyField)}
      )
      SELECT ${q(targetKeyField)} AS ${q(targetKey)}, ${q(foreignKeyField)} AS ${q(foreignKey)} FROM cte`;
}, "queryParentSQL");
const _EagerLoadingTree = class _EagerLoadingTree {
  root;
  db;
  rootQueryOptions = {};
  constructor(root) {
    this.root = root;
  }
  static buildFromSequelizeOptions(options) {
    const { model, rootAttributes, includeOption, db, rootQueryOptions } = options;
    const buildNode = /* @__PURE__ */ __name((node) => {
      Object.setPrototypeOf(node, EagerLoadingNodeProto);
      node.afterBuild(db);
      return node;
    }, "buildNode");
    const root = buildNode({
      model,
      association: null,
      rawAttributes: import_lodash.default.cloneDeep(rootAttributes),
      attributes: import_lodash.default.cloneDeep(rootAttributes),
      order: options.rootOrder,
      children: []
    });
    const traverseIncludeOption = /* @__PURE__ */ __name((includeOption2, eagerLoadingTreeParent) => {
      const includeOptions = import_lodash.default.castArray(includeOption2);
      if (includeOption2.length > 0) {
        const modelPrimaryKey = eagerLoadingTreeParent.model.primaryKeyAttribute;
        pushAttribute(eagerLoadingTreeParent, modelPrimaryKey);
      }
      for (const include of includeOptions) {
        if (include.fromFilter) {
          continue;
        }
        const association = import_lodash.default.isString(include.association) ? eagerLoadingTreeParent.model.associations[include.association] : include.association;
        if (!association) {
          throw new Error(
            `Association "${include.association}" not found in model "${eagerLoadingTreeParent.model.name}"`
          );
        }
        const associationType = association.associationType;
        const child = buildNode({
          model: association.target,
          association,
          rawAttributes: import_lodash.default.cloneDeep(include.attributes),
          attributes: import_lodash.default.cloneDeep(include.attributes),
          parent: eagerLoadingTreeParent,
          where: include.where,
          children: [],
          includeOption: include.options || {}
        });
        if (associationType == "HasOne" || associationType == "HasMany") {
          const { sourceKey, foreignKey } = association;
          pushAttribute(eagerLoadingTreeParent, sourceKey);
          pushAttribute(child, foreignKey);
        }
        if (associationType == "BelongsTo") {
          const { targetKey, foreignKey } = association;
          pushAttribute(eagerLoadingTreeParent, foreignKey);
          pushAttribute(child, targetKey);
        }
        if (associationType == "BelongsToMany") {
          const { sourceKey } = association;
          pushAttribute(eagerLoadingTreeParent, sourceKey);
        }
        eagerLoadingTreeParent.children.push(child);
        if (include.include) {
          traverseIncludeOption(include.include, child);
        }
      }
    }, "traverseIncludeOption");
    traverseIncludeOption(includeOption, root);
    const tree = new _EagerLoadingTree(root);
    tree.db = db;
    tree.rootQueryOptions = rootQueryOptions;
    return tree;
  }
  async load(transaction) {
    const result = {};
    const orderOption = /* @__PURE__ */ __name((association) => {
      const targetModel = association.target;
      const order = [];
      if (targetModel.primaryKeyAttribute && targetModel.rawAttributes[targetModel.primaryKeyAttribute].autoIncrement) {
        order.push([targetModel.primaryKeyAttribute, "ASC"]);
      }
      return order;
    }, "orderOption");
    const loadRecursive = /* @__PURE__ */ __name(async (node, ids = []) => {
      var _a;
      let instances = [];
      if (!node.parent) {
        const rootInclude = ((_a = this.rootQueryOptions) == null ? void 0 : _a.include) || node.includeOption;
        const includeForFilter = rootInclude.filter((include) => {
          var _a2, _b;
          return Object.keys(include.where || {}).length > 0 || ((_b = JSON.stringify((_a2 = this.rootQueryOptions) == null ? void 0 : _a2.filter)) == null ? void 0 : _b.includes(include.association));
        });
        const isBelongsToAssociationOnly = /* @__PURE__ */ __name((includes, model) => {
          for (const include of includes) {
            const association = model.associations[include.association];
            if (!association) {
              return false;
            }
            if (association.associationType != "BelongsTo") {
              return false;
            }
            if (!isBelongsToAssociationOnly(include.include || [], association.target)) {
              return false;
            }
          }
          return true;
        }, "isBelongsToAssociationOnly");
        const belongsToAssociationsOnly = isBelongsToAssociationOnly(includeForFilter, node.model);
        if (belongsToAssociationsOnly) {
          instances = await node.model.findAll({
            ...this.rootQueryOptions,
            attributes: node.attributes,
            distinct: true,
            include: includeForFilter,
            transaction
          });
        } else {
          const primaryKeyField = node.model.primaryKeyField || node.model.primaryKeyAttribute;
          if (!primaryKeyField) {
            throw new Error(`Model ${node.model.name} does not have primary key`);
          }
          const ids2 = (await node.model.findAll({
            ...this.rootQueryOptions,
            includeIgnoreAttributes: false,
            attributes: [primaryKeyField],
            group: `${node.model.name}.${primaryKeyField}`,
            transaction,
            include: (0, import_utils.processIncludes)(includeForFilter, node.model)
          })).map((row) => {
            return { row, pk: row[primaryKeyField] };
          });
          const findOptions = {
            where: { [primaryKeyField]: ids2.map((i) => i.pk) },
            attributes: node.attributes
          };
          if (node.order) {
            findOptions["order"] = node.order;
          }
          instances = await node.model.findAll({
            ...findOptions,
            transaction
          });
        }
        const associations = node.model.associations;
        for (const [name, association] of Object.entries(associations)) {
          for (const instance of instances) {
            delete instance[name];
            delete instance.dataValues[name];
          }
        }
      } else if (ids.length > 0) {
        const association = node.association;
        const associationType = association.associationType;
        let params = {};
        const otherFindOptions = import_lodash.default.pick(node.includeOption, ["sort"]) || {};
        const collection = this.db.modelCollection.get(node.model);
        if (collection && !import_lodash.default.isEmpty(otherFindOptions)) {
          const parser = new import_options_parser.OptionsParser(otherFindOptions, {
            collection
          });
          params = parser.toSequelizeParams();
        }
        if (associationType == "HasOne" || associationType == "HasMany") {
          const foreignKey = association.foreignKey;
          const foreignKeyValues = node.parent.instances.map((instance) => instance.get(association.sourceKey));
          let where = { [foreignKey]: foreignKeyValues };
          if (node.where) {
            where = {
              [import_sequelize.Op.and]: [where, node.where]
            };
          }
          const findOptions = {
            where,
            attributes: node.attributes,
            order: params.order || orderOption(association),
            transaction
          };
          instances = await node.model.findAll(findOptions);
        }
        if (associationType === "BelongsToArray") {
          const targetKey = association.targetKey;
          const targetKeyValues = node.parent.instances.map((instance) => {
            return instance.get(association.foreignKey);
          });
          let where = { [targetKey]: Array.from(new Set((0, import_lodash.flatten)(targetKeyValues))) };
          if (node.where) {
            where = {
              [import_sequelize.Op.and]: [where, node.where]
            };
          }
          const findOptions = {
            where,
            attributes: node.attributes,
            order: params.order || orderOption(association),
            transaction
          };
          instances = await node.model.findAll(findOptions);
        }
        if (associationType == "BelongsTo") {
          const foreignKey = association.foreignKey;
          const parentInstancesForeignKeyValues = node.parent.instances.map((instance) => instance.get(foreignKey));
          const collection2 = this.db.modelCollection.get(node.model);
          instances = await node.model.findAll({
            transaction,
            where: {
              [association.targetKey]: parentInstancesForeignKeyValues
            },
            attributes: node.attributes
          });
          if (node.includeOption.recursively && instances.length > 0) {
            const targetKey = association.targetKey;
            const sql = queryParentSQL({
              db: this.db,
              collection: collection2,
              foreignKey,
              targetKey,
              nodeIds: instances.map((instance) => instance.get(targetKey))
            });
            const results = await this.db.sequelize.query(sql, {
              type: "SELECT",
              transaction
            });
            const parentInstances = await node.model.findAll({
              transaction,
              where: {
                [association.targetKey]: results.map((result2) => result2[targetKey])
              },
              attributes: node.attributes
            });
            const setInstanceParent = /* @__PURE__ */ __name((instance) => {
              const parentInstance = parentInstances.find(
                (parentInstance2) => parentInstance2.get(targetKey) == instance.get(foreignKey)
              );
              if (!parentInstance) {
                return;
              }
              setInstanceParent(parentInstance);
              instance[association.as] = instance.dataValues[association.as] = parentInstance;
            }, "setInstanceParent");
            for (const instance of instances) {
              setInstanceParent(instance);
            }
          }
        }
        if (associationType == "BelongsToMany") {
          const foreignKeyValues = node.parent.instances.map((instance) => instance.get(association.sourceKey));
          const hasOneOptions = {
            as: "_pivot_",
            foreignKey: association.otherKey,
            sourceKey: association.targetKey
          };
          if (association.through.scope) {
            hasOneOptions.scope = association.through.scope;
          }
          const pivotAssoc = new import_sequelize.HasOne(association.target, association.through.model, hasOneOptions);
          instances = await node.model.findAll({
            transaction,
            attributes: node.attributes,
            include: [
              {
                association: pivotAssoc,
                where: {
                  [association.foreignKey]: foreignKeyValues
                }
              }
            ],
            order: params.order || orderOption(association)
          });
        }
      }
      node.instances = instances;
      for (const child of node.children) {
        const modelPrimaryKey = node.model.primaryKeyField || node.model.primaryKeyAttribute;
        const nodeIds = instances.map((instance) => instance.get(modelPrimaryKey));
        await loadRecursive(child, nodeIds);
      }
      if (!node.parent) {
        return;
      } else {
        const association = node.association;
        const associationType = association.associationType;
        const setParentAccessor = /* @__PURE__ */ __name((parentInstance) => {
          const key = association.as;
          if (!key) {
            return;
          }
          const children = parentInstance.getDataValue(association.as);
          if (association.isSingleAssociation) {
            const isEmpty = !children;
            parentInstance[key] = parentInstance.dataValues[key] = isEmpty ? null : children;
          } else {
            const isEmpty = !children || children.length == 0;
            parentInstance[key] = parentInstance.dataValues[key] = isEmpty ? [] : children;
          }
        }, "setParentAccessor");
        if (associationType == "HasMany" || associationType == "HasOne") {
          const foreignKey = association.foreignKey;
          const sourceKey = association.sourceKey;
          for (const instance of node.instances) {
            const parentInstance = node.parent.instances.find(
              (parentInstance2) => parentInstance2.get(sourceKey) == instance.get(foreignKey)
            );
            if (parentInstance) {
              if (associationType == "HasMany") {
                const children = parentInstance.getDataValue(association.as);
                if (!children) {
                  parentInstance.setDataValue(association.as, [instance]);
                } else {
                  children.push(instance);
                }
              }
              if (associationType == "HasOne") {
                const key = association.options.realAs || association.as;
                parentInstance[key] = parentInstance.dataValues[key] = instance;
              }
            }
          }
        }
        if (associationType === "BelongsToArray") {
          const { foreignKey, targetKey } = association;
          const instanceMap = node.instances.reduce((mp, instance) => {
            mp[instance.get(targetKey)] = instance;
            return mp;
          }, {});
          node.parent.instances.forEach((parentInstance) => {
            const targetKeys = parentInstance.getDataValue(foreignKey);
            parentInstance.setDataValue(
              association.as,
              targetKeys == null ? void 0 : targetKeys.map((targetKey2) => instanceMap[targetKey2]).filter(Boolean)
            );
          });
        }
        if (associationType == "BelongsTo") {
          const foreignKey = association.foreignKey;
          const targetKey = association.targetKey;
          for (const instance of node.instances) {
            const parentInstances = node.parent.instances.filter(
              (parentInstance) => parentInstance.get(foreignKey) == instance.get(targetKey)
            );
            for (const parentInstance of parentInstances) {
              parentInstance.setDataValue(association.as, instance);
            }
          }
        }
        if (associationType == "BelongsToMany") {
          const sourceKey = association.sourceKey;
          const foreignKey = association.foreignKey;
          const as = association.oneFromTarget.as;
          for (const instance of node.instances) {
            instance[as] = instance.dataValues[as] = instance["_pivot_"];
            delete instance.dataValues["_pivot_"];
            delete instance["_pivot_"];
            const parentInstance = node.parent.instances.find(
              (parentInstance2) => parentInstance2.get(sourceKey) == instance.dataValues[as].get(foreignKey)
            );
            if (parentInstance) {
              const children = parentInstance.getDataValue(association.as);
              if (!children) {
                parentInstance.setDataValue(association.as, [instance]);
              } else {
                children.push(instance);
              }
            }
          }
        }
        for (const parent of node.parent.instances) {
          setParentAccessor(parent);
        }
      }
    }, "loadRecursive");
    await loadRecursive(this.root);
    const appendChildCollectionName = (0, import_append_child_collection_name_after_repository_find.appendChildCollectionNameAfterRepositoryFind)(this.db);
    const setInstanceAttributes = /* @__PURE__ */ __name((node) => {
      var _a;
      if (node.inspectInheritAttribute) {
        appendChildCollectionName({
          findOptions: {},
          data: node.instances,
          dataCollection: this.db.modelCollection.get(node.model)
        });
      }
      if (((_a = node.association) == null ? void 0 : _a.as) == "_pivot_") {
        return;
      }
      const nodeRawAttributes = node.rawAttributes || [];
      if (!import_lodash.default.isArray(nodeRawAttributes)) {
        return;
      }
      const nodeChildrenAs = node.children.map((child) => child.association.as);
      const includeAttributes = [...nodeRawAttributes, ...nodeChildrenAs];
      if (node.inspectInheritAttribute) {
        includeAttributes.push("__schemaName", "__tableName", "__collection");
      }
      for (const instance of node.instances) {
        instance.dataValues = import_lodash.default.pick(instance.dataValues, includeAttributes);
      }
    }, "setInstanceAttributes");
    const traverse = /* @__PURE__ */ __name((node) => {
      setInstanceAttributes(node);
      for (const child of node.children) {
        traverse(child);
      }
    }, "traverse");
    traverse(this.root);
    return result;
  }
};
__name(_EagerLoadingTree, "EagerLoadingTree");
let EagerLoadingTree = _EagerLoadingTree;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EagerLoadingTree
});
