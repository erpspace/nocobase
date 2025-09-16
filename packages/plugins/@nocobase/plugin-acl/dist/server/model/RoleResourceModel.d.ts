/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ACL, ACLRole } from '@nocobase/acl';
import { Model } from '@nocobase/database';
export declare class RoleResourceModel extends Model {
    revoke(options: {
        role: ACLRole;
        resourceName: string;
    }): Promise<void>;
    writeToACL(options: {
        acl: ACL;
        transaction?: any;
    }): Promise<void>;
}
