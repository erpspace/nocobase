/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React, { FC } from 'react';
import { GetAppOptions } from '../web';
interface RenderHookOptions extends Omit<GetAppOptions, 'value' | 'onChange'> {
    hook: () => any;
    props?: any;
    Wrapper?: FC<{
        children: React.ReactNode;
    }>;
}
export declare const renderHookWithApp: (options: RenderHookOptions) => Promise<import("@testing-library/react-hooks").RenderHookResult<any, any, import("@testing-library/react-hooks").Renderer<any>>>;
export {};
