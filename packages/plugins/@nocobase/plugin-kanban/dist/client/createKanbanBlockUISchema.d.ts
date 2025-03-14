/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
export declare const createKanbanBlockUISchema: (options: {
    groupField: string;
    sortField: string;
    dataSource: string;
    params?: Record<string, any>;
    collectionName?: string;
    association?: string;
}) => ISchema;
