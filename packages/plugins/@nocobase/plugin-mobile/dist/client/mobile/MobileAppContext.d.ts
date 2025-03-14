/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React, { FC } from 'react';
interface MobileAppContextProps {
    showTabBar?: boolean;
    setShowTabBar?: (showTabBar: boolean) => void;
    showBackButton?: boolean;
    setShowBackButton?: (showBackButton: boolean) => void;
}
export declare const MobileAppContext: React.Context<MobileAppContextProps>;
export interface MobileAppProviderProps {
    children?: React.ReactNode;
}
export declare const MobileAppProvider: FC<MobileAppProviderProps>;
export declare const useMobileApp: () => MobileAppContextProps;
export {};
