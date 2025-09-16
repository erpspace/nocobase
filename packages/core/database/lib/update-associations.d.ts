/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Association, BelongsToMany, Hookable, Transactionable } from 'sequelize';
import { Model } from './model';
import { TargetKey } from './repository';
export declare function modelAssociations(instance: Model): {
    [key: string]: Association<import("sequelize").Model<any, any>, import("sequelize").Model<any, any>>;
};
export declare function belongsToManyAssociations(instance: Model): Array<BelongsToMany>;
export declare function modelAssociationByKey(instance: Model, key: string): Association & {
    update?: (instance: Model, value: any, options: UpdateAssociationOptions) => Promise<any>;
};
type UpdateValue = {
    [key: string]: any;
};
interface UpdateOptions extends Transactionable {
    filter?: any;
    filterByTk?: TargetKey;
    whitelist?: string[];
    blacklist?: string[];
    updateAssociationValues?: string[];
    sanitized?: boolean;
    sourceModel?: Model;
}
export interface UpdateAssociationOptions extends Transactionable, Hookable {
    updateAssociationValues?: string[];
    sourceModel?: Model;
    context?: any;
    associationContext?: any;
    recursive?: boolean;
}
export declare function updateModelByValues(instance: Model, values: UpdateValue, options?: UpdateOptions): Promise<void>;
export declare function updateThroughTableValue(instance: Model, throughName: string, throughValues: any, source: Model, transaction?: any): Promise<any>;
/**
 * update association of instance by values
 * @param instance
 * @param values
 * @param options
 */
export declare function updateAssociations(instance: Model, values: any, options?: UpdateAssociationOptions): Promise<void>;
/**
 * update model association by key
 * @param instance
 * @param key
 * @param value
 * @param options
 */
export declare function updateAssociation(instance: Model, key: string, value: any, options?: UpdateAssociationOptions): Promise<any>;
/**
 * update belongsTo and HasOne
 * @param model
 * @param key
 * @param value
 * @param options
 */
export declare function updateSingleAssociation(model: Model, key: string, value: any, options?: UpdateAssociationOptions): Promise<boolean>;
/**
 * update multiple association of model by value
 * @param model
 * @param key
 * @param value
 * @param options
 */
export declare function updateMultipleAssociation(model: Model, key: string, value: any, options?: UpdateAssociationOptions): Promise<boolean>;
export {};
