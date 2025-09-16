/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Association, Includeable, Model, ModelStatic, Transaction } from 'sequelize';
import Database from '../database';
interface EagerLoadingNode {
    model: ModelStatic<any>;
    association: Association;
    attributes: Array<string>;
    rawAttributes: Array<string>;
    children: Array<EagerLoadingNode>;
    parent?: EagerLoadingNode;
    instances?: Array<Model>;
    order?: any;
    where?: any;
    inspectInheritAttribute?: boolean;
    includeOptions?: any;
}
export declare class EagerLoadingTree {
    root: EagerLoadingNode;
    db: Database;
    private rootQueryOptions;
    constructor(root: EagerLoadingNode);
    static buildFromSequelizeOptions(options: {
        model: ModelStatic<any>;
        rootAttributes: Array<string>;
        rootOrder?: any;
        rootQueryOptions?: any;
        includeOption: Includeable | Includeable[];
        db: Database;
    }): EagerLoadingTree;
    load(transaction?: Transaction): Promise<{}>;
}
export {};
