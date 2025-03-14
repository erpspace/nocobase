/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const addNew: {
    type: string;
    'x-component': string;
    'x-action': string;
    title: string;
    'x-component-props': {
        className: string;
    };
    properties: {
        tabs: {
            type: string;
            'x-component': string;
            'x-component-props': {};
            'x-initializer': string;
            'x-initializer-props': {
                gridInitializer: string;
            };
            properties: {
                tab1: {
                    type: string;
                    title: string;
                    'x-component': string;
                    'x-designer': string;
                    'x-component-props': {};
                    properties: {
                        grid: {
                            type: string;
                            'x-component': string;
                            'x-initializer': string;
                            properties: {};
                        };
                    };
                };
            };
        };
    };
};
export { addNew };
