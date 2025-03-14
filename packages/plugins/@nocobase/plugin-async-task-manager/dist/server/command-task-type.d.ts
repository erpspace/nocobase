/// <reference types="node" />
import { Worker } from 'worker_threads';
import { TaskType } from './task-type';
export declare class CommandTaskType extends TaskType {
    static type: string;
    workerThread: Worker;
    execute(): Promise<unknown>;
}
