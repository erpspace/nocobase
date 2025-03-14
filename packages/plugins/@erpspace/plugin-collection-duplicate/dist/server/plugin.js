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
var plugin_exports = {};
__export(plugin_exports, {
  PluginCollectionDuplicateServer: () => PluginCollectionDuplicateServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
class PluginCollectionDuplicateServer extends import_server.Plugin {
  async afterAdd() {
  }
  async beforeLoad() {
  }
  async load() {
    this.app.actions({
      async ["collections:duplicate"](ctx, next) {
        const name = ctx.action.params.filterByTk;
        const values = ctx.action.params.values;
        const collection = await ctx.db.getRepository("collections").findOne({
          filter: {
            name
          }
        });
        if (!collection) {
          ctx.body = {
            message: "Not Found",
            name
          };
          ctx.status = 404;
          await next();
          return;
        }
        const fields = await collection.getFields();
        const newCollection = await ctx.db.getRepository("collections").create({
          values: {
            // title: `${collection.title} copy`,
            // name: `${collection.name}_copy`,
            ...values,
            options: collection.options,
            sort: collection.sort,
            fields: fields.map((field, index) => ({
              // createdAt: new Date(Date.now() + index * 1000),
              ...field.toJSON(),
              id: void 0,
              collection_id: void 0,
              key: void 0,
              reverseKey: void 0,
              collectionName: void 0,
              collection_name: void 0,
              sort: index
            }))
            // collectionName: values.name,
          },
          context: ctx
        });
        if (!newCollection) {
          ctx.throw(500);
        }
        ctx.body = newCollection;
        ctx.status = 201;
        await next();
      }
    });
  }
  async install() {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginCollectionDuplicateServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginCollectionDuplicateServer
});
