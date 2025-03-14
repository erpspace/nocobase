/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Plugin from '../Plugin';
export declare class Provider {
    protected plugin: Plugin;
    protected options: any;
    constructor(plugin: Plugin, options: any);
    send(receiver: string, data: {
        [key: string]: any;
    }): Promise<any>;
}
