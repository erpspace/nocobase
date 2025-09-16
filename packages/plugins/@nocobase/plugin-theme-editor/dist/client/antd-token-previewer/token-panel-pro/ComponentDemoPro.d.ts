/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { MutableTheme } from '../../../types';
export type ComponentDemoProProps = {
    selectedTokens?: string[];
    theme: MutableTheme;
    components: Record<string, string[]>;
    activeComponents?: string[];
    style?: React.CSSProperties;
    componentDrawer?: boolean;
    showAll?: boolean;
};
declare const _default: (props: ComponentDemoProProps) => React.JSX.Element;
export default _default;
