/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export interface ChartQueryMetadata {
    id: number;
    title: string;
    type: string;
    fields: {
        name: string;
    }[];
}
export declare const ChartQueryBlockInitializer: (props: any) => React.JSX.Element;
