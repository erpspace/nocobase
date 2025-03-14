/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection } from '@nocobase/database';
import WorkflowPlugin, { EventOptions, Trigger, WorkflowModel } from '@nocobase/plugin-workflow';
export default class extends Trigger {
    static TYPE: string;
    constructor(workflow: WorkflowPlugin);
    getTargetCollection(collection: Collection, association: string): Collection<any, any>;
    private collectionTriggerAction;
    execute(workflow: WorkflowModel, values: any, options: EventOptions): Promise<void | import("@nocobase/plugin-workflow").Processor>;
    validateContext(values: any): {
        data: string;
        userId?: undefined;
    } | {
        userId: string;
        data?: undefined;
    };
}
