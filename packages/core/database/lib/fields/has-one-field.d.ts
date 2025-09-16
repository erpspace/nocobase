/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AssociationScope, DataType, ForeignKeyOptions, HasOneOptions, HasOneOptions as SequelizeHasOneOptions } from 'sequelize';
import { Reference } from '../features/references-map';
import { BaseRelationFieldOptions, RelationField } from './relation-field';
export interface HasOneFieldOptions extends HasOneOptions {
    /**
     * The name of the field to use as the key for the association in the source table. Defaults to the primary
     * key of the source table
     */
    sourceKey?: string;
    /**
     * A string or a data type to represent the identifier in the table
     */
    keyType?: DataType;
    scope?: AssociationScope;
    /**
     * The alias of this model, in singular form. See also the `name` option passed to `sequelize.define`. If
     * you create multiple associations between the same tables, you should provide an alias to be able to
     * distinguish between them. If you provide an alias when creating the assocition, you should provide the
     * same alias when eager loading and when getting associated models. Defaults to the singularized name of
     * target
     */
    as?: string | {
        singular: string;
        plural: string;
    };
    /**
     * The name of the foreign key in the target table or an object representing the type definition for the
     * foreign column (see `Sequelize.define` for syntax). When using an object, you can add a `name` property
     * to set the name of the column. Defaults to the name of source + primary key of source
     */
    foreignKey?: string | ForeignKeyOptions;
    /**
     * What happens when delete occurs.
     *
     * Cascade if this is a n:m, and set null if it is a 1:m
     *
     * @default 'SET NULL' or 'CASCADE'
     */
    onDelete?: string;
    /**
     * What happens when update occurs
     *
     * @default 'CASCADE'
     */
    onUpdate?: string;
    /**
     * Should on update and on delete constraints be enabled on the foreign key.
     */
    constraints?: boolean;
    foreignKeyConstraint?: boolean;
    /**
     * If `false` the applicable hooks will not be called.
     * The default value depends on the context.
     */
    hooks?: boolean;
}
export declare class HasOneField extends RelationField {
    get dataType(): any;
    get target(): any;
    get foreignKey(): any;
    reference(association: any): Reference;
    checkAssociationKeys(): void;
    bind(): boolean;
    unbind(): void;
}
export interface HasOneFieldOptions extends BaseRelationFieldOptions, SequelizeHasOneOptions {
    type: 'hasOne';
}
