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
    autoGenId: boolean;
    fields: ({
        type: string;
        name: string;
        primaryKey: boolean;
        interface?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        otherKey?: undefined;
        onDelete?: undefined;
        sourceKey?: undefined;
        targetKey?: undefined;
        through?: undefined;
    } | {
        type: string;
        name: string;
        primaryKey?: undefined;
        interface?: undefined;
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
        primaryKey?: undefined;
    })[];
};
export default _default;
