/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
type FilterField = {
    title?: string;
    operator?: {
        value: string;
        noValue?: boolean;
    };
    dataSource?: string;
    collectionField?: string;
};
export declare const ChartFilterContext: React.Context<{
    ready: boolean;
    enabled: boolean;
    setEnabled: (enabled: boolean) => void;
    fields: {
        [name: string]: FilterField;
    };
    setField: (name: string, field: FilterField) => void;
    removeField: (name: string) => void;
    collapse: {
        collapsed: boolean;
        row: number;
    };
    setCollapse: (opts: {
        collapsed?: boolean;
        row?: number;
    }) => void;
    form: any;
    setForm: (form: any) => void;
}>;
export declare const ChartFilterProvider: React.FC;
export {};
