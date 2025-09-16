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
var import_sequelize = require("sequelize");
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
  jobsMapByNodeKey = {};
  jobResultsMapByNodeKey = {};
  jobsToSave = /* @__PURE__ */ new Map();
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
      const node = this.nodesMap.get(job.nodeId);
      this.jobsMapByNodeKey[node.key] = job;
      this.jobResultsMapByNodeKey[node.key] = job.result;
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
    const nodes = execution.workflow.nodes || await execution.workflow.getNodes({ transaction });
    execution.workflow.nodes = nodes;
    this.makeNodes(nodes);
    const JobDBModel = plugin.db.getModel("jobs");
    const jobIds = await JobDBModel.findAll({
      attributes: ["executionId", "nodeId", [(0, import_sequelize.fn)("MAX", (0, import_sequelize.col)("id")), "id"]],
      group: ["executionId", "nodeId"],
      where: {
        executionId: execution.id
      },
      raw: true,
      transaction
    });
    const jobs = await execution.getJobs({
      where: {
        id: jobIds.map((item) => item.id)
      },
      order: [["id", "ASC"]],
      transaction
    });
    execution.jobs = jobs;
    this.makeJobs(jobs);
  }
  async start() {
    const { execution } = this;
    if (execution.status !== import_constants.EXECUTION_STATUS.STARTED) {
      this.logger.warn(`execution was ended with status ${execution.status} before, could not be started again`);
      return;
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
      this.logger.warn(`execution was ended with status ${execution.status} before, could not be resumed`);
      return;
    }
    await this.prepare();
    const node = this.nodesMap.get(job.nodeId);
    await this.recall(node, job);
  }
  async exec(instruction, node, prevJob) {
    let job;
    try {
      this.logger.debug(`config of node`, { data: node.config });
      job = await instruction(node, prevJob, this);
      if (job === null) {
        return this.exit();
      }
      if (!job) {
        return this.exit(true);
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
      job.nodeId = node.id;
      job.nodeKey = node.key;
    }
    const savedJob = this.saveJob(job);
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
    this.logger.info(`execution (${this.execution.id}) run instruction [${node.type}] for node (${node.id})`);
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
    this.logger.info(`execution (${this.execution.id}) resume instruction [${node.type}] for node (${node.id})`);
    return this.exec(instruction.resume.bind(instruction), node, job);
  }
  async exit(s) {
    if (s === true) {
      return;
    }
    if (this.jobsToSave.size) {
      const newJobs = [];
      for (const job of this.jobsToSave.values()) {
        if (job.isNewRecord) {
          newJobs.push(job);
        } else {
          const JobCollection = this.options.plugin.db.getCollection("jobs");
          const changes = [];
          if (job.changed("status")) {
            changes.push([`status`, job.status]);
            job.changed("status", false);
          }
          if (job.changed("result")) {
            changes.push([`result`, JSON.stringify(job.result ?? null)]);
            job.changed("result", false);
          }
          if (changes.length) {
            await this.options.plugin.db.sequelize.query(
              `UPDATE ${JobCollection.quotedTableName()} SET ${changes.map(([key]) => `${key} = ?`)} WHERE id='${job.id}'`,
              { replacements: changes.map(([, value]) => value), transaction: this.mainTransaction }
            );
          }
        }
      }
      if (newJobs.length) {
        const JobsModel = this.options.plugin.db.getModel("jobs");
        await JobsModel.bulkCreate(
          newJobs.map((job) => job.toJSON()),
          {
            transaction: this.mainTransaction,
            returning: false
          }
        );
        for (const job of newJobs) {
          job.isNewRecord = false;
        }
      }
      this.jobsToSave.clear();
    }
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
  /**
   * @experimental
   */
  saveJob(payload) {
    const { database } = this.execution.constructor;
    const { model } = database.getCollection("jobs");
    let job;
    if (payload instanceof model) {
      job = payload;
      job.set("updatedAt", /* @__PURE__ */ new Date());
    } else {
      job = model.build(
        {
          ...payload,
          id: this.options.plugin.snowflake.getUniqueID().toString(),
          createdAt: /* @__PURE__ */ new Date(),
          updatedAt: /* @__PURE__ */ new Date(),
          executionId: this.execution.id
        },
        {
          isNewRecord: true
        }
      );
    }
    this.jobsToSave.set(job.id, job);
    this.lastSavedJob = job;
    this.jobsMapByNodeKey[job.nodeKey] = job;
    this.jobResultsMapByNodeKey[job.nodeKey] = job.result;
    this.logger.debug(`job added to save list: ${JSON.stringify(job)}`);
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
    return this.jobsMapByNodeKey[node.key];
  }
  /**
   * @experimental
   */
  findBranchLastJob(node, job) {
    const allJobs = Object.values(this.jobsMapByNodeKey);
    const branchJobs = [];
    for (let n = this.findBranchEndNode(node); n && n !== node.upstream; n = n.upstream) {
      branchJobs.push(...allJobs.filter((item) => item.nodeId === n.id));
    }
    branchJobs.sort((a, b) => a.id - b.id);
    return branchJobs[branchJobs.length - 1] || null;
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
    for (const [name, fn2] of this.options.plugin.functions.getEntities()) {
      (0, import_set.default)(systemFns, name, fn2.bind(scope));
    }
    const $scopes = {};
    for (let n = includeSelfScope ? node : this.findBranchParentNode(node); n; n = this.findBranchParentNode(n)) {
      const instruction = this.options.plugin.instructions.get(n.type);
      if (typeof (instruction == null ? void 0 : instruction.getScope) === "function") {
        $scopes[n.id] = $scopes[n.key] = instruction.getScope(n, this.jobResultsMapByNodeKey[n.key], this);
      }
    }
    return {
      $context: this.execution.context,
      $jobsMapByNodeKey: this.jobResultsMapByNodeKey,
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
