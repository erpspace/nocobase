/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { DumpRulesGroupType } from '@nocobase/database';
import { AppMigrator } from './app-migrator';
type DumpOptions = {
    groups: Set<DumpRulesGroupType>;
    fileName?: string;
};
type BackUpStatusOk = {
    name: string;
    createdAt: Date;
    fileSize: string;
    status: 'ok';
};
type BackUpStatusDoing = {
    name: string;
    inProgress: true;
    status: 'in_progress';
};
export declare class Dumper extends AppMigrator {
    static dumpTasks: Map<string, Promise<any>>;
    direction: "dump";
    sqlContent: {
        [key: string]: {
            sql: string | string[];
            group: DumpRulesGroupType;
        };
    };
    static getTaskPromise(taskId: string): Promise<any> | undefined;
    static getFileStatus(filePath: string): Promise<BackUpStatusOk | BackUpStatusDoing>;
    static generateFileName(): string;
    writeSQLContent(key: string, data: {
        sql: string | string[];
        group: DumpRulesGroupType;
    }): void;
    getSQLContent(key: string): {
        sql: string | string[];
        group: string;
    };
    getCollectionsByDataTypes(groups: Set<DumpRulesGroupType>): Promise<string[]>;
    dumpableCollections(): Promise<any[]>;
    collectionsGroupByDataTypes(): Promise<{
        [k: string]: any[];
    }>;
    backUpStorageDir(): string;
    allBackUpFilePaths(options?: {
        includeInProgress?: boolean;
        dir?: string;
    }): Promise<string[]>;
    backUpFilePath(fileName: string): string;
    lockFilePath(fileName: string): string;
    writeLockFile(fileName: string): Promise<void>;
    cleanLockFile(fileName: string): Promise<void>;
    runDumpTask(options: Omit<DumpOptions, 'fileName'>): Promise<string>;
    dumpableCollectionsGroupByGroup(): Promise<{
        [x: string]: Pick<any, string>[];
    }>;
    dump(options: DumpOptions): Promise<{
        filePath: string;
        dirname: string;
    }>;
    dumpDb(options: DumpOptions): Promise<void>;
    hasSqlContent(): boolean;
    dumpMeta(additionalMeta?: object): Promise<void>;
    dumpCollection(options: {
        name: string;
    }): Promise<void>;
    packDumpedDir(fileName: string): Promise<{
        filePath: string;
        dirname: string;
    }>;
}
export {};
