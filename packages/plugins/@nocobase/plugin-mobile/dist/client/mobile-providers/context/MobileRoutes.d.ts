/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { APIClient } from '@nocobase/client';
import React, { FC } from 'react';
import type { IResource } from '@nocobase/sdk';
export interface MobileRouteItem {
    id: number;
    schemaUid?: string;
    type: 'page' | 'link' | 'tabs';
    options?: any;
    title?: string;
    icon?: string;
    parentId?: number;
    children?: MobileRouteItem[];
    hideInMenu?: boolean;
    enableTabs?: boolean;
    hidden?: boolean;
}
export declare const MobileRoutesContext: React.Context<MobileRoutesContextValue>;
export interface MobileRoutesContextValue {
    routeList?: MobileRouteItem[];
    refresh: () => Promise<any>;
    resource: IResource;
    schemaResource: IResource;
    activeTabBarItem?: MobileRouteItem;
    activeTabItem?: MobileRouteItem;
    api: APIClient;
}
export declare const useMobileRoutes: () => MobileRoutesContextValue;
export declare const MobileRoutesProvider: FC<{
    /**
     * list: return all route data, and only administrators can access;
     * listAccessible: return the route data that the current user can access;
     *
     * @default 'listAccessible'
     */
    action?: 'list' | 'listAccessible';
    refreshRef?: any;
    manual?: boolean;
}>;
