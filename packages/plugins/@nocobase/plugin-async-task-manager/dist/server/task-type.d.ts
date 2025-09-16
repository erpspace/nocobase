/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import EventEmitter from 'events';
import { Logger } from '@nocobase/logger';
import { TaskOptions, TaskStatus } from './interfaces/async-task-manager';
import { ITask } from './interfaces/task';
import Application from '@nocobase/server';
export declare abstract class TaskType extends EventEmitter implements ITask {
    protected options: TaskOptions;
    static type: string;
    static cancelable: boolean;
    status: TaskStatus;
    protected logger: Logger;
    protected app: Application;
    progress: {
        total: number;
        current: number;
    };
    startedAt: Date;
    fulfilledAt: Date;
    taskId: string;
    tags: Record<string, string>;
    createdAt: Date;
    context?: any;
    title: any;
    protected abortController: AbortController;
    private _isCancelled;
    get isCancelled(): boolean;
    constructor(options: TaskOptions, tags?: Record<string, string>);
    setLogger(logger: Logger): void;
    setApp(app: Application): void;
    setContext(context: any): void;
    /**
     * Cancel the task
     */
    cancel(): Promise<boolean>;
    statusChange(status: TaskStatus): Promise<void>;
    /**
     * Execute the task implementation
     * @returns Promise that resolves with the task result
     */
    abstract execute(): Promise<any>;
    /**
     * Report task progress
     * @param progress Progress information containing total and current values
     */
    reportProgress(progress: {
        total: number;
        current: number;
    }): void;
    /**
     * Run the task
     * This method handles task lifecycle, including:
     * - Status management
     * - Error handling
     * - Progress tracking
     * - Event emission
     */
    run(): Promise<void>;
    private renderErrorMessage;
    toJSON(options?: {
        raw?: boolean;
    }): {
        cancelable: boolean;
        taskId: string;
        status: {
            type: "pending";
            indicator?: "spinner";
        } | {
            type: "success";
            indicator?: "success";
            resultType?: "file" | "data";
            payload?: any;
        } | {
            type: "running";
            indicator: "progress";
        } | {
            type: "failed";
            indicator?: "error";
            errors: {
                message: string;
                code?: number;
            }[];
        } | {
            type: "cancelled";
        };
        progress: {
            total: number;
            current: number;
        };
        tags: Record<string, string>;
        createdAt: Date;
        startedAt: Date;
        fulfilledAt: Date;
        title: any;
    };
}
