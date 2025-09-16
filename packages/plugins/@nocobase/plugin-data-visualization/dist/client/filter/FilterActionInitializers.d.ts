/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CompatibleSchemaInitializer } from '@nocobase/client';
import React from 'react';
export declare const useChartFilterActionProps: () => {
    onClick: () => Promise<void>;
};
export declare const useChartFilterResetProps: () => {
    onClick: () => Promise<void>;
};
export declare const useChartFilterCollapseProps: () => {
    onClick: () => void;
    title: React.JSX.Element;
};
export declare const ChartFilterCollapseDesigner: React.FC;
export declare const ChartFilterActionDesigner: React.FC;
/**
 * @deprecated
 * use `chartFilterActionInitializers` instead
 */
export declare const chartFilterActionInitializers_deprecated: CompatibleSchemaInitializer;
export declare const chartFilterActionInitializers: CompatibleSchemaInitializer;
