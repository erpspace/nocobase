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
var Plugin_exports = {};
__export(Plugin_exports, {
  default: () => PluginWorkflowServer
});
module.exports = __toCommonJS(Plugin_exports);
var import_path = __toESM(require("path"));
var import_crypto = require("crypto");
var import_nodejs_snowflake = require("nodejs-snowflake");
var import_sequelize = require("sequelize");
var import_lru_cache = __toESM(require("lru-cache"));
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_Processor = __toESM(require("./Processor"));
var import_actions = __toESM(require("./actions"));
var import_constants = require("./constants");
var import_functions = __toESM(require("./functions"));
var import_CollectionTrigger = __toESM(require("./triggers/CollectionTrigger"));
var import_ScheduleTrigger = __toESM(require("./triggers/ScheduleTrigger"));
var import_CalculationInstruction = __toESM(require("./instructions/CalculationInstruction"));
var import_ConditionInstruction = __toESM(require("./instructions/ConditionInstruction"));
var import_EndInstruction = __toESM(require("./instructions/EndInstruction"));
var import_CreateInstruction = __toESM(require("./instructions/CreateInstruction"));
var import_DestroyInstruction = __toESM(require("./instructions/DestroyInstruction"));
var import_QueryInstruction = __toESM(require("./instructions/QueryInstruction"));
var import_UpdateInstruction = __toESM(require("./instructions/UpdateInstruction"));
var import_WorkflowRepository = __toESM(require("./repositories/WorkflowRepository"));
const WORKER_JOB_WORKFLOW_PROCESS = "workflow:process";
class PluginWorkflowServer extends import_server.Plugin {
  instructions = new import_utils.Registry();
  triggers = new import_utils.Registry();
  functions = new import_utils.Registry();
  enabledCache = /* @__PURE__ */ new Map();
  snowflake;
  ready = false;
  executing = null;
  pending = [];
  events = [];
  eventsCount = 0;
  loggerCache;
  meter = null;
  checker = null;
  onQueueExecution = async (event) => {
    const ExecutionRepo = this.db.getRepository("executions");
    const execution = await ExecutionRepo.findOne({
      filterByTk: event.executionId
    });
    if (!execution || execution.status !== import_constants.EXECUTION_STATUS.QUEUEING) {
      this.getLogger("dispatcher").info(
        `execution (${event.executionId}) from queue not found or not in queueing status, skip`
      );
      return;
    }
    this.getLogger(execution.workflowId).info(
      `execution (${execution.id}) received from queue, adding to pending list`
    );
    this.run(execution);
  };
  onBeforeSave = async (instance, { transaction, cycling }) => {
    if (cycling) {
      return;
    }
    const Model = instance.constructor;
    if (!instance.key) {
      instance.set("key", (0, import_utils.uid)());
    }
    if (instance.enabled) {
      instance.set("current", true);
    }
    const previous = await Model.findOne({
      where: {
        key: instance.key,
        current: true,
        id: {
          [import_database.Op.ne]: instance.id
        }
      },
      transaction
    });
    if (!previous) {
      instance.set("current", true);
    } else if (instance.current) {
      await previous.update(
        { enabled: false, current: null },
        {
          transaction,
          cycling: true
        }
      );
      this.toggle(previous, false, { transaction });
    }
  };
  onAfterCreate = async (model, { transaction }) => {
    const WorkflowStatsModel = this.db.getModel("workflowStats");
    let stats = await WorkflowStatsModel.findOne({
      where: { key: model.key },
      transaction
    });
    if (!stats) {
      stats = await model.createStats({ executed: 0 }, { transaction });
    }
    model.stats = stats;
    model.versionStats = await model.createVersionStats({ id: model.id }, { transaction });
    if (model.enabled) {
      this.toggle(model, true, { transaction });
    }
  };
  onAfterUpdate = async (model, { transaction }) => {
    model.stats = await model.getStats({ transaction });
    model.versionStats = await model.getVersionStats({ transaction });
    this.toggle(model, model.enabled, { transaction });
  };
  onAfterDestroy = async (model, { transaction }) => {
    this.toggle(model, false, { transaction });
    const TaskRepo = this.db.getRepository("workflowTasks");
    await TaskRepo.destroy({
      filter: {
        workflowId: model.id
      },
      transaction
    });
  };
  // [Life Cycle]:
  //   * load all workflows in db
  //   * add all hooks for enabled workflows
  //   * add hooks for create/update[enabled]/delete workflow to add/remove specific hooks
  onAfterStart = async () => {
    this.ready = true;
    const collection = this.db.getCollection("workflows");
    const workflows = await collection.repository.find({
      appends: ["versionStats"]
    });
    for (const workflow of workflows) {
      if (workflow.current) {
        workflow.stats = await workflow.getStats();
        if (!workflow.stats) {
          workflow.stats = await workflow.createStats({ executed: 0 });
        }
      }
      if (!workflow.versionStats) {
        workflow.versionStats = await workflow.createVersionStats({ executed: 0 });
      }
      if (workflow.enabled) {
        this.toggle(workflow, true, { silent: true });
      }
    }
    this.checker = setInterval(() => {
      this.getLogger("dispatcher").debug(`(cycling) check for queueing executions`);
      this.dispatch();
    }, 3e5);
    this.app.on("workflow:dispatch", () => {
      this.app.logger.info("workflow:dispatch");
      this.dispatch();
    });
    this.getLogger("dispatcher").info("(starting) check for queueing executions");
    this.dispatch();
    this.ready = true;
  };
  onBeforeStop = async () => {
    this.app.logger.info(`stopping workflow plugin before app (${this.app.name}) shutdown...`);
    for (const workflow of this.enabledCache.values()) {
      this.toggle(workflow, false, { silent: true });
    }
    this.ready = false;
    if (this.events.length) {
      await this.prepare();
    }
    if (this.executing) {
      await this.executing;
    }
    if (this.checker) {
      clearInterval(this.checker);
    }
    this.loggerCache.clear();
  };
  async handleSyncMessage(message) {
    if (message.type === "statusChange") {
      await this.syncWorkflowStatus(message.workflowId, message.enabled);
    }
  }
  /**
   * Enhanced workflow synchronization with direct database queries
   * Workflow definitions are rarely changed, so we can use direct DB queries
   */
  async syncWorkflowStatus(workflowId, enabled) {
    try {
      if (enabled) {
        let workflow = this.enabledCache.get(workflowId);
        if (workflow) {
          console.log(`[CLUSTER] Reloading workflow ${workflowId} from local cache`);
          await workflow.reload();
        } else {
          console.log(`[CLUSTER] Loading workflow ${workflowId} from database`);
          workflow = await this.db.getRepository("workflows").findOne({
            filterByTk: workflowId,
            appends: ["nodes", "revisions"]
            // Include related data
          });
        }
        if (workflow) {
          this.toggle(workflow, true, { silent: true });
          console.log(`[CLUSTER] Workflow ${workflowId} enabled successfully`);
        } else {
          console.warn(`[CLUSTER] Workflow ${workflowId} not found in database`);
        }
      } else {
        const workflow = this.enabledCache.get(workflowId);
        if (workflow) {
          console.log(`[CLUSTER] Disabling workflow ${workflowId}`);
          this.toggle(workflow, false, { silent: true });
        } else {
          console.warn(`[CLUSTER] Workflow ${workflowId} not found in local cache for disabling`);
        }
      }
    } catch (error) {
      console.error(`[CLUSTER] Error syncing workflow ${workflowId}:`, error.message);
    }
  }
  /**
   * @experimental
   */
  getLogger(workflowId = "dispatcher") {
    const now = /* @__PURE__ */ new Date();
    const date = `${now.getFullYear()}-${`0${now.getMonth() + 1}`.slice(-2)}-${`0${now.getDate()}`.slice(-2)}`;
    const key = `${date}-${workflowId}}`;
    if (this.loggerCache.has(key)) {
      return this.loggerCache.get(key);
    }
    const logger = this.createLogger({
      dirname: import_path.default.join("workflows", String(workflowId)),
      filename: "%DATE%.log"
    });
    this.loggerCache.set(key, logger);
    return logger;
  }
  /**
   * @experimental
   * @param {WorkflowModel} workflow
   * @returns {boolean}
   */
  isWorkflowSync(workflow) {
    const trigger = this.triggers.get(workflow.type);
    if (!trigger) {
      throw new Error(`invalid trigger type ${workflow.type} of workflow ${workflow.id}`);
    }
    return trigger.sync ?? workflow.sync;
  }
  registerTrigger(type, trigger) {
    if (typeof trigger === "function") {
      this.triggers.register(type, new trigger(this));
    } else if (trigger) {
      this.triggers.register(type, trigger);
    } else {
      throw new Error("invalid trigger type to register");
    }
  }
  registerInstruction(type, instruction) {
    if (typeof instruction === "function") {
      this.instructions.register(type, new instruction(this));
    } else if (instruction) {
      this.instructions.register(type, instruction);
    } else {
      throw new Error("invalid instruction type to register");
    }
  }
  initTriggers(more = {}) {
    this.registerTrigger("collection", import_CollectionTrigger.default);
    this.registerTrigger("schedule", import_ScheduleTrigger.default);
    for (const [name, trigger] of Object.entries(more)) {
      this.registerTrigger(name, trigger);
    }
  }
  initInstructions(more = {}) {
    this.registerInstruction("calculation", import_CalculationInstruction.default);
    this.registerInstruction("condition", import_ConditionInstruction.default);
    this.registerInstruction("end", import_EndInstruction.default);
    this.registerInstruction("create", import_CreateInstruction.default);
    this.registerInstruction("destroy", import_DestroyInstruction.default);
    this.registerInstruction("query", import_QueryInstruction.default);
    this.registerInstruction("update", import_UpdateInstruction.default);
    for (const [name, instruction] of Object.entries({ ...more })) {
      this.registerInstruction(name, instruction);
    }
  }
  async beforeLoad() {
    this.db.registerRepositories({
      WorkflowRepository: import_WorkflowRepository.default
    });
    const PluginRepo = this.db.getRepository("applicationPlugins");
    const pluginRecord = await PluginRepo.findOne({
      filter: { name: this.name }
    });
    this.snowflake = new import_nodejs_snowflake.Snowflake({
      custom_epoch: pluginRecord == null ? void 0 : pluginRecord.createdAt.getTime()
    });
    if (this.app.serving(WORKER_JOB_WORKFLOW_PROCESS)) {
      this.app.backgroundJobManager.subscribe(`${this.name}.pendingExecution`, {
        idle: () => !this.executing && !this.pending.length && !this.events.length,
        process: this.onQueueExecution
      });
    }
  }
  /**
   * @internal
   */
  async load() {
    const { db, options } = this;
    (0, import_actions.default)(this);
    this.initTriggers(options.triggers);
    this.initInstructions(options.instructions);
    (0, import_functions.default)(this, options.functions);
    this.loggerCache = new import_lru_cache.default({
      max: 20,
      updateAgeOnGet: true,
      dispose(logger) {
        logger.end();
      }
    });
    this.meter = this.app.telemetry.metric.getMeter();
    const counter = this.meter.createObservableGauge("workflow.events.counter");
    counter.addCallback((result) => {
      result.observe(this.eventsCount);
    });
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.workflows`,
      actions: [
        "workflows:*",
        "workflows.nodes:*",
        "executions:list",
        "executions:get",
        "executions:cancel",
        "executions:destroy",
        "flow_nodes:update",
        "flow_nodes:destroy",
        "flow_nodes:test",
        "jobs:get",
        "workflowCategories:*"
      ]
    });
    this.app.acl.registerSnippet({
      name: "ui.workflows",
      actions: ["workflows:list"]
    });
    this.app.acl.allow("userWorkflowTasks", "listMine", "loggedIn");
    this.app.acl.allow("*", ["trigger"], "loggedIn");
    db.on("workflows.beforeSave", this.onBeforeSave);
    db.on("workflows.afterCreate", this.onAfterCreate);
    db.on("workflows.afterUpdate", this.onAfterUpdate);
    db.on("workflows.afterDestroy", this.onAfterDestroy);
    this.app.on("afterStart", this.onAfterStart);
    this.app.on("beforeStop", this.onBeforeStop);
  }
  toggle(workflow, enable, { silent, transaction } = {}) {
    const type = workflow.get("type");
    const trigger = this.triggers.get(type);
    if (!trigger) {
      this.getLogger(workflow.id).error(`trigger type ${workflow.type} of workflow ${workflow.id} is not implemented`);
      return;
    }
    const next = enable ?? workflow.get("enabled");
    if (next) {
      const prev = workflow.previous();
      if (prev.config) {
        trigger.off({ ...workflow.get(), ...prev });
        this.getLogger(workflow.id).info(`toggle OFF workflow ${workflow.id} based on configuration before updated`);
      }
      trigger.on(workflow);
      this.getLogger(workflow.id).info(`toggle ON workflow ${workflow.id}`);
      this.enabledCache.set(workflow.id, workflow);
    } else {
      trigger.off(workflow);
      this.getLogger(workflow.id).info(`toggle OFF workflow ${workflow.id}`);
      this.enabledCache.delete(workflow.id);
    }
    if (!silent) {
      this.sendSyncMessage(
        {
          type: "statusChange",
          workflowId: workflow.id,
          enabled: next
        },
        { transaction }
      );
    }
  }
  trigger(workflow, context, options = {}) {
    const logger = this.getLogger(workflow.id);
    if (!this.ready) {
      logger.warn(`app is not ready, event of workflow ${workflow.id} will be ignored`);
      logger.debug(`ignored event data:`, context);
      return;
    }
    if (!options.force && !options.manually && !workflow.enabled) {
      logger.warn(`workflow ${workflow.id} is not enabled, event will be ignored`);
      return;
    }
    const duplicated = this.events.find(([w, c, { eventKey }]) => {
      if (eventKey && options.eventKey) {
        return eventKey === options.eventKey;
      }
    });
    if (duplicated) {
      logger.warn(`event of workflow ${workflow.id} is duplicated (${options.eventKey}), event will be ignored`);
      return;
    }
    if (context == null) {
      logger.warn(`workflow ${workflow.id} event data context is null, event will be ignored`);
      return;
    }
    if (options.manually || this.isWorkflowSync(workflow)) {
      return this.triggerSync(workflow, context, options);
    }
    const { transaction, ...rest } = options;
    this.events.push([workflow, context, rest]);
    this.eventsCount = this.events.length;
    logger.info(`new event triggered, now events: ${this.events.length}`);
    logger.debug(`event data:`, { context });
    if (this.events.length > 1) {
      logger.info(`new event is pending to be prepared after previous preparation is finished`);
      return;
    }
    setImmediate(this.prepare);
  }
  async triggerSync(workflow, context, { deferred, ...options } = {}) {
    let execution;
    try {
      execution = await this.createExecution(workflow, context, options);
    } catch (err) {
      this.getLogger(workflow.id).error(`creating execution failed: ${err.message}`, err);
      return null;
    }
    try {
      return this.process(execution, null, options);
    } catch (err) {
      this.getLogger(execution.workflowId).error(`execution (${execution.id}) error: ${err.message}`, err);
    }
    return null;
  }
  async run(execution, job) {
    while (this.executing) {
      await this.executing;
    }
    this.executing = this.process(execution, job);
    await this.executing;
    this.executing = null;
    this.dispatch();
  }
  async resume(job) {
    let { execution } = job;
    if (!execution) {
      execution = await job.getExecution();
    }
    this.getLogger(execution.workflowId).info(
      `execution (${execution.id}) resuming from job (${job.id}) added to pending list`
    );
    this.run(execution, job);
  }
  /**
   * Start a deferred execution
   * @experimental
   */
  async start(execution) {
    if (execution.status !== import_constants.EXECUTION_STATUS.STARTED) {
      return;
    }
    this.getLogger(execution.workflowId).info(`starting deferred execution (${execution.id})`);
    this.run(execution);
  }
  async validateEvent(workflow, context, options) {
    const trigger = this.triggers.get(workflow.type);
    const triggerValid = await trigger.validateEvent(workflow, context, options);
    if (!triggerValid) {
      return false;
    }
    const { stack } = options;
    let valid = true;
    if ((stack == null ? void 0 : stack.length) > 0) {
      const existed = await workflow.countExecutions({
        where: {
          id: stack
        },
        transaction: options.transaction
      });
      const limitCount = workflow.options.stackLimit || 1;
      if (existed >= limitCount) {
        this.getLogger(workflow.id).warn(
          `workflow ${workflow.id} has already been triggered in stacks executions (${stack}), and max call coont is ${limitCount}, newly triggering will be skipped.`
        );
        valid = false;
      }
    }
    return valid;
  }
  async createExecution(workflow, context, options) {
    var _a;
    const { deferred } = options;
    const transaction = await this.useDataSourceTransaction("main", options.transaction, true);
    const sameTransaction = options.transaction === transaction;
    const valid = await this.validateEvent(workflow, context, { ...options, transaction });
    if (!valid) {
      if (!sameTransaction) {
        await transaction.commit();
      }
      (_a = options.onTriggerFail) == null ? void 0 : _a.call(options, workflow, context, options);
      return Promise.reject(new Error("event is not valid"));
    }
    let execution;
    try {
      execution = await workflow.createExecution(
        {
          context,
          key: workflow.key,
          eventKey: options.eventKey ?? (0, import_crypto.randomUUID)(),
          stack: options.stack,
          status: deferred ? import_constants.EXECUTION_STATUS.STARTED : import_constants.EXECUTION_STATUS.QUEUEING
        },
        { transaction }
      );
    } catch (err) {
      if (!sameTransaction) {
        await transaction.rollback();
      }
      throw err;
    }
    this.getLogger(workflow.id).info(`execution of workflow ${workflow.id} created as ${execution.id}`);
    if (!workflow.stats) {
      workflow.stats = await workflow.getStats({ transaction });
    }
    await workflow.stats.increment("executed", { transaction });
    if (this.db.options.dialect !== "postgres") {
      await workflow.stats.reload({ transaction });
    }
    if (!workflow.versionStats) {
      workflow.versionStats = await workflow.getVersionStats({ transaction });
    }
    await workflow.versionStats.increment("executed", { transaction });
    if (this.db.options.dialect !== "postgres") {
      await workflow.versionStats.reload({ transaction });
    }
    if (!sameTransaction) {
      await transaction.commit();
    }
    execution.workflow = workflow;
    return execution;
  }
  prepare = async () => {
    if (this.executing && this.db.options.dialect === "sqlite") {
      await this.executing;
    }
    const event = this.events.shift();
    this.eventsCount = this.events.length;
    if (!event) {
      this.getLogger("dispatcher").info(`events queue is empty, no need to prepare`);
      return;
    }
    const logger = this.getLogger(event[0].id);
    logger.info(`preparing execution for event`);
    try {
      const execution = await this.createExecution(...event);
      if ((execution == null ? void 0 : execution.status) === import_constants.EXECUTION_STATUS.QUEUEING) {
        if (!this.executing && !this.pending.length) {
          logger.info(`local pending list is empty, adding execution (${execution.id}) to pending list`);
          this.pending.push([execution]);
        } else {
          logger.info(`local pending list is not empty, sending execution (${execution.id}) to queue`);
          if (this.ready) {
            this.app.backgroundJobManager.publish(`${this.name}.pendingExecution`, { executionId: execution.id });
          }
        }
      }
    } catch (error) {
      logger.error(`failed to create execution:`, { error });
    }
    if (this.events.length) {
      await this.prepare();
    } else {
      this.getLogger("dispatcher").info("no more events need to be prepared, dispatching...");
      if (this.executing) {
        await this.executing;
      }
      this.dispatch();
    }
  };
  dispatch() {
    if (!this.ready) {
      this.getLogger("dispatcher").warn(`app is not ready, new dispatching will be ignored`);
      return;
    }
    if (!this.app.serving(WORKER_JOB_WORKFLOW_PROCESS)) {
      this.getLogger("dispatcher").warn(
        `${WORKER_JOB_WORKFLOW_PROCESS} is not serving, new dispatching will be ignored`
      );
      return;
    }
    if (this.executing) {
      this.getLogger("dispatcher").warn(`workflow executing is not finished, new dispatching will be ignored`);
      return;
    }
    if (this.events.length) {
      return this.prepare();
    }
    this.executing = (async () => {
      let next = null;
      if (this.pending.length) {
        next = this.pending.shift();
        this.getLogger(next[0].workflowId).info(`pending execution (${next[0].id}) ready to process`);
      } else {
        try {
          await this.db.sequelize.transaction(
            {
              isolationLevel: this.db.options.dialect === "sqlite" ? [][0] : import_sequelize.Transaction.ISOLATION_LEVELS.REPEATABLE_READ
            },
            async (transaction) => {
              const execution = await this.db.getRepository("executions").findOne({
                filter: {
                  status: {
                    [import_database.Op.is]: import_constants.EXECUTION_STATUS.QUEUEING
                  },
                  "workflow.enabled": true
                },
                sort: "id",
                transaction
              });
              if (execution) {
                this.getLogger(execution.workflowId).info(`execution (${execution.id}) fetched from db`);
                await execution.update(
                  {
                    status: import_constants.EXECUTION_STATUS.STARTED
                  },
                  { transaction }
                );
                execution.workflow = this.enabledCache.get(execution.workflowId);
                next = [execution];
              } else {
                this.getLogger("dispatcher").debug(`no execution in db queued to process`);
              }
            }
          );
        } catch (error) {
          this.getLogger("dispatcher").error(`fetching execution from db failed: ${error.message}`, { error });
        }
      }
      if (next) {
        await this.process(...next);
      }
      this.executing = null;
      if (next || this.pending.length) {
        this.getLogger("dispatcher").debug(`last process finished, will do another dispatch`);
        this.dispatch();
      }
    })();
  }
  createProcessor(execution, options = {}) {
    return new import_Processor.default(execution, { ...options, plugin: this });
  }
  async process(execution, job, options = {}) {
    var _a, _b;
    const logger = this.getLogger(execution.workflowId);
    if (execution.status === import_constants.EXECUTION_STATUS.QUEUEING) {
      const transaction = await this.useDataSourceTransaction("main", options.transaction);
      await execution.update({ status: import_constants.EXECUTION_STATUS.STARTED }, { transaction });
      logger.info(`execution (${execution.id}) from pending list updated to started`);
    }
    const processor = this.createProcessor(execution, options);
    logger.info(`execution (${execution.id}) ${job ? "resuming" : "starting"}...`);
    try {
      await (job ? processor.resume(job) : processor.start());
      logger.info(`execution (${execution.id}) finished with status: ${execution.status}`, { execution });
      if (execution.status && ((_b = (_a = execution.workflow.options) == null ? void 0 : _a.deleteExecutionOnStatus) == null ? void 0 : _b.includes(execution.status))) {
        await execution.destroy({ transaction: processor.mainTransaction });
      }
    } catch (err) {
      logger.error(`execution (${execution.id}) error: ${err.message}`, err);
    }
    return processor;
  }
  async execute(workflow, values, options = {}) {
    const trigger = this.triggers.get(workflow.type);
    if (!trigger) {
      throw new Error(`trigger type "${workflow.type}" of workflow ${workflow.id} is not registered`);
    }
    if (!trigger.execute) {
      throw new Error(`"execute" method of trigger ${workflow.type} is not implemented`);
    }
    return trigger.execute(workflow, values, options);
  }
  /**
   * @experimental
   * @param {string} dataSourceName
   * @param {Transaction} transaction
   * @param {boolean} create
   * @returns {Trasaction}
   */
  useDataSourceTransaction(dataSourceName = "main", transaction, create = false) {
    const { db } = this.app.dataSourceManager.dataSources.get(dataSourceName).collectionManager;
    if (!db) {
      return;
    }
    if (db.sequelize === (transaction == null ? void 0 : transaction.sequelize)) {
      return transaction;
    }
    if (create) {
      return db.sequelize.transaction();
    }
  }
  /**
   * @experimental
   */
  async updateTasksStats(userId, type, stats = { pending: 0, all: 0 }, { transaction }) {
    const { db } = this.app;
    const repository = db.getRepository("userWorkflowTasks");
    let record = await repository.findOne({
      filter: {
        userId,
        type
      },
      transaction
    });
    if (record) {
      await record.update(
        {
          stats
        },
        { transaction }
      );
    } else {
      record = await repository.create({
        values: {
          userId,
          type,
          stats
        },
        transaction
      });
    }
    if (userId) {
      this.app.emit("ws:sendToTag", {
        tagKey: "userId",
        tagValue: `${userId}`,
        message: { type: "workflow:tasks:updated", payload: record.get() }
      });
    }
  }
}
