/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { CSSProperties, FC } from 'react';
import tinycolor from 'tinycolor2';
export type HexColorInputProps = {
    value: string;
    onChange?: (value: string) => void;
    alpha?: boolean;
};
type RgbaColor = tinycolor.ColorFormats.RGBA;
export type RgbColorInputProps = {
    value?: RgbaColor;
    onChange?: (value: RgbaColor) => void;
    alpha?: boolean;
};
export type ColorPanelProps = {
    color: string;
    onChange: (color: string) => void;
    alpha?: boolean;
    style?: CSSProperties;
};
declare const ColorPanel: FC<ColorPanelProps>;
export default ColorPanel;
