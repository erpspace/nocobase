/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ACL } from './acl';
export type ConditionFunc = (ctx: any) => Promise<boolean> | boolean;
export declare class AllowManager {
    acl: ACL;
    protected skipActions: Map<string, Map<string, string | true | ConditionFunc>>;
    protected registeredCondition: Map<string, ConditionFunc>;
    constructor(acl: ACL);
    allow(resourceName: string, actionName: string, condition?: string | ConditionFunc): void;
    getAllowedConditions(resourceName: string, actionName: string): Array<ConditionFunc | true>;
    registerAllowCondition(name: string, condition: ConditionFunc): void;
    isAllowed(resourceName: string, actionName: string, ctx: any): Promise<boolean>;
    aclMiddleware(): (ctx: any, next: any) => Promise<void>;
}
