/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This program is offered under a commercial license.
 * For more information, see <https://www.nocobase.com/agreement>
 */
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
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
        throughScope?: undefined;
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
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
        throughScope?: undefined;
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
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
        throughScope?: undefined;
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
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
        throughScope?: undefined;
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
        throughScope?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
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
            'x-read-pretty'?: undefined;
            'x-validator'?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
        };
        autoIncrement?: undefined;
        primaryKey?: undefined;
        allowNull?: undefined;
        unique?: undefined;
        throughScope?: undefined;
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
        throughScope: {
            isMain: boolean;
        };
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
    })[];
};
