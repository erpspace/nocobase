/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SpaceProps } from 'antd';
import React, { CSSProperties } from 'react';
export interface ActionBarProps {
    style?: CSSProperties;
    className?: string;
    spaceProps?: SpaceProps;
}
export interface ActionBarContextValue {
    container?: Element | DocumentFragment;
    /**
     * override props
     */
    forceProps?: ActionBarProps;
    parentComponents?: string[];
}
export declare const ActionBarProvider: React.FC<ActionBarContextValue>;
export declare const useActionBarContext: () => ActionBarContextValue;
export declare const MobileNavigationActionBar: React.FunctionComponent<Omit<{
    children?: React.ReactNode;
}, string | number | symbol> & Omit<any, "ref"> & {
    children?: any;
}>;
