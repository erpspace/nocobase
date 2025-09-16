/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Collection, CollectionFieldOptions } from '@nocobase/client';
export declare const KanbanBlockInitializer: ({ filterCollections, onlyCurrentDataSource, hideSearch, createBlockSchema, showAssociationFields, }: {
    filterCollections: (options: {
        collection?: Collection;
        associationField?: CollectionFieldOptions;
    }) => boolean;
    onlyCurrentDataSource: boolean;
    hideSearch?: boolean;
    createBlockSchema?: (options: any) => any;
    showAssociationFields?: boolean;
}) => React.JSX.Element;
export declare const useCreateKanbanBlock: () => {
    createKanbanBlock: ({ item }: {
        item: any;
    }) => Promise<void>;
};
export declare function useCreateAssociationKanbanBlock(): {
    createAssociationKanbanBlock: ({ item }: {
        item: any;
    }) => Promise<void>;
};
