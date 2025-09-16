/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { FC } from 'react';
import type { MutableTheme } from './interface';
type TokenInputProps = {
    theme?: MutableTheme;
    value?: string | number;
    onChange?: (value: string | number) => void;
    light?: boolean;
    readonly?: boolean;
    onReset?: () => void;
    canReset?: boolean;
    hideTheme?: boolean;
};
declare const TokenInput: FC<TokenInputProps>;
export default TokenInput;
