/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const ownersField: {
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
    throughScope: {
        isOwner: boolean;
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
declare const _default: import("@nocobase/database").CollectionOptions;
export default _default;
