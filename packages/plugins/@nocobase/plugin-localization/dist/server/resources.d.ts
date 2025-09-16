/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Cache } from '@nocobase/cache';
import { Database, Transaction } from '@nocobase/database';
export default class Resources {
    cache: Cache;
    db: Database;
    constructor(db: Database, cache: Cache);
    getTexts(transaction?: Transaction): Promise<any>;
    getTranslations(locale: string): Promise<any>;
    getResources(locale: string): Promise<{}>;
    filterExists(texts: {
        text: string;
        module: string;
    }[], transaction?: Transaction): Promise<{
        text: string;
        module: string;
    }[]>;
    updateCacheTexts(texts: any[], transaction?: Transaction): Promise<void>;
    reset(): Promise<void>;
}
