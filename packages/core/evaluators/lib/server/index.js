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
var server_exports = {};
__export(server_exports, {
  Evaluator: () => import_utils3.Evaluator,
  appendArrayColumn: () => import_utils3.appendArrayColumn,
  default: () => server_default,
  evaluate: () => import_utils3.evaluate,
  evaluators: () => evaluators
});
module.exports = __toCommonJS(server_exports);
var import_utils = require("@nocobase/utils");
var import_mathjs = __toESM(require("../utils/mathjs"));
var import_formulajs = __toESM(require("../utils/formulajs"));
var import_string = __toESM(require("../utils/string"));
var import_utils3 = require("../utils");
const evaluators = new import_utils.Registry();
evaluators.register("math.js", import_mathjs.default);
evaluators.register("formula.js", import_formulajs.default);
evaluators.register("string", import_string.default);
var server_default = evaluators;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Evaluator,
  appendArrayColumn,
  evaluate,
  evaluators
});
