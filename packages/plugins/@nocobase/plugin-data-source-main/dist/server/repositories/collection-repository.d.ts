/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Repository } from '@nocobase/database';
interface LoadOptions {
    filter?: any;
    skipExist?: boolean;
}
export declare class CollectionRepository extends Repository {
    private app;
    setApp(app: any): void;
    load(options?: LoadOptions): Promise<void>;
    db2cm(collectionName: string): Promise<void>;
}
export {};
