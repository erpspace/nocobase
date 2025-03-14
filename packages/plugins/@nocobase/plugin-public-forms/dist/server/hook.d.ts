/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function getAssociationPath(str: any): any;
/**
 * 为多层级的关系字段补充上父级字段
 * e.g. ['a', 'b.c'] => ['a', 'b', 'b.c']
 * @param appends
 * @returns
 */
export declare function fillParentFields(appends: Set<string>): Set<string>;
export declare const parseAssociationNames: (dataSourceKey: string, collectionName: string, app: any, fieldSchema: any) => {
    getAssociationAppends: () => {
        appends: any[];
    };
};
