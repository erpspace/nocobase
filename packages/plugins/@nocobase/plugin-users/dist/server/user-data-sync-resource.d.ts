/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model } from '@nocobase/database';
import lodash from 'lodash';
import { FormatUser, OriginRecord, PrimaryKey, RecordResourceChanged, SyncAccept, UserDataResource } from '@nocobase/plugin-user-data-sync';
export declare class UserDataSyncResource extends UserDataResource {
    name: string;
    accepts: SyncAccept[];
    get userRepo(): import("@nocobase/database").Repository<any, any>;
    getFlteredSourceUser(sourceUser: FormatUser): lodash.Omit<FormatUser, string>;
    updateUser(user: Model, sourceUser: FormatUser): Promise<void>;
    update(record: OriginRecord, resourcePks: PrimaryKey[], matchKey: string): Promise<RecordResourceChanged[]>;
    create(record: OriginRecord, matchKey: string): Promise<RecordResourceChanged[]>;
}
