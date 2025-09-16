/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AppMigrator, AppMigratorOptions } from './app-migrator';
import { Application } from '@nocobase/server';
import { DumpRulesGroupType } from '@nocobase/database';
type RestoreOptions = {
    groups: Set<DumpRulesGroupType>;
};
export declare class Restorer extends AppMigrator {
    direction: "restore";
    backUpFilePath: string;
    decompressed: boolean;
    importedCollections: string[];
    constructor(app: Application, options: AppMigratorOptions & {
        backUpFilePath?: string;
    });
    static sortCollectionsByInherits(collections: Array<{
        name: string;
        inherits: string[];
    }>): any;
    setBackUpFilePath(backUpFilePath: string): void;
    parseBackupFile(): Promise<any>;
    restore(options: RestoreOptions): Promise<void>;
    getImportMeta(): Promise<any>;
    checkMeta(): Promise<void>;
    importCollections(options: RestoreOptions): Promise<void>;
    decompressBackup(backupFilePath: string): Promise<void>;
    readCollectionMeta(collectionName: string): Promise<any>;
    importCollection(options: {
        name: string;
        insert?: boolean;
        clear?: boolean;
        rowCondition?: (row: any) => boolean;
    }): Promise<any>;
    importDb(options: RestoreOptions): Promise<void>;
}
export {};
