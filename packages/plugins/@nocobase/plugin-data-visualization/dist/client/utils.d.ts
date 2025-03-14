/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SelectedField } from './configure';
import { FieldOption } from './hooks';
import { QueryProps } from './renderer';
export declare const createRendererSchema: (decoratorProps: any, componentProps?: {}) => {
    type: string;
    'x-decorator': string;
    'x-decorator-props': any;
    'x-acl-action': string;
    'x-designer': string;
    'x-component': string;
    'x-component-props': {
        size: string;
        title: any;
        bordered: any;
    };
    'x-initializer': string;
    properties: {
        [x: string]: {
            type: string;
            'x-decorator': string;
            'x-decorator-props': {
                style: {
                    position: string;
                    top: number;
                    right: number;
                    zIndex: number;
                };
            };
            'x-component': string;
            'x-component-props': {
                style: {
                    marginRight: string;
                    marginTop: string;
                };
            };
            'x-initializer': string;
        } | {
            type: string;
            'x-component': string;
            'x-component-props': {};
            'x-decorator'?: undefined;
            'x-decorator-props'?: undefined;
            'x-initializer'?: undefined;
        };
        actions: {
            type: string;
            'x-decorator': string;
            'x-decorator-props': {
                style: {
                    position: string;
                    top: number;
                    right: number;
                    zIndex: number;
                };
            };
            'x-component': string;
            'x-component-props': {
                style: {
                    marginRight: string;
                    marginTop: string;
                };
            };
            'x-initializer': string;
        };
    };
};
export declare const parseField: (field: string | string[]) => {
    target: string;
    name: string;
    alias: string;
};
export declare const getField: (fields: FieldOption[], field: string | string[]) => FieldOption;
export declare const getSelectedFields: (fields: FieldOption[], query: QueryProps) => {
    key: string;
    label: string;
    value: string;
    query: SelectedField;
    alias?: string;
    name?: string;
    type?: string;
    interface?: string;
    uiSchema?: import("@formily/react").Stringify<{
        [key: symbol]: any;
        [key: `x-${string}`]: any;
        [key: `x-${number}`]: any;
        version?: string;
        name?: import("@formily/react").SchemaKey;
        title?: any;
        description?: any;
        default?: any;
        readOnly?: boolean;
        writeOnly?: boolean;
        type?: import("@formily/react").SchemaTypes;
        enum?: import("@formily/react").SchemaEnum<any>;
        const?: any;
        multipleOf?: number;
        maximum?: number;
        exclusiveMaximum?: number;
        minimum?: number;
        exclusiveMinimum?: number;
        maxLength?: number;
        minLength?: number;
        pattern?: string | RegExp;
        maxItems?: number;
        minItems?: number;
        uniqueItems?: boolean;
        maxProperties?: number;
        minProperties?: number;
        required?: string | boolean | string[];
        format?: string;
        $ref?: string;
        $namespace?: string;
        definitions?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        properties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        items?: import("@formily/react").SchemaItems<any, any, any, any, any, any, any, any>;
        additionalItems?: import("@formily/react").Stringify<any>;
        patternProperties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        additionalProperties?: import("@formily/react").Stringify<any>;
        "x-value"?: any;
        "x-index"?: number;
        "x-pattern"?: any;
        "x-display"?: any;
        "x-validator"?: any;
        "x-decorator"?: any;
        "x-decorator-props"?: any;
        "x-component"?: any;
        "x-component-props"?: any;
        "x-reactions"?: import("@formily/react").SchemaReactions<any>;
        "x-content"?: any;
        "x-data"?: any;
        "x-visible"?: boolean;
        "x-hidden"?: boolean;
        "x-disabled"?: boolean;
        "x-editable"?: boolean;
        "x-read-only"?: boolean;
        "x-read-pretty"?: boolean;
        "x-compile-omitted"?: string[];
    }>;
    target?: string;
    targetFields?: FieldOption[];
}[];
export declare const processData: (selectedFields: (FieldOption & {
    query?: any;
})[], data: any[], scope: any) => {}[];
export declare const removeUnparsableFilter: (filter: any) => any;
export declare const getValuesByPath: (values: any, path: string) => any;
export declare const getFormulaComponent: (type: string) => string;
export declare const getFormulaInterface: (type: string) => string;
