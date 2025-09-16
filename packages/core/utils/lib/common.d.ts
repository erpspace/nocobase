/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const isString: (value: any) => value is string;
export declare const isArray: (value: any) => value is any[];
export declare const isEmpty: (value: unknown) => boolean;
export declare const isPlainObject: (value: any) => boolean;
export declare const hasEmptyValue: (objOrArr: object | any[]) => any;
export declare const nextTick: (fn: () => void) => void;
/**
 * Generic tree node depth-first traversal function
 * @param {Object|Array} tree - The tree structure to traverse
 * @param {Function} callback - The callback function executed for each node, stops traversing and returns the current node when a truthy value is returned
 * @param {Object} options - Configuration options
 * @param {string|Function} options.childrenKey - The property name of child nodes, defaults to 'children', can also be a function
 * @returns {any|undefined} - The found node or undefined
 */
export declare function treeFind<T = any>(tree: T | T[], callback: (node: T) => boolean, options?: {
    childrenKey?: string | ((node: T) => T[] | undefined);
}): T | undefined;
/**
 * Sort a tree structure
 * @param {Array} tree - Tree structure array
 * @param {string|Function} sortBy - Sort field or sort function
 * @param {string} childrenKey - The key name of child nodes, defaults to 'children'
 * @param {boolean} isAsc - Whether to sort in ascending order, defaults to true
 * @returns {Array} - The sorted tree structure
 */
export declare function sortTree(tree: any[], sortBy: string | Function, childrenKey?: string, isAsc?: boolean): any;
export declare function sleep(ms: number): Promise<void>;
