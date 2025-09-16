/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { CSSInterpolation } from '@ant-design/cssinjs';
import type { GlobalToken } from 'antd/es/theme/interface';
import type React from 'react';
declare const makeStyle: (path: string, styleFn: (token: GlobalToken & {
    rootCls: string;
}) => CSSInterpolation) => () => [(node: React.ReactNode) => React.ReactElement, string];
export default makeStyle;
