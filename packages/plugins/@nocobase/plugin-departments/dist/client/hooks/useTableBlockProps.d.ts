/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const useTableBlockProps: () => {
    bordered: any;
    childrenColumnName: any;
    loading: any;
    showIndex: any;
    dragSort: any;
    rowKey: any;
    pagination: any;
    onRowSelectionChange: (selectedRowKeys: any, selectedRowData: any) => void;
    onRowDragEnd: ({ from, to }: {
        from: any;
        to: any;
    }) => Promise<void>;
    onChange: ({ current, pageSize }: {
        current: any;
        pageSize: any;
    }, filters: any, sorter: any) => void;
    onClickRow: (record: any, setSelectedRow: any, selectedRow: any) => void;
    onExpand: (expanded: any, record: any) => void;
};
