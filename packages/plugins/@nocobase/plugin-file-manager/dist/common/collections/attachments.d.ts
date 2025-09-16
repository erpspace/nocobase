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
    asStrategyResource: boolean;
    shared: boolean;
    name: string;
    createdBy: boolean;
    updatedBy: boolean;
    template: string;
    filterTargetKey: string;
    fields: ({
        comment: string;
        type: string;
        name: string;
        target?: undefined;
        foreignKey?: undefined;
        deletable?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        comment?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        deletable?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        target: string;
        foreignKey: string;
        deletable: boolean;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames: {
                    value: string;
                    label: string;
                };
            };
            'x-read-pretty': boolean;
        };
        comment?: undefined;
        defaultValue?: undefined;
    } | {
        comment: string;
        type: string;
        name: string;
        defaultValue: {};
        target?: undefined;
        foreignKey?: undefined;
        deletable?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
    })[];
};
export default _default;
