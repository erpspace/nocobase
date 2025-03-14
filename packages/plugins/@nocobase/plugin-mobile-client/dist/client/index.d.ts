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
export declare class PluginMobileClient extends Plugin {
    mobileRouter: RouterManager;
    load(): Promise<void>;
    addSettings(): void;
    setMobileRouter(): void;
    getMobileRouterComponent(): React.FC<{
        BaseLayout?: React.ComponentType;
    }>;
    addRoutes(): void;
}
export default PluginMobileClient;
