/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export interface RegistryOptions {
    override: boolean;
}
export declare class Registry<T> {
    private map;
    options: RegistryOptions;
    constructor(options?: RegistryOptions);
    register(key: string, value: T): void;
    get(key: string): T;
    getKeys(): Iterable<string>;
    getValues(): Iterable<T>;
    getEntities(): Iterable<[string, T]>;
}
export default Registry;
