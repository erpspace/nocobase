/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
import { SchemaInitializerItemType, useCollectionDataSource } from '@nocobase/client';
import { Trigger } from '..';
import { TriggerScheduleConfig } from './TriggerScheduleConfig';
import { WorkflowVariableWrapper } from '../../variable';
import { TriggerCollectionRecordSelect } from '../../components/TriggerCollectionRecordSelect';
declare function useVariables(config: any, opts: any): any[];
export default class extends Trigger {
    sync: boolean;
    title: string;
    description: string;
    fieldset: {
        config: {
            type: string;
            'x-component': string;
            'x-component-props': {};
        };
    };
    triggerFieldset: {
        proxy: {
            type: string;
            'x-component': string;
        };
    };
    validate(config: any): any;
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
    };
    components: {
        ScheduleConfig: () => import("react").JSX.Element;
        TriggerScheduleConfig: typeof TriggerScheduleConfig;
        TriggerCollectionRecordSelect: typeof TriggerCollectionRecordSelect;
        WorkflowVariableWrapper: typeof WorkflowVariableWrapper;
    };
    useVariables: typeof useVariables;
    useInitializers(config: any): SchemaInitializerItemType | null;
}
export {};
