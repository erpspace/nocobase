/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { FC } from 'react';
import type { MutableTheme, TokenName } from '../interface';
type ComponentDemoGroupProps = {
    themes: MutableTheme[];
    components: Record<string, string[]>;
    activeComponents?: string[];
    size?: 'small' | 'middle' | 'large';
    disabled?: boolean;
    selectedTokens?: string[];
    onTokenClick?: (token: TokenName) => void;
    componentDrawer?: boolean;
    hideTokens?: boolean;
};
declare const ComponentDemoGroup: FC<ComponentDemoGroupProps>;
export default ComponentDemoGroup;
