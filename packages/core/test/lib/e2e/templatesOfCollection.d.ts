/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionSetting } from './e2eUtils';
/**
 * 创建一个名为 general 的 collection，其包含所有类型的字段
 */
export declare const general: CollectionSetting[];
/**
 * 创建一个名为 general 的 collection，其包含所有 basic 类型的字段
 */
export declare const generalWithBasic: CollectionSetting[];
/**
 * 创建一个名为 general 的 collection，其包含所有 choices 类型的字段
 */
export declare const generalWithChoices: CollectionSetting[];
/**
 * 创建一个名为 general 的 collection，其包含所有 media 类型的字段
 */
export declare const generalWithMedia: CollectionSetting[];
/**
 * 创建一个名为 general 的 collection，其包含所有 datetime 类型的字段
 */
export declare const generalWithDatetime: CollectionSetting[];
/**
 * 创建一个名为 general 的 collection，其包含所有 relation 类型的字段
 */
export declare const generalWithAssociation: CollectionSetting[];
/**
 * 创建一个名为 general 的 collection，其包含所有 advanced 类型的字段
 */
export declare const generalWithAdvanced: CollectionSetting[];
/**
 * 创建一个名为 general 的 collection，其包含所有 systemInfo 类型的字段
 */
export declare const generalWithSystemInfo: CollectionSetting[];
export declare const generalWithSingleLineText: CollectionSetting[];
/**
 * 1. 创建一个名为 general 的 collection，其包含 m2o / o2m / single select 类型的字段
 */
export declare const generalWithM2oSingleSelect: CollectionSetting[];
export declare const tree: CollectionSetting[];
export declare const generalWithMultiLevelM2oFields: CollectionSetting[];
export declare const generalWithMultiLevelM2mFields: CollectionSetting[];
