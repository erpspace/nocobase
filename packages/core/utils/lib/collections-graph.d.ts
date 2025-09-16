/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
type BuildGraphOptions = {
    direction?: 'forward' | 'reverse';
    collections: any[];
};
export declare class CollectionsGraph {
    static graphlib(): any;
    static connectedNodes(options: BuildGraphOptions & {
        nodes: Array<string>;
        excludes?: Array<string>;
    }): unknown[];
    static preOrder(options: BuildGraphOptions & {
        node: string;
    }): any;
    static build(options: BuildGraphOptions): any;
}
export {};
