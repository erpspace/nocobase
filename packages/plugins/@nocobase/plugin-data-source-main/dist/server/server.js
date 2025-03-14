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
  PluginDataSourceMainServer: () => PluginDataSourceMainServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
var import_path = __toESM(require("path"));
var import__ = require(".");
var import_field_is_depended_on_by_other = require("./errors/field-is-depended-on-by-other");
var import_field_name_exists_error = require("./errors/field-name-exists-error");
var import_hooks = require("./hooks");
var import_beforeCreateCheckFieldInMySQL = require("./hooks/beforeCreateCheckFieldInMySQL");
var import_beforeCreateForValidateField = require("./hooks/beforeCreateForValidateField");
var import_beforeCreateForViewCollection = require("./hooks/beforeCreateForViewCollection");
var import_beforeDestoryField = require("./hooks/beforeDestoryField");
var import_models = require("./models");
var import_collections = __toESM(require("./resourcers/collections"));
var import_views = __toESM(require("./resourcers/views"));
class PluginDataSourceMainServer extends import_server.Plugin {
  loadFilter = {};
  setLoadFilter(filter) {
    this.loadFilter = filter;
  }
  async handleSyncMessage(message) {
    const { type, collectionName } = message;
    if (type === "syncCollection") {
      const collectionModel = await this.app.db.getCollection("collections").repository.findOne({
        filter: {
          name: collectionName
        }
      });
      await collectionModel.load();
    }
    if (type === "removeField") {
      const { collectionName: collectionName2, fieldName } = message;
      const collection = this.app.db.getCollection(collectionName2);
      if (!collection) {
        return;
      }
      return collection.removeFieldFromDb(fieldName);
    }
    if (type === "removeCollection") {
      const { collectionName: collectionName2 } = message;
      const collection = this.app.db.getCollection(collectionName2);
      if (!collection) {
        return;
      }
      collection.remove();
    }
  }
  async beforeLoad() {
    this.app.db.registerRepositories({
      CollectionRepository: import__.CollectionRepository
    });
    this.app.db.registerModels({
      CollectionModel: import_models.CollectionModel,
      FieldModel: import_models.FieldModel
    });
    this.db.addMigrations({
      namespace: "data-source-main",
      directory: import_path.default.resolve(__dirname, "./migrations"),
      context: {
        plugin: this
      }
    });
    this.app.db.on("collections.beforeCreate", (0, import_beforeCreateForViewCollection.beforeCreateForViewCollection)(this.db));
    this.app.db.on("collections.beforeCreate", async (model, options) => {
      if (this.app.db.getCollection(model.get("name")) && model.get("from") !== "db2cm" && !model.get("isThrough")) {
        throw new Error(`Collection named ${model.get("name")} already exists`);
      }
    });
    this.app.db.on(
      "collections.afterSaveWithAssociations",
      async (model, { context, transaction }) => {
        if (context) {
          await model.migrate({
            transaction
          });
          this.sendSyncMessage(
            {
              type: "syncCollection",
              collectionName: model.get("name")
            },
            {
              transaction
            }
          );
        }
      }
    );
    this.app.db.on("collections.beforeDestroy", async (model, options) => {
      const removeOptions = {};
      if (options.transaction) {
        removeOptions["transaction"] = options.transaction;
      }
      const cascade = options.cascade || import_lodash.default.get(options, "context.action.params.cascade", false);
      if (cascade === true || cascade === "true") {
        removeOptions["cascade"] = true;
      }
      await model.remove(removeOptions);
      this.sendSyncMessage(
        {
          type: "removeCollection",
          collectionName: model.get("name")
        },
        {
          transaction: options.transaction
        }
      );
    });
    this.app.db.on("fields.beforeCreate", (0, import_beforeCreateCheckFieldInMySQL.beforeCreateCheckFieldInMySQL)(this.app.db));
    this.app.db.on("fields.beforeCreate", (0, import_hooks.beforeCreateForReverseField)(this.app.db));
    this.app.db.on("fields.beforeCreate", async (model, options) => {
      const collectionName = model.get("collectionName");
      const collection = this.app.db.getCollection(collectionName);
      if (!collection) {
        return;
      }
      if (collection.isInherited() && collection.parentFields().has(model.get("name"))) {
        model.set("overriding", true);
      }
    });
    this.app.db.on("fields.beforeValidate", async (model) => {
      if (model.get("name") && model.get("name").includes(".")) {
        model.set("field", model.get("name"));
        model.set("name", model.get("name").replace(/\./g, "_"));
      }
    });
    this.app.db.on("fields.beforeCreate", async (model, options) => {
      if (model.get("source")) return;
      const type = model.get("type");
      const fn = import_hooks.beforeInitOptions[type];
      if (fn) {
        await fn(model, { database: this.app.db });
      }
    });
    this.app.db.on("fields.beforeCreate", (0, import_beforeCreateForValidateField.beforeCreateForValidateField)(this.app.db));
    this.app.db.on("fields.afterCreate", (0, import_hooks.afterCreateForReverseField)(this.app.db));
    this.app.db.on("fields.beforeCreate", async (model, options) => {
      const { transaction } = options;
      const collectionName = model.get("collectionName");
      const name = model.get("name");
      if (!collectionName || !name) {
        return;
      }
      const exists = await this.app.db.getRepository("fields").findOne({
        filter: {
          collectionName,
          name
        },
        transaction
      });
      if (exists) {
        throw new import_field_name_exists_error.FieldNameExistsError(name, collectionName);
      }
    });
    this.app.db.on("fields.beforeUpdate", (0, import_beforeCreateForValidateField.beforeUpdateForValidateField)(this.app.db));
    this.app.db.on("fields.beforeUpdate", async (model, options) => {
      const newValue = options.values;
      if (model.get("reverseKey") && import_lodash.default.get(newValue, "reverseField") && !import_lodash.default.get(newValue, "reverseField.key")) {
        const field = await this.app.db.getModel("fields").findByPk(model.get("reverseKey"), { transaction: options.transaction });
        if (field) {
          throw new Error("cant update field without a reverseField key");
        }
      }
      if (model.get("sortable") && model.get("type") === "hasMany") {
        model.set("sortBy", model.get("foreignKey") + "Sort");
      }
    });
    this.app.db.on("fields.afterUpdate", async (model, { context, transaction }) => {
      const prevOptions = model.previous("options");
      const currentOptions = model.get("options");
      if (context) {
        const prev = prevOptions["unique"];
        const next = currentOptions["unique"];
        if (Boolean(prev) !== Boolean(next)) {
          await model.syncUniqueIndex({ transaction });
        }
      }
      const prevDefaultValue = prevOptions["defaultValue"];
      const currentDefaultValue = currentOptions["defaultValue"];
      if (prevDefaultValue != currentDefaultValue) {
        await model.syncDefaultValue({ transaction, defaultValue: currentDefaultValue });
      }
      const prevOnDelete = prevOptions["onDelete"];
      const currentOnDelete = currentOptions["onDelete"];
      if (prevOnDelete != currentOnDelete) {
        await model.syncReferenceCheckOption({ transaction });
      }
      if (model.get("type") === "hasMany" && model.get("sortable") && model.get("sortBy")) {
        await model.syncSortByField({ transaction });
      }
    });
    const afterCreateForForeignKeyFieldHook = (0, import_hooks.afterCreateForForeignKeyField)(this.app.db);
    this.app.db.on("fields.afterCreate", async (model, options) => {
      const { context, transaction } = options;
      if (context) {
        await model.load({ transaction });
        await afterCreateForForeignKeyFieldHook(model, options);
      }
    });
    this.app.db.on("fields.afterUpdate", async (model, options) => {
      const { context, transaction } = options;
      if (context) {
        await model.load({ transaction });
      }
    });
    this.app.db.on("fields.afterSaveWithAssociations", async (model, options) => {
      const { context, transaction } = options;
      if (context) {
        const collection = this.app.db.getCollection(model.get("collectionName"));
        const syncOptions = {
          transaction,
          force: false,
          alter: {
            drop: false
          }
        };
        await collection.sync(syncOptions);
        this.sendSyncMessage(
          {
            type: "syncCollection",
            collectionName: model.get("collectionName")
          },
          {
            transaction
          }
        );
      }
    });
    this.app.db.on("fields.beforeDestroy", (0, import_beforeDestoryField.beforeDestoryField)(this.app.db));
    this.app.db.on("fields.beforeDestroy", (0, import_hooks.beforeDestroyForeignKey)(this.app.db));
    this.app.db.on("fields.beforeDestroy", async (model, options) => {
      const lockKey = `${this.name}:fields.beforeDestroy:${model.get("collectionName")}`;
      await this.app.lockManager.runExclusive(lockKey, async () => {
        await model.remove(options);
        this.sendSyncMessage(
          {
            type: "removeField",
            collectionName: model.get("collectionName"),
            fieldName: model.get("name")
          },
          {
            transaction: options.transaction
          }
        );
      });
    });
    this.app.db.on("fields.afterDestroy", async (model, options) => {
      const { transaction } = options;
      const collectionName = model.get("collectionName");
      const childCollections = this.db.inheritanceMap.getChildren(collectionName);
      const childShouldRemoveField = Array.from(childCollections).filter((item) => {
        const parents = Array.from(this.db.inheritanceMap.getParents(item)).map((parent) => {
          const collection = this.db.getCollection(parent);
          const field = collection.getField(model.get("name"));
          return field;
        }).filter(Boolean);
        return parents.length == 0;
      });
      await this.db.getCollection("fields").repository.destroy({
        filter: {
          name: model.get("name"),
          collectionName: {
            $in: childShouldRemoveField
          },
          options: {
            overriding: true
          }
        },
        transaction
      });
    });
    const loadCollections = async () => {
      this.log.debug("loading custom collections", { method: "loadCollections" });
      this.app.setMaintainingMessage("loading custom collections");
      await this.app.db.getRepository("collections").load({
        filter: this.loadFilter
      });
    };
    this.app.on("beforeStart", loadCollections);
    this.app.resourceManager.use(async function pushUISchemaWhenUpdateCollectionField(ctx, next) {
      const { resourceName, actionName } = ctx.action;
      if (resourceName === "collections.fields" && actionName === "update") {
        const { updateAssociationValues = [] } = ctx.action.params;
        updateAssociationValues.push("uiSchema");
        ctx.action.mergeParams({
          updateAssociationValues
        });
      }
      await next();
    });
    this.app.resourceManager.use(async function pushUISchemaWhenUpdateCollectionField(ctx, next) {
      var _a;
      const { resourceName, actionName } = ctx.action;
      if (resourceName === "collections" && actionName === "create") {
        const { values } = ctx.action.params;
        const keys = Object.keys(values);
        const presetKeys = ["createdAt", "createdBy", "updatedAt", "updatedBy"];
        for (const presetKey of presetKeys) {
          if (keys.includes(presetKey)) {
            continue;
          }
          values[presetKey] = !!((_a = values.fields) == null ? void 0 : _a.find((v) => v.name === presetKey));
        }
        ctx.action.mergeParams({
          values
        });
      }
      await next();
    });
    this.app.acl.allow("collections", "list", "loggedIn");
    this.app.acl.allow("collections", "listMeta", "loggedIn");
    this.app.acl.allow("collectionCategories", "list", "loggedIn");
    this.app.acl.registerSnippet({
      name: `pm.data-source-manager.data-source-main`,
      actions: ["collections:*", "collections.fields:*", "collectionCategories:*"]
    });
    this.app.acl.registerSnippet({
      name: `pm.data-source-manager.collection-view `,
      actions: ["dbViews:*"]
    });
  }
  async load() {
    this.db.getRepository("collections").setApp(this.app);
    const errorHandlerPlugin = this.app.getPlugin("error-handler");
    errorHandlerPlugin.errorHandler.register(
      (err) => {
        return err instanceof import_database.UniqueConstraintError;
      },
      (err, ctx) => {
        return ctx.throw(400, ctx.t(`The value of ${Object.keys(err.fields)} field duplicated`));
      }
    );
    errorHandlerPlugin.errorHandler.register(
      (err) => err instanceof import_field_is_depended_on_by_other.FieldIsDependedOnByOtherError,
      (err, ctx) => {
        ctx.status = 400;
        ctx.body = {
          errors: [
            {
              message: ctx.i18n.t("field-is-depended-on-by-other", {
                fieldName: err.options.fieldName,
                fieldCollectionName: err.options.fieldCollectionName,
                dependedFieldName: err.options.dependedFieldName,
                dependedFieldCollectionName: err.options.dependedFieldCollectionName,
                dependedFieldAs: err.options.dependedFieldAs,
                ns: "data-source-main"
              })
            }
          ]
        };
      }
    );
    errorHandlerPlugin.errorHandler.register(
      (err) => err instanceof import_field_name_exists_error.FieldNameExistsError,
      (err, ctx) => {
        ctx.status = 400;
        ctx.body = {
          errors: [
            {
              message: ctx.i18n.t("field-name-exists", {
                name: err.value,
                collectionName: err.collectionName,
                ns: "data-source-main"
              })
            }
          ]
        };
      }
    );
    this.app.resourceManager.use(async function mergeReverseFieldWhenSaveCollectionField(ctx, next) {
      if (ctx.action.resourceName === "collections.fields" && ["create", "update"].includes(ctx.action.actionName)) {
        ctx.action.mergeParams({
          updateAssociationValues: ["reverseField"]
        });
      }
      await next();
    });
    this.app.resource(import_views.default);
    this.app.actions(import_collections.default);
    const handleFieldSource = (fields) => {
      var _a;
      for (const field of import_lodash.default.castArray(fields)) {
        if (field.get("source")) {
          const [collectionSource, fieldSource] = field.get("source").split(".");
          const collectionField = (_a = this.app.db.getCollection(collectionSource)) == null ? void 0 : _a.getField(fieldSource);
          if (!collectionField) {
            continue;
          }
          const newOptions = {};
          import_lodash.default.merge(newOptions, import_lodash.default.omit(collectionField.options, "name"));
          import_lodash.default.mergeWith(newOptions, field.get(), (objValue, srcValue) => {
            if (srcValue === null) {
              return objValue;
            }
          });
          field.set("options", newOptions);
        }
      }
    };
    this.app.resourceManager.use(async function handleFieldSourceMiddleware(ctx, next) {
      var _a, _b;
      await next();
      if (ctx.action.resourceName === "collections" && ctx.action.actionName == "list" && ((_a = ctx.action.params) == null ? void 0 : _a.paginate) == "false") {
        for (const collection of ctx.body) {
          if (collection.get("view")) {
            const fields = collection.fields;
            handleFieldSource(fields);
          }
        }
      }
      if (ctx.action.resourceName == "collections.fields" && ctx.action.actionName == "list") {
        handleFieldSource(((_b = ctx.action.params) == null ? void 0 : _b.paginate) == "false" ? ctx.body : ctx.body.rows);
      }
      if (ctx.action.resourceName == "collections.fields" && ctx.action.actionName == "get") {
        handleFieldSource(ctx.body);
      }
    });
    this.app.db.extendCollection({
      name: "collectionCategory",
      dumpRules: "required",
      origin: this.options.packageName
    });
  }
  async install() {
    const dataSourcesCollection = this.app.db.getCollection("dataSources");
    if (dataSourcesCollection) {
      await dataSourcesCollection.repository.firstOrCreate({
        filterKeys: ["key"],
        values: {
          key: "main",
          type: "main",
          displayName: '{{t("Main")}}',
          fixed: true,
          options: {}
        }
      });
    }
  }
}
var server_default = PluginDataSourceMainServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginDataSourceMainServer
});
