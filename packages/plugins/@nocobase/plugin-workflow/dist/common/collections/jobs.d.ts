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
    autoGenId: boolean;
    fields: ({
        type: string;
        name: string;
        primaryKey: boolean;
        autoIncrement: boolean;
        target?: undefined;
    } | {
        type: string;
        name: string;
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
    } | {
        type: string;
        name: string;
        target: string;
        primaryKey?: undefined;
        autoIncrement?: undefined;
    })[];
};
export default _default;
