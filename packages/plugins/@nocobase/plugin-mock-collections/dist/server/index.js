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
var server_exports = {};
__export(server_exports, {
  PluginMockCollectionsServer: () => PluginMockCollectionsServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_fs = require("fs");
var import_lodash = __toESM(require("lodash"));
var import_path = __toESM(require("path"));
var import_pg = require("pg");
var import_collection_templates = __toESM(require("./collection-templates"));
var fieldInterfaces = __toESM(require("./field-interfaces"));
var import_field_interfaces = require("./field-interfaces");
class PluginMockCollectionsServer extends import_server.Plugin {
  async load() {
    const templates = import_collection_templates.default;
    const defaultFields = {
      id: () => ({
        name: "id",
        type: "bigInt",
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        uiSchema: { type: "number", title: '{{t("ID")}}', "x-component": "InputNumber", "x-read-pretty": true },
        interface: "id"
      }),
      createdAt: () => ({
        name: "createdAt",
        interface: "createdAt",
        type: "date",
        field: "createdAt",
        uiSchema: {
          type: "datetime",
          title: '{{t("Created at")}}',
          "x-component": "DatePicker",
          "x-component-props": {},
          "x-read-pretty": true
        }
      }),
      createdBy: () => ({
        name: "createdBy",
        interface: "createdBy",
        type: "belongsTo",
        target: "users",
        foreignKey: "createdById",
        uiSchema: {
          type: "object",
          title: '{{t("Created by")}}',
          "x-component": "AssociationField",
          "x-component-props": { fieldNames: { value: "id", label: "nickname" } },
          "x-read-pretty": true
        }
      }),
      updatedAt: () => ({
        type: "date",
        field: "updatedAt",
        name: "updatedAt",
        interface: "updatedAt",
        uiSchema: {
          type: "string",
          title: '{{t("Last updated at")}}',
          "x-component": "DatePicker",
          "x-component-props": {},
          "x-read-pretty": true
        }
      }),
      updatedBy: () => ({
        type: "belongsTo",
        target: "users",
        foreignKey: "updatedById",
        name: "updatedBy",
        interface: "updatedBy",
        uiSchema: {
          type: "object",
          title: '{{t("Last updated by")}}',
          "x-component": "AssociationField",
          "x-component-props": { fieldNames: { value: "id", label: "nickname" } },
          "x-read-pretty": true
        }
      })
    };
    const mockCollection = (values) => {
      var _a;
      if (values.autoCreate || values.view) {
        if (!values.key) {
          values.key = (0, import_utils.uid)();
        }
        if (Array.isArray(values.fields)) {
          values.fields = values.fields.map((f) => {
            if (!f.key) {
              f.key = (0, import_utils.uid)();
            }
            return f;
          });
        }
        return values;
      }
      const defaults = {
        logging: true,
        autoGenId: true,
        createdBy: true,
        updatedBy: true,
        createdAt: true,
        updatedAt: true,
        sortable: true,
        template: "general",
        view: false,
        sort: 1,
        name: `t_${(0, import_utils.uid)()}`,
        ...values
      };
      defaults.key = (0, import_utils.uid)();
      if (!defaults.title) {
        defaults.title = defaults.name;
      }
      if (!((_a = defaults.fields) == null ? void 0 : _a.length)) {
        defaults.fields = [];
      }
      const fieldNames = defaults.fields.map((f) => f.name);
      const fn = templates[defaults.template] || templates.general;
      const { fields = [], ...others } = fn(defaults);
      Object.assign(defaults, others);
      for (const field of fields) {
        if (!fieldNames.includes(field.name)) {
          defaults.fields.push(field);
        }
      }
      if (["general", "file", "tree", "calendar", "expression"].includes(defaults.template)) {
        if (defaults.autoGenId && !fieldNames.includes("id")) {
          defaults.fields.push(defaultFields.id());
        }
        if (defaults.createdAt && !fieldNames.includes("createdAt")) {
          defaults.fields.push(defaultFields.createdAt());
        }
        if (defaults.updatedAt && !fieldNames.includes("updatedAt")) {
          defaults.fields.push(defaultFields.updatedAt());
        }
        if (defaults.createdBy && !fieldNames.includes("createdBy")) {
          defaults.fields.push(defaultFields.createdBy());
        }
        if (defaults.updatedBy && !fieldNames.includes("updatedBy")) {
          defaults.fields.push(defaultFields.updatedBy());
        }
        const foreignKeyFields = [];
        defaults.fields = defaults.fields.map((field) => {
          field.collectionName = defaults.name;
          const f = mockCollectionField(field);
          if (f.foreignKeyFields) {
            foreignKeyFields.push(...f.foreignKeyFields);
          }
          if (f.reverseField) {
            foreignKeyFields.push(f.reverseField);
          }
          if (f.throughCollection) {
            defaults["throughCollection"] = f.throughCollection;
          }
          f.collectionName = defaults.name;
          return import_lodash.default.omit(f, ["reverseField", "throughCollection", "foreignKeyFields"]);
        });
        defaults.fields.push(...foreignKeyFields);
      }
      return defaults;
    };
    const mockCollectionField = (opts) => {
      let options = opts;
      options.sort = 1;
      if (options.interface) {
        const fn = fieldInterfaces[options.interface];
        if (fn) {
          const defaultValue = fn.options(options);
          options = (0, import_utils.merge)(defaultValue, options);
        }
      }
      if (!options.key) {
        options.key = (0, import_utils.uid)();
      }
      if (!options.name) {
        options.name = `f_${(0, import_utils.uid)()}`;
      }
      if (options.title && options.uiSchema) {
        options.uiSchema.title = options.title;
      }
      if (options.uiSchema && !options.uiSchema.title) {
        options.uiSchema.title = options.name;
      }
      return options;
    };
    this.app.resourceManager.registerActionHandlers({
      mock: async (ctx, next) => {
        const { resourceName } = ctx.action;
        const { values, count = 10, maxDepth = 4 } = ctx.action.params;
        const mockCollectionData = async (collectionName, count2 = 1, depth = 0, maxDepth2 = 4) => {
          const collection = ctx.db.getCollection(collectionName);
          const items = await Promise.all(
            import_lodash.default.range(count2).map(async (i) => {
              if (collection.options.template === "file") {
                return (0, import_field_interfaces.mockAttachment)();
              }
              const v = {};
              if (collection.options.sortable) {
                v["sort"] = i + 1;
              }
              for (const field of collection.fields.values()) {
                if (!field.options.interface) {
                  continue;
                }
                if (depth >= maxDepth2 && ["m2o", "m2m", "o2m", "obo", "oho"].includes(field.options.interface)) {
                  continue;
                }
                const fn = fieldInterfaces[field.options.interface];
                if (fn == null ? void 0 : fn.mock) {
                  v[field.name] = await fn.mock(field.options, { mockCollectionData, maxDepth: maxDepth2, depth });
                }
              }
              return v;
            })
          );
          return count2 == 1 ? items[0] : items;
        };
        const repository = ctx.db.getRepository(resourceName);
        let size = count;
        if (Array.isArray(values)) {
          size = values.length;
        }
        const data = await mockCollectionData(resourceName, size, 0, Number(maxDepth));
        ctx.body = await repository.create({
          values: (Array.isArray(data) ? data : [data]).map((item, index) => {
            if (Array.isArray(values)) {
              return { ...item, ...values[index] };
            }
            return { ...item, ...values };
          })
        });
        await next();
      },
      "collections:mock": async (ctx, next) => {
        const { values } = ctx.action.params;
        const items = Array.isArray(values) ? values : [values || {}];
        const collections = [];
        const collectionFields = [];
        for (const item of items) {
          const { fields = [], throughCollection, ...opts } = mockCollection(item);
          collections.push(opts);
          if (throughCollection) {
            collections.push(throughCollection);
          }
          collectionFields.push(...fields);
        }
        const db = ctx.db;
        const collectionsRepository = db.getRepository("collections");
        const fieldsRepository = db.getRepository("fields");
        await db.sequelize.transaction(async (transaction) => {
          for (const collection of collections) {
            try {
              await collectionsRepository.firstOrCreate({
                values: collection,
                filterKeys: ["name"],
                hooks: false,
                transaction
              });
            } catch (error) {
              this.app.log.error(error.message, { collection });
              throw error;
            }
          }
          for (const collectionField of collectionFields) {
            try {
              await fieldsRepository.firstOrCreate({
                values: collectionField,
                filterKeys: ["name", "collectionName"],
                hooks: false,
                transaction
              });
            } catch (error) {
              this.app.log.error(error.message, { collectionField });
              throw error;
            }
          }
        });
        await collectionsRepository.load();
        for (const collection of collections) {
          await db.getRepository(collection.name).collection.sync();
        }
        const records = await collectionsRepository.find({
          filter: {
            name: collections.map((c) => c.name)
          },
          appends: ["fields"]
        });
        ctx.body = Array.isArray(values) ? records : records[0];
        await next();
      }
    });
  }
  async install(options) {
    const dbName = this.app.db.options.database;
    const externalDB = `${dbName}_external_test`;
    let client = new import_pg.Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      port: parseInt(process.env.DB_PORT)
    });
    await client.connect();
    await client.query(`DROP DATABASE IF EXISTS "${externalDB}"`);
    await client.query(`CREATE DATABASE "${externalDB}"`);
    await client.end();
    client = new import_pg.Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: externalDB,
      port: parseInt(process.env.DB_PORT)
    });
    await client.connect();
    const sqlFile = import_path.default.resolve(__dirname, "./external.sql");
    const sql = await import_fs.promises.readFile(sqlFile, "utf8");
    await client.query(sql);
    await client.end();
  }
}
var server_default = PluginMockCollectionsServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginMockCollectionsServer
});
