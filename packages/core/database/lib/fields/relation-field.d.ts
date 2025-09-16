/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseFieldOptions, Field } from './field';
export type BaseRelationFieldOptions = BaseFieldOptions;
export interface MultipleRelationFieldOptions extends BaseRelationFieldOptions {
    sortBy?: string | string[];
}
export declare abstract class RelationField extends Field {
    /**
     * target relation name
     */
    get target(): any;
    get foreignKey(): any;
    get sourceKey(): any;
    get targetKey(): any;
    /**
     * get target model from database by it's name
     * @constructor
     */
    get TargetModel(): import("sequelize").ModelCtor<import("sequelize").Model<any, any>>;
    targetCollection(): import("..").Collection<any, any>;
    isRelationField(): boolean;
    keyPairsTypeMatched(type1: any, type2: any): boolean;
    protected clearAccessors(): void;
}
