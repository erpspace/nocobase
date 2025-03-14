/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { CSSProperties, FC } from 'react';
import type { FilterMode } from '../FilterPanel';
import type { Theme, TokenName } from '../interface';
export declare const antdComponents: {
    General: string[];
    Layout: string[];
    Navigation: string[];
    'Date Entry': string[];
    'Data Display': string[];
    Feedback: string[];
    Other: string[];
};
export type ComponentPanelProps = {
    themes: Theme[];
    selectedTokens?: string[];
    filterMode?: FilterMode;
    className?: string;
    style?: CSSProperties;
    onTokenClick?: (token: TokenName) => void;
};
declare const Index: FC<ComponentPanelProps>;
export default Index;
