/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
import { SchemaSettings } from '@nocobase/client';
export declare const defaultZoomLevel: {
    name: string;
    Component: import("react").FC<import("@nocobase/client").SchemaSettingsModalItemProps>;
    useComponentProps(): {
        title: string;
        schema: import("@formily/react").Stringify<{
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
        onSubmit: ({ zoom }: {
            zoom: any;
        }) => void;
    };
    useVisible(): boolean;
};
export declare const mapBlockSettings: SchemaSettings<{}>;
