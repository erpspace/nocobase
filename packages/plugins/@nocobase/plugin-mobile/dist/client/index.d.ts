/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin, RouterManager } from '@nocobase/client';
import React from 'react';
import './js-bridge';
export * from './desktop-mode';
export * from './mobile';
export * from './mobile-layout';
export * from './mobile-providers';
export * from './pages';
export declare class PluginMobileClient extends Plugin {
    mobileRouter?: RouterManager;
    mobilePath: string;
    get desktopMode(): any;
    get mobileBasename(): string;
    updateOptions(value: {
        showTabBar?: boolean;
        showBackButton?: boolean;
    }): Promise<import("axios").AxiosResponse<any, any>>;
    getPluginOptions(): any;
    afterAdd(): Promise<void>;
    load(): Promise<void>;
    addScopes(): void;
    addInitializers(): void;
    addSettings(): void;
    addComponents(): void;
    setMobileRouter(): void;
    addRoutes(): void;
    addAppRoutes(): void;
    getRouterComponent(): React.FC<{
        BaseLayout?: React.ComponentType;
    }>;
    addPermissionsSettingsUI(): void;
}
export default PluginMobileClient;
