/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const tableTemplate: {
    title: string;
    type: string;
    group: number;
    renderComponent: string;
    defaultChartOptions: {
        appendPadding: number;
        angleField: string;
        colorField: string;
        radius: number;
        label: {
            type: string;
            offset: string;
            content: string;
            style: {
                fontSize: number;
                textAlign: string;
            };
        };
        interactions: {
            type: string;
        }[];
    };
    configurableProperties: {
        type: string;
        properties: {};
    };
};
