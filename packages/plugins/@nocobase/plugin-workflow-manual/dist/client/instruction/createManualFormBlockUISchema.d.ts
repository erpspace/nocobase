/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function createManualFormBlockUISchema(options: any): import("@formily/json-schema").Stringify<{
    [key: symbol]: any;
    [key: `x-${string}`]: any;
    [key: `x-${number}`]: any;
    version?: string;
    name?: import("@formily/json-schema").SchemaKey;
    title?: any;
    description?: any;
    default?: any;
    readOnly?: boolean;
    writeOnly?: boolean;
    type?: import("@formily/json-schema").SchemaTypes;
    enum?: import("@formily/json-schema").SchemaEnum<any>;
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
    definitions?: import("@formily/json-schema").SchemaProperties<any, any, any, any, any, any, any, any>;
    properties?: import("@formily/json-schema").SchemaProperties<any, any, any, any, any, any, any, any>;
    items?: import("@formily/json-schema").SchemaItems<any, any, any, any, any, any, any, any>;
    additionalItems?: import("@formily/json-schema").Stringify<any>;
    patternProperties?: import("@formily/json-schema").SchemaProperties<any, any, any, any, any, any, any, any>;
    additionalProperties?: import("@formily/json-schema").Stringify<any>;
    "x-value"?: any;
    "x-index"?: number;
    "x-pattern"?: any;
    "x-display"?: any;
    "x-validator"?: any;
    "x-decorator"?: any;
    "x-decorator-props"?: any;
    "x-component"?: any;
    "x-component-props"?: any;
    "x-reactions"?: import("@formily/json-schema").SchemaReactions<any>;
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
