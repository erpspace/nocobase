/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
import { TreeManagerOptions } from './tree-manager';
type DepartmentManagerOptions = {
    resource?: string;
    resourceOf?: string;
    params?: any;
} & TreeManagerOptions;
export declare const useDepartmentManager: (options?: DepartmentManagerOptions) => {
    loadData: ({ key, children }: {
        key: any;
        children: any;
    }) => Promise<void>;
    getByKeyword: (keyword: string) => Promise<void>;
    initData: (data: any[]) => void;
    treeData: any[];
    setTreeData: import("react").Dispatch<import("react").SetStateAction<any[]>>;
    nodeMap: {};
    updateTreeData: (key: any, children: any[]) => any;
    constructTreeData: (nodeMap: {
        [parentId: string]: any;
        [parentId: number]: any;
    }) => any;
    getChildrenIds: (id: any) => any[];
    loadedKeys: any[];
    setLoadedKeys: import("react").Dispatch<import("react").SetStateAction<any[]>>;
    expandedKeys: any[];
    setExpandedKeys: import("react").Dispatch<import("react").SetStateAction<any[]>>;
};
export {};
