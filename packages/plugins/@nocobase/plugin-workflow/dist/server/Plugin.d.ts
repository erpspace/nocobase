/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transactionable } from 'sequelize';
import { Plugin } from '@nocobase/server';
import { Registry } from '@nocobase/utils';
import { Logger } from '@nocobase/logger';
import Processor from './Processor';
import { CustomFunction } from './functions';
import Trigger from './triggers';
import { InstructionInterface } from './instructions';
import type { ExecutionModel, WorkflowModel, WorkflowTaskModel } from './types';
type ID = number | string;
export type EventOptions = {
    eventKey?: string;
    context?: any;
    deferred?: boolean;
    manually?: boolean;
    force?: boolean;
    stack?: Array<ID>;
    onTriggerFail?: Function;
    [key: string]: any;
} & Transactionable;
export default class PluginWorkflowServer extends Plugin {
    instructions: Registry<InstructionInterface>;
    triggers: Registry<Trigger>;
    functions: Registry<CustomFunction>;
    enabledCache: Map<number, WorkflowModel>;
    private ready;
    private executing;
    private pending;
    private events;
    private eventsCount;
    private loggerCache;
    private meter;
    private checker;
    private onBeforeSave;
    handleSyncMessage(message: any): Promise<void>;
    /**
     * @experimental
     */
    getLogger(workflowId?: ID): Logger;
    /**
     * @experimental
     * @param {WorkflowModel} workflow
     * @returns {boolean}
     */
    isWorkflowSync(workflow: WorkflowModel): boolean;
    registerTrigger<T extends Trigger>(type: string, trigger: T | {
        new (p: Plugin): T;
    }): void;
    registerInstruction(type: string, instruction: InstructionInterface | {
        new (p: Plugin): InstructionInterface;
    }): void;
    private initTriggers;
    private initInstructions;
    beforeLoad(): Promise<void>;
    /**
     * @internal
     */
    load(): Promise<void>;
    private toggle;
    trigger(workflow: WorkflowModel, context: object, options?: EventOptions): void | Promise<Processor | null>;
    private triggerSync;
    resume(job: any): Promise<void>;
    /**
     * Start a deferred execution
     * @experimental
     */
    start(execution: ExecutionModel): Promise<void>;
    private validateEvent;
    private createExecution;
    private prepare;
    private dispatch;
    createProcessor(execution: ExecutionModel, options?: {}): Processor;
    private process;
    execute(workflow: WorkflowModel, values: any, options?: EventOptions): Promise<void | Processor>;
    /**
     * @experimental
     * @param {string} dataSourceName
     * @param {Transaction} transaction
     * @param {boolean} create
     * @returns {Trasaction}
     */
    useDataSourceTransaction(dataSourceName: string, transaction: any, create?: boolean): any;
    /**
     * @experimental
     */
    toggleTaskStatus(task: WorkflowTaskModel, done: boolean, { transaction }: Transactionable): Promise<void>;
}
export {};
