/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const columnTemplate: {
    description: string;
    type: string;
    title: string;
    iconId: string;
    group: number;
    renderComponent: string;
    defaultChartOptions: {
        appendPadding: number;
        isGroup: boolean;
        yField: string;
        xField: string;
        seriesField: string;
        label: {
            position: string;
            style: {
                fill: string;
                opacity: number;
            };
        };
        xAxis: {
            label: {
                autoHide: boolean;
                autoRotate: boolean;
            };
        };
    };
    configurableProperties: {
        type: string;
        properties: {
            dimension: {
                required: boolean;
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                enum: string;
            };
            metric: {
                required: boolean;
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                enum: string;
            };
            category: {
                type: string;
                title: string;
                'x-decorator': string;
                'x-component': string;
                enum: string;
            };
            jsonConfig: {
                type: string;
                'x-component': string;
                properties: {
                    template: {
                        required: boolean;
                        title: string;
                        type: string;
                        default: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            autoSize: {
                                minRows: number;
                                maxRows: number;
                            };
                        };
                        description: string;
                        'x-validator': {
                            json5: boolean;
                        };
                    };
                };
            };
        };
    };
};
