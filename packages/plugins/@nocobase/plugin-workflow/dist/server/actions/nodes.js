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
var nodes_exports = {};
__export(nodes_exports, {
  create: () => create,
  destroy: () => destroy,
  test: () => test,
  update: () => update
});
module.exports = __toCommonJS(nodes_exports);
var import_actions = require("@nocobase/actions");
var import_database = require("@nocobase/database");
var import__ = __toESM(require(".."));
async function create(context, next) {
  const { db } = context;
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { whitelist, blacklist, updateAssociationValues, values, associatedIndex: workflowId } = context.action.params;
  context.body = await db.sequelize.transaction(async (transaction) => {
    const workflow = await repository.getSourceModel(transaction);
    if (workflow.executed) {
      context.throw(400, "Node could not be created in executed workflow");
    }
    const instance = await repository.create({
      values,
      whitelist,
      blacklist,
      updateAssociationValues,
      context,
      transaction
    });
    if (!instance.upstreamId) {
      const previousHead = await repository.findOne({
        filter: {
          id: {
            $ne: instance.id
          },
          upstreamId: null
        },
        transaction
      });
      if (previousHead) {
        await previousHead.setUpstream(instance, { transaction });
        await instance.setDownstream(previousHead, { transaction });
        instance.set("downstream", previousHead);
      }
      return instance;
    }
    const upstream = await instance.getUpstream({ transaction });
    if (instance.branchIndex == null) {
      const downstream = await upstream.getDownstream({ transaction });
      if (downstream) {
        await downstream.setUpstream(instance, { transaction });
        await instance.setDownstream(downstream, { transaction });
        instance.set("downstream", downstream);
      }
      await upstream.update(
        {
          downstreamId: instance.id
        },
        { transaction }
      );
      upstream.set("downstream", instance);
    } else {
      const [downstream] = await upstream.getBranches({
        where: {
          id: {
            [import_database.Op.ne]: instance.id
          },
          branchIndex: instance.branchIndex
        },
        transaction
      });
      if (downstream) {
        await downstream.update(
          {
            upstreamId: instance.id,
            branchIndex: null
          },
          { transaction }
        );
        await instance.setDownstream(downstream, { transaction });
        instance.set("downstream", downstream);
      }
    }
    instance.set("upstream", upstream);
    return instance;
  });
  await next();
}
function searchBranchNodes(nodes, from) {
  const branchHeads = nodes.filter((item) => item.upstreamId === from.id && item.branchIndex != null);
  return branchHeads.reduce(
    (flatten, head) => flatten.concat(searchBranchDownstreams(nodes, head)),
    []
  );
}
function searchBranchDownstreams(nodes, from) {
  let result = [];
  for (let search = from; search; search = search.downstream) {
    result = [...result, search, ...searchBranchNodes(nodes, search)];
  }
  return result;
}
async function destroy(context, next) {
  const { db } = context;
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { filterByTk } = context.action.params;
  const fields = ["id", "upstreamId", "downstreamId", "branchIndex"];
  const instance = await repository.findOne({
    filterByTk,
    fields: [...fields, "workflowId"],
    appends: ["upstream", "downstream", "workflow"]
  });
  if (instance.workflow.executed) {
    context.throw(400, "Nodes in executed workflow could not be deleted");
  }
  await db.sequelize.transaction(async (transaction) => {
    const { upstream, downstream } = instance.get();
    if (upstream && upstream.downstreamId === instance.id) {
      await upstream.update(
        {
          downstreamId: instance.downstreamId
        },
        { transaction }
      );
    }
    if (downstream) {
      await downstream.update(
        {
          upstreamId: instance.upstreamId,
          branchIndex: instance.branchIndex
        },
        { transaction }
      );
    }
    const nodes = await repository.find({
      filter: {
        workflowId: instance.workflowId
      },
      fields,
      transaction
    });
    const nodesMap = /* @__PURE__ */ new Map();
    nodes.forEach((item) => {
      nodesMap.set(item.id, item);
    });
    nodes.forEach((item) => {
      if (item.upstreamId) {
        item.upstream = nodesMap.get(item.upstreamId);
      }
      if (item.downstreamId) {
        item.downstream = nodesMap.get(item.downstreamId);
      }
    });
    const branchNodes = searchBranchNodes(nodes, nodesMap.get(instance.id));
    await repository.destroy({
      filterByTk: [instance.id, ...branchNodes.map((item) => item.id)],
      transaction
    });
  });
  context.body = instance;
  await next();
}
async function update(context, next) {
  const { db } = context;
  const repository = import_actions.utils.getRepositoryFromParams(context);
  const { filterByTk, values, whitelist, blacklist, filter, updateAssociationValues } = context.action.params;
  context.body = await db.sequelize.transaction(async (transaction) => {
    const { workflow } = await repository.findOne({
      filterByTk,
      appends: ["workflow.executed"],
      transaction
    });
    if (workflow.executed) {
      context.throw(400, "Nodes in executed workflow could not be reconfigured");
    }
    return repository.update({
      filterByTk,
      values,
      whitelist,
      blacklist,
      filter,
      updateAssociationValues,
      context,
      transaction
    });
  });
  await next();
}
async function test(context, next) {
  const { values = {} } = context.action.params;
  const { type, config = {} } = values;
  const plugin = context.app.pm.get(import__.default);
  const instruction = plugin.instructions.get(type);
  if (!instruction) {
    context.throw(400, `instruction "${type}" not registered`);
  }
  if (typeof instruction.test !== "function") {
    context.throw(400, `test method of instruction "${type}" not implemented`);
  }
  try {
    context.body = await instruction.test(config);
  } catch (error) {
    context.throw(500, error.message);
  }
  next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  destroy,
  test,
  update
});
