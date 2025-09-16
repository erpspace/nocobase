/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { AsyncTasksManager, CreateTaskOptions, TaskId, TaskStatus } from './interfaces/async-task-manager';
import { Logger } from '@nocobase/logger';
import { ITask, TaskConstructor } from './interfaces/task';
import { Application } from '@nocobase/server';
export declare class BaseTaskManager extends EventEmitter implements AsyncTasksManager {
    private taskTypes;
    private tasks;
    private readonly cleanupDelay;
    private logger;
    private app;
    queue: any;
    private queueOptions;
    setLogger(logger: Logger): void;
    setApp(app: Application): void;
    private scheduleCleanup;
    constructor();
    private enqueueTask;
    pauseQueue(): void;
    resumeQueue(): void;
    cancelTask(taskId: TaskId): Promise<boolean>;
    createTask<T>(options: CreateTaskOptions): ITask;
    getTask(taskId: TaskId): ITask | undefined;
    getTaskStatus(taskId: TaskId): Promise<TaskStatus>;
    registerTaskType(taskType: TaskConstructor): void;
    getTasksByTag(tagKey: string, tagValue: string): Promise<ITask[]>;
}
