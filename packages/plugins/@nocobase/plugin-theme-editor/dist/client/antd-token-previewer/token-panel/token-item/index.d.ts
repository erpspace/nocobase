/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { ThemeConfig } from 'antd/es/config-provider/context';
import React from 'react';
import type { MutableTheme, TokenValue } from '../../interface';
interface TokenItemProps {
    tokenName: string;
    tokenPath: string[];
    active?: boolean;
    onActiveChange?: (active: boolean) => void;
    onTokenChange?: (theme: MutableTheme, tokenName: string, value: TokenValue) => void;
    themes: MutableTheme[];
    selectedTokens?: string[];
    onTokenSelect?: (token: string) => void;
    enableTokenSelect?: boolean;
    hideUsageCount?: boolean;
    fallback?: (config: ThemeConfig) => Record<string, TokenValue>;
}
export declare const getTokenItemId: (token: string) => string;
declare const _default: ({ tokenName, active, onActiveChange, onTokenChange, tokenPath, selectedTokens, themes, onTokenSelect, enableTokenSelect, hideUsageCount, fallback, }: TokenItemProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default _default;
