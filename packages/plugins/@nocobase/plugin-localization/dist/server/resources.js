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
var resources_exports = {};
__export(resources_exports, {
  default: () => Resources
});
module.exports = __toCommonJS(resources_exports);
class Resources {
  cache;
  db;
  constructor(db, cache) {
    this.cache = cache;
    this.db = db;
  }
  async getTexts(transaction) {
    if (!await this.db.collectionExistsInDb("localizationTexts")) {
      return [];
    }
    return await this.cache.wrap(`texts`, async () => {
      return await this.db.getRepository("localizationTexts").find({
        fields: ["id", "module", "text"],
        raw: true,
        transaction
      });
    });
  }
  async getTranslations(locale) {
    if (!await this.db.collectionExistsInDb("localizationTranslations")) {
      return [];
    }
    return await this.cache.wrap(`translations:${locale}`, async () => {
      return await this.db.getRepository("localizationTranslations").find({
        fields: ["textId", "translation"],
        filter: { locale },
        raw: true
      });
    });
  }
  async getResources(locale) {
    const [texts, translations] = await Promise.all([this.getTexts(), this.getTranslations(locale)]);
    const resources = {};
    const textsMap = texts.reduce((map, item) => {
      map[item.id] = item;
      return map;
    }, {});
    translations.forEach((item) => {
      const text = textsMap[item.textId];
      if (!text) {
        return;
      }
      const module2 = text.module;
      if (!resources[module2]) {
        resources[module2] = {};
      }
      resources[module2][text.text] = item.translation;
    });
    return resources;
  }
  async filterExists(texts, transaction) {
    const existTexts = await this.getTexts(transaction);
    return texts.filter((text) => {
      return !existTexts.find((item) => item.text === text.text && item.module === text.module);
    });
  }
  async updateCacheTexts(texts, transaction) {
    const newTexts = texts.map((text) => ({
      id: text.id,
      module: text.module,
      text: text.text
    }));
    const existTexts = await this.getTexts(transaction);
    await this.cache.set(`texts`, [...existTexts, ...newTexts]);
  }
  async reset() {
    await this.cache.reset();
  }
}
