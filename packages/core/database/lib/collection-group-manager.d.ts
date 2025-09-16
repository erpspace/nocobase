/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseDumpRules, DumpRules } from './collection';
import Database from './database';
type RequiredGroup = 'required';
type SkippedGroup = 'skipped';
export type BuiltInGroup = RequiredGroup | SkippedGroup;
export type DumpRulesGroupType = BuiltInGroup | string;
export interface CollectionGroup {
    collections: string[];
    function: string;
    dataType: DumpRulesGroupType;
    delayRestore?: any;
}
export interface CollectionGroupWithCollectionTitle extends Omit<CollectionGroup, 'collections'> {
    collections: Array<{
        name: string;
        title: string;
    }>;
}
export declare class CollectionGroupManager {
    db: Database;
    constructor(db: Database);
    static unifyDumpRules(dumpRules: DumpRules): (BaseDumpRules & {
        group: DumpRulesGroupType;
    }) | undefined;
}
export {};
