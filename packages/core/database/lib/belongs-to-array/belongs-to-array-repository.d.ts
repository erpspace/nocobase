/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transactionable } from 'sequelize/types';
import { Collection } from '../collection';
import { FindOptions } from '../repository';
import { MultipleRelationRepository } from '../relation-repository/multiple-relation-repository';
import Database from '../database';
import { Model } from '../model';
import { UpdateAssociationOptions } from '../update-associations';
export declare class BelongsToArrayAssociation {
    db: Database;
    associationType: string;
    source: Model;
    foreignKey: string;
    targetName: string;
    targetKey: string;
    identifierField: string;
    as: string;
    options: any;
    constructor(options: {
        db: Database;
        source: Model;
        as: string;
        foreignKey: string;
        target: string;
        targetKey: string;
    });
    get target(): import("sequelize/types").ModelStatic<Model<any, any>>;
    generateInclude(parentAs?: string): {
        on: void;
    };
    update(instance: Model, value: any, options?: UpdateAssociationOptions): Promise<void>;
}
export declare class BelongsToArrayRepository extends MultipleRelationRepository {
    private belongsToArrayAssociation;
    constructor(sourceCollection: Collection, association: string, sourceKeyValue: string | number);
    protected getInstance(options: Transactionable): Promise<any>;
    find(options?: FindOptions): Promise<any>;
}
