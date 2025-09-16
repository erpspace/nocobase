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
var single_association_exports = {};
__export(single_association_exports, {
  default: () => single_association_default
});
module.exports = __toCommonJS(single_association_exports);
var import_multiple_association = require("./multiple-association");
var import_collection = require("../collection");
function removeFilterByTkParams(apiDoc) {
  for (const action of Object.values(apiDoc)) {
    if (action.parameters) {
      action.parameters = action.parameters.filter((param) => {
        if (param.$ref) {
          return param.$ref !== "#/components/parameters/filterByTk";
        }
      });
    }
  }
  return apiDoc;
}
const parametersShouldRemove = [
  "#/components/parameters/filterByTk",
  "#/components/parameters/filter",
  "#/components/parameters/sort"
];
function filterSingleAssociationParams(apiDoc) {
  for (const action of Object.values(apiDoc)) {
    if (action.parameters) {
      action.parameters = action.parameters.filter((param) => {
        if (param.$ref) {
          return !parametersShouldRemove.includes(param.$ref);
        }
      });
    }
  }
  return apiDoc;
}
var single_association_default = (collection, relationField) => {
  const options = {
    collection,
    relationField
  };
  return {
    [`/${collection.name}/{collectionIndex}/${relationField.name}:get`]: removeFilterByTkParams(
      filterSingleAssociationParams((0, import_multiple_association.appendCollectionIndexParams)((0, import_collection.GetActionTemplate)(options)))
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:set`]: (0, import_multiple_association.appendCollectionIndexParams)({
      post: {
        tags: [`${collection.name}.${relationField.name}`],
        summary: "Associate a record",
        parameters: [
          {
            name: "tk",
            in: "query",
            description: "targetKey",
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "200": {
            description: "OK"
          }
        }
      }
    }),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:remove`]: (0, import_multiple_association.appendCollectionIndexParams)({
      post: {
        tags: [`${collection.name}.${relationField.name}`],
        summary: "Disassociate the relationship record",
        responses: {
          "200": {
            description: "OK"
          }
        }
      }
    }),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:update`]: removeFilterByTkParams(
      filterSingleAssociationParams((0, import_multiple_association.appendCollectionIndexParams)((0, import_collection.UpdateActionTemplate)(options)))
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:create`]: removeFilterByTkParams(
      filterSingleAssociationParams((0, import_multiple_association.appendCollectionIndexParams)((0, import_collection.CreateActionTemplate)(options)))
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:destroy`]: removeFilterByTkParams(
      filterSingleAssociationParams((0, import_multiple_association.appendCollectionIndexParams)((0, import_collection.DestroyActionTemplate)(options)))
    )
  };
};
