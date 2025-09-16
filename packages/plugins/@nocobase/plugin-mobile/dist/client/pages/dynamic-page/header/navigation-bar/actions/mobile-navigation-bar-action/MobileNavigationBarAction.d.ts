/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ButtonProps } from 'antd-mobile';
import React, { FC } from 'react';
interface MobileNavigationBarActionProps extends ButtonProps {
    icon?: string | React.ReactNode;
    title?: string;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}
export declare const MobileNavigationBarAction: FC<MobileNavigationBarActionProps>;
export {};
