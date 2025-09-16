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
var afterCreateForForeignKeyField_exports = {};
__export(afterCreateForForeignKeyField_exports, {
  afterCreateForForeignKeyField: () => afterCreateForForeignKeyField
});
module.exports = __toCommonJS(afterCreateForForeignKeyField_exports);
function afterCreateForForeignKeyField(db) {
  function generateFkOptions(collectionName, foreignKey) {
    const collection = db.getCollection(collectionName);
    if (!collection) {
      throw new Error("collection not found");
    }
    const M = collection.model;
    const attr = M.rawAttributes[foreignKey];
    if (!attr) {
      throw new Error(`${collectionName}.${foreignKey} does not exists`);
    }
    return attribute2field(attr);
  }
  function attribute2field(attribute) {
    let type = "bigInt";
    if (attribute.type.constructor.name === "INTEGER") {
      type = "integer";
    } else if (attribute.type.constructor.name === "STRING") {
      type = "string";
    } else if (attribute.type.constructor.name === "UUID") {
      type = "uuid";
    }
    const name = attribute.fieldName;
    const data = {
      interface: "integer",
      name,
      type,
      uiSchema: {
        type: "number",
        title: name,
        "x-component": "InputNumber",
        "x-read-pretty": true
      }
    };
    if (type === "string") {
      data["interface"] = "input";
      data["uiSchema"] = {
        type: "string",
        title: name,
        "x-component": "Input",
        "x-read-pretty": true
      };
    }
    if (type === "uuid") {
      data["interface"] = "uuid";
      data["uiSchema"] = {
        type: "string",
        title: name,
        "x-component": "Input",
        "x-read-pretty": true
      };
    }
    return data;
  }
  async function createFieldIfNotExists({ values, transaction, interfaceType = null }) {
    const { collectionName, name } = values;
    if (!collectionName || !name) {
      throw new Error(`field options invalid`);
    }
    const r = db.getRepository("fields");
    const instance = await r.findOne({
      filter: {
        collectionName,
        name
      },
      transaction
    });
    if (instance) {
      if (instance.type !== values.type) {
        throw new Error(`fk type invalid`);
      }
      instance.set("sort", 1);
      instance.set("isForeignKey", true);
      await instance.save({ transaction });
    } else {
      const createOptions = {
        values: {
          isForeignKey: true,
          ...values
        },
        transaction
      };
      if (interfaceType === "m2o") {
        createOptions["context"] = {};
      }
      const creatInstance = await r.create(createOptions);
      creatInstance.set("sort", 1);
      await creatInstance.save({ transaction });
    }
    await r.update({
      filter: {
        collectionName,
        options: {
          primaryKey: true
        }
      },
      values: {
        sort: 0
      },
      transaction
    });
  }
  const hook = async (model, { transaction, context }) => {
    if (!context) {
      return;
    }
    const {
      type,
      interface: interfaceType,
      collectionName,
      target,
      through,
      foreignKey,
      otherKey,
      source
    } = model.get();
    if (source) return;
    if (["oho", "o2m"].includes(interfaceType)) {
      const values = generateFkOptions(target, foreignKey);
      await createFieldIfNotExists({
        values: {
          collectionName: target,
          ...values
        },
        interfaceType,
        transaction
      });
    } else if (["obo", "m2o"].includes(interfaceType)) {
      const values = generateFkOptions(collectionName, foreignKey);
      await createFieldIfNotExists({
        values: { collectionName, ...values },
        transaction,
        interfaceType
      });
    } else if (["linkTo", "m2m"].includes(interfaceType)) {
      if (type !== "belongsToMany") {
        return;
      }
      const r = db.getRepository("collections");
      const instance = await r.findOne({
        filter: {
          name: through
        },
        transaction
      });
      if (!instance) {
        await r.create({
          values: {
            name: through,
            title: through,
            timestamps: true,
            autoGenId: false,
            hidden: true,
            autoCreate: true,
            isThrough: true,
            sortable: false
          },
          context,
          transaction
        });
      }
      const opts1 = generateFkOptions(through, foreignKey);
      const opts2 = generateFkOptions(through, otherKey);
      await createFieldIfNotExists({
        values: {
          collectionName: through,
          ...opts1
        },
        transaction
      });
      await createFieldIfNotExists({
        values: {
          collectionName: through,
          ...opts2
        },
        transaction
      });
    }
  };
  return async (model, options) => {
    try {
      await hook(model, options);
    } catch (error) {
      console.log(error);
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterCreateForForeignKeyField
});
