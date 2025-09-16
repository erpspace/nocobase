/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function getMobilePageSchema(pageSchemaUid: string, firstTabUid: string): {
    schema: {
        type: string;
        name: string;
        'x-uid': string;
        'x-component': string;
        'x-settings': string;
        'x-decorator': string;
        'x-decorator-props': {
            style: {
                height: string;
            };
        };
        'x-toolbar-props': {
            draggable: boolean;
            spaceWrapperStyle: {
                right: number;
                top: number;
            };
            spaceClassName: string;
            toolbarStyle: {
                overflowX: string;
            };
        };
        properties: {
            header: {
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
            content: {
                type: string;
                'x-component': string;
                properties: {
                    [x: string]: {
                        type: string;
                        'x-uid': string;
                        'x-async': boolean;
                        'x-component': string;
                        'x-component-props': {
                            showDivider: boolean;
                        };
                        'x-initializer': string;
                    };
                };
            };
        };
    };
};
