/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transactionable } from '@nocobase/database';
import type Plugin from '../../Plugin';
import type { WorkflowModel } from '../../types';
export type ScheduleOnField = {
    field: string;
    offset?: number;
    unit?: 1000 | 60000 | 3600000 | 86400000;
};
export interface ScheduleTriggerConfig {
    mode: number;
    repeat?: string | number | null;
    limit?: number;
    startsOn?: ScheduleOnField;
    endsOn?: string | ScheduleOnField;
}
export default class DateFieldScheduleTrigger {
    workflow: Plugin;
    events: Map<any, any>;
    private timer;
    private cache;
    cacheCycle: number;
    constructor(workflow: Plugin);
    reload(): Promise<void>;
    inspect(workflows: WorkflowModel[]): void;
    loadRecordsToSchedule({ id, config: { collection, limit, startsOn, repeat, endsOn }, allExecuted }: WorkflowModel, currentDate: Date): Promise<import("@nocobase/database").Model<any, any>[]>;
    getRecordNextTime(workflow: WorkflowModel, record: any, nextSecond?: boolean): any;
    schedule(workflow: WorkflowModel, record: any, nextTime: any, toggle?: boolean, options?: {}): Promise<void>;
    trigger(workflow: WorkflowModel, record: any, nextTime: any, { transaction }?: Transactionable): Promise<void>;
    on(workflow: WorkflowModel): void;
    off(workflow: WorkflowModel): void;
    execute(workflow: any, values: any, options: any): Promise<void | import("../..").Processor>;
    validateContext(values: any): {
        data: string;
    };
}
