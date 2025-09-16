/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const chinaRegion: {
    options: (options: any) => {
        type: string;
        target: string;
        targetKey: string;
        sortBy: string;
        through: any;
        foreignKey: any;
        otherKey: any;
        sourceKey: any;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                useDataSource: string;
                useLoadData: string;
                changeOnSelectLast: any;
                labelInValue: boolean;
                maxLevel: any;
                fieldNames: {
                    label: string;
                    value: string;
                    children: string;
                };
            };
        };
    };
};
