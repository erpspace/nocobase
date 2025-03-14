/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const useTableBlockProps: () => {
    optimizeTextCellRender: boolean;
    value: any;
    loading: any;
    showIndex: boolean;
    dragSort: boolean;
    rowKey: string;
    pagination: boolean | {
        pageSize: any;
        total: any;
        current: any;
    };
    onRowSelectionChange: (selectedRowKeys: any, selectedRows: any, setSelectedRowKeys: any) => void;
    onChange: ({ current, pageSize }: {
        current: any;
        pageSize: any;
    }, filters: any, sorter: any) => void;
};
