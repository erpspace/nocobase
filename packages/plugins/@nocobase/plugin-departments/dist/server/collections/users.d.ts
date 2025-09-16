/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const departmentsField: {
    collectionName: string;
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
    };
};
export declare const mainDepartmentField: {
    collectionName: string;
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
        'x-component-props': {
            multiple: boolean;
            fieldNames: {
                label: string;
                value: string;
            };
        };
    };
};
declare const _default: {
    collectionOptions: import("@nocobase/database").CollectionOptions;
    mergeOptions: import("deepmerge").Options;
    extend: boolean;
};
export default _default;
