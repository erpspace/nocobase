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
var json_templates_exports = {};
__export(json_templates_exports, {
  parse: () => parse
});
module.exports = __toCommonJS(json_templates_exports);
var import_lodash = require("lodash");
function type(value) {
  let valueType = typeof value;
  if (Array.isArray(value)) {
    valueType = "array";
  } else if (value instanceof Date) {
    valueType = "date";
  } else if (value === null) {
    valueType = "null";
  }
  return valueType;
}
__name(type, "type");
function Parameter(match) {
  let param;
  const matchValue = match.substr(2, match.length - 4).trim();
  const i = matchValue.indexOf(":");
  if (i !== -1) {
    param = {
      key: matchValue.substr(0, i),
      defaultValue: matchValue.substr(i + 1)
    };
  } else {
    param = { key: matchValue };
  }
  return param;
}
__name(Parameter, "Parameter");
function Template(fn, parameters) {
  fn.parameters = Array.from(new Map(parameters.map((parameter) => [parameter.key, parameter])).values());
  return fn;
}
__name(Template, "Template");
function parse(value) {
  switch (type(value)) {
    case "string":
      return parseString(value);
    case "object":
      return parseObject(value);
    case "array":
      return parseArray(value);
    default:
      return Template(function() {
        return value;
      }, []);
  }
}
__name(parse, "parse");
const parseString = /* @__PURE__ */ (() => {
  const regex = /{{(\w|:|[\s-+.,@/()?=*_$])+}}/g;
  return (str) => {
    let parameters = [];
    let templateFn = /* @__PURE__ */ __name((context) => str, "templateFn");
    const matches = str.match(regex);
    if (matches) {
      parameters = matches.map(Parameter);
      templateFn = /* @__PURE__ */ __name((context) => {
        context = context || {};
        return matches.reduce((result, match, i) => {
          const parameter = parameters[i];
          let value = (0, import_lodash.get)(context, parameter.key);
          if (typeof value === "undefined") {
            value = parameter.defaultValue;
          }
          if (typeof value === "function") {
            value = value();
          }
          if (matches.length === 1 && str.startsWith("{{") && str.endsWith("}}")) {
            return value;
          }
          if (value instanceof Date) {
            value = value.toISOString();
          }
          return result.replace(match, value == null ? "" : value);
        }, str);
      }, "templateFn");
    }
    return Template(templateFn, parameters);
  };
})();
function parseObject(object) {
  const children = Object.keys(object).map((key) => ({
    keyTemplate: parseString(key),
    valueTemplate: parse(object[key])
  }));
  const templateParameters = children.reduce(
    (parameters, child) => parameters.concat(child.valueTemplate.parameters, child.keyTemplate.parameters),
    []
  );
  const templateFn = /* @__PURE__ */ __name((context) => {
    return children.reduce((newObject, child) => {
      newObject[child.keyTemplate(context)] = child.valueTemplate(context);
      return newObject;
    }, {});
  }, "templateFn");
  return Template(templateFn, templateParameters);
}
__name(parseObject, "parseObject");
function parseArray(array) {
  const templates = array.map(parse);
  const templateParameters = templates.reduce((parameters, template) => parameters.concat(template.parameters), []);
  const templateFn = /* @__PURE__ */ __name((context) => templates.map((template) => template(context)), "templateFn");
  return Template(templateFn, templateParameters);
}
__name(parseArray, "parseArray");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parse
});
