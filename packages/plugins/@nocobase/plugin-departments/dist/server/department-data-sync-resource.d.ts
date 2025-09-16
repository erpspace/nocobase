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
import { FormatDepartment, FormatUserDepartment, OriginRecord, PrimaryKey, RecordResourceChanged, SyncAccept, UserDataResource } from '@nocobase/plugin-user-data-sync';
export declare class DepartmentDataSyncResource extends UserDataResource {
    name: string;
    accepts: SyncAccept[];
    get userRepo(): import("@nocobase/database").Repository<any, any>;
    get deptRepo(): import("@nocobase/database").Repository<any, any>;
    get deptUserRepo(): import("@nocobase/database").Repository<any, any>;
    getFlteredSourceDepartment(sourceDepartment: FormatDepartment): lodash.Omit<FormatDepartment, string>;
    update(record: OriginRecord, resourcePks: PrimaryKey[]): Promise<RecordResourceChanged[]>;
    create(record: OriginRecord): Promise<RecordResourceChanged[]>;
    getDepartmentIdsBySourceUks(sourceUks: PrimaryKey[], sourceName: string): Promise<any>;
    getDepartmentIdBySourceUk(sourceUk: PrimaryKey, sourceName: string): Promise<any>;
    updateUserDepartments(user: any, currentDepartmentIds: PrimaryKey[], sourceDepartments: (PrimaryKey | FormatUserDepartment)[], sourceName: string): Promise<RecordResourceChanged[]>;
    updateDepartment(department: Model, sourceDepartment: FormatDepartment, sourceName: string): Promise<void>;
    createDepartment(sourceDepartment: FormatDepartment, sourceName: string): Promise<string>;
    updateParentDepartment(department: Model, parentUid: string, sourceName: string): Promise<void>;
}
