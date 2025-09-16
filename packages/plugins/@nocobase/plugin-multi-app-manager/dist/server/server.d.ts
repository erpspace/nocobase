/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { IDatabaseOptions, Transactionable } from '@nocobase/database';
import Application, { Plugin } from '@nocobase/server';
import { ApplicationModel } from '../server';
export type AppDbCreator = (app: Application, options?: Transactionable & {
    context?: any;
    applicationModel?: ApplicationModel;
}) => Promise<void>;
export type AppOptionsFactory = (appName: string, mainApp: Application) => any;
export type SubAppUpgradeHandler = (mainApp: Application) => Promise<void>;
export declare class PluginMultiAppManagerServer extends Plugin {
    appDbCreator: AppDbCreator;
    appOptionsFactory: AppOptionsFactory;
    subAppUpgradeHandler: SubAppUpgradeHandler;
    static getDatabaseConfig(app: Application): IDatabaseOptions;
    handleSyncMessage(message: any): Promise<void>;
    setSubAppUpgradeHandler(handler: SubAppUpgradeHandler): void;
    setAppOptionsFactory(factory: AppOptionsFactory): void;
    setAppDbCreator(appDbCreator: AppDbCreator): void;
    beforeLoad(): void;
    beforeEnable(): Promise<void>;
    load(): Promise<void>;
}
