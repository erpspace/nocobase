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
var assign_exports = {};
__export(assign_exports, {
  assign: () => assign,
  mergeStrategies: () => mergeStrategies
});
module.exports = __toCommonJS(assign_exports);
var import_deepmerge = __toESM(require("deepmerge"));
var import_lodash = __toESM(require("lodash"));
var import_common = require("./common");
function getEnumerableOwnPropertySymbols(target) {
  return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(target).filter((symbol) => target.propertyIsEnumerable(symbol)) : [];
}
__name(getEnumerableOwnPropertySymbols, "getEnumerableOwnPropertySymbols");
function getKeys(target) {
  return Object.keys(target).concat(getEnumerableOwnPropertySymbols(target));
}
__name(getKeys, "getKeys");
const mergeStrategies = /* @__PURE__ */ new Map();
mergeStrategies.set("overwrite", (x, y) => {
  if (y === void 0) {
    if (typeof x === "string" && x.includes(",")) {
      return x.split(",");
    }
    return x;
  }
  if (typeof y === "string" && y.includes(",")) {
    y = y.split(",");
  }
  return y;
});
mergeStrategies.set("andMerge", (x, y) => {
  if (!x && !y) {
    return;
  }
  if (!x) {
    return y;
  }
  if (!y) {
    return x;
  }
  return {
    $and: [x, y]
  };
});
mergeStrategies.set("orMerge", (x, y) => {
  if (!x && !y) {
    return;
  }
  if (!x) {
    return y;
  }
  if (!y) {
    return x;
  }
  return {
    $or: [x, y]
  };
});
mergeStrategies.set("deepMerge", (x, y) => {
  return (0, import_common.isPlainObject)(x) && (0, import_common.isPlainObject)(y) ? (0, import_deepmerge.default)(x, y, {
    arrayMerge: /* @__PURE__ */ __name((x2, y2) => y2, "arrayMerge")
  }) : y;
});
mergeStrategies.set("merge", (x, y) => {
  return (0, import_common.isPlainObject)(x) && (0, import_common.isPlainObject)(y) ? Object.assign(x, y) : y;
});
mergeStrategies.set("union", (x, y) => {
  if (typeof x === "string") {
    x = x.split(",");
  }
  if (typeof y === "string") {
    y = y.split(",");
  }
  return import_lodash.default.uniq((x || []).concat(y || [])).filter(Boolean);
});
mergeStrategies.set(
  "intersect",
  (x, y) => (() => {
    if (typeof x === "string") {
      x = x.split(",");
    }
    if (typeof y === "string") {
      y = y.split(",");
    }
    if (!Array.isArray(x) || x.length === 0) {
      return y || [];
    }
    if (!Array.isArray(y) || y.length === 0) {
      return x || [];
    }
    return x.filter((v) => y.includes(v));
  })().filter(Boolean)
);
function assign(target, source, strategies = {}) {
  const sourceKeys = getKeys(source);
  const targetKeys = getKeys(target);
  import_lodash.default.uniq([...sourceKeys, ...targetKeys]).forEach((sourceKey) => {
    const strategy = strategies[sourceKey];
    let func;
    if (typeof strategy === "function") {
      func = strategy;
    } else if (typeof strategy === "string" && mergeStrategies.has(strategy)) {
      func = mergeStrategies.get(strategy);
    }
    if (func) {
      target[sourceKey] = func(target[sourceKey], source[sourceKey]);
    } else if (sourceKeys.includes(sourceKey)) {
      const func2 = mergeStrategies.get("deepMerge");
      target[sourceKey] = func2(target[sourceKey], source[sourceKey]);
    }
  });
  return target;
}
__name(assign, "assign");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assign,
  mergeStrategies
});
