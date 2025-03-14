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
var helpers_exports = {};
__export(helpers_exports, {
  createDefaultActionSwagger: () => createDefaultActionSwagger,
  getInterfaceCollection: () => getInterfaceCollection
});
module.exports = __toCommonJS(helpers_exports);
const createDefaultActionSwagger = ({ collection }) => {
  const responses = {
    default: {
      content: {
        "application/json": {
          schema: {
            $ref: `#/components/schemas/${collection.name}`
          }
        }
      }
    }
  };
  const requestBody = {
    content: {
      "application/json": {
        schema: {
          $ref: `#/components/schemas/${collection.name}`
        }
      }
    }
  };
  return {
    list: {
      method: "get",
      responses
    },
    create: {
      method: "post",
      requestBody
    },
    get: {
      method: "get",
      responses
    },
    update: {
      method: "put",
      requestBody,
      responses
    },
    destroy: {
      method: "delete",
      responses
    },
    add: {
      method: "post",
      requestBody,
      responses
    },
    set: {
      method: "post",
      requestBody
    },
    remove: {
      method: "delete",
      responses
    },
    toggle: {
      method: "post",
      requestBody,
      responses
    },
    move: {
      method: "post",
      requestBody
    }
  };
};
const getInterfaceCollection = (options) => {
  const accessors = {
    // 常规 actions
    list: "list",
    create: "create",
    get: "get",
    update: "update",
    delete: "destroy",
    // associate 操作
    add: "add",
    set: "set",
    remove: "remove",
    toggle: "toggle",
    move: "move",
    ...options.accessors || {}
  };
  const single = {
    "/{resourceName}": [accessors.list, accessors.create, accessors.delete],
    "/{resourceName}/{resourceIndex}": [accessors.get, accessors.update, accessors.delete],
    "/{associatedName}/{associatedIndex}/{resourceName}": [
      accessors.list,
      accessors.create,
      accessors.delete,
      accessors.toggle,
      accessors.add,
      accessors.remove
    ],
    "/{associatedName}/{associatedIndex}/{resourceName}/{resourceIndex}": [
      accessors.get,
      accessors.update,
      accessors.delete,
      accessors.remove,
      accessors.toggle,
      accessors.set,
      accessors.move
    ]
  };
  return single;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDefaultActionSwagger,
  getInterfaceCollection
});
