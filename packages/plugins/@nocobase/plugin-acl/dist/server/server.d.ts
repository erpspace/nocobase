/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transaction } from '@nocobase/database';
import { Plugin } from '@nocobase/server';
import { RoleModel } from './model/RoleModel';
import { RoleResourceActionModel } from './model/RoleResourceActionModel';
import { RoleResourceModel } from './model/RoleResourceModel';
export declare class PluginACLServer extends Plugin {
    get acl(): import("@nocobase/acl").ACL;
    writeResourceToACL(resourceModel: RoleResourceModel, transaction: Transaction): Promise<void>;
    writeActionToACL(actionModel: RoleResourceActionModel, transaction: Transaction): Promise<void>;
    handleSyncMessage(message: any): Promise<void>;
    writeRolesToACL(options: any): Promise<void>;
    writeRoleToACL(role: RoleModel, options?: any): Promise<void>;
    beforeLoad(): Promise<void>;
    install(): Promise<void>;
    load(): Promise<void>;
}
export default PluginACLServer;
