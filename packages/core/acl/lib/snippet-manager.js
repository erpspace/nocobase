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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var snippet_manager_exports = {};
__export(snippet_manager_exports, {
  default: () => snippet_manager_default
});
module.exports = __toCommonJS(snippet_manager_exports);
var import_minimatch = __toESM(require("minimatch"));
const _Snippet = class _Snippet {
  constructor(name, actions) {
    this.name = name;
    this.actions = actions;
  }
};
__name(_Snippet, "Snippet");
let Snippet = _Snippet;
const _SnippetManager = class _SnippetManager {
  snippets = /* @__PURE__ */ new Map();
  register(snippet) {
    snippet.name = snippet.name.replace(".*", "");
    if (snippet.name.includes("*") || snippet.name.endsWith(".")) {
      throw new Error(`Invalid snippet name: ${snippet.name}, name should not include * or end with dot.`);
    }
    this.snippets.set(snippet.name, snippet);
  }
  allow(actionPath, snippetName) {
    const negated = snippetName.startsWith("!");
    snippetName = negated ? snippetName.slice(1) : snippetName;
    const snippet = this.snippets.get(snippetName);
    if (!snippet) {
      return null;
    }
    const matched = snippet.actions.some((action) => (0, import_minimatch.default)(actionPath, action));
    if (matched) {
      return negated ? false : true;
    }
    return null;
  }
};
__name(_SnippetManager, "SnippetManager");
let SnippetManager = _SnippetManager;
var snippet_manager_default = SnippetManager;
