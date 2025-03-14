/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { SchemaInitializerItemType, useCollectionDataSource } from '@nocobase/client';
import { FilterDynamicComponent, Instruction } from '@nocobase/plugin-workflow/client';
declare function AssociatedConfig({ value, onChange, ...props }: {
    [x: string]: any;
    value: any;
    onChange: any;
}): JSX.Element;
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        aggregator: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            enum: {
                label: string;
                value: string;
            }[];
            required: boolean;
            default: string;
        };
        associated: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            enum: {
                label: string;
                value: boolean;
            }[];
            required: boolean;
            default: boolean;
            'x-reactions': {
                target: string;
                effects: string[];
                fulfill: {
                    state: {
                        value: any;
                    };
                };
            }[];
        };
        collectionField: {
            type: string;
            'x-decorator': string;
            'x-decorator-props': {
                value: {
                    designable: boolean;
                };
            };
            'x-component': string;
            properties: {
                row: {
                    type: string;
                    'x-component': string;
                    properties: {
                        target: {
                            type: string;
                            'x-component': string;
                            properties: {
                                collection: {
                                    type: string;
                                    required: boolean;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-component-props': {
                                        dataSourceFilter(datasource: any): any;
                                    };
                                    title: string;
                                    'x-reactions': ({
                                        dependencies: string[];
                                        fulfill: {
                                            state: {
                                                display: string;
                                                value?: undefined;
                                            };
                                        };
                                        target?: undefined;
                                        effects?: undefined;
                                    } | {
                                        target: string;
                                        effects: string[];
                                        fulfill: {
                                            state: {
                                                value: any;
                                                display?: undefined;
                                            };
                                        };
                                        dependencies?: undefined;
                                    })[];
                                };
                                association: {
                                    type: string;
                                    title: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-component-props': {
                                        changeOnSelect: boolean;
                                    };
                                    'x-reactions': {
                                        dependencies: string[];
                                        fulfill: {
                                            state: {
                                                visible: string;
                                            };
                                        };
                                    }[];
                                    required: boolean;
                                };
                            };
                        };
                        field: {
                            type: string;
                            'x-component': string;
                            properties: {
                                'params.field': {
                                    type: string;
                                    title: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-component-props': {
                                        filter(field: any): boolean;
                                    };
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
                            };
                        };
                    };
                };
            };
        };
        params: {
            type: string;
            properties: {
                distinct: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-content': string;
                    'x-reactions': {
                        dependencies: string[];
                        fulfill: {
                            state: {
                                visible: string;
                            };
                        };
                    }[];
                };
                filter: {
                    type: string;
                    title: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-use-component-props': () => {
                        options: any[];
                        className: string;
                    };
                    'x-component-props': {
                        dynamicComponent: string;
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
            };
        };
    };
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
    };
    components: {
        SchemaComponentContext: React.Context<import("@nocobase/client").ISchemaComponentContext>;
        FilterDynamicComponent: typeof FilterDynamicComponent;
        FieldsSelect: React.MemoExoticComponent<import("@formily/react").ReactFC<Omit<any, "ref">>>;
        ValueBlock: (() => JSX.Element) & {
            Initializer: () => JSX.Element;
            Result: (props: any) => JSX.Element;
            Designer: () => JSX.Element;
        };
        AssociatedConfig: typeof AssociatedConfig;
    };
    useVariables({ key, title }: {
        key: any;
        title: any;
    }, { types, fieldNames }: {
        types: any;
        fieldNames?: {
            readonly label: "label";
            readonly value: "value";
            readonly children: "children";
        };
    }): {
        value: any;
        label: any;
    };
    useInitializers(node: any): SchemaInitializerItemType | null;
}
export {};
