/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, CollectionFieldOptions } from '@nocobase/client';
import React from 'react';
export declare const CalendarBlockInitializer: ({ filterCollections, onlyCurrentDataSource, hideSearch, createBlockSchema, showAssociationFields, }: {
    filterCollections: (options: {
        collection?: Collection;
        associationField?: CollectionFieldOptions;
    }) => boolean;
    onlyCurrentDataSource: boolean;
    hideSearch?: boolean;
    createBlockSchema?: (options: any) => any;
    showAssociationFields?: boolean;
}) => React.JSX.Element;
export declare const useCreateCalendarBlock: () => {
    createCalendarBlock: ({ item }: {
        item: any;
    }) => Promise<void>;
};
