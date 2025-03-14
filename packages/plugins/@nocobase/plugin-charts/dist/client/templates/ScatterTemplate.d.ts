/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const scatterTemplate: {
    description: string;
    type: string;
    title: string;
    iconId: string;
    group: number;
    renderComponent: string;
    defaultChartOptions: {
        appendPadding: number;
        xField: string;
        yField: string;
        colorField: string;
        shape: string;
        size: number;
        yAxis: {
            nice: boolean;
            line: {
                style: {
                    stroke: string;
                };
            };
        };
        xAxis: {
            min: number;
            grid: {
                line: {
                    style: {
                        stroke: string;
                    };
                };
            };
            line: {
                style: {
                    stroke: string;
                };
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
