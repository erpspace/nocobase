/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { AliasToken, MapToken, SeedToken } from 'antd/es/theme/interface';
export type PureAliasToken = Omit<AliasToken, keyof MapToken>;
type SeedRelatedMap = {
    [key in keyof SeedToken]?: (keyof MapToken)[];
};
type SeedRelatedAlias = {
    [key in keyof SeedToken]?: (keyof PureAliasToken)[];
};
type MapRelatedAlias = {
    [key in keyof MapToken]?: (keyof PureAliasToken)[];
};
export declare function sortToken<T extends (keyof AliasToken)[]>(arr: T): T;
export declare const seedRelatedMap: SeedRelatedMap;
export declare const mapRelatedAlias: MapRelatedAlias;
export declare const seedRelatedAlias: SeedRelatedAlias;
export {};
