/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
import { CollectionFieldInterface } from '@nocobase/client';
export declare const useTopRecord: () => any;
declare function useRecordCollection(): any;
export declare class SnapshotFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    title: string;
    description: string;
    default: {
        type: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                multiple: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
            };
        };
    };
    schemaInitialize(schema: ISchema, { field, readPretty, action, block }: {
        field: any;
        readPretty: any;
        action: any;
        block: any;
    }): void;
    initialize(values: any): void;
    usePathOptions(field: any): {
        label: string;
        value: string;
        children: any[];
    }[];
    properties: {
        targetField: {
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
            'x-disabled': string;
            'x-reactions': {
                target: string;
                when: string;
                fulfill: {
                    state: {
                        visible: boolean;
                    };
                };
                otherwise: {
                    state: {
                        visible: boolean;
                    };
                };
            }[];
        };
        appends: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                multiple: boolean;
                useCollection: typeof useRecordCollection;
            };
            'x-reactions': {
                dependencies: string[];
                when: string;
                fulfill: {
                    run: string;
                };
            }[];
        };
        'uiSchema.title': {
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
        name: {
            type: string;
            title: string;
            required: boolean;
            'x-disabled': string;
            'x-decorator': string;
            'x-component': string;
            'x-validator': string;
            description: string;
        };
    };
}
export {};
