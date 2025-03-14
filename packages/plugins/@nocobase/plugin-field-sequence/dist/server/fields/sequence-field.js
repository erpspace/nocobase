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
var sequence_field_exports = {};
__export(sequence_field_exports, {
  SequenceField: () => SequenceField,
  sequencePatterns: () => sequencePatterns
});
module.exports = __toCommonJS(sequence_field_exports);
var import_database = require("@nocobase/database");
var import_utils = require("@nocobase/utils");
var import_cron_parser = __toESM(require("cron-parser"));
var import_dayjs = __toESM(require("dayjs"));
var import_lodash = __toESM(require("lodash"));
const sequencePatterns = new import_utils.Registry();
sequencePatterns.register("string", {
  validate(options) {
    if (!(options == null ? void 0 : options.value)) {
      return "options.value should be configured as a non-empty string";
    }
    return null;
  },
  generate(instance, options) {
    return options.value;
  },
  batchGenerate(instances, values, options) {
    instances.forEach((instance, i) => {
      values[i] = options.value;
    });
  },
  getLength(options) {
    return options.value.length;
  },
  getMatcher(options) {
    return import_lodash.default.escapeRegExp(options.value);
  }
});
sequencePatterns.register("integer", {
  // validate(options) {
  //   if (!options?.key) {
  //     return 'options.key should be configured as an integer';
  //   }
  //   return null;
  // },
  async generate(instance, options, { transaction }) {
    const recordTime = instance.get("createdAt") ?? /* @__PURE__ */ new Date();
    const { digits = 1, start = 0, base = 10, cycle, key } = options;
    const { repository: SeqRepo, model: SeqModel } = this.database.getCollection("sequences");
    const lastSeq = await SeqRepo.findOne({
      filter: {
        collection: this.collection.name,
        field: this.name,
        key
      },
      transaction
    }) || SeqModel.build({
      collection: this.collection.name,
      field: this.name,
      key
    });
    let next = start;
    if (lastSeq.get("current") != null) {
      next = Math.max(lastSeq.get("current") + 1, start);
      const max = Math.pow(base, digits) - 1;
      if (next > max) {
        next = start;
      }
      if (cycle) {
        const interval = import_cron_parser.default.parseExpression(cycle, { currentDate: lastSeq.get("lastGeneratedAt") });
        const nextTime = interval.next();
        if (recordTime.getTime() >= nextTime.getTime()) {
          next = start;
        }
      }
    }
    lastSeq.set({
      current: next,
      lastGeneratedAt: recordTime
    });
    await lastSeq.save({ transaction });
    return next.toString(base).padStart(digits, "0");
  },
  getLength({ digits = 1 } = {}) {
    return digits;
  },
  getMatcher(options = {}) {
    const { digits = 1, base = 10 } = options;
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, base);
    return `[${chars}]{${digits}}`;
  },
  async batchGenerate(instances, values, options, { transaction }) {
    const { name, patterns } = this.options;
    const { digits = 1, start = 0, base = 10, cycle, key } = options;
    const { repository: SeqRepo, model: SeqModel } = this.database.getCollection("sequences");
    const lastSeq = await SeqRepo.findOne({
      filter: {
        collection: this.collection.name,
        field: this.name,
        key
      },
      transaction
    }) || SeqModel.build({
      collection: this.collection.name,
      field: this.name,
      key
    });
    instances.forEach((instance, i) => {
      const recordTime = instance.get("createdAt") ?? /* @__PURE__ */ new Date();
      const value = instance.get(name);
      if (value != null && this.options.inputable) {
        const matcher = this.match(value);
        if (matcher) {
          const patternIndex = patterns.indexOf(options);
          const number = Number.parseInt(matcher[patternIndex + 1], base);
          if (lastSeq.get("current") == null) {
            lastSeq.set({
              current: number,
              lastGeneratedAt: recordTime
            });
          } else {
            if (number > lastSeq.get("current")) {
              lastSeq.set({
                current: number,
                lastGeneratedAt: recordTime
              });
            }
          }
        }
      } else {
        let next = start;
        if (lastSeq.get("current") != null) {
          next = Math.max(lastSeq.get("current") + 1, start);
          const max = Math.pow(base, digits) - 1;
          if (next > max) {
            next = start;
          }
          if (cycle) {
            const interval = import_cron_parser.default.parseExpression(cycle, { currentDate: lastSeq.get("lastGeneratedAt") });
            const nextTime = interval.next();
            if (recordTime.getTime() >= nextTime.getTime()) {
              next = start;
            }
          }
        }
        lastSeq.set({
          current: next,
          lastGeneratedAt: recordTime
        });
        values[i] = next.toString(base).padStart(digits, "0");
      }
    });
    await lastSeq.save({ transaction });
  },
  async update(instance, value, options, { transaction }) {
    const recordTime = instance.get("createdAt") ?? /* @__PURE__ */ new Date();
    const { digits = 1, start = 0, base = 10, cycle, key } = options;
    const SeqRepo = this.database.getRepository("sequences");
    const lastSeq = await SeqRepo.findOne({
      filter: {
        collection: this.collection.name,
        field: this.name,
        key
      },
      transaction
    });
    const current = Number.parseInt(value, base);
    if (!lastSeq) {
      return SeqRepo.create({
        values: {
          collection: this.collection.name,
          field: this.name,
          key,
          current,
          lastGeneratedAt: recordTime
        },
        transaction
      });
    }
    if (lastSeq.get("current") == null) {
      return lastSeq.update(
        {
          current,
          lastGeneratedAt: recordTime
        },
        { transaction }
      );
    }
    if (cycle) {
      const interval = import_cron_parser.default.parseExpression(cycle, { currentDate: lastSeq.get("lastGeneratedAt") });
      const nextTime = interval.next();
      if (recordTime.getTime() >= nextTime.getTime()) {
        lastSeq.set({
          current,
          lastGeneratedAt: recordTime
        });
      } else {
        if (current > lastSeq.get("current")) {
          lastSeq.set({
            current,
            lastGeneratedAt: recordTime
          });
        }
      }
    } else {
      if (current > lastSeq.get("current")) {
        lastSeq.set({
          current,
          lastGeneratedAt: recordTime
        });
      }
    }
    return lastSeq.save({ transaction });
  }
});
sequencePatterns.register("date", {
  generate(instance, options) {
    return (0, import_dayjs.default)(instance.get((options == null ? void 0 : options.field) ?? "createdAt")).format((options == null ? void 0 : options.format) ?? "YYYYMMDD");
  },
  batchGenerate(instances, values, options) {
    const { field, inputable } = options;
    instances.forEach((instance, i) => {
      if (!inputable || instance.get(field ?? "createdAt") == null) {
        values[i] = sequencePatterns.get("date").generate.call(this, instance, options);
      }
    });
  },
  getLength(options) {
    var _a;
    return ((_a = options.format) == null ? void 0 : _a.length) ?? 8;
  },
  getMatcher(options = {}) {
    var _a;
    return `.{${((_a = options == null ? void 0 : options.format) == null ? void 0 : _a.length) ?? 8}}`;
  }
});
const CHAR_SETS = {
  number: "0123456789",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  // 符号只保留常用且安全的符号，有需要的可以自己加比如[]{}|;:,.<>放在链接或者文件名里容易出问题的字符
  symbol: "!@#$%^&*_-+"
};
sequencePatterns.register("randomChar", {
  validate(options) {
    if (!(options == null ? void 0 : options.length) || options.length < 1) {
      return "options.length should be configured as a positive integer";
    }
    if (!(options == null ? void 0 : options.charsets) || options.charsets.length === 0) {
      return "At least one character set should be selected";
    }
    if (options.charsets.some((charset) => !CHAR_SETS[charset])) {
      return "Invalid charset selected";
    }
    return null;
  },
  generate(instance, options) {
    const { length = 6, charsets = ["number"] } = options;
    const chars = [...new Set(charsets.reduce((acc, charset) => acc + CHAR_SETS[charset], ""))];
    const getRandomChar = () => {
      const randomIndex = Math.floor(Math.random() * chars.length);
      return chars[randomIndex];
    };
    return Array.from({ length }, () => getRandomChar()).join("");
  },
  batchGenerate(instances, values, options) {
    instances.forEach((instance, i) => {
      values[i] = sequencePatterns.get("randomChar").generate.call(this, instance, options);
    });
  },
  getLength(options) {
    return options.length || 6;
  },
  getMatcher(options) {
    const pattern = [
      ...new Set(
        (options.charsets || ["number"]).reduce((acc, charset) => {
          switch (charset) {
            case "number":
              return acc + "0-9";
            case "lowercase":
              return acc + "a-z";
            case "uppercase":
              return acc + "A-Z";
            case "symbol":
              return acc + CHAR_SETS.symbol.replace("-", "").replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + "-";
            default:
              return acc;
          }
        }, "")
      )
    ].join("");
    return `[${pattern}]{${options.length || 6}}`;
  }
});
class SequenceField extends import_database.Field {
  matcher;
  get dataType() {
    return import_database.DataTypes.STRING;
  }
  constructor(options, context) {
    super(options, context);
    if (!options.patterns || !options.patterns.length) {
      throw new Error("at least one pattern should be defined for sequence type");
    }
    options.patterns.forEach((pattern) => {
      const P = sequencePatterns.get(pattern.type);
      if (!P) {
        throw new Error(`pattern type ${pattern.type} is not registered`);
      }
      if (P.validate) {
        const error = P.validate(pattern.options);
        if (error) {
          throw new Error(error);
        }
      }
    });
    const patterns = options.patterns.map(({ type, options: options2 }) => sequencePatterns.get(type).getMatcher(options2));
    this.matcher = new RegExp(`^${patterns.map((p) => `(${p})`).join("")}$`, "i");
  }
  validate = (instance) => {
    const { name, inputable, match } = this.options;
    const value = instance.get(name);
    if (value != null && inputable && match && !this.match(value)) {
      throw new import_database.ValidationError("sequence pattern not match", [
        new import_database.ValidationErrorItem(
          `input value of ${name} field not match the sequence pattern (${this.matcher.toString()}) which is required`,
          "validation error",
          // NOTE: type should only be this which in sequelize enum set
          name,
          value,
          instance,
          "sequence_pattern_not_match",
          name,
          []
        )
      ]);
    }
  };
  setValue = async (instance, options) => {
    var _a;
    if ((_a = options.skipIndividualHooks) == null ? void 0 : _a.has(`${this.collection.name}.beforeCreate.${this.name}`)) {
      return;
    }
    const { name, patterns, inputable } = this.options;
    const value = instance.get(name);
    if (value != null && inputable) {
      return this.update(instance, options);
    }
    const results = await patterns.reduce(
      (promise, p) => promise.then(async (result) => {
        const item = await sequencePatterns.get(p.type).generate.call(this, instance, p.options, options);
        return result.concat(item);
      }),
      Promise.resolve([])
    );
    instance.set(name, results.join(""));
  };
  setGroupValue = async (instances, options) => {
    if (!instances.length) {
      return;
    }
    if (!options.skipIndividualHooks) {
      options.skipIndividualHooks = /* @__PURE__ */ new Set();
    }
    options.skipIndividualHooks.add(`${this.collection.name}.beforeCreate.${this.name}`);
    const { name, patterns, inputable } = this.options;
    const array = Array(patterns.length).fill(null).map(() => Array(instances.length));
    await patterns.reduce(
      (promise, p, i) => promise.then(
        () => sequencePatterns.get(p.type).batchGenerate.call(this, instances, array[i], p.options ?? {}, options)
      ),
      Promise.resolve()
    );
    instances.forEach((instance, i) => {
      const value = instance.get(name);
      if (!inputable || value == null) {
        instance.set(this.name, array.map((a) => a[i]).join(""));
      }
    });
  };
  cleanHook = (_, options) => {
    options.skipIndividualHooks.delete(`${this.collection.name}.beforeCreate.${this.name}`);
  };
  match(value) {
    return typeof value === "string" ? value.match(this.matcher) : null;
  }
  async update(instance, options) {
    const { name, patterns } = this.options;
    const matched = this.match(instance.get(name));
    if (matched) {
      await matched.slice(1).map((_, i) => sequencePatterns.get(patterns[i].type).update).reduce(
        (promise, update, i) => promise.then(() => {
          if (!update) {
            return;
          }
          return update.call(this, instance, matched[i + 1], patterns[i].options, options);
        }),
        Promise.resolve()
      );
    }
  }
  bind() {
    super.bind();
    this.on("beforeValidate", this.validate);
    this.on("beforeCreate", this.setValue);
    this.on("beforeBulkCreate", this.setGroupValue);
    this.on("afterBulkCreate", this.cleanHook);
  }
  unbind() {
    super.unbind();
    this.off("beforeValidate", this.validate);
    this.off("beforeCreate", this.setValue);
    this.off("beforeBulkCreate", this.setGroupValue);
    this.off("afterBulkCreate", this.cleanHook);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SequenceField,
  sequencePatterns
});
