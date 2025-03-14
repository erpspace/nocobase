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
var localizationTexts_exports = {};
__export(localizationTexts_exports, {
  default: () => localizationTexts_default
});
module.exports = __toCommonJS(localizationTexts_exports);
var import_actions = require("@nocobase/actions");
var import_database = require("@nocobase/database");
const appendTranslations = async (db, rows, locale) => {
  const texts = rows || [];
  const textIds = texts.map((text) => text.id);
  const textMp = texts.reduce((memo, text) => {
    memo[text.id] = text;
    return memo;
  }, {});
  const repo = db.getRepository("localizationTranslations");
  const translations = await repo.find({
    filter: {
      locale,
      textId: textIds
    }
  });
  translations.forEach((translation) => {
    const text = textMp[translation.textId];
    if (text) {
      text.set("translation", translation.translation, { raw: true });
      text.set("translationId", translation.id, { raw: true });
      textMp[translation.textId] = text;
    }
  });
  return Object.values(textMp);
};
const listText = async (db, params) => {
  const { module: module2, keyword, hasTranslation, locale, options } = params;
  if (module2) {
    options["filter"] = { module: `resources.${module2}` };
  }
  if (keyword || !hasTranslation) {
    options["include"] = [{ association: "translations", where: { locale }, required: false }];
    if (!hasTranslation) {
      if (keyword) {
        options["filter"] = {
          ...options["filter"],
          text: {
            $includes: keyword
          }
        };
      }
      options["where"] = {
        "$translations.id$": null
      };
    } else {
      options["where"] = {
        [import_database.Op.or]: [
          { text: { [import_database.Op.like]: `%${keyword}%` } },
          { "$translations.translation$": { [import_database.Op.like]: `%${keyword}%` } }
        ]
      };
    }
  }
  const [rows, count] = await db.getRepository("localizationTexts").findAndCount(options);
  if (!hasTranslation) {
    return [rows, count];
  }
  return [await appendTranslations(db, rows, locale), count];
};
const list = async (ctx, next) => {
  const locale = ctx.get("X-Locale") || "en-US";
  let { page = import_actions.DEFAULT_PAGE, pageSize = import_actions.DEFAULT_PER_PAGE, hasTranslation } = ctx.action.params;
  page = parseInt(String(page));
  pageSize = parseInt(String(pageSize));
  hasTranslation = hasTranslation === "true" || hasTranslation === void 0;
  const { keyword, module: module2 } = ctx.action.params;
  const options = {
    context: ctx,
    offset: (page - 1) * pageSize,
    limit: pageSize
  };
  const [rows, count] = await listText(ctx.db, { module: module2, keyword, hasTranslation, locale, options });
  const cache = ctx.app.cache;
  const pm = ctx.app.pm;
  const plugin = pm.get("localization");
  const plugins = await cache.wrap(`lm-plugins:${locale}`, () => pm.list({ locale }));
  const sources = Array.from(plugin.sourceManager.sources.getValues());
  const extendModules = sources.filter((source) => source.namespace).map((source) => ({
    value: source.namespace,
    label: source.title
  }));
  const modules = [
    ...extendModules,
    ...plugins.map((plugin2) => ({
      value: plugin2.alias || plugin2.name,
      label: plugin2.displayName
    }))
  ];
  for (const row of rows) {
    const moduleName = row.get("module").replace("resources.", "");
    const module3 = modules.find((module4) => module4.value === moduleName);
    if (module3) {
      row.set("moduleTitle", module3.label, { raw: true });
    }
  }
  ctx.body = {
    count,
    rows,
    page,
    pageSize,
    totalPage: Math.ceil(count / pageSize),
    modules: [
      ...extendModules,
      ...plugins.map((plugin2) => ({
        value: plugin2.alias || plugin2.name,
        label: plugin2.displayName
      }))
    ]
  };
  await next();
};
var localizationTexts_default = { list };
