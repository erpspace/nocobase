/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const useValuesFromRecord: (options: any, data: any) => import("@nocobase/client").UseRequestResult<unknown>;
export declare const SourceCollection: React.MemoExoticComponent<import("@formily/react").ReactFC<unknown>>;
export declare const useCancelAction: () => {
    run(): Promise<void>;
};
export declare const useCreateActionAndRefreshCM: (setTargetNode: any) => {
    run(): Promise<void>;
};
export declare const useCreateAction: (collectionName: any, targetId?: any) => {
    run(): Promise<void>;
};
export declare const useUpdateFieldAction: ({ collectionName, name, key }: {
    collectionName: any;
    name: any;
    key: any;
}) => {
    run(): Promise<void>;
};
export declare const useUpdateCollectionActionAndRefreshCM: () => {
    run(): Promise<void>;
};
export declare const useDestroyActionAndRefreshCM: (props: any) => {
    run(): Promise<void>;
};
export declare const useDestroyFieldActionAndRefreshCM: (props: any) => {
    run(): Promise<void>;
};
export declare const useAsyncDataSource: (service: any) => (field: any, { targetScope }: {
    targetScope: any;
}) => void;
