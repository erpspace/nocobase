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
var utils_exports = {};
__export(utils_exports, {
  getNameByParams: () => getNameByParams,
  mergeFields: () => mergeFields,
  parseFields: () => parseFields,
  parseQuery: () => parseQuery,
  parseRequest: () => parseRequest
});
module.exports = __toCommonJS(utils_exports);
var import_lodash = __toESM(require("lodash"));
var import_path_to_regexp = require("path-to-regexp");
var import_qs = __toESM(require("qs"));
function getNameByParams(params) {
  const { resourceName, associatedName } = params;
  return associatedName ? `${associatedName}.${resourceName}` : resourceName;
}
__name(getNameByParams, "getNameByParams");
function parseRequest(request, options = {}) {
  const accessors = {
    // 常规 actions
    list: "list",
    create: "create",
    get: "get",
    update: "update",
    delete: "destroy",
    // associate 操作
    add: "add",
    set: "set",
    remove: "remove",
    ...options.accessors || {}
  };
  const keys = [];
  const regexp = (0, import_path_to_regexp.pathToRegexp)("/resourcer/:rest(.*)", keys);
  const reqPath = decodeURI(request.path);
  const matches = regexp.exec(reqPath);
  if (matches) {
    const params2 = {};
    const [resource, action] = matches[1].split(":");
    const [res1, res2] = resource.split(".");
    if (res1) {
      if (res2) {
        params2["associatedName"] = res1;
        params2["resourceName"] = res2;
      } else {
        params2["resourceName"] = res1;
      }
    }
    if (action) {
      params2["actionName"] = action;
    }
    return params2;
  }
  const defaults = {
    single: {
      "/:resourceName": {
        get: accessors.list,
        post: accessors.create,
        delete: accessors.delete
      },
      "/:resourceName/:resourceIndex": {
        get: accessors.get,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      },
      "/:associatedName/:associatedIndex/:resourceName": {
        get: accessors.list,
        post: accessors.create,
        delete: accessors.delete
      },
      "/:associatedName/:associatedIndex/:resourceName/:resourceIndex": {
        get: accessors.get,
        post: accessors.create,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      }
    },
    hasOne: {
      "/:associatedName/:associatedIndex/:resourceName": {
        get: accessors.get,
        post: accessors.update,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      }
    },
    hasMany: {
      "/:associatedName/:associatedIndex/:resourceName": {
        get: accessors.list,
        post: accessors.create,
        delete: accessors.delete
      },
      "/:associatedName/:associatedIndex/:resourceName/:resourceIndex": {
        get: accessors.get,
        post: accessors.create,
        put: accessors.update,
        patch: accessors.update,
        delete: accessors.delete
      }
    },
    belongsTo: {
      "/:associatedName/:associatedIndex/:resourceName": {
        get: accessors.get,
        delete: accessors.remove
      },
      "/:associatedName/:associatedIndex/:resourceName/:resourceIndex": {
        post: accessors.set
      }
    },
    belongsToMany: {
      "/:associatedName/:associatedIndex/:resourceName": {
        get: accessors.list,
        post: accessors.set
      },
      "/:associatedName/:associatedIndex/:resourceName/:resourceIndex": {
        get: accessors.get,
        post: accessors.add,
        put: accessors.update,
        // Many to Many 的 update 是针对 through
        patch: accessors.update,
        // Many to Many 的 update 是针对 through
        delete: accessors.remove
      }
    },
    set: {
      "/:associatedName/:associatedIndex/:resourceName": {
        get: accessors.list,
        post: accessors.add,
        delete: accessors.remove
      }
    }
  };
  const params = {};
  let prefix = (options.prefix || "").trim().replace(/\/$/, "");
  if (prefix && !prefix.startsWith("/")) {
    prefix = `/${prefix}`;
  }
  const { type = "single" } = request;
  for (const path in defaults[type]) {
    const keys2 = [];
    const regexp2 = (0, import_path_to_regexp.pathToRegexp)(`${prefix}${path}`, keys2, {});
    const matches2 = regexp2.exec(reqPath);
    if (!matches2) {
      continue;
    }
    keys2.forEach((obj, index) => {
      if (matches2[index + 1] === void 0) {
        return;
      }
      params[obj.name] = matches2[index + 1];
    });
    params.actionName = import_lodash.default.get(defaults, [type, path, request.method.toLowerCase()]);
  }
  if (Object.keys(params).length === 0) {
    return false;
  }
  if (params.resourceName) {
    const [resourceName, actionName] = params.resourceName.split(":");
    if (actionName) {
      params.resourceName = resourceName;
      params.actionName = actionName;
    }
  }
  if (params.associatedIndex) {
    params.associatedIndex = decodeURIComponent(params.associatedIndex);
  }
  return params;
}
__name(parseRequest, "parseRequest");
function parseQuery(input) {
  const query = import_qs.default.parse(input, {
    // 原始 query string 中如果一个键连等号“=”都没有可以被认为是 null 类型
    strictNullHandling: true
    // 逗号分隔转换为数组
    // comma: true,
  });
  if (typeof query.filter === "string") {
    query.filter = JSON.parse(query.filter);
  }
  return query;
}
__name(parseQuery, "parseQuery");
function parseFields(fields) {
  if (!fields) {
    return {};
  }
  if (typeof fields === "string") {
    fields = fields.split(",").map((field) => field.trim());
  }
  if (Array.isArray(fields)) {
    const onlyFields = [];
    const output = {};
    fields.forEach((item) => {
      if (typeof item === "string") {
        onlyFields.push(item);
      } else if (typeof item === "object") {
        if (item.only) {
          onlyFields.push(...item.only.toString().split(","));
        }
        Object.assign(output, parseFields(item));
      }
    });
    if (onlyFields.length) {
      output.only = onlyFields;
    }
    return output;
  }
  if (fields.only && typeof fields.only === "string") {
    fields.only = fields.only.split(",").map((field) => field.trim());
  }
  if (fields.except && typeof fields.except === "string") {
    fields.except = fields.except.split(",").map((field) => field.trim());
  }
  if (fields.appends && typeof fields.appends === "string") {
    fields.appends = fields.appends.split(",").map((field) => field.trim());
  }
  return fields;
}
__name(parseFields, "parseFields");
function mergeFields(defaults, inputs) {
  let fields = {};
  defaults = parseFields(defaults);
  inputs = parseFields(inputs);
  if (inputs.only) {
    if (defaults.only) {
      fields.only = defaults.only.filter((field) => inputs.only.includes(field));
    } else if (defaults.except) {
      fields.only = inputs.only.filter((field) => !defaults.except.includes(field));
    } else {
      fields.only = inputs.only;
    }
  } else if (inputs.except) {
    if (defaults.only) {
      fields.only = defaults.only.filter((field) => !inputs.except.includes(field));
    } else {
      fields.except = import_lodash.default.uniq([...inputs.except, ...defaults.except || []]);
    }
  } else {
    fields = defaults;
  }
  if (!import_lodash.default.isEmpty(inputs.appends)) {
    fields.appends = import_lodash.default.uniq([...inputs.appends, ...defaults.appends || []]);
  }
  if (!fields.appends) {
    fields.appends = [];
  }
  return fields;
}
__name(mergeFields, "mergeFields");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getNameByParams,
  mergeFields,
  parseFields,
  parseQuery,
  parseRequest
});
