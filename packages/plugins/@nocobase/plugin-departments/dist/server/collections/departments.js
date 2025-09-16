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
var departments_exports = {};
__export(departments_exports, {
  default: () => departments_default,
  ownersField: () => ownersField
});
module.exports = __toCommonJS(departments_exports);
var import_database = require("@nocobase/database");
const ownersField = {
  interface: "m2m",
  type: "belongsToMany",
  name: "owners",
  collectionName: "departments",
  target: "users",
  through: "departmentsUsers",
  foreignKey: "departmentId",
  otherKey: "userId",
  targetKey: "id",
  sourceKey: "id",
  throughScope: {
    isOwner: true
  },
  uiSchema: {
    type: "m2m",
    title: '{{t("Owners")}}',
    "x-component": "DepartmentOwnersField",
    "x-component-props": {
      multiple: true,
      fieldNames: {
        label: "nickname",
        value: "id"
      }
    }
  }
};
var departments_default = (0, import_database.defineCollection)({
  name: "departments",
  migrationRules: ["overwrite"],
  title: '{{t("Departments")}}',
  dumpRules: "required",
  tree: "adjacency-list",
  template: "tree",
  shared: true,
  sortable: true,
  model: "DepartmentModel",
  createdBy: true,
  updatedBy: true,
  logging: true,
  fields: [
    {
      type: "bigInt",
      name: "id",
      primaryKey: true,
      autoIncrement: true,
      interface: "id",
      uiSchema: {
        type: "number",
        title: '{{t("ID")}}',
        "x-component": "InputNumber",
        "x-read-pretty": true
      }
    },
    {
      type: "string",
      name: "title",
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("Department name")}}',
        "x-component": "Input"
      }
    },
    {
      type: "boolean",
      name: "isLeaf"
    },
    {
      type: "belongsTo",
      name: "parent",
      target: "departments",
      foreignKey: "parentId",
      treeParent: true,
      onDelete: "CASCADE",
      interface: "m2o",
      uiSchema: {
        type: "m2o",
        title: '{{t("Superior department")}}',
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: false,
          fieldNames: {
            label: "title",
            value: "id"
          }
        }
      }
    },
    {
      type: "hasMany",
      name: "children",
      target: "departments",
      foreignKey: "parentId",
      treeChildren: true,
      onDelete: "CASCADE"
    },
    {
      type: "belongsToMany",
      name: "members",
      target: "users",
      through: "departmentsUsers",
      foreignKey: "departmentId",
      otherKey: "userId",
      targetKey: "id",
      sourceKey: "id",
      onDelete: "CASCADE"
    },
    {
      interface: "m2m",
      type: "belongsToMany",
      name: "roles",
      target: "roles",
      through: "departmentsRoles",
      foreignKey: "departmentId",
      otherKey: "roleName",
      targetKey: "name",
      sourceKey: "id",
      onDelete: "CASCADE",
      uiSchema: {
        type: "m2m",
        title: '{{t("Roles")}}',
        "x-component": "AssociationField",
        "x-component-props": {
          multiple: true,
          fieldNames: {
            label: "title",
            value: "name"
          }
        }
      }
    },
    ownersField
  ]
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ownersField
});
