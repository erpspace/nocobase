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
var localization_exports = {};
__export(localization_exports, {
  default: () => localization_default
});
module.exports = __toCommonJS(localization_exports);
const sync = async (ctx, next) => {
  const startTime = Date.now();
  ctx.logger.info("Start sync localization resources");
  const plugin = ctx.app.pm.get("localization");
  const resourcesInstance = plugin.resources;
  const locale = ctx.get("X-Locale") || "en-US";
  const { types = [] } = ctx.action.params.values || {};
  if (!types.length) {
    ctx.throw(400, ctx.t("Please provide synchronization source."));
  }
  const resources = await plugin.sourceManager.sync(ctx, types);
  let textValues = [];
  Object.entries(resources).forEach(([module2, resource]) => {
    Object.keys(resource).forEach((text) => {
      textValues.push({ module: `resources.${module2}`, text });
    });
  });
  textValues = await resourcesInstance.filterExists(textValues);
  await ctx.db.sequelize.transaction(async (t) => {
    const newTexts = await ctx.db.getModel("localizationTexts").bulkCreate(textValues, {
      transaction: t
    });
    const texts = await ctx.db.getModel("localizationTexts").findAll({
      include: [{ association: "translations", where: { locale }, required: false }],
      where: { "$translations.id$": null },
      transaction: t
    });
    const translationValues = texts.filter((text) => {
      var _a;
      const module2 = text.module.replace("resources.", "");
      return (_a = resources[module2]) == null ? void 0 : _a[text.text];
    }).map((text) => {
      var _a;
      const module2 = text.module.replace("resources.", "");
      return {
        locale,
        textId: text.id,
        translation: (_a = resources[module2]) == null ? void 0 : _a[text.text]
      };
    });
    await ctx.db.getModel("localizationTranslations").bulkCreate(translationValues, {
      transaction: t
    });
    await resourcesInstance.updateCacheTexts(newTexts);
  });
  ctx.logger.info(`Sync localization resources done, ${Date.now() - startTime}ms`);
  await next();
};
const publish = async (ctx, next) => {
  ctx.app.localeManager.reload();
  await next();
};
const getSources = async (ctx, next) => {
  const plugin = ctx.app.pm.get("localization");
  const sources = Array.from(plugin.sourceManager.sources.getEntities());
  ctx.body = sources.map(([name, source]) => ({
    name,
    title: source.title
  }));
  await next();
};
var localization_default = { publish, sync, getSources };
