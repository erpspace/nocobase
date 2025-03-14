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
var snapshot_field_exports = {};
__export(snapshot_field_exports, {
  SnapshotField: () => SnapshotField
});
module.exports = __toCommonJS(snapshot_field_exports);
var import_database = require("@nocobase/database");
class SnapshotField extends import_database.Field {
  get dataType() {
    return import_database.DataTypes.JSON;
  }
  createSnapshot = async (model, { transaction, values }) => {
    const { name, targetField } = this.options;
    const collectionName = this.collection.name;
    const primaryKey = this.collection.model.primaryKeyAttribute;
    if (!this.collection.hasField(targetField)) {
      return;
    }
    const repository = this.database.getRepository(`${collectionName}.${targetField}`, model.get(primaryKey));
    const appends = (this.options.appends || []).filter(
      (appendName) => this.database.getFieldByPath(`${repository.targetCollection.name}.${appendName}`)
    );
    let data = await repository.find({
      transaction,
      appends
    });
    if (Array.isArray(data)) {
      data = data.map((i) => i.toJSON());
    } else if (data == null ? void 0 : data.toJSON) {
      data = data.toJSON();
    }
    await model.update(
      {
        [name]: {
          collectionName,
          data
        }
      },
      { transaction }
    );
  };
  bind() {
    super.bind();
    this.on("afterCreateWithAssociations", this.createSnapshot);
  }
  unbind() {
    super.unbind();
    this.off("afterCreateWithAssociations", this.createSnapshot);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SnapshotField
});
