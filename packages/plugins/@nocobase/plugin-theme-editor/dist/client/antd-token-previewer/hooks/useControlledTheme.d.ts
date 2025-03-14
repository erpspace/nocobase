/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { DerivativeFunc } from '@ant-design/cssinjs';
import type { MutableTheme, Theme } from '../interface';
export type ThemeCode = 'default' | 'dark' | 'compact';
export declare const themeMap: Record<ThemeCode, DerivativeFunc<any, any>>;
export type SetThemeState = (theme: Theme, modifiedPath: string[], updated?: boolean) => void;
export type UseControlledTheme = (options: {
    theme?: Theme;
    defaultTheme: Theme;
    onChange?: (theme: Theme) => void;
    darkAlgorithm?: DerivativeFunc<any, any>;
}) => {
    theme: MutableTheme;
    infoFollowPrimary: boolean;
    onInfoFollowPrimaryChange: (value: boolean) => void;
    updateRef: () => void;
};
declare const useControlledTheme: UseControlledTheme;
export default useControlledTheme;
