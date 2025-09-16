/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CountOptions, FindAndCountOptions, FindOptions, Model, Repository } from '@nocobase/database';
import { TreeCollection } from './tree-collection';
export declare class AdjacencyListRepository extends Repository {
    collection: TreeCollection;
    update(options: any): Promise<any>;
    buildRootNodeDataMap(nodeData: Model[]): {
        [key: string]: Set<string>;
    };
    buildTree(paths: Model[], options?: FindOptions & {
        addIndex?: boolean;
    }, rootNodes?: Model[]): Promise<Model<any, any>[]>;
    findWithoutFilter(options?: FindOptions & {
        addIndex?: boolean;
    }): Promise<any>;
    countWithoutFilter(options: CountOptions & {
        raw?: boolean;
        tree?: boolean;
    }): Promise<number>;
    filterAndGetPaths(options?: FindOptions & {
        addIndex?: boolean;
    }): Promise<{
        filterNodes: Model[];
        paths: Model[];
    }>;
    find(options?: FindOptions & {
        addIndex?: boolean;
    }): Promise<any>;
    countByPaths(paths: Model[]): number;
    count(countOptions?: CountOptions & {
        raw?: boolean;
        tree?: boolean;
    }): Promise<number>;
    findAndCount(options?: FindAndCountOptions & {
        filterByTk?: number | string;
    }): Promise<[Model[], number]>;
    private addIndex;
    private queryPathByNode;
    private queryPathByRoot;
}
