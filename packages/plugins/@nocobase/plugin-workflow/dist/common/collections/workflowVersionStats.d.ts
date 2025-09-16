/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    dumpRules: {
        group: string;
    };
    migrationRules: string[];
    name: string;
    shared: boolean;
    autoGenId: boolean;
    fields: ({
        name: string;
        type: string;
        primaryKey: boolean;
        defaultValue?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
    } | {
        type: string;
        name: string;
        defaultValue: number;
        interface: string;
        uiSchema: {
            title: string;
            'x-component': string;
            'x-read-pretty': boolean;
        };
        primaryKey?: undefined;
    })[];
};
export default _default;
