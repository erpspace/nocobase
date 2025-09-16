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
    title: "NocoBase API - User data synchronization plugin"
  },
  paths: {
    "/userData:push": {
      post: {
        description: "Push user data",
        tags: ["Push"],
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/userData"
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: "ok"
          }
        }
      }
    }
  },
  components: {
    schemas: {
      userData: {
        type: "object",
        description: "\u7528\u6237\u6570\u636E",
        properties: {
          dataType: {
            type: "string",
            description: "\u6570\u636E\u7C7B\u578B, \u76EE\u524D\u53EF\u9009\u503C\u4E3A: user, department"
          },
          uniqueKey: {
            type: "string",
            description: "\u552F\u4E00\u952E"
          },
          records: {
            type: "array",
            description: "\u6570\u636E, \u82E5 dataType \u4E3A user, \u5219\u4E3A\u7528\u6237\u6570\u636E\u5B57\u6BB5\u89C1schemas/user, \u82E5 dataType \u4E3A department, \u5219\u4E3A\u90E8\u95E8\u6570\u636E\u5B57\u6BB5\u89C1schemas/department",
            items: {
              type: "object"
            }
          },
          sourceName: {
            type: "string",
            description: "\u6570\u636E\u6E90\u540D\u79F0"
          }
        }
      },
      user: {
        type: "object",
        description: "\u7528\u6237",
        properties: {
          id: {
            type: "integer",
            description: "ID"
          },
          nickname: {
            type: "string",
            description: "\u6635\u79F0"
          },
          email: {
            type: "string",
            description: "\u90AE\u7BB1"
          },
          phone: {
            type: "string",
            description: "\u624B\u673A\u53F7"
          },
          departments: {
            type: "array",
            description: "\u6240\u5C5E\u90E8\u95E8, \u90E8\u95E8ID \u6570\u7EC4",
            items: {
              type: "string"
            }
          }
        }
      },
      department: {
        type: "object",
        description: "\u90E8\u95E8",
        properties: {
          id: {
            type: "string",
            description: "ID"
          },
          name: {
            type: "string",
            description: "\u540D\u79F0"
          },
          parentId: {
            type: "string",
            description: "\u7236\u7EA7\u90E8\u95E8ID"
          }
        }
      }
    }
  }
};
