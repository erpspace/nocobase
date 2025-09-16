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
    fields: ({
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames?: undefined;
            };
            'x-read-pretty': boolean;
            'x-decorator'?: undefined;
            enum?: undefined;
        };
        primaryKey: boolean;
        autoIncrement: boolean;
        target?: undefined;
        foreignKey?: undefined;
        unique?: undefined;
        onDelete?: undefined;
    } | {
        type: string;
        name: string;
        target: string;
        foreignKey: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames: {
                    label: string;
                    value: string;
                };
            };
            'x-read-pretty': boolean;
            'x-decorator'?: undefined;
            enum?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        unique?: undefined;
        onDelete?: undefined;
    } | {
        type: string;
        name: string;
        interface?: undefined;
        uiSchema?: undefined;
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        unique?: undefined;
        onDelete?: undefined;
    } | {
        type: string;
        name: string;
        unique: boolean;
        interface?: undefined;
        uiSchema?: undefined;
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        onDelete?: undefined;
    } | {
        type: string;
        name: string;
        onDelete: string;
        interface?: undefined;
        uiSchema?: undefined;
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        unique?: undefined;
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            title: string;
            type: string;
            'x-component': string;
            'x-decorator': string;
            enum: string;
            'x-component-props'?: undefined;
            'x-read-pretty'?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        unique?: undefined;
        onDelete?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames?: undefined;
            };
            'x-read-pretty': boolean;
            'x-decorator'?: undefined;
            enum?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        unique?: undefined;
        onDelete?: undefined;
    })[];
};
export default _default;
