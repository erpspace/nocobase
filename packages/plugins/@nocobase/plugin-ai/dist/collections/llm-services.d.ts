/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    name: string;
    fields: ({
        name: string;
        type: string;
        primaryKey: boolean;
        interface?: undefined;
        uiSchema?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            title: string;
            'x-component': string;
        };
        primaryKey?: undefined;
    } | {
        name: string;
        type: string;
        primaryKey?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
    })[];
};
export default _default;
