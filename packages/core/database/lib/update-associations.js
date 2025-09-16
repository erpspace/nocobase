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
var update_associations_exports = {};
__export(update_associations_exports, {
  belongsToManyAssociations: () => belongsToManyAssociations,
  modelAssociationByKey: () => modelAssociationByKey,
  modelAssociations: () => modelAssociations,
  updateAssociation: () => updateAssociation,
  updateAssociations: () => updateAssociations,
  updateModelByValues: () => updateModelByValues,
  updateMultipleAssociation: () => updateMultipleAssociation,
  updateSingleAssociation: () => updateSingleAssociation,
  updateThroughTableValue: () => updateThroughTableValue
});
module.exports = __toCommonJS(update_associations_exports);
var import_lodash = __toESM(require("lodash"));
var import_model = require("./model");
var import_update_guard = require("./update-guard");
var import_utils = require("./utils");
function modelAssociations(instance) {
  return instance.constructor.associations;
}
__name(modelAssociations, "modelAssociations");
function belongsToManyAssociations(instance) {
  const associations = modelAssociations(instance);
  return Object.entries(associations).filter((entry) => {
    const [key, association] = entry;
    return association.associationType == "BelongsToMany";
  }).map((association) => {
    return association[1];
  });
}
__name(belongsToManyAssociations, "belongsToManyAssociations");
function modelAssociationByKey(instance, key) {
  return modelAssociations(instance)[key];
}
__name(modelAssociationByKey, "modelAssociationByKey");
async function updateModelByValues(instance, values, options) {
  if (!(options == null ? void 0 : options.sanitized)) {
    const guard = new import_update_guard.UpdateGuard();
    guard.setModel(instance.constructor);
    guard.setBlackList(options.blacklist);
    guard.setWhiteList(options.whitelist);
    guard.setAssociationKeysToBeUpdate(options.updateAssociationValues);
    values = guard.sanitize(values);
  }
  await instance.update(values, options);
  await updateAssociations(instance, values, options);
}
__name(updateModelByValues, "updateModelByValues");
async function updateThroughTableValue(instance, throughName, throughValues, source, transaction = null) {
  for (const belongsToMany of belongsToManyAssociations(instance)) {
    const throughModel = belongsToMany.through.model;
    const throughModelName = throughModel.name;
    if (throughModelName === throughModelName) {
      const where = {
        [belongsToMany.foreignKey]: instance.get(belongsToMany.sourceKey),
        [belongsToMany.otherKey]: source.get(belongsToMany.targetKey)
      };
      return await throughModel.update(throughValues, {
        where,
        transaction
      });
    }
  }
}
__name(updateThroughTableValue, "updateThroughTableValue");
async function updateAssociations(instance, values, options = {}) {
  if (!values) {
    return;
  }
  if (options == null ? void 0 : options.updateAssociationValues) {
    options.recursive = true;
  }
  let newTransaction = false;
  let transaction = options.transaction;
  if (!transaction) {
    newTransaction = true;
    transaction = await instance.sequelize.transaction();
  }
  const keys = Object.keys(values);
  try {
    for (const key of Object.keys(modelAssociations(instance))) {
      if (keys.includes(key)) {
        await updateAssociation(instance, key, values[key], {
          ...options,
          transaction
        });
      }
    }
    for (const belongsToMany of belongsToManyAssociations(instance)) {
      const throughModel = belongsToMany.through.model;
      const throughModelName = throughModel.name;
      if (values[throughModelName] && options.sourceModel) {
        const where = {
          [belongsToMany.foreignKey]: instance.get(belongsToMany.sourceKey),
          [belongsToMany.otherKey]: options.sourceModel.get(belongsToMany.targetKey)
        };
        await throughModel.update(values[throughModel.name], {
          where,
          context: options.context,
          transaction
        });
      }
    }
    if (newTransaction) {
      await transaction.commit();
    }
  } catch (error) {
    if (newTransaction) {
      await transaction.rollback();
    }
    throw error;
  }
}
__name(updateAssociations, "updateAssociations");
function isReverseAssociationPair(a, b) {
  const typeSet = /* @__PURE__ */ new Set();
  typeSet.add(a.associationType);
  typeSet.add(b.associationType);
  if (typeSet.size == 1 && typeSet.has("BelongsToMany")) {
    return a.through.tableName === b.through.tableName && a.target.name === b.source.name && b.target.name === a.source.name && a.foreignKey === b.otherKey && a.sourceKey === b.targetKey && a.otherKey === b.foreignKey && a.targetKey === b.sourceKey;
  }
  if (typeSet.has("HasOne") && typeSet.has("BelongsTo") || typeSet.has("HasMany") && typeSet.has("BelongsTo")) {
    const sourceAssoc = a.associationType == "BelongsTo" ? b : a;
    const targetAssoc = sourceAssoc == a ? b : a;
    return sourceAssoc.source.name === targetAssoc.target.name && sourceAssoc.target.name === targetAssoc.source.name && sourceAssoc.foreignKey === targetAssoc.foreignKey && sourceAssoc.sourceKey === targetAssoc.targetKey;
  }
  return false;
}
__name(isReverseAssociationPair, "isReverseAssociationPair");
async function updateAssociation(instance, key, value, options = {}) {
  const association = modelAssociationByKey(instance, key);
  if (!association) {
    return false;
  }
  if (options.associationContext && isReverseAssociationPair(association, options.associationContext)) {
    return false;
  }
  if (association.update) {
    return association.update(instance, value, options);
  }
  switch (association.associationType) {
    case "HasOne":
    case "BelongsTo":
      return updateSingleAssociation(instance, key, value, options);
    case "HasMany":
    case "BelongsToMany":
      return updateMultipleAssociation(instance, key, value, options);
  }
}
__name(updateAssociation, "updateAssociation");
async function updateSingleAssociation(model, key, value, options = {}) {
  const association = modelAssociationByKey(model, key);
  if (!association) {
    return false;
  }
  if (!["undefined", "string", "number", "object"].includes(typeof value)) {
    return false;
  }
  if (Array.isArray(value)) {
    throw new Error(`The value of '${key}' cannot be in array format`);
  }
  const { recursive, context, updateAssociationValues = [], transaction } = options;
  const keys = (0, import_utils.getKeysByPrefix)(updateAssociationValues, key);
  const setAccessor = association.accessors.set;
  const removeAssociation = /* @__PURE__ */ __name(async () => {
    await model[setAccessor](null, { transaction });
    model.setDataValue(key, null);
    return true;
  }, "removeAssociation");
  if ((0, import_utils.isUndefinedOrNull)(value)) {
    return await removeAssociation();
  }
  if (association.associationType === "HasOne" && !model.get(association.sourceKeyAttribute)) {
    throw new Error(`The source key ${association.sourceKeyAttribute} is not set in ${model.constructor.name}`);
  }
  const checkBelongsToForeignKeyValue = /* @__PURE__ */ __name(() => {
    if (association.associationType === "BelongsTo" && !model.get(association.foreignKey)) {
      throw new Error(
        // @ts-ignore
        `The target key ${association.targetKey} is not set in ${association.target.name}`
      );
    }
  }, "checkBelongsToForeignKeyValue");
  if ((0, import_utils.isStringOrNumber)(value)) {
    await model[setAccessor](value, { context, transaction });
    return true;
  }
  if (value instanceof import_model.Model) {
    await model[setAccessor](value, { context, transaction });
    model.setDataValue(key, value);
    return true;
  }
  const createAccessor = association.accessors.create;
  let dataKey;
  let M;
  if (association.associationType === "BelongsTo") {
    M = association.target;
    dataKey = association.targetKey;
  } else {
    M = association.target;
    dataKey = M.primaryKeyAttribute;
  }
  if ((0, import_utils.isStringOrNumber)(value[dataKey])) {
    const instance2 = await M.findOne({
      where: {
        [dataKey]: value[dataKey]
      },
      transaction
    });
    if (instance2) {
      await model[setAccessor](instance2, { context, transaction });
      if (!recursive) {
        return;
      }
      if (updateAssociationValues.includes(key)) {
        const updateValues = { ...value };
        if (association.associationType === "HasOne") {
          delete updateValues[association.foreignKey];
        }
        await instance2.update(updateValues, { ...options, transaction });
      }
      await updateAssociations(instance2, value, {
        ...options,
        transaction,
        associationContext: association,
        updateAssociationValues: keys
      });
      model.setDataValue(key, instance2);
      return true;
    }
  }
  const instance = await model[createAccessor](value, { context, transaction });
  await updateAssociations(instance, value, {
    ...options,
    transaction,
    associationContext: association,
    updateAssociationValues: keys
  });
  model.setDataValue(key, instance);
  if (association.targetKey) {
    model.setDataValue(association.foreignKey, instance[dataKey]);
  }
  checkBelongsToForeignKeyValue();
}
__name(updateSingleAssociation, "updateSingleAssociation");
async function updateMultipleAssociation(model, key, value, options = {}) {
  var _a, _b;
  const association = modelAssociationByKey(model, key);
  if (!association) {
    return false;
  }
  if (!["undefined", "string", "number", "object"].includes(typeof value)) {
    return false;
  }
  const { recursive, context, updateAssociationValues = [], transaction } = options;
  const keys = (0, import_utils.getKeysByPrefix)(updateAssociationValues, key);
  const setAccessor = association.accessors.set;
  const createAccessor = association.accessors.create;
  if ((0, import_utils.isUndefinedOrNull)(value)) {
    await model[setAccessor](null, { transaction, context, individualHooks: true, validate: false });
    model.setDataValue(key, null);
    return;
  }
  if (association.associationType === "HasMany" && !model.get(association.sourceKeyAttribute)) {
    throw new Error(`The source key ${association.sourceKeyAttribute} is not set in ${model.constructor.name}`);
  }
  if ((0, import_utils.isStringOrNumber)(value)) {
    await model[setAccessor](value, { transaction, context, individualHooks: true, validate: false });
    return;
  }
  value = import_lodash.default.castArray(value);
  const setItems = [];
  const objectItems = [];
  for (const item of value) {
    if ((0, import_utils.isUndefinedOrNull)(item)) {
      continue;
    }
    if ((0, import_utils.isStringOrNumber)(item)) {
      setItems.push(item);
    } else if (item instanceof import_model.Model) {
      setItems.push(item);
    } else if (item.sequelize) {
      setItems.push(item);
    } else if (typeof item === "object") {
      const targetKey2 = association.targetKey || association.options.targetKey || "id";
      if (item[targetKey2]) {
        const attributes = {
          [targetKey2]: item[targetKey2]
        };
        const instance = association.target.build(attributes, { isNewRecord: false });
        setItems.push(instance);
      }
      objectItems.push(item);
    }
  }
  await model[setAccessor](setItems, { transaction, context, individualHooks: true, validate: false });
  const newItems = [];
  const pk = association.target.primaryKeyAttribute;
  let targetKey = pk;
  const db = model.constructor["database"];
  const tmpKey = (_a = association["options"]) == null ? void 0 : _a["targetKey"];
  if (tmpKey !== pk) {
    const targetKeyFieldOptions = (_b = db.getFieldByPath(`${association.target.name}.${tmpKey}`)) == null ? void 0 : _b.options;
    if (targetKeyFieldOptions == null ? void 0 : targetKeyFieldOptions.unique) {
      targetKey = tmpKey;
    }
  }
  for (const item of objectItems) {
    const through = association.through ? association.through.model.name : null;
    const accessorOptions = {
      context,
      transaction
    };
    const throughValue = item[through];
    if (throughValue) {
      accessorOptions["through"] = throughValue;
    }
    if (pk !== targetKey && !(0, import_utils.isUndefinedOrNull)(item[pk]) && (0, import_utils.isUndefinedOrNull)(item[targetKey])) {
      throw new Error(`${targetKey} field value is empty`);
    }
    if ((0, import_utils.isUndefinedOrNull)(item[targetKey])) {
      const instance = await model[createAccessor](item, accessorOptions);
      await updateAssociations(instance, item, {
        ...options,
        transaction,
        associationContext: association,
        updateAssociationValues: keys
      });
      newItems.push(instance);
    } else {
      const where = {
        [targetKey]: item[targetKey]
      };
      let instance = await association.target.findOne({
        where,
        transaction
      });
      if (!instance) {
        instance = await model[createAccessor](item, accessorOptions);
        await updateAssociations(instance, item, {
          ...options,
          transaction,
          associationContext: association,
          updateAssociationValues: keys
        });
        newItems.push(instance);
        continue;
      }
      const addAccessor = association.accessors.add;
      await model[addAccessor](instance, accessorOptions);
      if (!recursive) {
        continue;
      }
      if (updateAssociationValues.includes(key)) {
        if (association.associationType === "HasMany") {
          delete item[association.foreignKey];
        }
        await instance.update(item, { ...options, transaction });
      }
      await updateAssociations(instance, item, {
        ...options,
        transaction,
        associationContext: association,
        updateAssociationValues: keys
      });
      newItems.push(instance);
    }
  }
  for (const newItem of newItems) {
    const findTargetKey = association.targetKey || association.options.targetKey || targetKey;
    const existIndexInSetItems = setItems.findIndex((setItem) => setItem[findTargetKey] === newItem[findTargetKey]);
    if (existIndexInSetItems !== -1) {
      setItems[existIndexInSetItems] = newItem;
    } else {
      setItems.push(newItem);
    }
  }
  model.setDataValue(key, setItems);
}
__name(updateMultipleAssociation, "updateMultipleAssociation");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  belongsToManyAssociations,
  modelAssociationByKey,
  modelAssociations,
  updateAssociation,
  updateAssociations,
  updateModelByValues,
  updateMultipleAssociation,
  updateSingleAssociation,
  updateThroughTableValue
});
