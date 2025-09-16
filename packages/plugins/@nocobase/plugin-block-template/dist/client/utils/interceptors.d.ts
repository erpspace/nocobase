/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * Register template block related interceptors for axios
 * Handles schema removal and patching operations for template blocks
 * @param apiClient The API client instance
 * @param pageBlocks The template blocks cache
 */
export declare function registerTemplateBlockInterceptors(apiClient: any, pageBlocks: Record<string, any>, savedSchemaUids: Set<string>): void;
