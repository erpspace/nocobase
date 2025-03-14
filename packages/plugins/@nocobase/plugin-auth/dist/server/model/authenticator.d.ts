/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Authenticator } from '@nocobase/auth';
import { Model } from '@nocobase/database';
export declare class AuthModel extends Model implements Authenticator {
    authType: string;
    options: any;
    findUser(uuid: string): Promise<Model<any, any>>;
    newUser(uuid: string, userValues?: any): Promise<Model<any, any>>;
    findOrCreateUser(uuid: string, userValues?: any): Promise<Model<any, any>>;
}
