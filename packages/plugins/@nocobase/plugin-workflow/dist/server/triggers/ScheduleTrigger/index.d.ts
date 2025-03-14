/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Trigger from '..';
import type Plugin from '../../Plugin';
export default class ScheduleTrigger extends Trigger {
    sync: boolean;
    private modes;
    constructor(workflow: Plugin);
    private getTrigger;
    on(workflow: any): void;
    off(workflow: any): void;
    execute(workflow: any, values: any, options: any): Promise<any>;
    validateContext(values: any): any;
}
