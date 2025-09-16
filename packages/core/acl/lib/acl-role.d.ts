/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ACL, DefineOptions } from './acl';
import { ACLAvailableStrategy, AvailableStrategyOptions } from './acl-available-strategy';
import { ACLResource } from './acl-resource';
export interface RoleActionParams {
    fields?: string[];
    filter?: any;
    own?: boolean;
    whitelist?: string[];
    blacklist?: string[];
    [key: string]: any;
}
export interface ResourceActionsOptions {
    [actionName: string]: RoleActionParams;
}
/**
 * @internal
 */
export declare class ACLRole {
    acl: ACL;
    name: string;
    strategy: string | AvailableStrategyOptions;
    resources: Map<string, ACLResource>;
    snippets: Set<string>;
    _snippetCache: {
        params: any;
        result: any;
    };
    constructor(acl: ACL, name: string);
    _serializeSet(set: Set<string>): string;
    getResource(name: string): ACLResource | undefined;
    setStrategy(value: string | AvailableStrategyOptions): void;
    getStrategy(): ACLAvailableStrategy;
    getResourceActionsParams(resourceName: string): {};
    revokeResource(resourceName: string): void;
    grantAction(path: string, options?: RoleActionParams): void;
    getActionParams(path: string): RoleActionParams;
    revokeAction(path: string): void;
    effectiveSnippets(): {
        allowed: Array<string>;
        rejected: Array<string>;
    };
    snippetAllowed(actionPath: string): boolean;
    toJSON(): DefineOptions;
    protected getResourceActionFromPath(path: string): {
        resourceName: string;
        actionName: string;
        resource: ACLResource;
        action: any;
    };
}
