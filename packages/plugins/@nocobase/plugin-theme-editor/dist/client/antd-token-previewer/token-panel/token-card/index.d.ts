/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { ReactNode } from 'react';
import React from 'react';
import type { MutableTheme, TokenValue } from '../../interface';
import type { TokenType } from '../../utils/classifyToken';
interface TokenCardProps {
    title: string;
    icon?: ReactNode;
    tokenArr: string[];
    tokenPath: string[];
    keyword?: string;
    hideUseless?: boolean;
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    activeToken?: string;
    onActiveTokenChange?: (token: string | undefined) => void;
    onTokenChange?: (theme: MutableTheme, tokenName: string, value: TokenValue) => void;
    themes: MutableTheme[];
    selectedTokens?: string[];
    onTokenSelect?: (token: string) => void;
    enableTokenSelect?: boolean;
    hideUsageCount?: boolean;
    placeholder?: ReactNode;
    fallback?: (config: ThemeConfig) => Record<string, TokenValue>;
}
export declare const IconMap: Record<TokenType, ReactNode>;
export declare const TextMap: Record<TokenType, string>;
declare const _default: ({ title, icon, tokenArr, keyword, hideUseless, defaultOpen, open: customOpen, onOpenChange, activeToken, onActiveTokenChange, onTokenChange, tokenPath, selectedTokens, themes, onTokenSelect, enableTokenSelect, hideUsageCount, fallback, placeholder, }: TokenCardProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
export default _default;
