/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionField } from './collection-field';
import { CollectionOptions, ICollection, ICollectionManager, IField, IRepository } from './types';
export declare class Collection implements ICollection {
    protected options: CollectionOptions;
    collectionManager: ICollectionManager;
    repository: IRepository;
    fields: Map<string, IField>;
    constructor(options: CollectionOptions, collectionManager: ICollectionManager);
    get name(): string;
    get filterTargetKey(): string | string[];
    updateOptions(options: CollectionOptions, mergeOptions?: any): this;
    setFields(fields: any[]): void;
    setField(name: string, options: any): CollectionField;
    removeField(name: string): void;
    getField(name: string): IField;
    getFieldByField(field: string): IField;
    getFields(): IField[];
    protected setRepository(repository: any): void;
}
