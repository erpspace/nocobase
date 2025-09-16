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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var wording_exports = {};
__export(wording_exports, {
  getAutoDeletePluginsWarning: () => getAutoDeletePluginsWarning,
  getNotExistsEnabledPluginsError: () => getNotExistsEnabledPluginsError
});
module.exports = __toCommonJS(wording_exports);
const getAutoDeletePluginsWarning = /* @__PURE__ */ __name((plugins) => {
  return `The following plugins have been automatically removed from the database as they no longer exist and are not enabled: ${plugins.join(
    ","
  )}. You can reinstall it using the plugin package at any time.`;
}, "getAutoDeletePluginsWarning");
const getNotExistsEnabledPluginsError = /* @__PURE__ */ __name((plugins, app) => {
  const pluginNames = Array.from(plugins.keys()).map((name) => plugins.get(name) || name);
  const appOption = app === "main" ? "" : ` --app ${app}`;
  const removeCmds = `yarn pm remove ${Array.from(plugins.keys()).join(" ")} --force${appOption}`;
  const enErrMsg = `
The following plugins you are currently using will become commercial plugins after the upgrade:
${pluginNames.join(", ")}

\u{1F48E} If you are interested in purchasing, please visit: https://www.nocobase.com/commercial.html for more detail.

If you decide not to use them anymore, please delete them from the "applicationPlugins" table. You can use the command:
${removeCmds}
`;
  const cnErrMsg = `
\u4EE5\u4E0B\u60A8\u6B63\u5728\u4F7F\u7528\u7684\u63D2\u4EF6\u5728\u5347\u7EA7\u540E\u5C06\u53D8\u4E3A\u5546\u4E1A\u63D2\u4EF6:
${pluginNames.join(", ")}

\u{1F48E} \u5982\u679C\u60A8\u6709\u8D2D\u4E70\u610F\u5411\uFF0C\u8BF7\u8BBF\u95EE: https://www.nocobase.com/commercial.html \u4E86\u89E3\u8BE6\u60C5\u3002

\u5982\u679C\u60A8\u51B3\u5B9A\u4E0D\u518D\u4F7F\u7528\u5B83\u4EEC\uFF0C\u8BF7\u5C06\u8FD9\u4E9B\u63D2\u4EF6\u8BB0\u5F55\u4ECE "applicationPlugins" \u8868\u4E2D\u5220\u9664\u3002\u4F60\u53EF\u4EE5\u4F7F\u7528\u547D\u4EE4\uFF1A
${removeCmds}
`;
  return {
    "en-US": enErrMsg,
    "zh-CN": cnErrMsg
  };
}, "getNotExistsEnabledPluginsError");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAutoDeletePluginsWarning,
  getNotExistsEnabledPluginsError
});
