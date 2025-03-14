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
var hook_exports = {};
__export(hook_exports, {
  fillParentFields: () => fillParentFields,
  getAssociationPath: () => getAssociationPath,
  parseAssociationNames: () => parseAssociationNames
});
module.exports = __toCommonJS(hook_exports);
function getAssociationPath(str) {
  const lastIndex = str.lastIndexOf(".");
  if (lastIndex !== -1) {
    return str.substring(0, lastIndex);
  }
  return str;
}
function fillParentFields(appends) {
  const depFields = Array.from(appends).filter((field) => {
    var _a;
    return (_a = field == null ? void 0 : field.includes) == null ? void 0 : _a.call(field, ".");
  });
  depFields.forEach((field) => {
    const fields = field.split(".");
    fields.pop();
    const parentField = fields.join(".");
    appends.add(parentField);
  });
  return appends;
}
const parseAssociationNames = (dataSourceKey, collectionName, app, fieldSchema) => {
  let appends = /* @__PURE__ */ new Set([]);
  const dataSource = app.dataSourceManager.dataSources.get(dataSourceKey);
  const _getAssociationAppends = (schema, str) => {
    const reduceProperties = (schema2, reducer, initialValue) => {
      if (!schema2 || typeof schema2 !== "object") {
        return initialValue;
      }
      if (schema2.properties && typeof schema2.properties === "object") {
        for (const key in schema2.properties) {
          if (schema2.properties[key]) {
            const property = schema2.properties[key];
            initialValue = reducer(initialValue, property, key);
            initialValue = reduceProperties(property, reducer, initialValue);
          }
        }
      }
      return initialValue;
    };
    const customReducer = (pre, s, key) => {
      var _a, _b, _c, _d;
      const prefix = pre || str;
      const collection = dataSource.collectionManager.getCollection(
        ((_b = (_a = s == null ? void 0 : s["x-collection-field"]) == null ? void 0 : _a.split(".")) == null ? void 0 : _b[0]) || collectionName
      );
      if (!collection) {
        throw new Error("The collection is not found");
      }
      const collectionField = s["x-collection-field"] && collection.getField((_c = s["x-collection-field"]) == null ? void 0 : _c.split(".")[1]);
      const isAssociationField = collectionField && ["hasOne", "hasMany", "belongsTo", "belongsToMany", "belongsToArray"].includes(collectionField.type);
      if (collectionField && isAssociationField) {
        appends.add(collectionField.target);
        if (["Nester", "SubTable", "PopoverNester"].includes((_d = s["x-component-props"]) == null ? void 0 : _d.mode)) {
          const bufPrefix = prefix && prefix !== "" ? `${prefix}.${s.name}` : s.name;
          _getAssociationAppends(s, bufPrefix);
        }
      } else if (![
        "ActionBar",
        "Action",
        "Action.Link",
        "Action.Modal",
        "Selector",
        "Viewer",
        "AddNewer",
        "AssociationField.Selector",
        "AssociationField.AddNewer",
        "TableField"
      ].includes(s["x-component"])) {
        _getAssociationAppends(s, str);
      }
      return pre;
    };
    reduceProperties(schema, customReducer, str);
  };
  const getAssociationAppends = () => {
    appends = /* @__PURE__ */ new Set([]);
    _getAssociationAppends(fieldSchema.properties.form, "");
    appends = fillParentFields(appends);
    return { appends: [...appends] };
  };
  return { getAssociationAppends };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fillParentFields,
  getAssociationPath,
  parseAssociationNames
});
