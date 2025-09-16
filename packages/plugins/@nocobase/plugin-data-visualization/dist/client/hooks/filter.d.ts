/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, CollectionFieldInterfaceManager, CollectionManager, SchemaInitializerItemType } from '@nocobase/client';
export declare const useCustomFieldInterface: () => {
    getSchemaByInterface: (fieldInterface: string) => {
        'x-component-props': any;
        version?: string | (string & {});
        name?: import("@formily/react").SchemaKey | (string & {});
        title?: any;
        description?: any;
        default?: any;
        readOnly?: boolean | (string & {});
        writeOnly?: boolean | (string & {});
        type?: import("@formily/react").SchemaTypes;
        enum?: (string & {}) | import("@formily/react").SchemaEnum<any>;
        const?: any;
        multipleOf?: number | (string & {});
        maximum?: number | (string & {});
        exclusiveMaximum?: number | (string & {});
        minimum?: number | (string & {});
        exclusiveMinimum?: number | (string & {});
        maxLength?: number | (string & {});
        minLength?: number | (string & {});
        pattern?: string | RegExp | (string & {});
        maxItems?: number | (string & {});
        minItems?: number | (string & {});
        uniqueItems?: boolean | (string & {});
        maxProperties?: number | (string & {});
        minProperties?: number | (string & {});
        required?: string | boolean | string[] | (string & {});
        format?: string | (string & {});
        $ref?: string | (string & {});
        $namespace?: string | (string & {});
        definitions?: (string & {}) | import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        properties?: (string & {}) | import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        items?: (string & {}) | import("@formily/react").SchemaItems<any, any, any, any, any, any, any, any>;
        additionalItems?: (string & {}) | import("@formily/react").Stringify<{
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
        patternProperties?: (string & {}) | import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
        additionalProperties?: (string & {}) | import("@formily/react").Stringify<{
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
        "x-value"?: any;
        "x-index"?: number | (string & {});
        "x-pattern"?: any;
        "x-display"?: any;
        "x-validator"?: any;
        "x-decorator"?: any;
        "x-decorator-props"?: any;
        "x-component"?: any;
        "x-reactions"?: (string & {}) | import("@formily/react").SchemaReactions<any>;
        "x-content"?: any;
        "x-data"?: any;
        "x-visible"?: boolean | (string & {});
        "x-hidden"?: boolean | (string & {});
        "x-disabled"?: boolean | (string & {});
        "x-editable"?: boolean | (string & {});
        "x-read-only"?: boolean | (string & {});
        "x-read-pretty"?: boolean | (string & {});
        "x-compile-omitted"?: string[] | (string & {});
    };
};
export declare const useChartData: () => {
    chartCollections: {
        [dataSource: string]: string[];
    };
    showDataSource: boolean;
    getIsChartCollectionExists: (dataSource: string, collection: string) => boolean;
};
export declare const useChartFilter: () => {
    filter: () => Promise<void>;
    refresh: () => Promise<void>;
    getChartFilterFields: ({ dataSource, collection, cm, fim, }: {
        dataSource: string;
        collection: Collection;
        cm: CollectionManager;
        fim: CollectionFieldInterfaceManager;
    }) => SchemaInitializerItemType[];
    getFilter: () => {};
    hasFilter: (chart: {
        dataSource: string;
        collection: string;
        query: any;
    }, filterValues: any) => any;
    appendFilter: (chart: {
        dataSource: string;
        collection: string;
        query: any;
    }, filterValues: any) => any;
    getTranslatedTitle: (title: string) => string;
    parseFilter: (filterValue: any) => Promise<any>;
};
export declare const useFilterVariable: () => {
    label: string;
    value: string;
    key: string;
    children: {
        key: string;
        value: string;
        label: string;
    }[];
};
export declare const useChartFilterSourceFields: () => {
    value: string;
    label: any;
    children: {
        value: string;
        label: any;
        children: any[];
    }[];
}[];
export declare const useFieldComponents: () => {
    options: {
        label: string;
        value: string;
    }[];
    values: string[];
};
export declare const useCollectionJoinFieldTitle: (dataSource: string, name: string) => any;
