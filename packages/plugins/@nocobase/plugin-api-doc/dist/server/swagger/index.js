/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var swagger_exports = {};
__export(swagger_exports, {
  SwaggerManager: () => SwaggerManager
});
module.exports = __toCommonJS(swagger_exports);
var import_base_swagger = __toESM(require("./base-swagger"));
var import_collections = __toESM(require("./collections"));
var import_constants = require("./constants");
var import_helpers = require("./helpers");
var import_loader = require("./loader");
var import_merge = require("./merge");
class SwaggerManager {
  plugin;
  constructor(plugin) {
    this.plugin = plugin;
  }
  get app() {
    return this.plugin.app;
  }
  get db() {
    return this.plugin.db;
  }
  async generateSwagger(options = {}) {
    const base = await this.getBaseSwagger();
    const core = options.plugins ? {} : await (0, import_loader.loadSwagger)("@nocobase/server");
    const plugins = await this.loadSwaggers(options.plugins);
    return (0, import_merge.merge)((0, import_merge.merge)(core, plugins), base);
  }
  async getSwagger() {
    return this.generateSwagger();
  }
  async collection2Swagger(collectionName, withAssociation = true) {
    const collection = this.db.getCollection(collectionName);
    return await (async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      return (0, import_collections.default)(collection, {
        withAssociation
      });
    })();
  }
  async getCollectionsSwagger(name) {
    const base = await this.getBaseSwagger();
    let others = {};
    if (name) {
      const collectionSwagger = await this.collection2Swagger(name);
      others = (0, import_merge.merge)(others, collectionSwagger);
    } else {
      const collections = await this.db.getRepository("collections").find({
        filter: {
          "name.$ne": ["roles", "users"],
          "hidden.$isFalsy": true
        }
      });
      for (const collection of collections) {
        if (collection.name === "roles") {
          continue;
        }
        try {
          others = (0, import_merge.merge)(others, await this.collection2Swagger(collection.name, false));
        } catch (e) {
          this.app.log.error(e);
        }
      }
    }
    return (0, import_merge.merge)(base, others);
  }
  async getPluginsSwagger(pluginName) {
    return this.generateSwagger({
      plugins: pluginName ? [pluginName] : []
    });
  }
  async getCoreSwagger() {
    return (0, import_merge.merge)(await this.getBaseSwagger(), await (0, import_loader.loadSwagger)("@nocobase/server"));
  }
  getURL(pathname) {
    return process.env.API_BASE_PATH + pathname;
  }
  async getUrls() {
    const plugins = await (0, import_loader.getPluginsSwagger)(this.db).then((res) => {
      return Object.keys(res).map((name) => {
        var _a;
        const schema = res[name];
        return {
          name: ((_a = schema.info) == null ? void 0 : _a.title) || name,
          url: this.getURL(`swagger:get?ns=${encodeURIComponent(`plugins/${name}`)}`)
        };
      });
    }).catch(() => []);
    const collections = await this.db.getRepository("collections").find({
      filter: {
        "name.$ne": ["roles", "users"],
        "hidden.$isFalsy": true
      }
    });
    return [
      {
        name: "NocoBase API",
        url: this.getURL("swagger:get")
      },
      {
        name: "NocoBase API - Core",
        url: this.getURL("swagger:get?ns=core")
      },
      {
        name: "NocoBase API - All plugins",
        url: this.getURL("swagger:get?ns=plugins")
      },
      {
        name: "NocoBase API - Custom collections",
        url: this.getURL("swagger:get?ns=collections")
      },
      ...plugins,
      ...collections.map((collection) => {
        return {
          name: `Collection API - ${collection.title}`,
          url: this.getURL(`swagger:get?ns=${encodeURIComponent("collections/" + collection.name)}`)
        };
      })
    ];
  }
  async getBaseSwagger() {
    return (0, import_merge.merge)(import_base_swagger.default, {
      info: {
        version: await this.app.version.get()
      },
      servers: [
        {
          url: (this.app.resourcer.options.prefix || "/").replace(/^[^/]/, "/$1")
        }
      ]
    });
  }
  generateSchemas() {
    const schemas = {};
    this.app.i18n;
    this.db.collections.forEach((collection) => {
      const properties = {};
      const model = {
        type: "object",
        properties
      };
      collection.forEachField((field) => {
        const { type, target } = field;
        const property = {};
        if (type === "hasMany" || type === "belongsToMany") {
          property["type"] = "array";
          property["items"] = {
            $ref: `#/components/schemas/${target}`
          };
        } else if (type === "belongsTo" || type === "hasOne") {
          property["type"] = "object";
          property["$ref"] = `#/components/schemas/${target}`;
        } else {
          property.type = import_constants.SchemaTypeMapping[type] || type;
          if (property.type === "array" && !property.items) {
            property.items = {
              type: "object"
            };
          }
          property.example = field.get("defaultValue");
        }
        properties[field.name] = property;
      });
      schemas[collection.name] = model;
    });
    return schemas;
  }
  generateCollectionBuiltInInterface() {
    const paths = {};
    const IC = (0, import_helpers.getInterfaceCollection)(this.app.resourcer.options);
    this.db.collections.forEach((collection) => {
      const { name } = collection;
      let actions;
      if (this.app.resourcer.isDefined(name)) {
        actions = this.app.resourcer.getResource(name).actions;
      } else {
        actions = {
          has: () => true
        };
      }
      const collectionMethods = {};
      Object.entries(IC).forEach(([path, actionNames]) => {
        actionNames.forEach((actionName) => {
          const actionMethods = (0, import_helpers.createDefaultActionSwagger)({
            collection
          });
          const { method = "post", ...swaggerArgs } = actionMethods[actionName];
          const parameters = [];
          ["associatedName", "associatedIndex", "resourceIndex"].forEach((name2) => {
            if (path.includes(`{${name2}}`)) {
              parameters.push({
                name: name2,
                required: true,
                schema: {
                  type: "string"
                }
              });
            }
          });
          if (actions.has(actionName)) {
            collectionMethods[path.replace("{resourceName}", `${name}:${actionName}`)] = {
              [method]: {
                tags: [name],
                description: `${name}:${actionName}`,
                parameters,
                ...swaggerArgs
              }
            };
          }
        });
      });
      Object.assign(paths, collectionMethods);
    });
    return paths;
  }
  loadSwaggers(plugins) {
    return (0, import_loader.getSwaggerDocument)(this.db, plugins);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SwaggerManager
});
