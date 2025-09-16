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
var destroy_exports = {};
__export(destroy_exports, {
  destroy: () => destroy
});
module.exports = __toCommonJS(destroy_exports);
var import_utils = require("../utils");
var import_sequelize = require("sequelize");
async function destroy(ctx, next) {
  const { filterByTk, removeSchema = false } = ctx.action.params;
  const repository = ctx.db.getRepository("blockTemplates");
  const blockTemplateLinksRepository = ctx.db.getRepository("blockTemplateLinks");
  const transaction = await ctx.db.sequelize.transaction();
  try {
    const filter = Array.isArray(filterByTk) ? { key: { $in: filterByTk } } : { key: filterByTk };
    const templates = await repository.find({
      filter,
      transaction
    });
    const links = await blockTemplateLinksRepository.find({
      filter: {
        templateKey: filter.key
      },
      transaction
    });
    const uiSchemaRepository = ctx.db.getRepository("uiSchemas");
    if (removeSchema === "true") {
      for (const link of links) {
        await uiSchemaRepository.remove(link.blockUid, {
          transaction,
          removeParentsIfNoChildren: true,
          breakRemoveOn: {
            "x-component": "Grid"
          }
        });
      }
    } else {
      for (const link of links) {
        const fullBlock = await (0, import_utils.getNewFullBlock)(ctx.db, transaction, link.blockUid);
        const parentInfo = await ctx.db.getRepository("uiSchemaTreePath").findOne({
          filter: {
            descendant: link.blockUid,
            depth: 1
          },
          transaction
        });
        const parentUid = parentInfo == null ? void 0 : parentInfo.get("ancestor");
        if (!parentUid) {
          continue;
        }
        const treePathTableName = uiSchemaRepository.uiSchemaTreePathTableName;
        const positionInfo = await ctx.db.sequelize.query(
          `SELECT TreeTable.sort, TreeTable.type 
           FROM ${treePathTableName} as TreeTable
           WHERE TreeTable.depth = 1 AND TreeTable.descendant = :uid`,
          {
            replacements: { uid: link.blockUid },
            type: import_sequelize.QueryTypes.SELECT,
            transaction
          }
        );
        await uiSchemaRepository.remove(link.blockUid, {
          transaction,
          removeParentsIfNoChildren: false
        });
        const position = positionInfo[0];
        await uiSchemaRepository.insertAdjacent(
          "beforeEnd",
          parentUid,
          {
            ...fullBlock,
            childOptions: {
              parentUid,
              type: (position == null ? void 0 : position.type) ?? "properties",
              sort: (position == null ? void 0 : position.sort) ?? 0
            }
          },
          {
            transaction,
            wrap: false
          }
        );
      }
    }
    for (const template of templates) {
      await uiSchemaRepository.remove(template.uid, {
        transaction,
        removeParentsIfNoChildren: true
      });
    }
    await blockTemplateLinksRepository.destroy({
      filter: {
        templateKey: filter.key
      },
      transaction
    });
    const result = await repository.destroy({
      filter,
      transaction
    });
    await transaction.commit();
    ctx.body = result;
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  destroy
});
