/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ThemeItem } from '../types';
/** antd 默认主题 */
export declare const defaultTheme: Omit<ThemeItem, 'id'>;
export declare const dark: Omit<ThemeItem, 'id'>;
export declare const compact: Omit<ThemeItem, 'id'>;
/** 同时包含 `紧凑` 和 `暗黑` 两种模式 */
export declare const compactDark: Omit<ThemeItem, 'id'>;
