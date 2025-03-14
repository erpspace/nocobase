/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { ACLSettingsUI } from './ACLSettingsUI';
import { RolesManager } from './roles-manager';
export declare class PluginACLClient extends Plugin {
    rolesManager: RolesManager;
    settingsUI: ACLSettingsUI;
    load(): Promise<void>;
}
export { RolesManagerContext } from './RolesManagerProvider';
export default PluginACLClient;
