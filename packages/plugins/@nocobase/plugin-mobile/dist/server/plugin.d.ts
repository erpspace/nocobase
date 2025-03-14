/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
export declare class PluginMobileServer extends Plugin {
    load(): Promise<void>;
    setACL(): void;
    /**
     * used to implement: roles with permission (allowNewMobileMenu is true) can directly access the newly created menu
     */
    bindNewMenuToRoles(): void;
    registerActionHandlers(): void;
    registerLocalizationSource(): void;
}
export default PluginMobileServer;
