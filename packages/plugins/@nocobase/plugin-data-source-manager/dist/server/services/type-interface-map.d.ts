/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const typeInterfaceMap: {
    array: () => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                autoSize: {
                    minRows: number;
                };
            };
            default: any;
        };
    };
    belongsTo: string;
    belongsToMany: string;
    boolean: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
        };
    };
    context: string;
    date: () => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                dateFormat: string;
                showTime: boolean;
            };
        };
    };
    hasMany: string;
    hasOne: string;
    json: () => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                autoSize: {
                    minRows: number;
                };
            };
            default: any;
        };
    };
    jsonb: () => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                autoSize: {
                    minRows: number;
                };
            };
            default: any;
        };
    };
    integer: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                stringMode: boolean;
                step: string;
            };
            'x-validator': string;
        };
    };
    bigInt: (columnInfo: any) => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                style: {
                    width: string;
                };
            };
        };
    };
    float: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                stringMode: boolean;
                step: string;
            };
        };
    };
    double: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                stringMode: boolean;
                step: string;
            };
        };
    };
    real: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                stringMode: boolean;
                step: string;
            };
        };
    };
    decimal: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                stringMode: boolean;
                step: string;
            };
        };
    };
    password: () => {
        interface: string;
        hidden: boolean;
        uiSchema: {
            type: string;
            'x-component': string;
        };
    };
    radio: string;
    set: string;
    sort: string;
    string: () => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                style: {
                    width: string;
                };
            };
        };
    };
    text: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
        };
    };
    time: () => {
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                format: string;
            };
        };
    };
    uid: () => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                style: {
                    width: string;
                };
            };
        };
    };
    uuid: () => {
        interface: string;
        uiSchema: {
            'x-component': string;
            'x-component-props': {
                style: {
                    width: string;
                };
            };
        };
    };
    virtual: string;
    point: string;
    polygon: string;
    lineString: string;
    circle: string;
};
export default typeInterfaceMap;
