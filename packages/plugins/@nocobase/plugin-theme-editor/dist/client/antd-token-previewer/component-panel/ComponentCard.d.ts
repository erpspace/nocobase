/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { CardProps } from 'antd';
import type { FC, PropsWithChildren } from 'react';
import type { MutableTheme, TokenName } from '../interface';
export declare const getComponentDemoId: (component: string) => string;
export type ComponentCardProps = PropsWithChildren<{
    title: CardProps['title'];
    component?: string;
    onTokenClick?: (token: TokenName) => void;
    drawer?: boolean;
    theme?: MutableTheme;
}>;
declare const ComponentCard: FC<ComponentCardProps>;
export default ComponentCard;
