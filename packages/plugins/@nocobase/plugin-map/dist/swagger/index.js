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
    title: "NocoBase API - Map plugin"
  },
  paths: {
    "/map-configuration:get": {
      get: {
        description: "Get map configuration",
        tags: ["map-configuration"],
        parameters: [
          {
            name: "type",
            in: "query",
            description: "Map type",
            required: true,
            schema: {
              type: "string",
              default: "amap",
              enum: ["amap", "google"]
            }
          }
        ],
        responses: {
          200: {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/mapConfiguration"
                }
              }
            }
          }
        }
      }
    },
    "/map-configuration:set": {
      post: {
        description: "\u8BBE\u7F6E\xB7\u5730\u56FE\u914D\u7F6E",
        tags: ["map-configuration"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/mapConfiguration"
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
      mapConfiguration: {
        type: "object",
        properties: {
          accessKey: {
            type: "string"
          },
          securityJsCode: {
            type: "string"
          },
          type: {
            type: "string",
            default: "amap",
            enum: ["amap", "google"]
          }
        }
      }
    }
  }
};
