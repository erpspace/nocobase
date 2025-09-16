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
var base_swagger_exports = {};
__export(base_swagger_exports, {
  default: () => base_swagger_default
});
module.exports = __toCommonJS(base_swagger_exports);
var base_swagger_default = {
  openapi: "3.0.3",
  info: {
    title: "NocoBase API documentation",
    description: "",
    contact: {
      url: "https://github.com/nocobase/nocobase/issues"
    },
    license: {
      name: "Core packages are Apache 2.0 & Plugins packages are AGPL 3.0 licensed.",
      url: "https://github.com/nocobase/nocobase#license"
    }
  },
  externalDocs: {
    description: "Find out more about NocoBase",
    url: "https://docs.nocobase.com/api/http"
  },
  components: {
    securitySchemes: {
      "api-key": {
        type: "http",
        scheme: "bearer"
      }
    },
    schemas: {
      error: {
        type: "object",
        properties: {
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                message: {
                  description: "\u9519\u8BEF\u4FE1\u606F",
                  type: "string"
                }
              }
            }
          }
        }
      }
    }
  },
  security: [
    {
      "api-key": []
    }
  ]
};
