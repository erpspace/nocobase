/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function mockAttachment(): {
    title: string;
    filename: string;
    extname: string;
    path: string;
    size: number;
    url: string;
    mimetype: string;
    meta: {};
    storageId: number;
};
export declare const attachment: {
    options: (options: any) => {
        type: string;
        target: string;
        through: any;
        foreignKey: any;
        otherKey: any;
        targetKey: any;
        sourceKey: any;
        uiSchema: {
            type: string;
            'x-component': string;
        };
    };
    mock: (options: any) => {
        title: string;
        filename: string;
        extname: string;
        path: string;
        size: number;
        url: string;
        mimetype: string;
        meta: {};
        storageId: number;
    } | {
        title: string;
        filename: string;
        extname: string;
        path: string;
        size: number;
        url: string;
        mimetype: string;
        meta: {};
        storageId: number;
    }[];
};
