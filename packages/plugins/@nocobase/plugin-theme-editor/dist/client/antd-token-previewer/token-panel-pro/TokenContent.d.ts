/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { FC } from 'react';
import { MutableTheme } from '../../../types';
import type { SelectedToken } from '../interface';
import type { TokenCategory, TokenGroup } from '../meta/interface';
export type SeedTokenProps = {
    theme: MutableTheme;
    tokenName: string;
    disabled?: boolean;
    alpha?: boolean;
};
export type MapTokenCollapseContentProps = {
    mapTokens?: string[];
    theme: MutableTheme;
    selectedTokens?: SelectedToken;
    onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
    type?: string;
};
export type MapTokenCollapseProps = {
    theme: MutableTheme;
    group: TokenGroup<string>;
    selectedTokens?: SelectedToken;
    onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
    groupFn?: (token: string) => string;
};
export type ColorTokenContentProps = {
    category: TokenCategory<string>;
    theme: MutableTheme;
    selectedTokens?: SelectedToken;
    onTokenSelect?: (token: string | string[], type: keyof SelectedToken) => void;
    infoFollowPrimary?: boolean;
    onInfoFollowPrimaryChange?: (value: boolean) => void;
    activeGroup: string;
    onActiveGroupChange: (value: string) => void;
};
declare const TokenContent: FC<ColorTokenContentProps>;
export default TokenContent;
