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
    title: "NocoBase API - ACL plugin"
  },
  paths: {
    "/roles:list": {
      get: {
        tags: ["roles"],
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
                    $ref: "#/components/schemas/role"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/roles:get": {
      get: {
        tags: ["roles"],
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
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/role"
                }
              }
            }
          }
        }
      }
    },
    "/roles:create": {
      post: {
        tags: ["roles"],
        description: "",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/role"
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
                  $ref: "#/components/schemas/role"
                }
              }
            }
          }
        }
      }
    },
    "/roles:update": {
      post: {
        tags: ["roles"],
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
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/role"
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
                  $ref: "#/components/schemas/role"
                }
              }
            }
          }
        }
      }
    },
    "/roles:destroy": {
      post: {
        tags: ["roles"],
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
    },
    "/roles:check": {
      get: {
        tags: ["roles"],
        description: "return current user role",
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/role"
                }
              }
            }
          }
        }
      }
    },
    "/roles:setDefaultRole": {
      post: {
        tags: ["roles"],
        description: "set default role for new user",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  roleName: {
                    type: "string"
                  }
                }
              }
            }
          }
        },
        responses: {
          "200": {
            description: "OK"
          }
        }
      }
    },
    "/roles/{roleName}/collections:list": {
      get: {
        tags: ["roles.collections"],
        description: "list permissions of collections for role by roleName",
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
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      type: {
                        type: "string",
                        description: "collection"
                      },
                      name: {
                        type: "string",
                        description: "collection name"
                      },
                      collectionName: {
                        type: "string",
                        description: "collection name"
                      },
                      title: {
                        type: "string",
                        description: "collection title"
                      },
                      roleName: {
                        type: "string",
                        description: "role name"
                      },
                      usingConfig: {
                        type: "string",
                        enum: ["resourceAction", "strategy"],
                        description: "resourceAction: \u5355\u72EC\u914D\u7F6E, strategy: \u5168\u5C40\u7B56\u7565"
                      },
                      exists: {
                        type: "boolean",
                        description: "\u662F\u5426\u5B58\u5728\u5355\u72EC\u914D\u7F6E\u7684\u6743\u9650"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    "/availableActions:list": {
      get: {
        tags: ["availableActions"],
        description: "available actions of resource in current system",
        parameters: [],
        responses: {
          "200": {
            description: "OK",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "Action\u540D\u79F0"
                      },
                      displayName: {
                        type: "string",
                        description: "Action\u663E\u793A\u540D\u79F0"
                      },
                      allowConfigureFields: {
                        type: "boolean",
                        description: "\u662F\u5426\u5141\u8BB8\u914D\u7F6E\u5B57\u6BB5"
                      },
                      onNewRecord: {
                        type: "string",
                        description: "\u662F\u5426\u662F\u65B0\u8BB0\u5F55\u7684Action"
                      },
                      type: {
                        type: "string",
                        description: "new-data \u6216\u8005 old-data"
                      },
                      aliases: {
                        type: "array",
                        items: {
                          type: "string"
                        },
                        description: "\u522B\u540D"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      role: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "\u89D2\u8272\u540D\u79F0"
          },
          name: {
            type: "string",
            description: "\u89D2\u8272\u6807\u8BC6"
          },
          description: {
            type: "string",
            description: "\u89D2\u8272\u63CF\u8FF0"
          },
          hidden: {
            type: "boolean",
            description: "\u662F\u5426\u9690\u85CF"
          },
          default: {
            type: "boolean",
            description: "\u662F\u5426\u9ED8\u8BA4"
          },
          allowConfigure: {
            type: "boolean",
            description: "\u662F\u5426\u5141\u8BB8\u914D\u7F6E"
          },
          allowNewMenu: {
            type: "boolean",
            description: "\u662F\u5426\u5141\u8BB8\u65B0\u5EFA\u83DC\u5355"
          },
          snippets: {
            type: "array",
            items: {
              type: "string"
            },
            description: "\u63A5\u53E3\u6743\u9650"
          },
          strategy: {
            type: "array",
            description: "\u6570\u636E\u8868\u6743\u9650\u7B56\u7565",
            items: {
              type: "object",
              properties: {
                actions: {
                  type: "array",
                  items: {
                    type: "string"
                  },
                  description: "\u64CD\u4F5C"
                }
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
