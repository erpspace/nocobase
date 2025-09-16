/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    dumpRules: string;
    migrationRules: string[];
    name: string;
    shared: boolean;
    fields: ({
        type: string;
        name: string;
        interface?: undefined;
        uiSchema?: undefined;
        target?: undefined;
        sourceKey?: undefined;
        foreignKey?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
        };
        target?: undefined;
        sourceKey?: undefined;
        foreignKey?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        type: string;
        target: string;
        interface?: undefined;
        uiSchema?: undefined;
        sourceKey?: undefined;
        foreignKey?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        type: string;
        target: string;
        sourceKey: string;
        foreignKey: string;
        interface?: undefined;
        uiSchema?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        defaultValue: {};
        interface?: undefined;
        uiSchema?: undefined;
        target?: undefined;
        sourceKey?: undefined;
        foreignKey?: undefined;
    })[];
};
export default _default;
