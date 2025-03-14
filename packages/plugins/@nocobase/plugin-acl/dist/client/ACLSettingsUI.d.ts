/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { TabsProps } from 'antd/es/tabs/index';
import React from 'react';
import { TFunction } from 'react-i18next';
import { Role } from './RolesManagerProvider';
interface PermissionsTabsProps {
    /**
     * the key of the currently active tab panel
     */
    activeKey: string;
    /**
     * the currently selected role
     */
    activeRole: null | Role;
    /**
     * the current user's role
     */
    currentUserRole: null | Role;
    /**
     * translation function
     */
    t: TFunction;
    /**
     * used to constrain the size of the container in the Tab
     */
    TabLayout: React.FC;
}
type Tab = TabsProps['items'][0] & {
    /**
     * Used for sorting tabs - lower numbers appear first
     * Default values: System (10), Desktop routes (20)
     * @default 100
     */
    sort?: number;
};
type TabCallback = (props: PermissionsTabsProps) => Tab;
/**
 * the extension API for ACL settings page
 */
export declare class ACLSettingsUI {
    private permissionsTabs;
    addPermissionsTab(tab: Tab | TabCallback): void;
    getPermissionsTabs(props: PermissionsTabsProps): Tab[];
}
export {};
