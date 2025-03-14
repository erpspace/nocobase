/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React, { FC } from 'react';
interface MobileTitleContextProps {
    title: string;
    setTitle: (title: string) => void;
}
export declare const MobileTitleContext: React.Context<MobileTitleContextProps>;
export interface MobileTitleProviderProps {
    children?: React.ReactNode;
    title?: string;
}
export declare const MobileTitleProvider: FC<MobileTitleProviderProps>;
export declare const useMobileTitle: () => MobileTitleContextProps;
export {};
