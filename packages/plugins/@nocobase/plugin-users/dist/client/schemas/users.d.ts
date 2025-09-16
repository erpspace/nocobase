/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
export declare const userCollection: {
    name: string;
    fields: ({
        name: string;
        type: string;
        autoIncrement: boolean;
        primaryKey: boolean;
        allowNull: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-read-pretty': boolean;
            'x-validator'?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
        };
        interface: string;
        unique?: undefined;
        hidden?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-read-pretty'?: undefined;
            'x-validator'?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
        };
        autoIncrement?: undefined;
        primaryKey?: undefined;
        allowNull?: undefined;
        unique?: undefined;
        hidden?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        unique: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-validator': {
                username: boolean;
            };
            required: boolean;
            'x-read-pretty'?: undefined;
            'x-component-props'?: undefined;
        };
        autoIncrement?: undefined;
        primaryKey?: undefined;
        allowNull?: undefined;
        hidden?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        unique: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-validator': string;
            required: boolean;
            'x-read-pretty'?: undefined;
            'x-component-props'?: undefined;
        };
        autoIncrement?: undefined;
        primaryKey?: undefined;
        allowNull?: undefined;
        hidden?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        unique: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required: boolean;
            'x-read-pretty'?: undefined;
            'x-validator'?: undefined;
            'x-component-props'?: undefined;
        };
        autoIncrement?: undefined;
        primaryKey?: undefined;
        allowNull?: undefined;
        hidden?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        hidden: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-read-pretty'?: undefined;
            'x-validator'?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
        };
        autoIncrement?: undefined;
        primaryKey?: undefined;
        allowNull?: undefined;
        unique?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        target: string;
        foreignKey: string;
        otherKey: string;
        onDelete: string;
        sourceKey: string;
        targetKey: string;
        through: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                multiple: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
            };
            'x-read-pretty'?: undefined;
            'x-validator'?: undefined;
            required?: undefined;
        };
        autoIncrement?: undefined;
        primaryKey?: undefined;
        allowNull?: undefined;
        unique?: undefined;
        hidden?: undefined;
    })[];
};
export declare const usersSchema: ISchema;
export declare const usersSettingsSchema: ISchema;
export declare const getRoleUsersSchema: () => ISchema;
