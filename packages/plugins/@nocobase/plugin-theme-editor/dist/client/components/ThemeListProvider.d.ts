/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ReturnTypeOfUseRequest } from '@nocobase/client';
import React from 'react';
import { ThemeItem } from '../../types';
interface TData extends Pick<ReturnTypeOfUseRequest, 'data' | 'error' | 'run' | 'refresh' | 'loading'> {
    data?: ThemeItem[];
}
export declare const useThemeListContext: () => TData;
export declare const ThemeListProvider: {
    ({ children }: {
        children: any;
    }): React.JSX.Element;
    displayName: string;
};
export {};
