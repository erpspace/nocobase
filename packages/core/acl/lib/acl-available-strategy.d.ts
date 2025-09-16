/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ACL } from './acl';
export interface AvailableStrategyOptions {
    displayName?: string;
    actions?: false | string | string[];
    allowConfigure?: boolean;
    /**
     * @internal
     */
    resource?: '*';
}
export declare const predicate: {
    own: {
        filter: {
            createdById: string;
        };
    };
    all: {};
};
export declare class ACLAvailableStrategy {
    acl: ACL;
    options: AvailableStrategyOptions;
    actionsAsObject: {
        [key: string]: string;
    };
    allowConfigure: boolean;
    constructor(acl: ACL, options: AvailableStrategyOptions);
    matchAction(actionName: string): any;
    allow(resourceName: string, actionName: string): any;
}
