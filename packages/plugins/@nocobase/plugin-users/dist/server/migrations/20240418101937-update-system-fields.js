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
var update_system_fields_exports = {};
__export(update_system_fields_exports, {
  default: () => update_system_fields_default
});
module.exports = __toCommonJS(update_system_fields_exports);
var import_server = require("@nocobase/server");
class update_system_fields_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<0.21.0-alpha.11";
  async up() {
    const Field = this.context.db.getRepository("fields");
    const createdByField = await Field.findOne({
      filter: {
        name: "createdBy",
        collectionName: "users",
        interface: null
      }
    });
    if (createdByField) {
      await createdByField.update({
        interface: "createdBy",
        options: {
          ...createdByField.options,
          uiSchema: {
            type: "object",
            title: '{{t("Created by")}}',
            "x-component": "AssociationField",
            "x-component-props": {
              fieldNames: {
                value: "id",
                label: "nickname"
              }
            },
            "x-read-pretty": true
          }
        }
      });
    }
    const updatedByField = await Field.findOne({
      filter: {
        name: "updatedBy",
        collectionName: "users",
        interface: null
      }
    });
    if (updatedByField) {
      await updatedByField.update({
        interface: "updatedBy",
        options: {
          ...updatedByField.options,
          uiSchema: {
            type: "object",
            title: '{{t("Last updated by")}}',
            "x-component": "AssociationField",
            "x-component-props": {
              fieldNames: {
                value: "id",
                label: "nickname"
              }
            },
            "x-read-pretty": true
          }
        }
      });
    }
    const createdAtField = await Field.count({
      filter: {
        name: "createdAt",
        collectionName: "users"
      }
    });
    if (!createdAtField) {
      await Field.create({
        values: {
          collectionName: "users",
          uiSchema: {
            "x-component-props": {
              dateFormat: "YYYY-MM-DD"
            },
            type: "datetime",
            title: '{{t("Created at")}}',
            "x-component": "DatePicker",
            "x-read-pretty": true
          },
          name: "createdAt",
          field: "createdAt",
          type: "date",
          interface: "createdAt"
        }
      });
    }
    const updatedAtField = await Field.count({
      filter: {
        name: "updatedAt",
        collectionName: "users"
      }
    });
    if (!updatedAtField) {
      await Field.create({
        values: {
          collectionName: "users",
          uiSchema: {
            "x-component-props": {
              dateFormat: "YYYY-MM-DD"
            },
            type: "datetime",
            title: '{{t("Last updated at")}}',
            "x-component": "DatePicker",
            "x-read-pretty": true
          },
          name: "updatedAt",
          field: "updatedAt",
          type: "date",
          interface: "updatedAt"
        }
      });
    }
  }
}
