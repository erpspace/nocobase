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
import { useWorkflowAnyExecuted } from '../hooks';
import { Trigger } from '.';
import { TriggerCollectionRecordSelect } from '../components/TriggerCollectionRecordSelect';
declare function useVariables(config: any, options: any): import("../variable").VariableOption[];
export default class extends Trigger {
    title: string;
    description: string;
    fieldset: {
        collection: {
            'x-disabled': string;
            'x-component-props': {
                dataSourceFilter(item: any): any;
            };
            "x-reactions": any[];
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
        mode: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                popupMatchSelectWidth: boolean;
                placeholder: string;
                className: string;
            };
            enum: {
                label: string;
                value: number;
            }[];
            required: boolean;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        changed: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                mode: string;
                placeholder: string;
                filter(field: any): boolean;
            };
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        condition: {
            title: string;
            'x-component-props': {};
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
            type: string;
            'x-decorator': string;
            'x-component': string;
            'x-use-component-props': () => {
                options: any[];
                className: string;
            };
        };
        appends: {
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                title: string;
                multiple: boolean;
                useCollection(): any;
            };
        };
    };
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
        useWorkflowAnyExecuted: typeof useWorkflowAnyExecuted;
    };
    components: {
        FieldsSelect: import("react").MemoExoticComponent<import("@formily/reactive-react").ReactFC<Omit<any, "ref">>>;
        TriggerCollectionRecordSelect: typeof TriggerCollectionRecordSelect;
    };
    triggerFieldset: {
        data: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            default: any;
            required: boolean;
        };
    };
    validate(values: any): any;
    useVariables: typeof useVariables;
    useInitializers(config: any): SchemaInitializerItemType | null;
}
export {};
