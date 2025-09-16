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
export type ColorPreviewProps = {
    color: string;
    dark?: boolean;
    className?: string;
    style?: React.CSSProperties;
};
declare const ColorPreview: FC<ColorPreviewProps>;
export default ColorPreview;
