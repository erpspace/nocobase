/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { Application } from '@nocobase/server';
import EventEmitter from 'events';
export type AppMigratorOptions = {
    workDir?: string;
};
declare abstract class AppMigrator extends EventEmitter {
    readonly workDir: string;
    app: Application;
    abstract direction: 'restore' | 'dump';
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
    constructor(app: Application, options?: AppMigratorOptions);
    tmpDir(): string;
    rmDir(dir: string): Promise<void>;
    clearWorkDir(): Promise<void>;
}
export { AppMigrator };
