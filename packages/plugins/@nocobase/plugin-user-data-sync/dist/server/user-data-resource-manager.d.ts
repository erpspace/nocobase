/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Toposort, ToposortOptions } from '@nocobase/utils';
import Database, { Repository } from '@nocobase/database';
import { SystemLogger } from '@nocobase/logger';
export type FormatUser = {
    uid: string;
    username?: string;
    email?: string;
    nickname?: string;
    phone?: string;
    departments?: (string | FormatUserDepartment)[];
    isDeleted?: boolean;
    [key: string]: any;
};
export type FormatDepartment = {
    uid: string;
    title?: string;
    parentUid?: string;
    isDeleted?: boolean;
    [key: string]: any;
};
export type FormatUserDepartment = {
    uid: string;
    isOwner?: boolean;
    isMain?: boolean;
};
export type UserDataRecord = FormatUser | FormatDepartment;
export type SyncDataType = 'user' | 'department';
export type SyncAccept = SyncDataType;
export type OriginRecord = {
    id: number;
    sourceName: string;
    sourceUk: string;
    dataType: SyncDataType;
    metaData: UserDataRecord;
    resources: {
        resource: string;
        resourcePk: string;
    }[];
};
export type UserData = {
    dataType: SyncDataType;
    matchKey?: string;
    records: UserDataRecord[];
    sourceName: string;
};
export type PrimaryKey = number | string;
export type RecordResourceChanged = {
    resourcesPk: PrimaryKey;
    isDeleted: boolean;
};
export declare abstract class UserDataResource {
    name: string;
    accepts: SyncAccept[];
    db: Database;
    logger: SystemLogger;
    constructor(db: Database, logger: SystemLogger);
    abstract update(record: OriginRecord, resourcePks: PrimaryKey[], matchKey?: string): Promise<RecordResourceChanged[]>;
    abstract create(record: OriginRecord, matchKey: string): Promise<RecordResourceChanged[]>;
    get syncRecordRepo(): Repository<any, any>;
    get syncRecordResourceRepo(): Repository<any, any>;
}
export type SyncResult = {
    resource: string;
    detail: {
        count: {
            all: number;
            success: number;
            failed: number;
        };
        failedRecords: {
            record: UserDataRecord;
            message: string;
        }[];
    };
};
export declare class UserDataResourceManager {
    resources: Toposort<UserDataResource>;
    syncRecordRepo: Repository;
    syncRecordResourceRepo: Repository;
    logger: SystemLogger;
    registerResource(resource: UserDataResource, options?: ToposortOptions): void;
    set db(value: Database);
    saveOriginRecords(data: UserData): Promise<void>;
    findOriginRecords({ sourceName, dataType, sourceUks }: {
        sourceName: any;
        dataType: any;
        sourceUks: any;
    }): Promise<OriginRecord[]>;
    addResourceToOriginRecord({ recordId, resource, resourcePk }: {
        recordId: any;
        resource: any;
        resourcePk: any;
    }): Promise<void>;
    removeResourceFromOriginRecord({ recordId, resource, resourcePk }: {
        recordId: any;
        resource: any;
        resourcePk: any;
    }): Promise<void>;
    updateOrCreate(data: UserData): Promise<SyncResult[]>;
}
