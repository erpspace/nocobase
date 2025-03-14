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
    title: "NocoBase API - Auth plugin"
  },
  paths: {
    "/auth:check": {
      get: {
        description: "Check if the user is logged in",
        tags: ["Auth"],
        parameters: [
          {
            name: "X-Authenticator",
            description: "\u767B\u5F55\u65B9\u5F0F\u6807\u8BC6",
            in: "header",
            schema: {
              type: "string",
              default: "basic"
            }
          }
        ],
        security: [],
        responses: {
          200: {
            description: "successful operation",
            content: {
              "application/json": {
                schema: {
                  allOf: [
                    {
                      $ref: "#/components/schemas/user"
                    },
                    {
                      type: "object",
                      properties: {
                        roles: {
                          $ref: "#/components/schemas/roles"
                        }
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      }
    },
    "/auth:signIn": {
      post: {
        description: "Sign in",
        tags: ["Basic auth"],
        security: [],
        parameters: [
          {
            name: "X-Authenticator",
            description: "\u767B\u5F55\u65B9\u5F0F\u6807\u8BC6",
            in: "header",
            schema: {
              type: "string",
              default: "basic"
            }
          }
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    description: "\u90AE\u7BB1"
                  },
                  password: {
                    type: "string",
                    description: "\u5BC6\u7801"
                  }
                }
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
                    },
                    user: {
                      $ref: "#/components/schemas/user"
                    }
                  }
                }
              }
            }
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "/auth:signUp": {
      post: {
        description: "Sign up",
        tags: ["Basic auth"],
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  email: {
                    type: "string",
                    description: "\u90AE\u7BB1"
                  },
                  password: {
                    type: "string",
                    description: "\u5BC6\u7801"
                  },
                  confirm_password: {
                    type: "string",
                    description: "\u786E\u8BA4\u5BC6\u7801"
                  }
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
    },
    "/auth:signOut": {
      post: {
        description: "Sign out",
        tags: ["Basic auth"],
        security: [],
        responses: {
          200: {
            description: "ok"
          }
        }
      }
    },
    // '/auth:lostPassword': {
    //   post: {
    //     description: 'Lost password',
    //     tags: ['Basic auth'],
    //     security: [],
    //     requestBody: {
    //       content: {
    //         'application/json': {
    //           schema: {
    //             type: 'object',
    //             properties: {
    //               email: {
    //                 type: 'string',
    //                 description: '邮箱',
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: {
    //         description: 'successful operation',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               allOf: [
    //                 {
    //                   $ref: '#/components/schemas/user',
    //                 },
    //                 {
    //                   type: 'object',
    //                   properties: {
    //                     resetToken: {
    //                       type: 'string',
    //                       description: '重置密码的token',
    //                     },
    //                   },
    //                 },
    //               ],
    //             },
    //           },
    //         },
    //       },
    //       400: {
    //         description: 'Please fill in your email address',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               $ref: '#/components/schemas/error',
    //             },
    //           },
    //         },
    //       },
    //       401: {
    //         description: 'The email is incorrect, please re-enter',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               $ref: '#/components/schemas/error',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // '/auth:resetPassword': {
    //   post: {
    //     description: 'Reset password',
    //     tags: ['Basic auth'],
    //     security: [],
    //     requestBody: {
    //       content: {
    //         'application/json': {
    //           schema: {
    //             type: 'object',
    //             properties: {
    //               email: {
    //                 type: 'string',
    //                 description: '邮箱',
    //               },
    //               password: {
    //                 type: 'string',
    //                 description: '密码',
    //               },
    //               resetToken: {
    //                 type: 'string',
    //                 description: '重置密码的token',
    //               },
    //             },
    //           },
    //         },
    //       },
    //     },
    //     responses: {
    //       200: {
    //         description: 'successful operation',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               $ref: '#/components/schemas/user',
    //             },
    //           },
    //         },
    //       },
    //       404: {
    //         description: 'User not found',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               $ref: '#/components/schemas/error',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    // '/auth:getUserByResetToken': {
    //   get: {
    //     description: 'Get user by reset token',
    //     tags: ['Basic auth'],
    //     security: [],
    //     parameters: [
    //       {
    //         name: 'token',
    //         in: 'query',
    //         description: '重置密码的token',
    //         required: true,
    //         schema: {
    //           type: 'string',
    //         },
    //       },
    //     ],
    //     responses: {
    //       200: {
    //         description: 'ok',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               $ref: '#/components/schemas/user',
    //             },
    //           },
    //         },
    //       },
    //       401: {
    //         description: 'Unauthorized',
    //         content: {
    //           'application/json': {
    //             schema: {
    //               $ref: '#/components/schemas/error',
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
    "/auth:changePassword": {
      post: {
        description: "Change password",
        tags: ["Basic auth"],
        security: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  oldPassword: {
                    type: "string",
                    description: "\u65E7\u5BC6\u7801"
                  },
                  newPassword: {
                    type: "string",
                    description: "\u65B0\u5BC6\u7801"
                  },
                  confirmPassword: {
                    type: "string",
                    description: "\u786E\u8BA4\u5BC6\u7801"
                  }
                }
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
          },
          401: {
            description: "Unauthorized",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/error"
                }
              }
            }
          }
        }
      }
    },
    "authenticators:listTypes": {
      get: {
        description: "List authenticator types",
        tags: ["Authenticator"],
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "string"
                  }
                }
              }
            }
          }
        }
      }
    },
    "authenticators:publicList": {
      get: {
        description: "List enabled authenticators",
        tags: ["Authenticator"],
        security: [],
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string",
                        description: "\u767B\u5F55\u65B9\u5F0F\u6807\u8BC6"
                      },
                      title: {
                        type: "string",
                        description: "\u767B\u5F55\u65B9\u5F0F\u6807\u9898"
                      },
                      authType: {
                        type: "string",
                        description: "\u767B\u5F55\u65B9\u5F0F\u7C7B\u578B"
                      },
                      options: {
                        type: "object",
                        description: "\u767B\u5F55\u65B9\u5F0F\u516C\u5F00\u914D\u7F6E"
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
    "authenticators:create": {
      post: {
        description: "Create authenticator",
        tags: ["Authenticator"],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  name: {
                    type: "string",
                    description: "\u767B\u5F55\u65B9\u5F0F\u6807\u8BC6"
                  },
                  authType: {
                    type: "string",
                    description: "\u767B\u5F55\u65B9\u5F0F\u7C7B\u578B"
                  },
                  options: {
                    type: "object",
                    description: "\u767B\u5F55\u65B9\u5F0F\u914D\u7F6E"
                  }
                }
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
                  $ref: "#/components/schemas/authenticator"
                }
              }
            }
          }
        }
      }
    },
    "authenticators:list": {
      get: {
        description: "List authenticators",
        tags: ["Authenticator"],
        responses: {
          200: {
            description: "ok",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/authenticator"
                  }
                }
              }
            }
          }
        }
      }
    },
    "authenticators:get": {
      get: {
        description: "Get authenticator",
        tags: ["Authenticator"],
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "ID",
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
                  $ref: "#/components/schemas/authenticator"
                }
              }
            }
          }
        }
      }
    },
    "authenticators:update": {
      post: {
        description: "Update authenticator",
        tags: ["Authenticator"],
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "ID",
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
                $ref: "#/components/schemas/authenticator"
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
                  $ref: "#/components/schemas/authenticator"
                }
              }
            }
          }
        }
      }
    },
    "authenticators:destroy": {
      post: {
        description: "Destroy authenticator",
        tags: ["Authenticator"],
        parameters: [
          {
            name: "filterByTk",
            in: "query",
            description: "ID",
            required: true,
            schema: {
              type: "integer"
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
          appLang: {
            type: "string",
            description: "\u7528\u6237\u4F7F\u7528\u8BED\u8A00"
          },
          systemSettings: {
            type: "object",
            description: "\u7CFB\u7EDF\u8BBE\u7F6E",
            properties: {
              theme: {
                type: "string",
                description: "\u7528\u6237\u4F7F\u7528\u4E3B\u9898"
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
          },
          createdById: {
            type: "integer",
            description: "\u521B\u5EFA\u4EBA"
          },
          updatedById: {
            type: "integer",
            description: "\u66F4\u65B0\u4EBA"
          }
        }
      },
      roles: {
        type: "array",
        description: "\u89D2\u8272",
        items: {
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
      },
      authenticator: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            description: "ID"
          },
          authType: {
            type: "string",
            description: "\u767B\u5F55\u65B9\u5F0F\u7C7B\u578B"
          },
          name: {
            type: "string",
            description: "\u767B\u5F55\u65B9\u5F0F\u6807\u8BC6"
          },
          title: {
            type: "string",
            description: "\u767B\u5F55\u65B9\u5F0F\u6807\u9898"
          },
          options: {
            type: "object",
            description: "\u767B\u5F55\u65B9\u5F0F\u914D\u7F6E"
          },
          description: {
            type: "string",
            description: "\u767B\u5F55\u65B9\u5F0F\u63CF\u8FF0"
          },
          enabled: {
            type: "boolean",
            description: "\u662F\u5426\u542F\u7528"
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
          },
          createdById: {
            type: "integer",
            description: "\u521B\u5EFA\u4EBA"
          },
          updatedById: {
            type: "integer",
            description: "\u66F4\u65B0\u4EBA"
          }
        }
      }
    }
  }
};
