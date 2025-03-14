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
    setLogger(logger: Logger): void;
    setApp(app: Application): void;
    private scheduleCleanup;
    constructor();
    cancelTask(taskId: TaskId): Promise<boolean>;
    createTask<T>(options: CreateTaskOptions): ITask;
    getTask(taskId: TaskId): ITask | undefined;
    getTaskStatus(taskId: TaskId): Promise<TaskStatus>;
    registerTaskType(taskType: TaskConstructor): void;
    getTasksByTag(tagKey: string, tagValue: string): Promise<ITask[]>;
}
