/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Cache } from '@nocobase/cache';
import { Registry } from '@nocobase/utils';
import Application from '../application';
export interface ResourceStorer {
    getResources(lang: string): Promise<{
        [ns: string]: Record<string, string>;
    }>;
    reset?: () => Promise<void>;
}
export declare class Locale {
    app: Application;
    cache: Cache;
    defaultLang: string;
    localeFn: Map<any, any>;
    resourceCached: Map<any, any>;
    i18nInstances: Map<any, any>;
    resourceStorers: Registry<ResourceStorer>;
    constructor(app: Application);
    load(): Promise<void>;
    reset(): Promise<void>;
    reload(): Promise<void>;
    setLocaleFn(name: string, fn: (lang: string) => Promise<any>): void;
    registerResourceStorer(name: string, storer: ResourceStorer): void;
    get(lang: string): Promise<{
        resources: any;
    }>;
    wrapCache(key: string, fn: () => any): Promise<any>;
    loadResourcesByLang(lang: string): Promise<void>;
    getCacheResources(lang: string): Promise<any>;
    getResources(lang: string): Promise<{}>;
    getI18nInstance(lang: string): Promise<any>;
}
