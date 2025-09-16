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
var update_field_uischemas_20240307124823_exports = {};
__export(update_field_uischemas_20240307124823_exports, {
  default: () => UpdateFieldUISchemasMigration
});
module.exports = __toCommonJS(update_field_uischemas_20240307124823_exports);
var import_server = require("@nocobase/server");
var import_users = require("../collections/users");
var import_departments = require("../collections/departments");
class UpdateFieldUISchemasMigration extends import_server.Migration {
  async up() {
    const result = await this.app.version.satisfies("<=0.20.0-alpha.6");
    if (!result) {
      return;
    }
    const fieldRepo = this.db.getRepository("fields");
    const departmentsFieldInstance = await fieldRepo.findOne({
      filter: {
        name: "departments",
        collectionName: "users"
      }
    });
    if (departmentsFieldInstance) {
      const options = {
        ...departmentsFieldInstance.options,
        uiSchema: import_users.departmentsField.uiSchema
      };
      await fieldRepo.update({
        filter: {
          name: "departments",
          collectionName: "users"
        },
        values: {
          options
        }
      });
    }
    const mainDepartmentFieldInstance = await fieldRepo.findOne({
      filter: {
        name: "mainDepartment",
        collectionName: "users"
      }
    });
    if (mainDepartmentFieldInstance) {
      const options = {
        ...mainDepartmentFieldInstance.options,
        uiSchema: import_users.mainDepartmentField.uiSchema
      };
      await fieldRepo.update({
        filter: {
          name: "mainDepartment",
          collectionName: "users"
        },
        values: {
          options
        }
      });
    }
    const ownersFieldInstance = await fieldRepo.findOne({
      filter: {
        name: "owners",
        collectionName: "departments"
      }
    });
    if (ownersFieldInstance) {
      const options = {
        ...ownersFieldInstance.options,
        uiSchema: import_departments.ownersField.uiSchema
      };
      await fieldRepo.update({
        filter: {
          name: "owners",
          collectionName: "departments"
        },
        values: {
          options
        }
      });
    }
  }
}
