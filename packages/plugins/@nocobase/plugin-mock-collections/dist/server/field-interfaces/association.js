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
var association_exports = {};
__export(association_exports, {
  m2m: () => m2m,
  m2o: () => m2o,
  o2m: () => o2m,
  obo: () => obo,
  oho: () => oho
});
module.exports = __toCommonJS(association_exports);
var import_faker = require("@faker-js/faker");
var import_utils = require("@nocobase/utils");
function reverseFieldHandle(defaults, { target, reverseField }) {
  if (!reverseField) {
    delete defaults.reverseField;
  } else {
    Object.assign(defaults.reverseField, reverseField);
    if (!defaults.reverseField.name) {
      defaults.reverseField.name = `f_${(0, import_utils.uid)()}`;
    }
    if (reverseField.title && defaults.reverseField.uiSchema) {
      defaults.reverseField.uiSchema["title"] = reverseField.title;
    }
    if (!defaults.reverseField.uiSchema["title"]) {
      defaults.reverseField.uiSchema["title"] = defaults.reverseField.name;
    }
    if (!defaults.key) {
      defaults.key = (0, import_utils.uid)();
    }
    if (!defaults.reverseField.key) {
      defaults.reverseField.key = (0, import_utils.uid)();
    }
    defaults["reverseKey"] = defaults.reverseField.key;
    defaults.reverseField.reverseKey = defaults.key;
    defaults.reverseField.collectionName = target;
  }
  return defaults;
}
function generateForeignKeyField(options) {
  return options.type === "bigInt" ? {
    key: (0, import_utils.uid)(),
    ...options,
    interface: "integer",
    isForeignKey: true,
    sort: 1,
    uiSchema: {
      type: "number",
      title: options.name,
      "x-component": "InputNumber",
      "x-read-pretty": true
    }
  } : {
    key: (0, import_utils.uid)(),
    ...options,
    interface: "input",
    isForeignKey: true,
    sort: 1,
    uiSchema: {
      type: "string",
      title: options.name,
      "x-component": "Input",
      "x-read-pretty": true
    }
  };
}
const oho = {
  options: (options) => {
    const { foreignKey = `f_${(0, import_utils.uid)()}`, targetKey = "id", sourceKey = "id", reverseField } = options;
    const defaults = {
      type: "hasOne",
      foreignKey,
      sourceKey,
      // name,
      uiSchema: {
        // title,
        "x-component": "AssociationField",
        "x-component-props": {
          // mode: 'tags',
          multiple: false,
          fieldNames: {
            label: targetKey,
            value: targetKey
          }
        }
      },
      reverseField: {
        interface: "obo",
        type: "belongsTo",
        foreignKey,
        targetKey: sourceKey,
        uiSchema: {
          // title,
          "x-component": "AssociationField",
          "x-component-props": {
            // mode: 'tags',
            multiple: false,
            fieldNames: {
              label: sourceKey,
              value: sourceKey
            }
          }
        }
      }
    };
    defaults["foreignKeyFields"] = [
      generateForeignKeyField({
        type: sourceKey === "id" ? "bigInt" : "string",
        name: foreignKey,
        collectionName: options.target
      })
    ];
    return reverseFieldHandle(defaults, options);
  },
  mock: async (options, { mockCollectionData, maxDepth, depth }) => {
    return mockCollectionData(options.target, 1, depth + 1, maxDepth);
  }
};
const obo = {
  options: (options) => {
    const { foreignKey = `f_${(0, import_utils.uid)()}`, targetKey = "id", sourceKey = "id", reverseField } = options;
    const key = (0, import_utils.uid)();
    const defaults = {
      type: "belongsTo",
      foreignKey,
      targetKey,
      // name,
      uiSchema: {
        // title,
        "x-component": "AssociationField",
        "x-component-props": {
          // mode: 'tags',
          multiple: false,
          fieldNames: {
            label: targetKey,
            value: targetKey
          }
        }
      },
      reverseField: {
        interface: "oho",
        type: "hasOne",
        foreignKey,
        sourceKey: targetKey,
        uiSchema: {
          // title,
          "x-component": "AssociationField",
          "x-component-props": {
            multiple: false,
            fieldNames: {
              label: sourceKey,
              value: sourceKey
            }
          }
        }
      }
    };
    defaults["foreignKeyFields"] = [
      generateForeignKeyField({
        type: targetKey === "id" ? "bigInt" : "string",
        name: foreignKey,
        collectionName: options.collectionName
      })
    ];
    return reverseFieldHandle(defaults, options);
  },
  mock: async (options, { mockCollectionData, depth, maxDepth }) => {
    return mockCollectionData(options.target, 1, depth + 1, maxDepth);
  }
};
const o2m = {
  options: (options) => {
    const { foreignKey = `f_${(0, import_utils.uid)()}`, targetKey = "id", sourceKey = "id", reverseField } = options;
    const defaults = {
      type: "hasMany",
      foreignKey,
      targetKey,
      sourceKey,
      // name,
      uiSchema: {
        // title,
        "x-component": "AssociationField",
        "x-component-props": {
          // mode: 'tags',
          multiple: true,
          fieldNames: {
            label: targetKey,
            value: targetKey
          }
        }
      },
      reverseField: {
        interface: "m2o",
        type: "belongsTo",
        foreignKey,
        targetKey: sourceKey,
        uiSchema: {
          // title: `T-${uid()}`,
          "x-component": "AssociationField",
          "x-component-props": {
            // mode: 'tags',
            multiple: false,
            fieldNames: {
              label: sourceKey,
              value: sourceKey
            }
          }
        }
      }
    };
    defaults["foreignKeyFields"] = [
      generateForeignKeyField({
        type: sourceKey === "id" ? "bigInt" : "string",
        name: foreignKey,
        collectionName: options.target
      })
    ];
    return reverseFieldHandle(defaults, options);
  },
  mock: async (options, { mockCollectionData, depth, maxDepth }) => {
    return mockCollectionData(options.target, import_faker.faker.number.int({ min: 2, max: 5 }), depth + 1, maxDepth);
  }
};
const m2o = {
  options: (options) => {
    const { foreignKey = `f_${(0, import_utils.uid)()}`, targetKey = "id", sourceKey = "id", reverseField } = options;
    const defaults = {
      type: "belongsTo",
      foreignKey,
      targetKey,
      // name,
      uiSchema: {
        // title,
        "x-component": "AssociationField",
        "x-component-props": {
          // mode: 'tags',
          multiple: false,
          fieldNames: {
            label: targetKey,
            value: targetKey
          }
        }
      },
      reverseField: {
        interface: "o2m",
        type: "hasMany",
        foreignKey,
        targetKey: sourceKey,
        sourceKey: targetKey,
        // name,
        uiSchema: {
          // title,
          "x-component": "AssociationField",
          "x-component-props": {
            // mode: 'tags',
            multiple: true,
            fieldNames: {
              label: sourceKey,
              value: sourceKey
            }
          }
        }
      }
    };
    defaults["foreignKeyFields"] = [
      generateForeignKeyField({
        type: targetKey === "id" ? "bigInt" : "string",
        name: foreignKey,
        collectionName: options.collectionName
      })
    ];
    return reverseFieldHandle(defaults, options);
  },
  mock: async (options, { mockCollectionData, depth, maxDepth }) => {
    return mockCollectionData(options.target, 1, depth + 1, maxDepth);
  }
};
const m2m = {
  options: (options) => {
    const {
      through = `t_${(0, import_utils.uid)()}`,
      foreignKey = `f_${(0, import_utils.uid)()}`,
      otherKey = `f_${(0, import_utils.uid)()}`,
      targetKey = "id",
      sourceKey = "id",
      reverseField
    } = options;
    const defaults = {
      type: "belongsToMany",
      through,
      foreignKey,
      otherKey,
      targetKey,
      sourceKey,
      // name,
      uiSchema: {
        // title,
        "x-component": "AssociationField",
        "x-component-props": {
          // mode: 'tags',
          multiple: true,
          fieldNames: {
            label: targetKey,
            value: targetKey
          }
        }
      },
      reverseField: {
        interface: "m2m",
        type: "belongsToMany",
        through,
        foreignKey: otherKey,
        otherKey: foreignKey,
        targetKey: sourceKey,
        sourceKey: targetKey,
        // name,
        uiSchema: {
          // title,
          "x-component": "AssociationField",
          "x-component-props": {
            // mode: 'tags',
            multiple: true,
            fieldNames: {
              label: sourceKey,
              value: sourceKey
            }
          }
        }
      }
    };
    defaults["foreignKeyFields"] = [
      generateForeignKeyField({
        type: sourceKey === "id" ? "bigInt" : "string",
        name: foreignKey,
        collectionName: through
      }),
      generateForeignKeyField({
        type: targetKey === "id" ? "bigInt" : "string",
        name: otherKey,
        collectionName: through
      })
    ];
    defaults["throughCollection"] = {
      key: (0, import_utils.uid)(),
      name: through,
      title: through,
      timestamps: true,
      autoGenId: false,
      hidden: true,
      autoCreate: true,
      isThrough: true,
      sortable: false
    };
    return reverseFieldHandle(defaults, options);
  },
  mock: async (options, { mockCollectionData, depth, maxDepth }) => {
    return mockCollectionData(options.target, import_faker.faker.number.int({ min: 2, max: 5 }), depth + 1, maxDepth);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  m2m,
  m2o,
  o2m,
  obo,
  oho
});
