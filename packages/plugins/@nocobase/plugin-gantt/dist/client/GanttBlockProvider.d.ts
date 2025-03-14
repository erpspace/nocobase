/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const GanttBlockContext: React.Context<any>;
export declare const GanttBlockProvider: (props: any) => React.JSX.Element;
export declare const useGanttBlockContext: () => any;
export declare const useGanttBlockProps: () => {
    fieldNames: any;
    timeRange: any;
    onExpanderClick: (task: any) => void;
    expandAndCollapseAll: (flag: any) => void;
    tasks: any;
    loading: boolean;
};
