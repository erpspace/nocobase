/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transaction, Transactionable } from '@nocobase/database';
import { Logger } from '@nocobase/logger';
import type Plugin from './Plugin';
import type { ExecutionModel, FlowNodeModel, JobModel } from './types';
export interface ProcessorOptions extends Transactionable {
    plugin: Plugin;
    [key: string]: any;
}
export default class Processor {
    execution: ExecutionModel;
    options: ProcessorOptions;
    static StatusMap: {
        0: 0;
        1: 1;
        [-1]: -1;
        [-2]: -2;
        [-3]: -3;
        [-4]: -4;
        [-5]: -5;
        [-6]: -6;
    };
    logger: Logger;
    /**
     * @experimental
     */
    transaction: Transaction;
    /**
     * @experimental
     */
    mainTransaction: Transaction;
    /**
     * @experimental
     */
    nodes: FlowNodeModel[];
    /**
     * @experimental
     */
    nodesMap: Map<number, FlowNodeModel>;
    /**
     * @experimental
     */
    jobsMap: Map<number, JobModel>;
    /**
     * @experimental
     */
    jobsMapByNodeKey: {
        [key: string]: any;
    };
    /**
     * @experimental
     */
    lastSavedJob: JobModel | null;
    constructor(execution: ExecutionModel, options: ProcessorOptions);
    private makeNodes;
    private makeJobs;
    prepare(): Promise<void>;
    start(): Promise<void>;
    resume(job: JobModel): Promise<void>;
    private exec;
    run(node: any, input?: any): any;
    end(node: any, job: JobModel): Promise<any>;
    private recall;
    exit(s?: number): Promise<any>;
    /**
     * @experimental
     */
    saveJob(payload: JobModel | Record<string, any>): Promise<JobModel>;
    /**
     * @experimental
     */
    getBranches(node: FlowNodeModel): FlowNodeModel[];
    /**
     * @experimental
     * find the first node in current branch
     */
    findBranchStartNode(node: FlowNodeModel, parent?: FlowNodeModel): FlowNodeModel | null;
    /**
     * @experimental
     * find the node start current branch
     */
    findBranchParentNode(node: FlowNodeModel): FlowNodeModel | null;
    /**
     * @experimental
     */
    findBranchEndNode(node: FlowNodeModel): FlowNodeModel | null;
    /**
     * @experimental
     */
    findBranchParentJob(job: JobModel, node: FlowNodeModel): JobModel | null;
    /**
     * @experimental
     */
    findBranchLastJob(node: FlowNodeModel, job: JobModel): JobModel | null;
    /**
     * @experimental
     */
    getScope(sourceNodeId: number, includeSelfScope?: boolean): {
        $context: any;
        $jobsMapByNodeKey: {
            [key: string]: any;
        };
        $system: {};
        $scopes: {};
        $env: {};
    };
    /**
     * @experimental
     */
    getParsedValue(value: any, sourceNodeId: number, { additionalScope, includeSelfScope }?: {
        additionalScope?: {};
        includeSelfScope?: boolean;
    }): any;
}
