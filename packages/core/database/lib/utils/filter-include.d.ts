/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * Merge a flat list of include descriptors by association (alias) key.
 * - Nodes with the same association are merged into one.
 * - `required` is OR-ed (true if any source is true).
 * - Child includes are recursively merged with the same rules.
 * - Empty `include` arrays are removed to keep the payload minimal.
 *
 * Notes:
 * - Association keys are normalized via snake_case to ensure consistent merging.
 * - This function is idempotent and order-insensitive for equivalent input sets.
 *
 * Usage example (input and output):
 *
 *   const includesA = [
 *     { association: 'posts', required: true, include: [{ association: 'comments' }] },
 *     { association: 'profile' },
 *   ];
 *
 *   const includesB = [
 *     { association: 'posts', include: [
 *         { association: 'comments', required: true },
 *         { association: 'tags' },
 *       ]
 *     },
 *     { association: 'roles', required: true },
 *   ];
 *
 *   const merged = mergeIncludes([...includesA, ...includesB]);
 *
 *   Result:
 *   [
 *     {
 *       association: 'posts',
 *       required: true,
 *       include: [
 *         { association: 'comments', required: true },
 *         { association: 'tags' },
 *       ],
 *     },
 *     { association: 'profile' },
 *     { association: 'roles', required: true },
 *   ]
 */
export declare const mergeIncludes: (includes?: any[]) => any[];
export declare const filterIncludes: (where: any, includes: any, options: {
    underscored: boolean;
}) => any[];
