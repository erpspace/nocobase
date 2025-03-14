/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export type VariableOption = {
    key?: string;
    value?: string;
    label?: string;
    children?: VariableOption[] | null;
    [key: string]: any;
};
export type VariableDataType = 'boolean' | 'number' | 'string' | 'date' | {
    type: 'reference';
    options: {
        collection: string;
        multiple?: boolean;
        entity?: boolean;
    };
} | ((field: any) => boolean);
export type UseVariableOptions = {
    types?: VariableDataType[];
    fieldNames?: {
        label?: string;
        value?: string;
        children?: string;
    };
    appends?: string[] | null;
    depth?: number;
};
export declare const defaultFieldNames: {
    readonly label: "label";
    readonly value: "value";
    readonly children: "children";
};
export declare const nodesOptions: {
    label: string;
    value: string;
    useOptions(options: UseVariableOptions): VariableOption[];
};
export declare const triggerOptions: {
    label: string;
    value: string;
    useOptions(options: UseVariableOptions): any;
};
export declare const scopeOptions: {
    label: string;
    value: string;
    useOptions(options: UseVariableOptions & {
        current: any;
    }): VariableOption[];
};
export declare const systemOptions: {
    label: string;
    value: string;
    useOptions(options: UseVariableOptions): any;
};
/**
 * @deprecated
 */
export declare const BaseTypeSets: {
    boolean: Set<string>;
    number: Set<string>;
    string: Set<string>;
    date: Set<string>;
};
export declare function useWorkflowVariableOptions(options?: UseVariableOptions): any[];
export declare function getCollectionFieldOptions(options: any): VariableOption[];
export declare function useGetCollectionFields(dataSourceName?: any): (collectionName: any) => import("@nocobase/client").CollectionFieldOptions[];
export declare function WorkflowVariableInput({ variableOptions, ...props }: {
    [x: string]: any;
    variableOptions: any;
}): JSX.Element;
export declare function WorkflowVariableTextArea({ variableOptions, ...props }: {
    [x: string]: any;
    variableOptions: any;
}): JSX.Element;
export declare function WorkflowVariableRawTextArea({ variableOptions, ...props }: {
    [x: string]: any;
    variableOptions: any;
}): JSX.Element;
export declare function WorkflowVariableJSON({ variableOptions, ...props }: {
    [x: string]: any;
    variableOptions: any;
}): JSX.Element;
/**
 * @experimental
 */
export declare function WorkflowVariableWrapper(props: any): JSX.Element;
/**
 * @experimental
 */
export declare const HideVariableContext: React.Context<boolean>;
/**
 * @experimental
 */
export declare function useHideVariable(): boolean;
