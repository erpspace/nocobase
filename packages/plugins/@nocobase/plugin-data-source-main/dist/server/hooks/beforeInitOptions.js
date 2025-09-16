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
var beforeInitOptions_exports = {};
__export(beforeInitOptions_exports, {
  beforeInitOptions: () => beforeInitOptions
});
module.exports = __toCommonJS(beforeInitOptions_exports);
var import_utils = require("@nocobase/utils");
var import_sequelize = require("sequelize");
const setTargetKey = (db, model) => {
  if (model.get("targetKey")) {
    return;
  }
  const target = model.get("target");
  if (db.hasCollection(target)) {
    const targetModel = db.getCollection(target).model;
    model.set("targetKey", targetModel.primaryKeyAttribute || "id");
  } else {
    model.set("targetKey", "id");
  }
};
const setSourceKey = (db, model) => {
  if (model.get("sourceKey")) {
    return;
  }
  const source = model.get("collectionName");
  if (db.hasCollection(source)) {
    const sourceModel = db.getCollection(source).model;
    model.set("sourceKey", sourceModel.primaryKeyAttribute || "id");
  } else {
    model.set("sourceKey", "id");
  }
};
const beforeInitOptions = {
  belongsTo(model, { database }) {
    if (!model.get("target")) {
      model.set("target", import_sequelize.Utils.pluralize(model.get("name")));
    }
    const defaults = {
      // targetKey: 'id',
      foreignKey: `f_${(0, import_utils.uid)()}`
    };
    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }
      model.set(key, defaults[key]);
    }
    setTargetKey(database, model);
  },
  belongsToMany(model, { database }) {
    if (!model.get("target")) {
      model.set("target", model.get("name"));
    }
    const defaults = {
      // targetKey: 'id',
      // sourceKey: 'id',
      through: `t_${(0, import_utils.uid)()}`,
      foreignKey: `f_${(0, import_utils.uid)()}`,
      otherKey: `f_${(0, import_utils.uid)()}`
    };
    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }
      model.set(key, defaults[key]);
    }
    setTargetKey(database, model);
    setSourceKey(database, model);
  },
  hasMany(model, { database }) {
    if (!model.get("target")) {
      model.set("target", model.get("name"));
    }
    const defaults = {
      // targetKey: 'id',
      // sourceKey: 'id',
      foreignKey: `f_${(0, import_utils.uid)()}`,
      target: `t_${(0, import_utils.uid)()}`
    };
    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }
      model.set(key, defaults[key]);
    }
    setTargetKey(database, model);
    setSourceKey(database, model);
    if (model.get("sortable") && model.get("type") === "hasMany") {
      model.set("sortBy", model.get("foreignKey") + "Sort");
    }
  },
  hasOne(model, { database }) {
    if (!model.get("target")) {
      model.set("target", import_sequelize.Utils.pluralize(model.get("name")));
    }
    const defaults = {
      // sourceKey: 'id',
      foreignKey: `f_${(0, import_utils.uid)()}`
    };
    for (const key in defaults) {
      if (model.get(key)) {
        continue;
      }
      model.set(key, defaults[key]);
    }
    setSourceKey(database, model);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  beforeInitOptions
});
