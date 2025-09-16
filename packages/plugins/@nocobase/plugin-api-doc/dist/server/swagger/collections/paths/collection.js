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
var collection_exports = {};
__export(collection_exports, {
  CreateActionTemplate: () => CreateActionTemplate,
  DestroyActionTemplate: () => DestroyActionTemplate,
  GetActionTemplate: () => GetActionTemplate,
  ListActionTemplate: () => ListActionTemplate,
  MoveActionTemplate: () => MoveActionTemplate,
  UpdateActionTemplate: () => UpdateActionTemplate,
  default: () => collection_default,
  relationTypeToString: () => relationTypeToString
});
module.exports = __toCommonJS(collection_exports);
var import_index = require("./index");
function relationTypeToString(field) {
  return {
    belongsTo: "Many to one",
    hasOne: "One to one",
    hasMany: "One to many",
    belongsToMany: "Many to many"
  }[field.type];
}
function ListActionTemplate({ collection, relationField }) {
  return {
    get: {
      tags: [relationField ? `${collection.name}.${relationField.name}` : collection.name],
      summary: relationField ? `Return a list of ${relationTypeToString(relationField)} relationship` : `Returns a list of the collection`,
      parameters: [
        {
          name: "page",
          in: "query",
          description: "page number",
          required: false,
          schema: {
            type: "integer"
          }
        },
        {
          name: "pageSize",
          in: "query",
          description: "page size",
          required: false,
          schema: {
            type: "integer"
          }
        },
        {
          $ref: "#/components/parameters/filter"
        },
        {
          $ref: "#/components/parameters/sort"
        },
        {
          $ref: "#/components/parameters/fields"
        },
        {
          $ref: "#/components/parameters/appends"
        },
        {
          $ref: "#/components/parameters/except"
        }
      ],
      responses: {
        "200": {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "array",
                    items: {
                      $ref: `#/components/schemas/${collection.name}`
                    }
                  },
                  meta: {
                    type: "object",
                    properties: {
                      count: {
                        type: "integer",
                        description: "total count"
                      },
                      page: {
                        type: "integer",
                        description: "current page"
                      },
                      pageSize: {
                        type: "integer",
                        description: "items count per page"
                      },
                      totalPage: {
                        type: "integer",
                        description: "total page"
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
  };
}
function GetActionTemplate(options) {
  const { collection, relationField } = options;
  return {
    get: {
      tags: [relationField ? `${collection.name}.${relationField.name}` : collection.name],
      summary: `Return a record${relationField ? ` of ${relationTypeToString(relationField)}` : ""}`,
      parameters: [
        {
          $ref: "#/components/parameters/filterByTk"
        },
        {
          $ref: "#/components/parameters/filter"
        },
        {
          $ref: "#/components/parameters/sort"
        },
        {
          $ref: "#/components/parameters/fields"
        },
        {
          $ref: "#/components/parameters/appends"
        },
        {
          $ref: "#/components/parameters/except"
        }
      ],
      responses: {
        "200": {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    $ref: `#/components/schemas/${collection.name}`
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}
function CreateActionTemplate(options) {
  const { collection, relationField } = options;
  return {
    post: {
      tags: [relationField ? `${collection.name}.${relationField.name}` : collection.name],
      summary: relationField ? `Create and associate a record` : `Create record`,
      parameters: [
        {
          $ref: "#/components/parameters/whitelist"
        },
        {
          $ref: "#/components/parameters/blacklist"
        }
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: `#/components/schemas/${collection.name}.form`
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
                type: "object",
                properties: {
                  data: {
                    $ref: `#/components/schemas/${collection.name}`
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}
function UpdateActionTemplate(options) {
  const { collection, relationField } = options;
  return {
    post: {
      tags: [relationField ? `${collection.name}.${relationField.name}` : collection.name],
      summary: relationField ? `Update the relationship record` : `Update record`,
      parameters: [
        {
          $ref: "#/components/parameters/filterByTk"
        },
        {
          $ref: "#/components/parameters/filter"
        },
        {
          $ref: "#/components/parameters/whitelist"
        },
        {
          $ref: "#/components/parameters/blacklist"
        }
      ],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              $ref: `#/components/schemas/${collection.name}.form`
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
                type: "object",
                properties: {
                  data: {
                    $ref: `#/components/schemas/${collection.name}`
                  }
                }
              }
            }
          }
        }
      }
    }
  };
}
function DestroyActionTemplate(options) {
  const { collection, relationField } = options;
  return {
    post: {
      tags: [relationField ? `${collection.name}.${relationField.name}` : collection.name],
      summary: relationField ? `Destroy and disassociate the relationship record` : `Delete record`,
      parameters: [
        {
          $ref: "#/components/parameters/filterByTk"
        },
        {
          $ref: "#/components/parameters/filter"
        }
      ],
      responses: {
        "200": {
          description: "OK"
        }
      }
    }
  };
}
function MoveActionTemplate(options) {
  const { collection, relationField } = options;
  return {
    post: {
      tags: [relationField ? `${collection.name}.${relationField.name}` : collection.name],
      summary: relationField ? `Move the relationship record` : `Move record`,
      parameters: [
        {
          name: "sourceId",
          in: "query",
          description: "source id",
          schema: { type: "string" }
        },
        {
          name: "targetId",
          in: "query",
          description: "move target id",
          schema: { type: "string" }
        },
        {
          name: "method",
          in: "query",
          description: "move method, insertAfter or insertBefore",
          schema: { type: "string" }
        },
        {
          name: "sortField",
          in: "query",
          description: "sort field name, default is sort",
          schema: { type: "string" }
        },
        {
          name: "targetScope",
          in: "query",
          description: "move target scope",
          schema: { type: "string" }
        },
        {
          name: "sticky",
          in: "query",
          description: "sticky to top",
          schema: { type: "boolean" }
        }
      ],
      responses: {
        "200": {
          description: "OK"
        }
      }
    }
  };
}
var collection_default = (collection) => {
  const options = { collection };
  const apiDoc = {
    [`/${collection.name}:list`]: ListActionTemplate(options),
    [`/${collection.name}:get`]: GetActionTemplate(options)
  };
  if (!(0, import_index.readOnlyCollection)(collection)) {
    Object.assign(apiDoc, {
      [`/${collection.name}:create`]: CreateActionTemplate(options),
      [`/${collection.name}:update`]: UpdateActionTemplate(options),
      [`/${collection.name}:destroy`]: DestroyActionTemplate(options)
    });
  }
  if ((0, import_index.hasSortField)(collection)) {
    apiDoc[`/${collection.name}:move`] = MoveActionTemplate(options);
  }
  return apiDoc;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CreateActionTemplate,
  DestroyActionTemplate,
  GetActionTemplate,
  ListActionTemplate,
  MoveActionTemplate,
  UpdateActionTemplate,
  relationTypeToString
});
