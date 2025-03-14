/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ArrayField } from '@formily/core';
import { ISchema } from '@formily/react';
import { CollectionFieldOptions } from '@nocobase/client';
export type FieldOption = {
    value: string;
    label: string;
    key: string;
    alias?: string;
    name?: string;
    type?: string;
    interface?: string;
    uiSchema?: ISchema;
    target?: string;
    targetFields?: FieldOption[];
};
export declare const useChartDataSource: (dataSource?: string) => {
    cm: import("@nocobase/client").CollectionManager;
    fim: import("@nocobase/client").CollectionFieldInterfaceManager;
    collection: string;
};
export declare const useFields: (collectionFields: CollectionFieldOptions[]) => (CollectionFieldOptions & {
    key: string;
    label: string;
    value: string;
})[];
export declare const useFieldsWithAssociation: (dataSource?: string, collection?: string) => ({
    label: any;
    name?: any;
    collectionName?: string;
    sourceKey?: string;
    uiSchema?: any;
    target?: string;
    key: string;
    value: string;
} | {
    label: any;
    targetFields: any[];
    name?: any;
    collectionName?: string;
    sourceKey?: string;
    uiSchema?: any;
    target?: string;
    key: string;
    value: string;
})[];
export declare const useChartFields: (fields: FieldOption[]) => (field: any) => void;
export declare const useFormatters: (fields: FieldOption[]) => (field: any) => void;
export declare const useCollectionOptions: () => any;
export declare const useOrderFieldsOptions: (defaultOptions: any[], fields: FieldOption[]) => (field: any) => void;
export declare const useOrderReaction: (defaultOptions: any[], fields: FieldOption[]) => (field: ArrayField) => void;
export declare const useData: (data?: any[], dataSource?: string, collection?: string) => {}[];
export declare const useCollectionFieldsOptions: (dataSource: string, collectionName: string, maxDepth?: number, excludes?: any[]) => any[];
export declare const useCollectionFilterOptions: (dataSource: string, collection: string) => any[];
