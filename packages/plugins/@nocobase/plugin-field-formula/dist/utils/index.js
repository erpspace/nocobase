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
var utils_exports = {};
__export(utils_exports, {
  DataTypeTransformers: () => DataTypeTransformers,
  toDbType: () => toDbType
});
module.exports = __toCommonJS(utils_exports);
const DataTypeTransformers = {
  boolean: Boolean,
  integer: {
    boolean(value) {
      return Number(value);
    },
    number(value) {
      return value >= 0 ? Math.floor(value) : Math.ceil(value);
    },
    bigint(value) {
      return Number(value);
    },
    string(value) {
      const result = Number.parseInt(value, 10);
      if (Number.isNaN(result) || !Number.isFinite(result)) {
        return null;
      }
      return result;
    },
    date(value) {
      const result = value.valueOf();
      if (Number.isNaN(result)) {
        return null;
      }
      return result;
    }
  },
  bigInt: {
    boolean(value) {
      return Number(value);
    },
    number(value) {
      return Math.floor(value >= 0 ? Math.floor(value) : Math.ceil(value));
    },
    bigint(value) {
      return Number(value);
    },
    string(value) {
      const result = Number.parseInt(value, 10);
      if (Number.isNaN(result) || !Number.isFinite(result)) {
        return null;
      }
      return result;
    },
    date(value) {
      const result = value.valueOf();
      if (Number.isNaN(result)) {
        return null;
      }
      return result;
    }
  },
  double: {
    boolean(value) {
      return Number(value);
    },
    number(value) {
      return value;
    },
    bigint(value) {
      return Number(value);
    },
    string(value) {
      const result = Number.parseFloat(value);
      if (Number.isNaN(result) || !Number.isFinite(result)) {
        return null;
      }
      return result;
    },
    date(value) {
      const result = value.valueOf();
      if (Number.isNaN(result)) {
        return null;
      }
      return result;
    }
  },
  decimal: {
    boolean(value) {
      return Number(value);
    },
    number(value) {
      return value;
    },
    bigint(value) {
      return value;
    },
    date(value) {
      const result = value.valueOf();
      if (Number.isNaN(result)) {
        return null;
      }
      return result;
    }
  },
  string: {
    boolean(value) {
      return value.toString();
    },
    number(value) {
      return value.toString();
    },
    bigint(value) {
      return value.toString();
    },
    string(value) {
      return value;
    },
    date(value) {
      return value.toISOString();
    }
  },
  date: {
    boolean(value) {
      return null;
    },
    number(value) {
      const result = new Date(value);
      if (Number.isNaN(result.valueOf())) {
        return null;
      }
      return result;
    },
    bigint(value) {
      const result = new Date(Number(value));
      if (Number.isNaN(result.valueOf())) {
        return null;
      }
      return result;
    },
    string(value) {
      const ts = Date.parse(value);
      if (Number.isNaN(ts)) {
        return null;
      }
      return new Date(ts);
    },
    date(value) {
      return new Date(value);
    }
  }
};
function toDbType(value, type) {
  if (value == null) {
    return null;
  }
  let jsType = typeof value;
  if (jsType == "object" && value instanceof Date) {
    jsType = "date";
  }
  const transformers = DataTypeTransformers[type];
  if (!transformers) {
    return null;
  }
  if (typeof transformers === "function") {
    return transformers(value);
  }
  const transformer = transformers[jsType];
  return transformer ? transformer(value) : null;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataTypeTransformers,
  toDbType
});
