/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
export declare class PresetNocoBase extends Plugin {
    splitNames(name: string): string[];
    getBuiltInPlugins(): Promise<any[]>;
    getLocalPlugins(): Promise<any[]>;
    findLocalPlugins(): Promise<any[]>;
    getAllPluginNames(): Promise<any[]>;
    getAllPluginNamesAndDB(): Promise<any[]>;
    getAllPlugins(locale?: string): Promise<any[]>;
    getPluginInfo(name: any, locale?: string): Promise<{
        isCompatible: boolean;
        depsCompatible: import("@nocobase/server/lib/plugin-manager/utils").DepCompatible[];
        packageName: any;
        name: any;
        version: any;
        enabled: boolean;
        installed: boolean;
        builtIn: boolean;
        keywords: any;
        author: any;
        homepage: any;
        packageJson: any;
        removable: boolean;
        displayName: any;
        description: any;
    }>;
    getPackageJson(name: any): Promise<any>;
    allPlugins(): Promise<any[]>;
    getPluginToBeUpgraded(): Promise<any[]>;
    updateOrCreatePlugins(): Promise<void>;
    createIfNotExists(): Promise<void>;
    install(): Promise<void>;
    upgrade(): Promise<void>;
}
export default PresetNocoBase;
