/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { TabBarItemProps } from 'antd-mobile';
import React from 'react';
export declare const Designer: () => React.JSX.Element;
export declare const TabBarItem: React.FC<TabBarItemProps> & {
    Designer: typeof Designer;
};
