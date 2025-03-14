/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { FC } from 'react';
import React from 'react';
import { Theme } from '../../../types';
import type { SelectedToken } from '../interface';
export type TokenPanelProProps = {
    className?: string;
    style?: React.CSSProperties;
    theme: Theme;
    selectedTokens?: SelectedToken;
    onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
    infoFollowPrimary?: boolean;
    onInfoFollowPrimaryChange?: (value: boolean) => void;
    aliasOpen?: boolean;
    onAliasOpenChange?: (value: boolean) => void;
    activeTheme?: string;
};
declare const TokenPanelPro: FC<TokenPanelProProps>;
export default TokenPanelPro;
