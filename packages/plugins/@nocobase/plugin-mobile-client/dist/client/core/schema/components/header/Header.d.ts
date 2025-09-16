/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { NavBarProps } from 'antd-mobile';
import React from 'react';
import { HeaderDesigner } from './Header.Designer';
export interface HeaderProps extends NavBarProps {
    title?: string;
    showBack?: boolean;
}
export declare const MHeader: ((props: HeaderProps) => React.JSX.Element) & {
    Designer: typeof HeaderDesigner;
};
