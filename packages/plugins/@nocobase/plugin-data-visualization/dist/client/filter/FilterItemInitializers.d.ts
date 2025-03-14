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
export declare const ChartFilterFormItem: React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<any, "ref">>>;
export declare const ChartFilterCustomItemInitializer: React.FC<{
    insert?: any;
}>;
/**
 * @deprecated
 * use `chartFilterItemInitializers` instead
 */
export declare const chartFilterItemInitializers_deprecated: CompatibleSchemaInitializer;
export declare const chartFilterItemInitializers: CompatibleSchemaInitializer;
