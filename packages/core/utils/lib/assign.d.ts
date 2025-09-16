/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
type MergeStrategyType = 'merge' | 'deepMerge' | 'overwrite' | 'andMerge' | 'orMerge' | 'intersect' | 'union';
type MergeStrategyFunc = (x: any, y: any) => any;
export type MergeStrategy = MergeStrategyType | MergeStrategyFunc;
export interface MergeStrategies {
    [key: string]: MergeStrategy;
}
export declare const mergeStrategies: Map<MergeStrategyType, MergeStrategyFunc>;
export declare function assign(target: any, source: any, strategies?: MergeStrategies): any;
export {};
