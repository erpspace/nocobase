/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
import React from 'react';
export type SelectedField = {
    field: string | string[];
    alias?: string;
};
export declare const ChartConfigure: React.FC<{
    insert: (s: ISchema, options: {
        onSuccess: () => void;
        wrap?: (schema: ISchema) => ISchema;
    }) => void;
}> & {
    Renderer: React.FC;
    Config: React.FC;
    Query: React.FC;
    Transform: React.FC;
    Data: React.FC;
};
