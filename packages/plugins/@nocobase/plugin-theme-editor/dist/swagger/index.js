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
  openapi: "3.0.2",
  info: {
    title: "NocoBase API - Theme editor plugin"
  },
  components: {
    schemas: {
      Theme: {
        type: "object",
        properties: {
          id: {
            type: "integer"
          },
          config: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              token: {
                type: "object",
                additionalProperties: false
              }
            },
            required: ["name"],
            additionalProperties: false
          },
          optional: {
            type: "boolean"
          },
          isBuiltIn: {
            type: "boolean"
          },
          updatedAt: {
            type: "string",
            format: "date-time"
          },
          createdAt: {
            type: "string",
            format: "date-time"
          }
        },
        required: ["id", "config", "optional", "isBuiltIn"],
        additionalProperties: false
      }
    }
  },
  tags: [],
  paths: {
    "/themeConfig:list": {
      get: {
        tags: ["themeConfig"],
        description: "Get a list of themes",
        parameters: [],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Theme"
                  }
                }
              }
            }
          },
          "401": {
            description: "Unauthorized"
          },
          "404": {
            description: "Not Found"
          }
        }
      }
    },
    "/themeConfig:create": {
      post: {
        tags: ["themeConfig"],
        description: "Create a new theme",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  config: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      token: {
                        type: "object"
                      }
                      // 可以根据需要添加其他属性
                    },
                    required: ["name"],
                    additionalProperties: false
                  },
                  optional: { type: "boolean" },
                  isBuiltIn: { type: "boolean" }
                },
                required: ["config"],
                additionalProperties: false
              }
            }
          }
        },
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Theme"
                }
              }
            }
          },
          "400": {
            description: "Bad Request"
          },
          "401": {
            description: "Unauthorized"
          }
        }
      }
    },
    "/themeConfig:update": {
      post: {
        tags: ["themeConfig"],
        description: "Update an existing theme",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the theme to update",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  config: {
                    type: "object",
                    properties: {
                      name: { type: "string" },
                      token: {
                        type: "object"
                      }
                      // 可以根据需要添加其他属性
                    },
                    additionalProperties: false
                  },
                  optional: { type: "boolean" },
                  isBuiltIn: { type: "boolean" }
                },
                additionalProperties: false
              }
            }
          }
        },
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Theme"
                }
              }
            }
          },
          "400": {
            description: "Bad Request"
          },
          "401": {
            description: "Unauthorized"
          },
          "404": {
            description: "Not Found"
          }
        }
      }
    },
    "/themeConfig:destroy": {
      post: {
        tags: ["themeConfig"],
        description: "Delete an existing theme",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of the theme to delete",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
        responses: {
          "204": {
            description: "No Content"
          },
          "401": {
            description: "Unauthorized"
          },
          "404": {
            description: "Not Found"
          }
        }
      }
    }
  }
};
