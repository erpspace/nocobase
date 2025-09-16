/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Application } from '@nocobase/server';
import { Database, Model, Transaction } from '@nocobase/database';
export declare function getTreePath(db: Database, model: Model, path: string, collection: string, pathCollectionName: string, transaction?: Transaction): Promise<string>;
export default function (app: Application): void;
