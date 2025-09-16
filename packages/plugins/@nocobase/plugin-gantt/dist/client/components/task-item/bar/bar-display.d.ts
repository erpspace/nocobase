/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
type BarDisplayProps = {
    x: number;
    y: number;
    color?: string;
    width: number;
    height: number;
    isSelected: boolean;
    progressX: number;
    progressWidth: number;
    barCornerRadius: number;
    styles: {
        backgroundColor: string;
        backgroundSelectedColor: string;
        progressColor: string;
        progressSelectedColor: string;
    };
    onMouseDown: (event: React.MouseEvent<SVGPolygonElement, MouseEvent>) => void;
};
export declare const BarDisplay: React.FC<BarDisplayProps>;
export {};
