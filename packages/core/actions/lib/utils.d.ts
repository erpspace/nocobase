/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { MultipleRelationRepository, Repository } from '@nocobase/database';
import { Context } from '.';
export declare function pageArgsToLimitArgs(page: number, pageSize: number): {
    offset: number;
    limit: number;
};
export declare function getRepositoryFromParams(ctx: Context): Repository<any, any> | MultipleRelationRepository;
export declare function RelationRepositoryActionBuilder(method: 'remove' | 'set'): (ctx: Context, next: any) => Promise<void>;
