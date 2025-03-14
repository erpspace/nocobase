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
var WorkflowRepository_exports = {};
__export(WorkflowRepository_exports, {
  default: () => WorkflowRepository
});
module.exports = __toCommonJS(WorkflowRepository_exports);
var import_database = require("@nocobase/database");
var import_Plugin = __toESM(require("../Plugin"));
class WorkflowRepository extends import_database.Repository {
  async revision(options) {
    const { filterByTk, filter, values, context } = options;
    const plugin = context.app.pm.get(import_Plugin.default);
    return this.database.sequelize.transaction(async (transaction) => {
      const origin = await this.findOne({
        filterByTk,
        filter,
        appends: ["nodes"],
        context,
        transaction
      });
      const trigger = plugin.triggers.get(origin.type);
      const revisionData = filter.key ? {
        key: filter.key,
        title: origin.title,
        triggerTitle: origin.triggerTitle,
        allExecuted: origin.allExecuted,
        current: null,
        ...values
      } : values;
      const instance = await this.create({
        values: {
          title: `${origin.title} copy`,
          description: origin.description,
          ...revisionData,
          sync: origin.sync,
          type: origin.type,
          config: typeof trigger.duplicateConfig === "function" ? await trigger.duplicateConfig(origin, { transaction }) : origin.config
        },
        transaction
      });
      const originalNodesMap = /* @__PURE__ */ new Map();
      origin.nodes.forEach((node) => {
        originalNodesMap.set(node.id, node);
      });
      const oldToNew = /* @__PURE__ */ new Map();
      const newToOld = /* @__PURE__ */ new Map();
      for await (const node of origin.nodes) {
        const instruction = plugin.instructions.get(node.type);
        const newNode = await instance.createNode(
          {
            type: node.type,
            key: node.key,
            config: typeof instruction.duplicateConfig === "function" ? await instruction.duplicateConfig(node, { transaction }) : node.config,
            title: node.title,
            branchIndex: node.branchIndex
          },
          { transaction }
        );
        oldToNew.set(node.id, newNode);
        newToOld.set(newNode.id, node);
      }
      for await (const [oldId, newNode] of oldToNew.entries()) {
        const oldNode = originalNodesMap.get(oldId);
        const newUpstream = oldNode.upstreamId ? oldToNew.get(oldNode.upstreamId) : null;
        const newDownstream = oldNode.downstreamId ? oldToNew.get(oldNode.downstreamId) : null;
        await newNode.update(
          {
            upstreamId: (newUpstream == null ? void 0 : newUpstream.id) ?? null,
            downstreamId: (newDownstream == null ? void 0 : newDownstream.id) ?? null
          },
          { transaction }
        );
      }
      return instance;
    });
  }
}
