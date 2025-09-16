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
import { CompatibleSchemaInitializer, SchemaInitializerItemType } from '@nocobase/client';
import { JOB_STATUS } from '@nocobase/plugin-workflow/client';
type ValueOf<T> = T[keyof T];
export type FormType = {
    type: 'create' | 'update' | 'custom';
    title: string;
    actions: ValueOf<typeof JOB_STATUS>[];
    collection: string | {
        name: string;
        fields: any[];
        [key: string]: any;
    };
};
export type ManualFormType = {
    title: string;
    config: {
        useInitializer: ({ allCollections }?: {
            allCollections: any[];
        }) => SchemaInitializerItemType;
        initializers?: {
            [key: string]: React.FC;
        };
        components?: {
            [key: string]: React.FC;
        };
        parseFormOptions(root: ISchema): {
            [key: string]: FormType;
        };
    };
    block: {
        scope?: {
            [key: string]: () => any;
        };
        components?: {
            [key: string]: React.FC;
        };
    };
    validate?: (config: any) => string | null;
};
export declare const manualFormTypes: any;
/**
 * @deprecated
 * use `addBlockButton` instead
 */
export declare const addBlockButton_deprecated: CompatibleSchemaInitializer;
export declare const addBlockButton: CompatibleSchemaInitializer;
/**
 * @deprecated
 * use `addActionButton` instead
 */
export declare const addActionButton_deprecated: CompatibleSchemaInitializer;
export declare const addActionButton: CompatibleSchemaInitializer;
export declare function SchemaConfig({ value, onChange }: {
    value: any;
    onChange: any;
}): React.JSX.Element;
export declare function SchemaConfigButton(props: any): React.JSX.Element;
export {};
