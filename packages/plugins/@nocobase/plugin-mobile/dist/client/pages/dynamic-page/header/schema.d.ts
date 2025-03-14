/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const mobilePageHeaderSchema: {
    type: string;
    'x-component': string;
    properties: {
        pageNavigationBar: {
            type: string;
            'x-component': string;
            properties: {
                actionBar: {
                    type: string;
                    'x-component': string;
                    'x-initializer': string;
                    'x-component-props': {
                        spaceProps: {
                            style: {
                                flexWrap: string;
                            };
                        };
                    };
                    properties: {};
                };
            };
        };
        pageTabs: {
            type: string;
            'x-component': string;
        };
    };
};
