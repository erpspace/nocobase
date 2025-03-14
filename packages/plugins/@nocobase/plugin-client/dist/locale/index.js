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
  dayjsLocale: () => dayjsLocale,
  default: () => locale_default,
  languageCodes: () => languageCodes
});
module.exports = __toCommonJS(locale_exports);
const dayjsLocale = {
  "ar-EG": "ar",
  "az-AZ": "az",
  "bg-BG": "bg",
  "bn-BD": "bn-bd",
  "by-BY": "en",
  "ca-ES": "ca",
  "cs-CZ": "cs",
  "da-DK": "da",
  "de-DE": "de",
  "el-GR": "el",
  "en-GB": "en-gb",
  "en-US": "en",
  "es-ES": "es",
  "et-EE": "et",
  "fa-IR": "fa",
  "fi-FI": "fi",
  "fr-BE": "fr",
  "fr-CA": "fr",
  "fr-FR": "fr",
  "ga-IE": "ga",
  "gl-ES": "gl",
  "he-IL": "he",
  "hi-IN": "hi",
  "hr-HR": "hr",
  "hu-HU": "hu",
  "hy-AM": "hy-am",
  "id-ID": "id",
  "is-IS": "is",
  "it-IT": "it",
  "ja-JP": "ja",
  "ka-GE": "ka",
  "kk-KZ": "kk",
  "km-KH": "km",
  // 'kmr-IQ': { label: 'kmr_IQ' },
  "kn-IN": "kn",
  "ko-KR": "ko",
  "ku-IQ": "ku",
  "lt-LT": "lt",
  "lv-LV": "lv",
  "mk-MK": "mk",
  "ml-IN": "ml",
  "mn-MN": "mn",
  "ms-MY": "ms",
  "nb-NO": "nb",
  "ne-NP": "ne",
  "nl-BE": "nl-be",
  "nl-NL": "nl",
  "pl-PL": "pl",
  "pt-BR": "pt-br",
  "pt-PT": "pt",
  "ro-RO": "ro",
  "ru-RU": "ru",
  "si-LK": "si",
  "sk-SK": "sk",
  "sl-SI": "sl",
  "sr-RS": "sr",
  "sv-SE": "sv",
  "ta-IN": "ta",
  "th-TH": "th",
  "tk-TK": "tk",
  "tr-TR": "tr",
  "uk-UA": "uk",
  "ur-PK": "ur",
  "vi-VN": "vi",
  "zh-CN": "zh-cn",
  "zh-HK": "zh-hk",
  "zh-TW": "zh-tw"
};
const languageCodes = {
  "ar-EG": { label: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629" },
  "az-AZ": { label: "Az\u0259rbaycan dili" },
  "bg-BG": { label: "\u0411\u044A\u043B\u0433\u0430\u0440\u0441\u043A\u0438" },
  "bn-BD": { label: "Bengali" },
  "by-BY": { label: "\u0411\u0435\u043B\u0430\u0440\u0443\u0441\u043A\u0456" },
  "ca-ES": { label: "\u0421atal\xE0/Espanya" },
  "cs-CZ": { label: "\u010Cesky" },
  "da-DK": { label: "Dansk" },
  "de-DE": { label: "Deutsch" },
  "el-GR": { label: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC" },
  "en-GB": { label: "English(GB)" },
  "en-US": { label: "English" },
  "es-ES": { label: "Espa\xF1ol" },
  "et-EE": { label: "Estonian (Eesti)" },
  "fa-IR": { label: "\u0641\u0627\u0631\u0633\u06CC" },
  "fi-FI": { label: "Suomi" },
  "fr-BE": { label: "Fran\xE7ais(BE)" },
  "fr-CA": { label: "Fran\xE7ais(CA)" },
  "fr-FR": { label: "Fran\xE7ais" },
  "ga-IE": { label: "Gaeilge" },
  "gl-ES": { label: "Galego" },
  "he-IL": { label: "\u05E2\u05D1\u05E8\u05D9\u05EA" },
  "hi-IN": { label: "\u0939\u093F\u0928\u094D\u0926\u0940" },
  "hr-HR": { label: "Hrvatski jezik" },
  "hu-HU": { label: "Magyar" },
  "hy-AM": { label: "\u0540\u0561\u0575\u0565\u0580\u0565\u0576" },
  "id-ID": { label: "Bahasa Indonesia" },
  "is-IS": { label: "\xCDslenska" },
  "it-IT": { label: "Italiano" },
  "ja-JP": { label: "\u65E5\u672C\u8A9E" },
  "ka-GE": { label: "\u10E5\u10D0\u10E0\u10D7\u10E3\u10DA\u10D8" },
  "kk-KZ": { label: "\u049A\u0430\u0437\u0430\u049B \u0442\u0456\u043B\u0456" },
  "km-KH": { label: "\u1797\u17B6\u179F\u17B6\u1781\u17D2\u1798\u17C2\u179A" },
  // 'kmr-IQ': { label: 'kmr_IQ' },
  "kn-IN": { label: "\u0C95\u0CA8\u0CCD\u0CA8\u0CA1" },
  "ko-KR": { label: "\uD55C\uAD6D\uC5B4" },
  "ku-IQ": { label: "\u06A9\u0648\u0631\u062F\u06CC" },
  "lt-LT": { label: "lietuvi\u0173" },
  "lv-LV": { label: "Latvie\u0161u valoda" },
  "mk-MK": { label: "\u043C\u0430\u043A\u0435\u0434\u043E\u043D\u0441\u043A\u0438 \u0458\u0430\u0437\u0438\u043A" },
  "ml-IN": { label: "\u0D2E\u0D32\u0D2F\u0D3E\u0D33\u0D02" },
  "mn-MN": { label: "\u041C\u043E\u043D\u0433\u043E\u043B \u0445\u044D\u043B" },
  "ms-MY": { label: "\u0628\u0647\u0627\u0633 \u0645\u0644\u0627\u064A\u0648" },
  "nb-NO": { label: "Norsk bokm\xE5l" },
  "ne-NP": { label: "\u0928\u0947\u092A\u093E\u0932\u0940" },
  "nl-BE": { label: "Vlaams" },
  "nl-NL": { label: "Nederlands" },
  "pl-PL": { label: "Polski" },
  "pt-BR": { label: "Portugu\xEAs brasileiro" },
  "pt-PT": { label: "Portugu\xEAs" },
  "ro-RO": { label: "Rom\xE2nia" },
  "ru-RU": { label: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439" },
  "si-LK": { label: "\u0DC3\u0DD2\u0D82\u0DC4\u0DBD" },
  "sk-SK": { label: "Sloven\u010Dina" },
  "sl-SI": { label: "Sloven\u0161\u010Dina" },
  "sr-RS": { label: "\u0441\u0440\u043F\u0441\u043A\u0438 \u0458\u0435\u0437\u0438\u043A" },
  "sv-SE": { label: "Svenska" },
  "ta-IN": { label: "Tamil" },
  "th-TH": { label: "\u0E20\u0E32\u0E29\u0E32\u0E44\u0E17\u0E22" },
  "tk-TK": { label: "Turkmen" },
  "tr-TR": { label: "T\xFCrk\xE7e" },
  "uk-UA": { label: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430" },
  "ur-PK": { label: "O\u02BBzbekcha" },
  "vi-VN": { label: "Ti\u1EBFng Vi\u1EC7t" },
  "zh-CN": { label: "\u7B80\u4F53\u4E2D\u6587" },
  "zh-HK": { label: "\u7E41\u9AD4\u4E2D\u6587\uFF08\u9999\u6E2F\uFF09" },
  "zh-TW": { label: "\u7E41\u9AD4\u4E2D\u6587\uFF08\u53F0\u6E7E\uFF09" }
};
var locale_default = languageCodes;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dayjsLocale,
  languageCodes
});
