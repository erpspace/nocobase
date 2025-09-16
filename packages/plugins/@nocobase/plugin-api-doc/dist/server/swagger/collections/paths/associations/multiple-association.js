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
var multiple_association_exports = {};
__export(multiple_association_exports, {
  appendCollectionIndexParams: () => appendCollectionIndexParams,
  default: () => multiple_association_default
});
module.exports = __toCommonJS(multiple_association_exports);
var import_collection = require("../collection");
var import__ = require("../index");
function appendCollectionIndexParams(apiDef) {
  for (const action of Object.keys(apiDef)) {
    const parameters = apiDef[action]["parameters"];
    if (!parameters) {
      apiDef[action]["parameters"] = [];
    }
    apiDef[action]["parameters"].unshift({
      $ref: "#/components/parameters/collectionIndex"
    });
  }
  return apiDef;
}
var multiple_association_default = (collection, relationField) => {
  const options = {
    collection,
    relationField
  };
  const targetCollection = collection.db.getCollection(relationField.target);
  const paths = {
    [`/${collection.name}/{collectionIndex}/${relationField.name}:list`]: appendCollectionIndexParams(
      (0, import_collection.ListActionTemplate)(options)
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:get`]: appendCollectionIndexParams(
      (0, import_collection.GetActionTemplate)(options)
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:create`]: appendCollectionIndexParams(
      (0, import_collection.CreateActionTemplate)(options)
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:update`]: appendCollectionIndexParams(
      (0, import_collection.UpdateActionTemplate)(options)
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:destroy`]: appendCollectionIndexParams(
      (0, import_collection.DestroyActionTemplate)(options)
    ),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:set`]: appendCollectionIndexParams({
      post: {
        tags: [`${collection.name}.${relationField.name}`],
        summary: "Set or reset associations",
        parameters: [
          {
            $ref: "#/components/parameters/filterByTk"
          },
          {
            $ref: "#/components/parameters/filterByTks"
          }
        ],
        responses: {
          "200": {
            description: "OK"
          }
        }
      }
    }),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:remove`]: appendCollectionIndexParams({
      post: {
        tags: [`${collection.name}.${relationField.name}`],
        summary: "Detach record",
        parameters: [
          {
            $ref: "#/components/parameters/filterByTk"
          },
          {
            $ref: "#/components/parameters/filterByTks"
          }
        ],
        responses: {
          "200": {
            description: "OK"
          }
        }
      }
    }),
    [`/${collection.name}/{collectionIndex}/${relationField.name}:toggle`]: appendCollectionIndexParams({
      post: {
        tags: [`${collection.name}.${relationField.name}`],
        summary: "Attach or detach record",
        parameters: [
          {
            $ref: "#/components/parameters/filterByTk"
          }
        ],
        responses: {
          "200": {
            description: "OK"
          }
        }
      }
    })
  };
  if ((0, import__.hasSortField)(collection)) {
    paths[`/${collection.name}/{collectionIndex}/${relationField.name}:move`] = appendCollectionIndexParams(
      (0, import_collection.MoveActionTemplate)(options)
    );
  }
  return paths;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appendCollectionIndexParams
});
