/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const useThemeId: () => {
    currentThemeId?: number;
    defaultThemeId?: number;
};
/**
 * 用于在页面加载时初始化主题
 */
declare const InitializeTheme: React.FC;
export default InitializeTheme;
