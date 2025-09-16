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
import { MutableTheme } from '../../../types';
import type { SelectedToken } from '../interface';
export type AliasPanelProps = {
    className?: string;
    style?: React.CSSProperties;
    theme: MutableTheme;
    activeSeeds?: string[];
    selectedTokens?: SelectedToken;
    onTokenSelect?: (token: string, type: keyof SelectedToken) => void;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    description?: string;
};
declare const AliasPanel: FC<AliasPanelProps>;
export default AliasPanel;
