/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { FC } from 'react';
import type { FilterMode } from '../FilterPanel';
export type ComponentTreeProps = {
    onSelect?: (component: string) => void;
    components: Record<string, string[]>;
    selectedTokens?: string[];
    filterMode?: FilterMode;
    activeComponent?: string;
};
declare const ComponentTree: FC<ComponentTreeProps>;
export default ComponentTree;
