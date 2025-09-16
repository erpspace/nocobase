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
export declare const departmentCollection: {
    name: string;
    fields: ({
        type: string;
        name: string;
        primaryKey: boolean;
        autoIncrement: boolean;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component'?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
        };
        collectionName?: undefined;
        foreignKey?: undefined;
        target?: undefined;
        targetKey?: undefined;
        treeParent?: undefined;
        through?: undefined;
        otherKey?: undefined;
        sourceKey?: undefined;
        scope?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required: boolean;
            'x-component-props'?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        collectionName?: undefined;
        foreignKey?: undefined;
        target?: undefined;
        targetKey?: undefined;
        treeParent?: undefined;
        through?: undefined;
        otherKey?: undefined;
        sourceKey?: undefined;
        scope?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        collectionName: string;
        foreignKey: string;
        target: string;
        targetKey: string;
        treeParent: boolean;
        uiSchema: {
            title: string;
            'x-component': string;
            type?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        through?: undefined;
        otherKey?: undefined;
        sourceKey?: undefined;
        scope?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        target: string;
        collectionName: string;
        through: string;
        foreignKey: string;
        otherKey: string;
        targetKey: string;
        sourceKey: string;
        uiSchema: {
            title: string;
            'x-component': string;
            'x-component-props': {
                multiple: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
            };
            type?: undefined;
            required?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        treeParent?: undefined;
        scope?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        collectionName: string;
        target: string;
        through: string;
        foreignKey: string;
        otherKey: string;
        targetKey: string;
        sourceKey: string;
        scope: {
            isOwner: boolean;
        };
        uiSchema: {
            title: string;
            'x-component': string;
            'x-component-props': {
                multiple: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
            };
            type?: undefined;
            required?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        treeParent?: undefined;
    })[];
};
