/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Field } from '.';
import { Collection, CollectionContext, CollectionOptions } from './collection';
export declare class InheritedCollection extends Collection {
    parents?: Collection[];
    constructor(options: CollectionOptions, context: CollectionContext);
    getParents(): Collection<any, any>[];
    getFlatParents(): any[];
    parentFields(): Map<string, Field>;
    parentAttributes(): {};
    isInherited(): boolean;
    protected bindParents(): void;
    protected setParents(inherits: string | string[]): void;
    protected setParentFields(): void;
}
