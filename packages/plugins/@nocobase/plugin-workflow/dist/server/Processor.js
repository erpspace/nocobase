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
var Processor_exports = {};
__export(Processor_exports, {
  default: () => Processor
});
module.exports = __toCommonJS(Processor_exports);
var import_database = require("@nocobase/database");
var import_evaluators = require("@nocobase/evaluators");
var import_utils = require("@nocobase/utils");
var import_set = __toESM(require("lodash/set"));
var import_constants = require("./constants");
class Processor {
  constructor(execution, options) {
    this.execution = execution;
    this.options = options;
    this.logger = options.plugin.getLogger(execution.workflowId);
    this.transaction = options.transaction;
  }
  static StatusMap = {
    [import_constants.JOB_STATUS.PENDING]: import_constants.EXECUTION_STATUS.STARTED,
    [import_constants.JOB_STATUS.RESOLVED]: import_constants.EXECUTION_STATUS.RESOLVED,
    [import_constants.JOB_STATUS.FAILED]: import_constants.EXECUTION_STATUS.FAILED,
    [import_constants.JOB_STATUS.ERROR]: import_constants.EXECUTION_STATUS.ERROR,
    [import_constants.JOB_STATUS.ABORTED]: import_constants.EXECUTION_STATUS.ABORTED,
    [import_constants.JOB_STATUS.CANCELED]: import_constants.EXECUTION_STATUS.CANCELED,
    [import_constants.JOB_STATUS.REJECTED]: import_constants.EXECUTION_STATUS.REJECTED,
    [import_constants.JOB_STATUS.RETRY_NEEDED]: import_constants.EXECUTION_STATUS.RETRY_NEEDED
  };
  logger;
  /**
   * @experimental
   */
  transaction;
  /**
   * @experimental
   */
  mainTransaction;
  /**
   * @experimental
   */
  nodes = [];
  /**
   * @experimental
   */
  nodesMap = /* @__PURE__ */ new Map();
  /**
   * @experimental
   */
  jobsMap = /* @__PURE__ */ new Map();
  /**
   * @experimental
   */
  jobsMapByNodeKey = {};
  /**
   * @experimental
   */
  lastSavedJob = null;
  // make dual linked nodes list then cache
  makeNodes(nodes = []) {
    this.nodes = nodes;
    nodes.forEach((node) => {
      this.nodesMap.set(node.id, node);
    });
    nodes.forEach((node) => {
      if (node.upstreamId) {
        node.upstream = this.nodesMap.get(node.upstreamId);
      }
      if (node.downstreamId) {
        node.downstream = this.nodesMap.get(node.downstreamId);
      }
    });
  }
  makeJobs(jobs) {
    jobs.forEach((job) => {
      this.jobsMap.set(job.id, job);
      const node = this.nodesMap.get(job.nodeId);
      this.jobsMapByNodeKey[node.key] = job.result;
    });
  }
  async prepare() {
    const {
      execution,
      options: { plugin }
    } = this;
    this.mainTransaction = plugin.useDataSourceTransaction("main", this.transaction);
    const transaction = this.mainTransaction;
    if (!execution.workflow) {
      execution.workflow = plugin.enabledCache.get(execution.workflowId) || await execution.getWorkflow({ transaction });
    }
    const nodes = await execution.workflow.getNodes({ transaction });
    this.makeNodes(nodes);
    const jobs = await execution.getJobs({
      order: [["id", "ASC"]],
      transaction
    });
    this.makeJobs(jobs);
  }
  async start() {
    const { execution } = this;
    if (execution.status !== import_constants.EXECUTION_STATUS.STARTED) {
      throw new Error(`execution was ended with status ${execution.status} before, could not be started again`);
    }
    await this.prepare();
    if (this.nodes.length) {
      const head = this.nodes.find((item) => !item.upstream);
      await this.run(head, { result: execution.context });
    } else {
      await this.exit(import_constants.JOB_STATUS.RESOLVED);
    }
  }
  async resume(job) {
    const { execution } = this;
    if (execution.status !== import_constants.EXECUTION_STATUS.STARTED) {
      throw new Error(`execution was ended with status ${execution.status} before, could not be resumed`);
    }
    await this.prepare();
    const node = this.nodesMap.get(job.nodeId);
    await this.recall(node, job);
  }
  async exec(instruction, node, prevJob) {
    let job;
    try {
      this.logger.info(`execution (${this.execution.id}) run instruction [${node.type}] for node (${node.id})`);
      this.logger.debug(`config of node`, { data: node.config });
      job = await instruction(node, prevJob, this);
      if (!job) {
        return this.exit();
      }
    } catch (err) {
      this.logger.error(
        `execution (${this.execution.id}) run instruction [${node.type}] for node (${node.id}) failed: `,
        err
      );
      job = {
        result: err instanceof Error ? {
          message: err.message,
          ...err
        } : err,
        status: import_constants.JOB_STATUS.ERROR
      };
      if (prevJob && prevJob.nodeId === node.id) {
        prevJob.set(job);
        job = prevJob;
      }
    }
    if (!(job instanceof import_database.Model)) {
      job.upstreamId = prevJob instanceof import_database.Model ? prevJob.get("id") : null;
      job.nodeId = node.id;
      job.nodeKey = node.key;
    }
    const savedJob = await this.saveJob(job);
    this.logger.info(
      `execution (${this.execution.id}) run instruction [${node.type}] for node (${node.id}) finished as status: ${savedJob.status}`
    );
    this.logger.debug(`result of node`, { data: savedJob.result });
    if (savedJob.status === import_constants.JOB_STATUS.RESOLVED && node.downstream) {
      this.logger.debug(`run next node (${node.downstreamId})`);
      return this.run(node.downstream, savedJob);
    }
    return this.end(node, savedJob);
  }
  async run(node, input) {
    const { instructions } = this.options.plugin;
    const instruction = instructions.get(node.type);
    if (!instruction) {
      return Promise.reject(new Error(`instruction [${node.type}] not found for node (#${node.id})`));
    }
    if (typeof instruction.run !== "function") {
      return Promise.reject(new Error("`run` should be implemented for customized execution of the node"));
    }
    return this.exec(instruction.run.bind(instruction), node, input);
  }
  // parent node should take over the control
  async end(node, job) {
    this.logger.debug(`branch ended at node (${node.id})`);
    const parentNode = this.findBranchParentNode(node);
    if (parentNode) {
      this.logger.debug(`not on main, recall to parent entry node (${node.id})})`);
      await this.recall(parentNode, job);
      return null;
    }
    return this.exit(job.status);
  }
  async recall(node, job) {
    const { instructions } = this.options.plugin;
    const instruction = instructions.get(node.type);
    if (!instruction) {
      return Promise.reject(new Error(`instruction [${node.type}] not found for node (#${node.id})`));
    }
    if (typeof instruction.resume !== "function") {
      return Promise.reject(
        new Error(`"resume" method should be implemented for [${node.type}] instruction of node (#${node.id})`)
      );
    }
    return this.exec(instruction.resume.bind(instruction), node, job);
  }
  async exit(s) {
    if (typeof s === "number") {
      const status = this.constructor.StatusMap[s] ?? Math.sign(s);
      await this.execution.update({ status }, { transaction: this.mainTransaction });
    }
    if (this.mainTransaction && this.mainTransaction !== this.transaction) {
      await this.mainTransaction.commit();
    }
    this.logger.info(`execution (${this.execution.id}) exiting with status ${this.execution.status}`);
    return null;
  }
  // TODO(optimize)
  /**
   * @experimental
   */
  async saveJob(payload) {
    const { database } = this.execution.constructor;
    const { mainTransaction: transaction } = this;
    const { model } = database.getCollection("jobs");
    let job;
    if (payload instanceof model) {
      job = await payload.save({ transaction });
    } else if (payload.id) {
      job = await model.findByPk(payload.id, { transaction });
      await job.update(payload, { transaction });
    } else {
      job = await model.create(
        {
          ...payload,
          executionId: this.execution.id
        },
        { transaction }
      );
    }
    this.jobsMap.set(job.id, job);
    this.lastSavedJob = job;
    this.jobsMapByNodeKey[job.nodeKey] = job.result;
    return job;
  }
  /**
   * @experimental
   */
  getBranches(node) {
    return this.nodes.filter((item) => item.upstream === node && item.branchIndex !== null).sort((a, b) => Number(a.branchIndex) - Number(b.branchIndex));
  }
  /**
   * @experimental
   * find the first node in current branch
   */
  findBranchStartNode(node, parent) {
    for (let n = node; n; n = n.upstream) {
      if (!parent) {
        if (n.branchIndex !== null) {
          return n;
        }
      } else {
        if (n.upstream === parent) {
          return n;
        }
      }
    }
    return null;
  }
  /**
   * @experimental
   * find the node start current branch
   */
  findBranchParentNode(node) {
    for (let n = node; n; n = n.upstream) {
      if (n.branchIndex !== null) {
        return n.upstream;
      }
    }
    return null;
  }
  /**
   * @experimental
   */
  findBranchEndNode(node) {
    for (let n = node; n; n = n.downstream) {
      if (!n.downstream) {
        return n;
      }
    }
    return null;
  }
  /**
   * @experimental
   */
  findBranchParentJob(job, node) {
    for (let j = job; j; j = this.jobsMap.get(j.upstreamId)) {
      if (j.nodeId === node.id) {
        return j;
      }
    }
    return null;
  }
  /**
   * @experimental
   */
  findBranchLastJob(node, job) {
    const allJobs = Array.from(this.jobsMap.values());
    const branchJobs = [];
    for (let n = this.findBranchEndNode(node); n && n !== node.upstream; n = n.upstream) {
      branchJobs.push(...allJobs.filter((item) => item.nodeId === n.id));
    }
    branchJobs.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    for (let i = branchJobs.length - 1; i >= 0; i -= 1) {
      for (let j = branchJobs[i]; j && j.id !== job.id; j = this.jobsMap.get(j.upstreamId)) {
        if (j.upstreamId === job.id) {
          return branchJobs[i];
        }
      }
    }
    return null;
  }
  /**
   * @experimental
   */
  getScope(sourceNodeId, includeSelfScope = false) {
    const node = this.nodesMap.get(sourceNodeId);
    const systemFns = {};
    const scope = {
      execution: this.execution,
      node
    };
    for (const [name, fn] of this.options.plugin.functions.getEntities()) {
      (0, import_set.default)(systemFns, name, fn.bind(scope));
    }
    const $scopes = {};
    for (let n = includeSelfScope ? node : this.findBranchParentNode(node); n; n = this.findBranchParentNode(n)) {
      const instruction = this.options.plugin.instructions.get(n.type);
      if (typeof (instruction == null ? void 0 : instruction.getScope) === "function") {
        $scopes[n.id] = $scopes[n.key] = instruction.getScope(n, this.jobsMapByNodeKey[n.key], this);
      }
    }
    return {
      $context: this.execution.context,
      $jobsMapByNodeKey: this.jobsMapByNodeKey,
      $system: systemFns,
      $scopes,
      $env: this.options.plugin.app.environment.getVariables()
    };
  }
  /**
   * @experimental
   */
  getParsedValue(value, sourceNodeId, { additionalScope = {}, includeSelfScope = false } = {}) {
    const template = (0, import_utils.parse)(value);
    const scope = Object.assign(this.getScope(sourceNodeId, includeSelfScope), additionalScope);
    template.parameters.forEach(({ key }) => {
      (0, import_evaluators.appendArrayColumn)(scope, key);
    });
    return template(scope);
  }
}
