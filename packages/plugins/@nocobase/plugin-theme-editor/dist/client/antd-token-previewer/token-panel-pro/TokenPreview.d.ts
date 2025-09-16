/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { ThemeConfig } from 'antd/es/config-provider/context';
import type { FC } from 'react';
export type TokenPreviewProps = {
    theme: ThemeConfig;
    tokenName: string;
    type?: string;
};
declare const TokenPreview: FC<TokenPreviewProps>;
export default TokenPreview;
