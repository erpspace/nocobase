/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { useWorkflowVariableOptions } from '../variable';
export declare const calculators: any;
export declare function CalculationConfig({ value, onChange, useVariableHook }: {
    value: any;
    onChange: any;
    useVariableHook?: typeof useWorkflowVariableOptions;
}): React.JSX.Element;
