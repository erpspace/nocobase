/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function getMobilePageContentSchema(firstTabUid: string): {
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
export declare function getPageContentTabSchema(pageSchemaUid: string): {
    type: string;
    'x-uid': string;
    'x-async': boolean;
    'x-component': string;
    'x-component-props': {
        showDivider: boolean;
    };
    'x-initializer': string;
};
