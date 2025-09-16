/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Database, { Collection, MagicAttributeModel, Transactionable } from '@nocobase/database';
interface LoadOptions extends Transactionable {
    skipExist?: boolean;
}
export declare class FieldModel extends MagicAttributeModel {
    get db(): Database;
    isAssociationField(): boolean;
    load(loadOptions?: LoadOptions): Promise<import("@nocobase/database").Field>;
    syncSortByField(options: Transactionable): Promise<void>;
    remove(options?: any): Promise<void>;
    syncUniqueIndex(options: Transactionable): Promise<void>;
    syncDefaultValue(options: Transactionable & {
        defaultValue: any;
    }): Promise<void>;
    syncReferenceCheckOption(options: Transactionable): Promise<void>;
    protected getFieldCollection(): Collection | null;
    toJSON(): any;
}
export {};
