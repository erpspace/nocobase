/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { ISchema } from '@formily/react';
import { SchemaInitializerItemType } from '@nocobase/client';
import { UseVariableOptions, VariableOption } from '../variable';
export declare abstract class Trigger {
    sync: boolean;
    title: string;
    description?: string;
    useVariables?(config: Record<string, any>, options?: UseVariableOptions): VariableOption[];
    fieldset: Record<string, ISchema>;
    triggerFieldset?: Record<string, ISchema>;
    validate(config: Record<string, any>): boolean;
    view?: ISchema;
    scope?: {
        [key: string]: any;
    };
    components?: {
        [key: string]: any;
    };
    useInitializers?(config: any): SchemaInitializerItemType | null;
    initializers?: any;
    isActionTriggerable?: boolean | ((config: object, context?: object) => boolean);
}
export declare const TriggerConfig: () => React.JSX.Element;
/**
 * @experimental
 */
export declare function useTrigger(): any;
