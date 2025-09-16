/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { DerivativeFunc } from '@ant-design/cssinjs';
import React from 'react';
import type { Theme } from './interface';
export type ThemeEditorRef = {
    updateRef: () => void;
};
export type ThemeEditorProps = {
    /**
     * @deprecated
     * @default true
     */
    simple?: boolean;
    theme?: Theme;
    onThemeChange?: (theme: Theme) => void;
    className?: string;
    style?: React.CSSProperties;
    darkAlgorithm?: DerivativeFunc<any, any>;
    locale?: any;
};
declare const ThemeEditor: React.ForwardRefExoticComponent<ThemeEditorProps & React.RefAttributes<ThemeEditorRef>>;
export default ThemeEditor;
