/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import 'antd-mobile/es/components/tab-bar/tab-bar.css';
import { FC } from 'react';
import { MobileTabBarItem } from './MobileTabBar.Item';
import { MobileTabBarLink, MobileTabBarPage } from './types';
export interface MobileTabBarProps {
    /**
     * @default true
     */
    enableTabBar?: boolean;
}
export declare const MobileTabBar: FC<MobileTabBarProps> & {
    Item: typeof MobileTabBarItem;
    Page: typeof MobileTabBarPage;
    Link: typeof MobileTabBarLink;
};
