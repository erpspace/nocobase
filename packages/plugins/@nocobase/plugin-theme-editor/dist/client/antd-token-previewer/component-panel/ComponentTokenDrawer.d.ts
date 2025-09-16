/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import type { ComponentDemo, MutableTheme, TokenName } from '../interface';
export type ComponentFullDemosProps = {
    demos: ComponentDemo[];
};
export type ComponentTokenDrawerProps = {
    visible?: boolean;
    component?: string;
    onClose?: () => void;
    theme: MutableTheme;
    onTokenClick?: (token: TokenName) => void;
};
declare const _default: ({ ...props }: ComponentTokenDrawerProps) => React.JSX.Element;
export default _default;
