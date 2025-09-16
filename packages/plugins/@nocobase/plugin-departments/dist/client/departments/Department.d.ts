/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This program is offered under a commercial license.
 * For more information, see <https://www.nocobase.com/agreement>
 */
import React from 'react';
export declare const DepartmentTreeContext: React.Context<{
    loadData: ({ key, children }: {
        key: any;
        children: any;
    }) => Promise<void>;
    getByKeyword: (keyword: string) => Promise<void>;
    initData: (data: any[]) => void;
    treeData: any[];
    setTreeData: React.Dispatch<React.SetStateAction<any[]>>;
    nodeMap: {};
    updateTreeData: (key: any, children: any[]) => any;
    constructTreeData: (nodeMap: {
        [parentId: string]: any;
        [parentId: number]: any;
    }) => any;
    getChildrenIds: (id: any) => any[];
    loadedKeys: any[];
    setLoadedKeys: React.Dispatch<React.SetStateAction<any[]>>;
    expandedKeys: any[];
    setExpandedKeys: React.Dispatch<React.SetStateAction<any[]>>;
}>;
export declare const useCreateDepartment: () => {
    run(): Promise<void>;
};
export declare const useUpdateDepartment: () => {
    run(): Promise<void>;
};
export declare const Department: React.FC;
