/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const KanbanBlockContext: React.Context<any>;
export declare const KanbanBlockProvider: (props: any) => React.JSX.Element;
export declare const useKanbanBlockContext: () => any;
export declare const toColumns: (groupCollectionField: any, dataSource: Array<any>, primaryKey: any, options: any) => {
    id: string;
    title: string;
    color: string;
    cards: any[];
}[];
export declare const useKanbanBlockProps: () => {
    setDataSource: React.Dispatch<React.SetStateAction<any[]>>;
    dataSource: any[];
    groupField: any;
    disableCardDrag: boolean;
    onCardDragEnd: ({ columns, groupField }: {
        columns: any;
        groupField: any;
    }, { fromColumnId, fromPosition }: {
        fromColumnId: any;
        fromPosition: any;
    }, { toColumnId, toPosition }: {
        toColumnId: any;
        toPosition: any;
    }) => Promise<void>;
};
