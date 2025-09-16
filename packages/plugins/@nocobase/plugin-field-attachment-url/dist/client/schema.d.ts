/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    Selector: {
        type: string;
        'x-component': string;
        title: string;
        'x-component-props': {
            className: string;
        };
        properties: {
            grid: {
                type: string;
                'x-component': string;
                'x-initializer': string;
                properties: {};
            };
            footer: {
                'x-component': string;
                'x-component-props': {};
                properties: {
                    actions: {
                        type: string;
                        'x-component': string;
                        'x-component-props': {};
                        properties: {
                            submit: {
                                title: string;
                                'x-action': string;
                                'x-component': string;
                                'x-use-component-props': string;
                                'x-toolbar': string;
                                'x-settings': string;
                                'x-component-props': {
                                    type: string;
                                    htmlType: string;
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
export default _default;
