/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const getNewSchema: () => {
    title: string;
    'x-component': string;
    'x-action': string;
    'x-toolbar': string;
    'x-settings': string;
    'x-decorator': string;
    'x-uid': string;
    'x-action-settings': {
        onSuccess: {
            manualClose: boolean;
            redirecting: boolean;
            successMessage: string;
        };
    };
};
export declare const CustomRequestInitializer: React.FC<any>;
