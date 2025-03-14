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
var RequestInstruction_exports = {};
__export(RequestInstruction_exports, {
  default: () => RequestInstruction_default
});
module.exports = __toCommonJS(RequestInstruction_exports);
var import_axios = __toESM(require("axios"));
var import_lodash = require("lodash");
var import_plugin_workflow = require("@nocobase/plugin-workflow");
const ContentTypeTransformers = {
  "text/plain"(data) {
    return data.toString();
  },
  "application/x-www-form-urlencoded"(data) {
    return new URLSearchParams(
      data.filter(({ name, value }) => name && typeof value !== "undefined").map(({ name, value }) => [name, value])
    ).toString();
  }
};
async function request(config) {
  const { url, method = "POST", contentType = "application/json", data, timeout = 5e3 } = config;
  const headers = (config.headers ?? []).reduce((result, header) => {
    const name = (0, import_lodash.trim)(header.name);
    if (name.toLowerCase() === "content-type") {
      return result;
    }
    return Object.assign(result, { [name]: (0, import_lodash.trim)(header.value) });
  }, {});
  const params = (config.params ?? []).reduce(
    (result, param) => Object.assign(result, { [param.name]: (0, import_lodash.trim)(param.value) }),
    {}
  );
  headers["Content-Type"] = contentType;
  const transformer = ContentTypeTransformers[contentType];
  return import_axios.default.request({
    url: (0, import_lodash.trim)(url),
    method,
    headers,
    params,
    timeout,
    ...method.toLowerCase() !== "get" && data != null ? {
      data: transformer ? transformer(data) : data
    } : {}
  });
}
function responseSuccess(response, onlyData = false) {
  return onlyData ? response.data : {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
    config: response.config,
    data: response.data
  };
}
function responseFailure(error) {
  let result = {
    message: error.message,
    stack: error.stack
  };
  if (error.isAxiosError) {
    if (error.response) {
      Object.assign(result, {
        status: error.response.status,
        statusText: error.response.statusText,
        headers: error.response.headers,
        config: error.response.config,
        data: error.response.data
      });
    } else if (error.request) {
      result = error.toJSON();
    }
  }
  return result;
}
class RequestInstruction_default extends import_plugin_workflow.Instruction {
  async run(node, prevJob, processor) {
    const config = processor.getParsedValue(node.config, node.id);
    const { workflow } = processor.execution;
    const sync = this.workflow.isWorkflowSync(workflow);
    if (sync) {
      try {
        const response = await request(config);
        return {
          status: import_plugin_workflow.JOB_STATUS.RESOLVED,
          result: responseSuccess(response, config.onlyData)
        };
      } catch (error) {
        return {
          status: config.ignoreFail ? import_plugin_workflow.JOB_STATUS.RESOLVED : import_plugin_workflow.JOB_STATUS.FAILED,
          result: error.isAxiosError ? error.toJSON() : error.message
        };
      }
    }
    const job = await processor.saveJob({
      status: import_plugin_workflow.JOB_STATUS.PENDING,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    request(config).then((response) => {
      processor.logger.info(`request (#${node.id}) response success, status: ${response.status}`);
      job.set({
        status: import_plugin_workflow.JOB_STATUS.RESOLVED,
        result: responseSuccess(response, config.onlyData)
      });
    }).catch((error) => {
      if (error.isAxiosError) {
        if (error.response) {
          processor.logger.info(`request (#${node.id}) failed with response, status: ${error.response.status}`);
        } else if (error.request) {
          processor.logger.error(`request (#${node.id}) failed without resposne: ${error.message}`);
        } else {
          processor.logger.error(`request (#${node.id}) initiation failed: ${error.message}`);
        }
      } else {
        processor.logger.error(`request (#${node.id}) failed unexpectedly: ${error.message}`);
      }
      job.set({
        status: import_plugin_workflow.JOB_STATUS.FAILED,
        result: responseFailure(error)
      });
    }).finally(() => {
      processor.logger.debug(`request (#${node.id}) ended, resume workflow...`);
      setTimeout(() => {
        job.execution = processor.execution;
        this.workflow.resume(job);
      });
    });
    processor.logger.info(`request (#${node.id}) sent to "${config.url}", waiting for response...`);
    return null;
  }
  async resume(node, job, processor) {
    const { ignoreFail } = node.config;
    if (ignoreFail) {
      job.set("status", import_plugin_workflow.JOB_STATUS.RESOLVED);
    }
    return job;
  }
  async test(config) {
    try {
      const response = await request(config);
      return {
        status: import_plugin_workflow.JOB_STATUS.RESOLVED,
        result: responseSuccess(response, config.onlyData)
      };
    } catch (error) {
      return {
        status: config.ignoreFail ? import_plugin_workflow.JOB_STATUS.RESOLVED : import_plugin_workflow.JOB_STATUS.FAILED,
        result: error.isAxiosError ? error.toJSON() : error.message
      };
    }
  }
}
