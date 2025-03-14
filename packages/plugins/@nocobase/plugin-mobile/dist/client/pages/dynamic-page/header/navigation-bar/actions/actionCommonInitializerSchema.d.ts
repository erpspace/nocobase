/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
export declare const actionCommonInitializerSchema: {
    title: {
        type: string;
        title: string;
        'x-decorator': string;
        'x-component': string;
        'x-reactions': {
            target: string;
            fulfill: {
                state: {
                    required: string;
                };
            };
        }[];
    };
    icon: {
        type: string;
        title: string;
        'x-decorator': string;
        'x-component': string;
        'x-reactions': {
            target: string;
            fulfill: {
                state: {
                    required: string;
                };
            };
        }[];
    };
    color: {
        type: string;
        title: string;
        'x-decorator': string;
        'x-component': import("react").ForwardRefExoticComponent<Omit<Partial<any>, "ref"> & import("react").RefAttributes<unknown>>;
    };
    fill: {
        type: string;
        title: string;
        'x-decorator': string;
        'x-component': import("react").ForwardRefExoticComponent<Omit<Partial<any>, "ref"> & import("react").RefAttributes<unknown>>;
        'x-reactions': {
            dependencies: string[];
            fulfill: {
                state: {
                    visible: string;
                };
            };
        }[];
    };
};
