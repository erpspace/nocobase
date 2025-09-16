/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export interface IconSwitchProps {
    className?: string;
    style?: React.CSSProperties;
    leftChecked?: boolean;
    leftIcon: React.ReactNode;
    rightIcon: React.ReactNode;
    onChange?: (leftChecked: boolean) => void;
    transparent?: boolean;
}
export default function IconSwitch({ className, style, leftIcon, rightIcon, leftChecked, transparent, onChange, ...props }: IconSwitchProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
