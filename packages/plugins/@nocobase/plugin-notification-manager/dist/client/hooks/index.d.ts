/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export { ChannelTypeMapContext, useChannelTypeMap } from './channel';
export declare const useSubmitActionProps: () => {
    type: string;
    onClick(): Promise<void>;
};
export declare const useEditFormProps: () => {
    form: import("@formily/core").Form<any>;
};
export declare const useCloseActionProps: () => {
    type: string;
    onClick(): void;
};
export declare const NotificationVariableContext: React.Context<any[]>;
export declare const useNotificationVariableOptions: () => {
    scope: any[];
};
export declare const NotificationVariableProvider: ({ value, children }: {
    value: any;
    children: any;
}) => React.JSX.Element;
