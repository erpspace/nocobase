/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import type { MutableTheme } from '../interface';
import type { TokenType } from '../utils/classifyToken';
export interface TokenPreviewProps {
    themes: MutableTheme[];
    selectedTokens?: string[];
    onTokenSelect?: (token: string) => void;
    filterTypes?: TokenType[];
    onFilterTypesChange?: (types: TokenType[]) => void;
    enableTokenSelect?: boolean;
}
export type TokenPanelRef = {
    scrollToToken: (token: string) => void;
};
declare const _default: React.ForwardRefExoticComponent<TokenPreviewProps & React.RefAttributes<TokenPanelRef>>;
export default _default;
