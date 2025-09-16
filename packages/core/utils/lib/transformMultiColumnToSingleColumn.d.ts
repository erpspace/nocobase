/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * 将多列布局转换为单列布局
 * @param {Object} schema - 输入的 JSON Schema 对象
 * @param {Function} [ignore] - 可选的忽略函数，用于判断是否忽略某个列
 * @returns {Object} - 转换后的 JSON Schema 对象
 */
export declare const transformMultiColumnToSingleColumn: (schema: any, ignore?: (colSchema: any) => boolean) => any;
