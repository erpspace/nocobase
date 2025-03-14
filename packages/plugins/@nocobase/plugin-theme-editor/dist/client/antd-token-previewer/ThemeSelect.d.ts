/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { FC, ReactNode } from 'react';
import type { Theme } from './interface';
interface ThemeItem extends Theme {
    icon?: ReactNode;
    closable?: boolean;
    fixed?: boolean;
}
export type ThemeSelectProps = {
    onEnabledThemeChange: (themes: string[]) => void;
    onShownThemeChange: (themes: string[], selectTheme: string, info: {
        type: 'select' | 'deselect';
    }) => void;
    enabledThemes: string[];
    shownThemes: string[];
    themes: ThemeItem[];
    showAddTheme?: boolean;
};
declare const ThemeSelect: FC<ThemeSelectProps>;
export default ThemeSelect;
