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
  NAMESPACE: () => NAMESPACE,
  generateNTemplate: () => generateNTemplate,
  lang: () => lang,
  useLocalTranslation: () => useLocalTranslation
});
module.exports = __toCommonJS(locale_exports);
var import_client = require("@nocobase/client");
var import_react_i18next = require("react-i18next");
const NAMESPACE = "notification-in-app-message";
function lang(key) {
  return import_client.i18n.t(key, { ns: NAMESPACE });
}
function generateNTemplate(key) {
  return `{{t('${key}', { ns: ['${NAMESPACE}', 'client'], nsMode: 'fallback' })}}`;
}
function useLocalTranslation() {
  return (0, import_react_i18next.useTranslation)([NAMESPACE, "client"], {
    nsMode: "fallback"
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NAMESPACE,
  generateNTemplate,
  lang,
  useLocalTranslation
});
