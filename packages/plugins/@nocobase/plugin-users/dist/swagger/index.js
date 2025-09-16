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
    title: "NocoBase API - User plugin"
  },
  paths: {
    "/users:list": {
      get: {
        tags: ["users"],
        description: "",
        parameters: [],
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/user"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/users:get": {
      get: {
        tags: ["users"],
        description: "",
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "user id",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/user"
                }
              }
            }
          }
        }
      }
    },
    "/users:create": {
      post: {
        tags: ["users"],
        description: "",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/user"
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
                  $ref: "#/components/schemas/user"
                }
              }
            }
          }
        }
      }
    },
    "/users:update": {
      post: {
        tags: ["users"],
        description: "",
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "user id",
            required: true,
            schema: {
              type: "integer"
            }
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/user"
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/user"
                }
              }
            }
          }
        }
      }
    },
    "/users:destroy": {
      post: {
        tags: ["users"],
        description: "",
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "role name",
            required: true,
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
    }
  },
  components: {
    schemas: {
      user: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "\u7528\u6237ID"
          },
          nickname: {
            type: "string",
            description: "\u6635\u79F0"
          },
          username: {
            type: "string",
            description: "\u7528\u6237\u540D"
          },
          email: {
            type: "string",
            description: "email"
          },
          phone: {
            type: "string",
            description: "\u624B\u673A\u53F7\u7801"
          },
          password: {
            type: "string",
            description: "\u5BC6\u7801"
          },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "\u521B\u5EFA\u65F6\u95F4"
          },
          updatedAt: {
            type: "string",
            format: "date-time",
            description: "\u66F4\u65B0\u65F6\u95F4"
          }
        }
      }
    }
  }
};
