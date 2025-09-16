/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
export declare const detailFromProperties: {
    id: {
        'x-component': string;
        'x-decorator': string;
        'x-disabled': boolean;
        'x-read-pretty': boolean;
    };
    channelName: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
    };
    channelTitle: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
    };
    notificationType: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
    };
    triggerFrom: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
    };
    status: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
    };
    message: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
    };
    reason: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
        'x-reactions': {
            dependencies: string[];
            fulfill: {
                state: {
                    visible: string;
                };
            };
        }[];
    };
    createdAt: {
        'x-component': string;
        'x-decorator': string;
        'x-read-pretty': boolean;
        'x-component-props': {
            dateFormat: string;
            showTime: boolean;
            timeFormat: string;
        };
    };
};
export declare const messageLogsManagerSchema: ISchema;
