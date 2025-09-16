/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare class TableNode {
    name: string;
    parents: Set<TableNode>;
    children: Set<TableNode>;
    constructor(name: string);
}
export default class InheritanceMap {
    nodes: Map<string, TableNode>;
    removeNode(name: string): void;
    getOrCreateNode(name: string): TableNode;
    getNode(name: string): TableNode;
    setInheritance(name: string, inherits: string | string[]): void;
    isParentNode(name: string): boolean;
    getChildren(name: string, options?: {
        deep: boolean;
    }): Set<string>;
    getParents(name: string, options?: {
        deep: boolean;
    }): Set<string>;
}
export {};
