/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ACLRole, RoleActionParams } from './acl-role';
import { ACL } from './acl';
export type ResourceActions = {
    [key: string]: RoleActionParams;
};
interface AclResourceOptions {
    name: string;
    role: ACLRole;
    actions?: ResourceActions;
}
export declare class ACLResource {
    actions: Map<string, RoleActionParams>;
    acl: ACL;
    role: ACLRole;
    name: string;
    constructor(options: AclResourceOptions);
    getActions(): {};
    getAction(name: string): RoleActionParams;
    setAction(name: string, params: RoleActionParams): void;
    setActions(actions: ResourceActions): void;
    removeAction(name: string): void;
}
export {};
