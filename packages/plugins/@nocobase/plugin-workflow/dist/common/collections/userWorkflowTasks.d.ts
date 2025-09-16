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
        name: string;
        type: string;
        foreignKey?: undefined;
        defaultValue?: undefined;
    } | {
        name: string;
        type: string;
        foreignKey: string;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        defaultValue: {};
        foreignKey?: undefined;
    })[];
    indexes: {
        unique: boolean;
        fields: string[];
    }[];
};
export default _default;
