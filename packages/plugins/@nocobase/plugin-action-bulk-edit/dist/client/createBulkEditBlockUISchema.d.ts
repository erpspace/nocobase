/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
/**
 * 创建批量编辑表单的 UI Schema
 * @returns
 */
export declare function createBulkEditBlockUISchema(options: {
    collectionName: string;
    dataSource: string;
    association?: string;
}): ISchema;
