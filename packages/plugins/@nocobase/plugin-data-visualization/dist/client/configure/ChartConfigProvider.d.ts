/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
import React from 'react';
export type ChartConfigCurrent = {
    schema: ISchema;
    field: any;
    collection: string;
    dataSource: string;
    service: any;
    initialValues?: any;
    data: any[];
};
export declare const ChartConfigContext: React.Context<{
    visible: boolean;
    setVisible?: (visible: boolean) => void;
    current?: ChartConfigCurrent;
    setCurrent?: (current: ChartConfigCurrent) => void;
}>;
export declare const ChartConfigProvider: React.FC;
