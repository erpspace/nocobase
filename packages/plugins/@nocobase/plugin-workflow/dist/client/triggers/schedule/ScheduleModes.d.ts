/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const ScheduleModes: {
    [x: number]: {
        fieldset: {
            startsOn: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props': {
                    showTime: boolean;
                };
                required: boolean;
                'x-reactions'?: undefined;
            };
            repeat: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-reactions': {
                    target: string;
                    fulfill: {
                        state: {
                            visible: string;
                        };
                    };
                }[];
            };
            endsOn: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props': {
                    showTime: boolean;
                };
            };
            limit: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props': {
                    placeholder: string;
                    min: number;
                };
            };
            collection?: undefined;
            appends?: undefined;
        };
        triggerFieldset: {
            date: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props': {
                    nullable: boolean;
                    changeOnSelect: boolean;
                    render(props: any): React.JSX.Element;
                };
            };
            data?: undefined;
        };
        validate(config: any): boolean;
    } | {
        fieldset: {
            collection: {
                'x-component-props': {
                    dataSourceFilter(item: any): any;
                };
                'x-reactions': any[];
                type: string;
                title: string;
                required: boolean;
                'x-decorator': string;
                'x-component': string;
            };
            startsOn: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-reactions': {
                    target: string;
                    fulfill: {
                        state: {
                            visible: string;
                        };
                    };
                }[];
                required: boolean;
                'x-component-props'?: undefined;
            };
            repeat: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-reactions': {
                    target: string;
                    fulfill: {
                        state: {
                            visible: string;
                        };
                    };
                }[];
            };
            endsOn: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props'?: undefined;
            };
            limit: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                'x-component-props': {
                    placeholder: string;
                    min: number;
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
            date?: undefined;
        };
        validate(config: any): any;
    };
};
