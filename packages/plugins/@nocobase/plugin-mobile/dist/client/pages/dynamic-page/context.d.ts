/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React, { FC } from 'react';
export interface MobilePageContextProps {
    /**
     * @default true
     */
    displayPageHeader?: boolean;
    /**
     * @default true
     */
    displayNavigationBar?: boolean;
    /**
     * @default true
     */
    displayPageTitle?: boolean;
    /**
     * @default false
     */
    displayTabs?: boolean;
}
export declare const MobilePageContext: React.Context<MobilePageContextProps>;
export interface MobilePageProviderProps extends MobilePageContextProps {
    children?: React.ReactNode;
}
export declare const MobilePageProvider: FC<MobilePageProviderProps>;
export declare const useMobilePage: () => MobilePageContextProps;
