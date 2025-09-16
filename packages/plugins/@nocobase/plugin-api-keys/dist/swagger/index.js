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
var swagger_exports = {};
__export(swagger_exports, {
  default: () => swagger_default
});
module.exports = __toCommonJS(swagger_exports);
var swagger_default = {
  info: {
    title: "NocoBase API - API keys plugin"
  },
  tags: [],
  paths: {
    "/apiKeys:create": {
      post: {
        description: "Create api key",
        tags: ["apiKeys"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/apiKeys"
              }
            }
          }
        },
        responses: {
          200: {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: {
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/apiKeys:list": {
      get: {
        description: "get api keys",
        tags: ["apiKeys"],
        responses: {
          200: {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/apiKeys"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/apiKeys:destroy/{filterByTk}": {
      delete: {
        description: "Create api key",
        tags: ["apiKeys"],
        parameters: [
          {
            name: "filterByTk",
            description: "primary key",
            required: true,
            in: "path",
            schema: {
              type: "integer",
              example: 1
            }
          }
        ],
        responses: {
          200: {
            description: "successful operation"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      apiKeys: {
        type: "object",
        properties: {
          id: {
            type: "integer"
          },
          name: {
            type: "string",
            example: "key-name"
          },
          role: {
            type: "object"
            // $ref: '#/components/schemas/roles'
          },
          expiresIn: {
            type: "string",
            enum: ["1d", "7d", "30d", "90d", "never"]
          }
        }
      }
    }
  }
};
