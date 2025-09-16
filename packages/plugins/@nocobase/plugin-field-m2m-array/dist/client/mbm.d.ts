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
export declare class MBMFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    order: number;
    title: any;
    description: any;
    isAssociation: boolean;
    default: {
        type: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                multiple: boolean;
            };
        };
    };
    availableTypes: string[];
    schemaInitialize(schema: ISchema, { field, block, readPretty, targetCollection }: {
        field: any;
        block: any;
        readPretty: any;
        targetCollection: any;
    }): void;
    properties: {
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
            description: string;
        };
        grid: {
            type: string;
            'x-component': string;
            properties: {
                row1: {
                    type: string;
                    'x-component': string;
                    properties: {
                        col11: {
                            type: string;
                            'x-component': string;
                            properties: {
                                source: {
                                    type: string;
                                    title: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                };
                            };
                        };
                        col12: {
                            type: string;
                            'x-component': string;
                            properties: {
                                target: {
                                    type: string;
                                    title: string;
                                    required: boolean;
                                    'x-reactions': string[];
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-disabled': string;
                                };
                            };
                        };
                    };
                };
                row2: {
                    type: string;
                    'x-component': string;
                    properties: {
                        col21: {
                            type: string;
                            'x-component': string;
                            properties: {
                                foreignKey: {
                                    type: string;
                                    title: string;
                                    required: boolean;
                                    default: string;
                                    description: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-validator': string;
                                    'x-disabled': string;
                                };
                            };
                        };
                        col22: {
                            type: string;
                            'x-component': string;
                            properties: {
                                targetKey: {
                                    type: string;
                                    title: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-disabled': string;
                                    description: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
    filterable: {
        nested: boolean;
        children: any[];
    };
}
