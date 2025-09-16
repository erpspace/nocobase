/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionFieldInterface } from '@nocobase/client';
export declare const getOptions: (fieldInterfaces: Record<string, CollectionFieldInterface[]>, fieldGroups: Record<string, {
    label: string;
    order?: number;
}>) => {
    key: string;
    children: any[];
    label: string;
    order?: number;
}[];
export declare const useFieldInterfaceOptions: () => {
    key: string;
    children: any[];
    label: string;
    order?: number;
}[];
