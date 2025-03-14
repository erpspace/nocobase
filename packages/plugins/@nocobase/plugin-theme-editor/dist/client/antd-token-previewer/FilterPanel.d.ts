/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { CSSProperties, FC } from 'react';
export type FilterMode = 'highlight' | 'filter';
export type FilterPanelProps = {
    filterMode?: FilterMode;
    onFilterModeChange?: (mode: FilterMode) => void;
    selectedTokens: string[];
    onSelectedTokensChange?: (newTokens: string[]) => void;
    onTokenClick?: (token: string) => void;
    className?: string;
    style?: CSSProperties;
};
declare const FilterPanel: FC<FilterPanelProps>;
export default FilterPanel;
