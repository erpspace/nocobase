/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { ComponentTokenMap } from 'antd/es/theme/interface';
export interface TokenMeta {
    type: string;
    name: string;
    nameEn: string;
    desc: string;
    descEn: string;
    source: 'seed' | 'map' | 'alias' | 'custom' | keyof ComponentTokenMap;
}
export type TokenMetaMap = Record<string, TokenMeta>;
export type TokenGroup<T> = {
    key: string;
    name: string;
    nameEn: string;
    desc: string;
    descEn: string;
    type?: string;
    seedToken?: T[];
    /** make seedToken can be alpha */
    seedTokenAlpha?: boolean;
    mapToken?: T[];
    aliasToken?: T[];
    groups?: TokenGroup<T>[];
    mapTokenGroups?: string[];
    aliasTokenDescription?: string;
};
export type TokenCategory<T> = {
    name: string;
    nameEn: string;
    desc: string;
    descEn: string;
    groups: TokenGroup<T>[];
};
export type TokenTree<T extends string = string> = TokenCategory<T>[];
