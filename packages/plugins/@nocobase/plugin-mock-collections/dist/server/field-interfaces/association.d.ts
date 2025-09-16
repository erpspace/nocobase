/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const oho: {
    options: (options: any) => any;
    mock: (options: any, { mockCollectionData, maxDepth, depth }: {
        mockCollectionData: any;
        maxDepth: any;
        depth: any;
    }) => Promise<any>;
};
export declare const obo: {
    options: (options: any) => any;
    mock: (options: any, { mockCollectionData, depth, maxDepth }: {
        mockCollectionData: any;
        depth: any;
        maxDepth: any;
    }) => Promise<any>;
};
export declare const o2m: {
    options: (options: any) => any;
    mock: (options: any, { mockCollectionData, depth, maxDepth }: {
        mockCollectionData: any;
        depth: any;
        maxDepth: any;
    }) => Promise<any>;
};
export declare const m2o: {
    options: (options: any) => any;
    mock: (options: any, { mockCollectionData, depth, maxDepth }: {
        mockCollectionData: any;
        depth: any;
        maxDepth: any;
    }) => Promise<any>;
};
export declare const m2m: {
    options: (options: any) => any;
    mock: (options: any, { mockCollectionData, depth, maxDepth }: {
        mockCollectionData: any;
        depth: any;
        maxDepth: any;
    }) => Promise<any>;
};
