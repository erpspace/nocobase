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
var instructions_exports = {};
__export(instructions_exports, {
  default: () => instructions_default
});
module.exports = __toCommonJS(instructions_exports);
var import_utils = require("@nocobase/utils");
var instructions_default = {
  echo: {
    run({ config = {} }, { result }, processor) {
      return {
        status: 1,
        result: config.path == null ? result : import_utils.lodash.get(result, config.path)
      };
    },
    test(config = {}) {
      return {
        status: 1,
        result: null
      };
    }
  },
  echoVariable: {
    run({ id, config = {} }, job, processor) {
      return {
        status: 1,
        result: config.variable ? processor.getParsedValue(config.variable, id) : null
      };
    }
  },
  error: {
    run(node, input, processor) {
      throw new Error("definite error");
    }
  },
  pending: {
    run(node, input, processor) {
      return {
        status: 0
      };
    },
    resume(node, job) {
      if (node.config.status != null) {
        job.set("status", node.config.status);
      }
      return job;
    },
    test() {
      return {
        status: 0
      };
    }
  },
  prompt: {
    run(node, input, processor) {
      return {
        status: 0
      };
    },
    resume(node, job, processor) {
      return job.set({
        status: 1
      });
    }
  },
  "prompt->error": {
    run(node, input, processor) {
      return {
        status: 0
      };
    },
    resume(node, input, processor) {
      throw new Error("input failed");
      return null;
    }
  },
  asyncResume: {
    async run(node, input, processor) {
      const job = await processor.saveJob({
        status: 0,
        nodeId: node.id,
        nodeKey: node.key,
        upstreamId: (input == null ? void 0 : input.id) ?? null
      });
      setTimeout(() => {
        job.set({
          status: 1
        });
        processor.options.plugin.resume(job);
      }, 100);
      return null;
    },
    resume(node, job, processor) {
      return job;
    }
  },
  customizedSuccess: {
    run(node, input, processor) {
      return {
        status: 100
      };
    }
  },
  customizedError: {
    run(node, input, processor) {
      return {
        status: -100
      };
    }
  }
};
