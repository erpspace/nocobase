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
var type_interface_map_exports = {};
__export(type_interface_map_exports, {
  default: () => type_interface_map_default
});
module.exports = __toCommonJS(type_interface_map_exports);
/* istanbul ignore file -- @preserve */
const typeInterfaceMap = {
  array: () => {
    return {
      interface: "json",
      uiSchema: {
        "x-component": "Input.JSON",
        "x-component-props": {
          autoSize: {
            minRows: 5
            // maxRows: 20,
          }
        },
        default: null
      }
    };
  },
  belongsTo: "",
  belongsToMany: "",
  boolean: () => {
    return {
      interface: "checkbox",
      uiSchema: {
        type: "boolean",
        "x-component": "Checkbox"
      }
    };
  },
  context: "",
  date: () => {
    return {
      interface: "datetime",
      uiSchema: {
        "x-component": "DatePicker",
        "x-component-props": {
          dateFormat: "YYYY-MM-DD",
          showTime: false
        }
      }
    };
  },
  hasMany: "",
  hasOne: "",
  json: () => {
    return {
      interface: "json",
      uiSchema: {
        "x-component": "Input.JSON",
        "x-component-props": {
          autoSize: {
            minRows: 5
            // maxRows: 20,
          }
        },
        default: null
      }
    };
  },
  jsonb: () => {
    return {
      interface: "json",
      uiSchema: {
        "x-component": "Input.JSON",
        "x-component-props": {
          autoSize: {
            minRows: 5
            // maxRows: 20,
          }
        },
        default: null
      }
    };
  },
  integer: () => ({
    interface: "integer",
    // name,
    uiSchema: {
      type: "number",
      // title,
      "x-component": "InputNumber",
      "x-component-props": {
        stringMode: true,
        step: "1"
      },
      "x-validator": "integer"
    }
  }),
  bigInt: (columnInfo) => {
    return {
      interface: "integer",
      uiSchema: {
        "x-component": "InputNumber",
        "x-component-props": {
          style: {
            width: "100%"
          }
        }
      }
    };
  },
  float: () => {
    return {
      interface: "number",
      uiSchema: {
        type: "number",
        // title,
        "x-component": "InputNumber",
        "x-component-props": {
          stringMode: true,
          step: "1"
        }
      }
    };
  },
  double: () => {
    return {
      interface: "number",
      uiSchema: {
        type: "number",
        // title,
        "x-component": "InputNumber",
        "x-component-props": {
          stringMode: true,
          step: "1"
        }
      }
    };
  },
  real: () => {
    return {
      interface: "number",
      uiSchema: {
        type: "number",
        // title,
        "x-component": "InputNumber",
        "x-component-props": {
          stringMode: true,
          step: "1"
        }
      }
    };
  },
  decimal: () => {
    return {
      interface: "number",
      uiSchema: {
        type: "number",
        // title,
        "x-component": "InputNumber",
        "x-component-props": {
          stringMode: true,
          step: "1"
        }
      }
    };
  },
  password: () => ({
    interface: "password",
    hidden: true,
    // name,
    uiSchema: {
      type: "string",
      // title,
      "x-component": "Password"
    }
  }),
  radio: "",
  set: "",
  sort: "",
  string: () => {
    return {
      interface: "input",
      uiSchema: {
        "x-component": "Input",
        "x-component-props": {
          style: {
            width: "100%"
          }
        }
      }
    };
  },
  text: () => {
    return {
      interface: "textarea",
      // name,
      uiSchema: {
        type: "string",
        "x-component": "Input.TextArea"
      }
    };
  },
  time: () => ({
    interface: "time",
    // name,
    uiSchema: {
      type: "string",
      "x-component": "TimePicker",
      "x-component-props": {
        format: "HH:mm:ss"
      }
    }
  }),
  uid: () => {
    return {
      interface: "input",
      uiSchema: {
        "x-component": "Input",
        "x-component-props": {
          style: {
            width: "100%"
          }
        }
      }
    };
  },
  uuid: () => {
    return {
      interface: "input",
      uiSchema: {
        "x-component": "Input",
        "x-component-props": {
          style: {
            width: "100%"
          }
        }
      }
    };
  },
  virtual: "",
  point: "",
  polygon: "",
  lineString: "",
  circle: ""
};
var type_interface_map_default = typeInterfaceMap;
