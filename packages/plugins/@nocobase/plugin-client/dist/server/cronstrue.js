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
var cronstrue_exports = {};
__export(cronstrue_exports, {
  getCronstrueLocale: () => getCronstrueLocale
});
module.exports = __toCommonJS(cronstrue_exports);
const methods = [
  "atX0SecondsPastTheMinuteGt20",
  "atX0MinutesPastTheHourGt20",
  "commaMonthX0ThroughMonthX1",
  "commaYearX0ThroughYearX1",
  "use24HourTimeFormatByDefault",
  "anErrorOccuredWhenGeneratingTheExpressionD",
  "everyMinute",
  "everyHour",
  "atSpace",
  "everyMinuteBetweenX0AndX1",
  "at",
  "spaceAnd",
  "everySecond",
  "everyX0Seconds",
  "secondsX0ThroughX1PastTheMinute",
  "atX0SecondsPastTheMinute",
  "everyX0Minutes",
  "minutesX0ThroughX1PastTheHour",
  "atX0MinutesPastTheHour",
  "everyX0Hours",
  "betweenX0AndX1",
  "atX0",
  "commaEveryDay",
  "commaEveryX0DaysOfTheWeek",
  "commaX0ThroughX1",
  "commaAndX0ThroughX1",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "commaOnThe",
  "spaceX0OfTheMonth",
  "lastDay",
  "commaOnTheLastX0OfTheMonth",
  "commaOnlyOnX0",
  "commaAndOnX0",
  "commaEveryX0Months",
  "commaOnlyInX0",
  "commaOnTheLastDayOfTheMonth",
  "commaOnTheLastWeekdayOfTheMonth",
  "commaDaysBeforeTheLastDayOfTheMonth",
  "firstWeekday",
  "weekdayNearestDayX0",
  "commaOnTheX0OfTheMonth",
  "commaEveryX0Days",
  "commaBetweenDayX0AndX1OfTheMonth",
  "commaOnDayX0OfTheMonth",
  "commaEveryHour",
  "commaEveryX0Years",
  "commaStartingX0",
  "daysOfTheWeek",
  "monthsOfTheYear"
];
const langs = {
  af: "af",
  ar: "ar",
  be: "be",
  ca: "ca",
  cs: "cs",
  da: "da",
  de: "de",
  "en-US": "en",
  es: "es",
  fa: "fa",
  fi: "fi",
  fr: "fr",
  he: "he",
  hu: "hu",
  id: "id",
  it: "it",
  "ja-JP": "ja",
  ko: "ko",
  nb: "nb",
  nl: "nl",
  pl: "pl",
  pt_BR: "pt_BR",
  pt_PT: "pt_PT",
  ro: "ro",
  "ru-RU": "ru",
  sk: "sk",
  sl: "sl",
  sv: "sv",
  sw: "sw",
  "th-TH": "th",
  "tr-TR": "tr",
  uk: "uk",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW"
};
const getCronstrueLocale = (lang) => {
  const lng = langs[lang] || "en";
  const Locale = require(`cronstrue/locales/${lng}`);
  let locale;
  if (Locale == null ? void 0 : Locale.default) {
    locale = Locale.default.locales[lng];
  } else {
    const L = Locale[lng];
    locale = new L();
  }
  const items = {};
  for (const method of methods) {
    try {
      items[method] = locale[method]();
    } catch (error) {
    }
  }
  return items;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCronstrueLocale
});
