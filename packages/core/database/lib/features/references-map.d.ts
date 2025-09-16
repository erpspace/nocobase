/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Database from '../database';
export type ReferencePriority = 'default' | 'user';
export interface Reference {
    sourceCollectionName: string;
    sourceField: string;
    targetField: string;
    targetCollectionName: string;
    onDelete: string;
    priority: ReferencePriority;
}
export declare function buildReference(options: Partial<Reference>): Reference;
declare class ReferencesMap {
    private db;
    protected map: Map<string, Reference[]>;
    constructor(db: Database);
    addReference(reference: Reference): void;
    getReferences(collectionName: any): Reference[];
    existReference(reference: Reference): Reference;
    removeReference(reference: Reference): void;
}
export default ReferencesMap;
