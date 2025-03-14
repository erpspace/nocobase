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
    title: "NocoBase API - Multi-app manager plugin"
  },
  tags: [],
  paths: {
    "/applications:list": {
      get: {
        tags: ["applications"],
        description: "List all applications",
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/application"
                }
              }
            }
          }
        }
      }
    },
    "/applications:create": {
      post: {
        tags: ["applications"],
        description: "Update application",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/applicationFrom"
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
                  $ref: "#/components/schemas/application"
                }
              }
            }
          }
        }
      }
    },
    "/applications:update": {
      post: {
        tags: ["applications"],
        description: "Update application",
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "application name",
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
                $ref: "#/components/schemas/applicationFrom"
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
                  $ref: "#/components/schemas/application"
                }
              }
            }
          }
        }
      }
    },
    "/applications:destroy": {
      post: {
        tags: ["applications"],
        description: "Delete application",
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "application name",
            required: true,
            schema: {
              type: "string"
            }
          }
        ],
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
      applicationFrom: {
        allOf: [
          {
            $ref: "#/components/schemas/application"
          },
          {
            type: "object",
            properties: {
              createdAt: {
                readOnly: true
              },
              updatedAt: {
                readOnly: true
              },
              status: {
                readOnly: true
              }
            }
          }
        ]
      },
      application: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "app-1",
            description: "The application's name"
          },
          displayName: {
            type: "string",
            example: "first application",
            description: "The application's display name"
          },
          pinned: {
            type: "boolean",
            example: true,
            description: "\u662F\u5426\u5728\u83DC\u5355\u4E0A\u663E\u793A"
          },
          cname: {
            type: "string",
            example: "app-1.example.com",
            description: "custom domain of the application"
          },
          status: {
            type: "string",
            example: "running",
            description: "application status"
          },
          options: {
            type: "object",
            properties: {
              // standaloneDeployment: {
              //   type: 'boolean',
              //   example: true,
              //   description: '是否为独立部署的子应用',
              // },
              autoStart: {
                type: "boolean",
                example: true,
                description: "\u5E94\u7528\u662F\u5426\u9ED8\u8BA4\u8DDF\u968F\u4E3B\u5E94\u7528\u542F\u52A8"
              }
            }
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
