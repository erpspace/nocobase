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
var locale_exports = {};
__export(locale_exports, {
  NAMESPACE: () => import_constants.NAMESPACE,
  lang: () => lang,
  useLang: () => useLang,
  usePluginTranslation: () => usePluginTranslation
});
module.exports = __toCommonJS(locale_exports);
var import_react_i18next = require("react-i18next");
var import_constants = require("../common/constants");
function useLang(key, options = {}) {
  const { t } = usePluginTranslation(options);
  return t(key);
}
const lang = useLang;
function usePluginTranslation(options) {
  return (0, import_react_i18next.useTranslation)(import_constants.NAMESPACE, options);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NAMESPACE,
  lang,
  useLang,
  usePluginTranslation
});
