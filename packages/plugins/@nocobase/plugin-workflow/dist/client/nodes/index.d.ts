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
import { SchemaInitializerItemType } from '@nocobase/client';
import WorkflowPlugin from '..';
import { UseVariableOptions, VariableOption } from '../variable';
export type NodeAvailableContext = {
    engine: WorkflowPlugin;
    workflow: object;
    upstream: object;
    branchIndex: number;
};
type Config = Record<string, any>;
type Options = {
    label: string;
    value: any;
}[];
export declare abstract class Instruction {
    title: string;
    type: string;
    group: string;
    description?: string;
    icon?: JSX.Element;
    /**
     * @deprecated migrate to `presetFieldset` instead
     */
    options?: {
        label: string;
        value: any;
        key: string;
    }[];
    fieldset: Record<string, ISchema>;
    /**
     * @experimental
     */
    presetFieldset?: Record<string, ISchema>;
    /**
     * To presentation if the instruction is creating a branch
     * @experimental
     */
    branching?: boolean | Options | ((config: Config) => boolean | Options);
    /**
     * @experimental
     */
    view?: ISchema;
    scope?: Record<string, any>;
    components?: Record<string, any>;
    Component?(props: any): JSX.Element;
    /**
     * @experimental
     */
    createDefaultConfig?(): Config;
    useVariables?(node: any, options?: UseVariableOptions): VariableOption;
    useScopeVariables?(node: any, options?: any): VariableOption[];
    useInitializers?(node: any): SchemaInitializerItemType | null;
    /**
     * @experimental
     */
    isAvailable?(ctx: NodeAvailableContext): boolean;
    end?: boolean | ((node: any) => boolean);
    testable?: boolean;
}
export declare const NodeContext: React.Context<any>;
export declare function useNodeContext(): any;
export declare function useNodeSavedConfig(keys?: any[]): boolean;
/**
 * @experimental
 */
export declare function useAvailableUpstreams(node: any, filter?: any): any[];
/**
 * @experimental
 */
export declare function useUpstreamScopes(node: any): any[];
export declare function Node({ data }: {
    data: any;
}): React.JSX.Element;
export declare function RemoveButton(): React.JSX.Element;
export declare function JobButton(): React.JSX.Element;
export declare function NodeDefaultView(props: any): React.JSX.Element;
export {};
