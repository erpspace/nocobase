/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    calendar: (options: any) => {
        fields: ({
            name: string;
            type: string;
            interface?: undefined;
            uiSchema?: undefined;
        } | {
            name: string;
            type: string;
            interface: string;
            uiSchema?: undefined;
        } | {
            name: string;
            type: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-component-props': string;
                enum: {
                    label: string;
                    value: string;
                }[];
            };
            interface: string;
        })[];
    };
    tree: (options: any) => {
        tree: string;
        fields: ({
            interface: string;
            name: string;
            type: string;
            isForeignKey: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty': boolean;
                'x-component-props'?: undefined;
            };
            foreignKey?: undefined;
            treeParent?: undefined;
            onDelete?: undefined;
            target?: undefined;
            treeChildren?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            foreignKey: string;
            treeParent: boolean;
            onDelete: string;
            target: any;
            uiSchema: {
                title: string;
                'x-component': string;
                'x-component-props': {
                    multiple: boolean;
                    fieldNames: {
                        label: string;
                        value: string;
                    };
                };
                type?: undefined;
                'x-read-pretty'?: undefined;
            };
            isForeignKey?: undefined;
            treeChildren?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            foreignKey: string;
            treeChildren: boolean;
            onDelete: string;
            target: any;
            uiSchema: {
                title: string;
                'x-component': string;
                'x-component-props': {
                    multiple: boolean;
                    fieldNames: {
                        label: string;
                        value: string;
                    };
                };
                type?: undefined;
                'x-read-pretty'?: undefined;
            };
            isForeignKey?: undefined;
            treeParent?: undefined;
        })[];
    };
    general: () => {};
    file: (options: any) => {
        template: string;
        fields: ({
            interface: string;
            type: string;
            name: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty'?: undefined;
                'x-component-props'?: undefined;
            };
            field?: undefined;
            comment?: undefined;
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty': boolean;
                'x-component-props'?: undefined;
            };
            field?: undefined;
            comment?: undefined;
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty': boolean;
                'x-component-props': {
                    stringMode: boolean;
                    step: string;
                };
            };
            field?: undefined;
            comment?: undefined;
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            field: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty': boolean;
                'x-component-props'?: undefined;
            };
            comment?: undefined;
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            comment: string;
            type: string;
            name: string;
            target: string;
            foreignKey: string;
            deletable: boolean;
            interface?: undefined;
            uiSchema?: undefined;
            field?: undefined;
            defaultValue?: undefined;
        } | {
            type: string;
            name: string;
            deletable: boolean;
            defaultValue: {};
            interface?: undefined;
            uiSchema?: undefined;
            field?: undefined;
            comment?: undefined;
            target?: undefined;
            foreignKey?: undefined;
        })[];
    };
    expression: () => {
        template: string;
        fields: ({
            name: string;
            type: string;
            interface: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                enum: {
                    value: string;
                    label: string;
                    tooltip: string;
                    link: string;
                }[];
                default: string;
                'x-component-props'?: undefined;
            };
        } | {
            name: string;
            type: string;
            interface: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-component-props': {};
                enum?: undefined;
                default?: undefined;
            };
        } | {
            name: string;
            type: string;
            interface: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                enum?: undefined;
                default?: undefined;
                'x-component-props'?: undefined;
            };
        })[];
    };
};
export default _default;
