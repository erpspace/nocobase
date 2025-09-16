/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const GlobalAutoRefreshContext: React.Context<{
    addChart: (uid: string, chart: {
        service: any;
    }) => void;
    removeChart: (uid: string) => void;
    autoRefresh: number | boolean;
    setAutoRefresh: (autoRefresh: number | boolean) => void;
    refreshCharts: () => void;
}>;
export declare const GlobalAutoRefreshProvider: React.FC;
