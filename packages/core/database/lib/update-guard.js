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
var update_guard_exports = {};
__export(update_guard_exports, {
  UpdateGuard: () => UpdateGuard
});
module.exports = __toCommonJS(update_guard_exports);
var import_lodash = __toESM(require("lodash"));
var import_model = require("./model");
const _UpdateGuard = class _UpdateGuard {
  model;
  action;
  underscored;
  associationKeysToBeUpdate;
  blackList;
  whiteList;
  static fromOptions(model, options) {
    const guard = new _UpdateGuard();
    guard.setModel(model);
    guard.setWhiteList(options.whitelist);
    guard.setBlackList(options.blacklist);
    guard.setAction(import_lodash.default.get(options, "action", "update"));
    guard.setAssociationKeysToBeUpdate(options.updateAssociationValues);
    if (options.underscored) {
      guard.underscored = options.underscored;
    }
    return guard;
  }
  setAction(action) {
    this.action = action;
  }
  setModel(model) {
    this.model = model;
  }
  setAssociationKeysToBeUpdate(associationKeysToBeUpdate) {
    if (this.action == "create") {
      this.associationKeysToBeUpdate = Object.keys(this.model.associations);
    } else {
      this.associationKeysToBeUpdate = associationKeysToBeUpdate;
    }
  }
  setWhiteList(whiteList) {
    this.whiteList = whiteList;
  }
  setBlackList(blackList) {
    this.blackList = blackList;
  }
  checkValues(values) {
    const dfs = /* @__PURE__ */ __name((values2, model) => {
      const associations = model.associations;
      const belongsToManyThroughNames = [];
      const associationValueKeys = Object.keys(associations).filter((key) => {
        return Object.keys(values2).includes(key);
      });
      const belongsToManyValueKeys = associationValueKeys.filter((key) => {
        return associations[key].associationType === "BelongsToMany";
      });
      const hasManyValueKeys = associationValueKeys.filter((key) => {
        return associations[key].associationType === "HasMany";
      });
      for (const belongsToManyKey of belongsToManyValueKeys) {
        const association = associations[belongsToManyKey];
        const through = association.through.model;
        belongsToManyThroughNames.push(through.name);
      }
      for (const hasManyKey of hasManyValueKeys) {
        const association = associations[hasManyKey];
        if (belongsToManyThroughNames.includes(association.target.name)) {
          throw new Error(
            `HasMany association ${hasManyKey} cannot be used with BelongsToMany association ${association.target.name} with same through model`
          );
        }
      }
    }, "dfs");
    dfs(values, this.model);
  }
  /**
   * Sanitize values by whitelist blacklist
   * @param values
   */
  sanitize(values) {
    if (values === null || values === void 0) {
      return values;
    }
    values = import_lodash.default.clone(values);
    if (!this.model) {
      throw new Error("please set model first");
    }
    this.checkValues(values);
    const associations = this.model.associations;
    const associationsValues = import_lodash.default.pick(values, Object.keys(associations));
    const listOfAssociation = /* @__PURE__ */ __name((list, association) => {
      if (list) {
        list = list.filter((whiteListKey) => whiteListKey.startsWith(`${association}.`)).map((whiteListKey) => whiteListKey.replace(`${association}.`, ""));
        if (list.length == 0) {
          return void 0;
        }
        return list;
      }
      return void 0;
    }, "listOfAssociation");
    Object.keys(associationsValues).forEach((association) => {
      let associationValues = associationsValues[association];
      const associationObj = associations[association];
      const filterAssociationToBeUpdate = /* @__PURE__ */ __name((value) => {
        var _a;
        if (value === null) {
          return value;
        }
        const associationKeysToBeUpdate = this.associationKeysToBeUpdate || [];
        if (associationKeysToBeUpdate.includes(association)) {
          return value;
        }
        const associationKeyName = ((_a = associationObj == null ? void 0 : associationObj["options"]) == null ? void 0 : _a.targetKey) ? associationObj["options"].targetKey : associationObj.target.primaryKeyAttribute;
        if (value[associationKeyName]) {
          return import_lodash.default.pick(value, [associationKeyName, ...Object.keys(associationObj.target.associations)]);
        }
        return value;
      }, "filterAssociationToBeUpdate");
      const sanitizeValue = /* @__PURE__ */ __name((value) => {
        const associationUpdateGuard = new _UpdateGuard();
        associationUpdateGuard.setModel(associations[association].target);
        ["whiteList", "blackList", "associationKeysToBeUpdate"].forEach((optionKey) => {
          associationUpdateGuard[`set${import_lodash.default.upperFirst(optionKey)}`](listOfAssociation(this[optionKey], association));
        });
        return associationUpdateGuard.sanitize(filterAssociationToBeUpdate(value));
      }, "sanitizeValue");
      if (Array.isArray(associationValues)) {
        associationValues = associationValues.map((value) => {
          if (value === void 0 || value === null || typeof value == "string" || typeof value == "number") {
            return value;
          } else {
            return sanitizeValue(value);
          }
        });
      } else if (typeof associationValues === "object" && associationValues !== null) {
        associationValues = sanitizeValue(associationValues);
      }
      values[association] = associationValues;
      if (associationObj.associationType === "BelongsTo") {
        if (typeof associationValues === "object" && associationValues !== null) {
          if (associationValues[associationObj.targetKey] != null) {
            values[associationObj.foreignKey] = associationValues[associationObj.targetKey];
          }
        } else {
          values[associationObj.foreignKey] = associationValues;
        }
      }
    });
    if (values instanceof import_model.Model) {
      return values;
    }
    let valuesKeys = Object.keys(values || {});
    if (this.whiteList) {
      valuesKeys = valuesKeys.filter((valueKey) => {
        return this.whiteList.findIndex((whiteKey) => {
          const keyPaths = whiteKey.split(".");
          return keyPaths[0] === valueKey;
        }) !== -1;
      });
    }
    if (this.blackList) {
      valuesKeys = valuesKeys.filter((valueKey) => !this.blackList.includes(valueKey));
    }
    const result = valuesKeys.reduce((obj, key) => {
      import_lodash.default.set(obj, key, values[key]);
      return obj;
    }, {});
    return result;
  }
};
__name(_UpdateGuard, "UpdateGuard");
let UpdateGuard = _UpdateGuard;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UpdateGuard
});
