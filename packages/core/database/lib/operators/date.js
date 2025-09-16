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
var date_exports = {};
__export(date_exports, {
  default: () => date_default
});
module.exports = __toCommonJS(date_exports);
var import_utils = require("@nocobase/utils");
var import_sequelize = require("sequelize");
var import_moment = __toESM(require("moment"));
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
__name(isDate, "isDate");
const toDate = /* @__PURE__ */ __name((date, options = {}) => {
  const { ctx } = options;
  let val = isDate(date) ? date : new Date(date);
  const field = ctx.db.getFieldByPath(ctx.fieldPath);
  if (!field) {
    return val;
  }
  if (field.constructor.name === "UnixTimestampField") {
    val = field.dateToValue(val);
  }
  if (field.constructor.name === "DatetimeNoTzField") {
    val = (0, import_moment.default)(val).utcOffset("+00:00").format("YYYY-MM-DD HH:mm:ss");
  }
  if (field.constructor.name === "DateOnlyField") {
    val = import_moment.default.utc(val).format("YYYY-MM-DD HH:mm:ss");
  }
  const eventObj = {
    val,
    fieldType: field.type
  };
  ctx.db.emit("filterToDate", eventObj);
  return eventObj.val;
}, "toDate");
function parseDateTimezone(ctx) {
  const field = ctx.db.getFieldByPath(ctx.fieldPath);
  if (!field) {
    return ctx.db.options.timezone;
  }
  if (field.constructor.name === "DatetimeNoTzField") {
    return "+00:00";
  }
  if (field.constructor.name === "DateOnlyField") {
    return "+00:00";
  }
  return ctx.db.options.timezone;
}
__name(parseDateTimezone, "parseDateTimezone");
var date_default = {
  $dateOn(value, ctx) {
    const r = (0, import_utils.parseDate)(value, {
      timezone: parseDateTimezone(ctx)
    });
    if (typeof r === "string") {
      return {
        [import_sequelize.Op.eq]: toDate(r, { ctx })
      };
    }
    if (Array.isArray(r)) {
      console.log(11111111, {
        [import_sequelize.Op.and]: [{ [import_sequelize.Op.gte]: toDate(r[0], { ctx }) }, { [import_sequelize.Op.lt]: toDate(r[1], { ctx }) }]
      });
      return {
        [import_sequelize.Op.and]: [{ [import_sequelize.Op.gte]: toDate(r[0], { ctx }) }, { [import_sequelize.Op.lt]: toDate(r[1], { ctx }) }]
      };
    }
    throw new Error(`Invalid Date ${JSON.stringify(value)}`);
  },
  $dateNotOn(value, ctx) {
    const r = (0, import_utils.parseDate)(value, {
      timezone: parseDateTimezone(ctx)
    });
    if (typeof r === "string") {
      return {
        [import_sequelize.Op.ne]: toDate(r, { ctx })
      };
    }
    if (Array.isArray(r)) {
      return {
        [import_sequelize.Op.or]: [{ [import_sequelize.Op.lt]: toDate(r[0], { ctx }) }, { [import_sequelize.Op.gte]: toDate(r[1], { ctx }) }]
      };
    }
    throw new Error(`Invalid Date ${JSON.stringify(value)}`);
  },
  $dateBefore(value, ctx) {
    const r = (0, import_utils.parseDate)(value, {
      timezone: parseDateTimezone(ctx)
    });
    if (typeof r === "string") {
      return {
        [import_sequelize.Op.lt]: toDate(r, { ctx })
      };
    } else if (Array.isArray(r)) {
      return {
        [import_sequelize.Op.lt]: toDate(r[0], { ctx })
      };
    }
    throw new Error(`Invalid Date ${JSON.stringify(value)}`);
  },
  $dateNotBefore(value, ctx) {
    const r = (0, import_utils.parseDate)(value, {
      timezone: parseDateTimezone(ctx)
    });
    if (typeof r === "string") {
      return {
        [import_sequelize.Op.gte]: toDate(r, { ctx })
      };
    } else if (Array.isArray(r)) {
      return {
        [import_sequelize.Op.gte]: toDate(r[0], { ctx })
      };
    }
    throw new Error(`Invalid Date ${JSON.stringify(value)}`);
  },
  $dateAfter(value, ctx) {
    const r = (0, import_utils.parseDate)(value, {
      timezone: parseDateTimezone(ctx)
    });
    if (typeof r === "string") {
      return {
        [import_sequelize.Op.gt]: toDate(r, { ctx })
      };
    } else if (Array.isArray(r)) {
      return {
        [import_sequelize.Op.gte]: toDate(r[1], { ctx })
      };
    }
    throw new Error(`Invalid Date ${JSON.stringify(value)}`);
  },
  $dateNotAfter(value, ctx) {
    const r = (0, import_utils.parseDate)(value, {
      timezone: parseDateTimezone(ctx)
    });
    if (typeof r === "string") {
      return {
        [import_sequelize.Op.lte]: toDate(r, { ctx })
      };
    } else if (Array.isArray(r)) {
      return {
        [import_sequelize.Op.lt]: toDate(r[1], { ctx })
      };
    }
    throw new Error(`Invalid Date ${JSON.stringify(value)}`);
  },
  $dateBetween(value, ctx) {
    const r = (0, import_utils.parseDate)(value, {
      timezone: parseDateTimezone(ctx)
    });
    if (r) {
      return {
        [import_sequelize.Op.and]: [{ [import_sequelize.Op.gte]: toDate(r[0], { ctx }) }, { [import_sequelize.Op.lt]: toDate(r[1], { ctx }) }]
      };
    }
    throw new Error(`Invalid Date ${JSON.stringify(value)}`);
  }
};
