/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { RegisterChannelOptions } from './types';
export declare const NotificationTypeNameContext: React.Context<{
    name: string;
    setName: (name: string) => void;
}>;
export declare const NotificationTypesContext: React.Context<{
    channelTypes: Array<RegisterChannelOptions>;
}>;
export declare const useChannelTypes: () => RegisterChannelOptions[];
export declare function useNotificationTypeNameProvider(): {
    name: string;
    setName: React.Dispatch<React.SetStateAction<string>>;
    NotificationTypeNameProvider: ({ children }: {
        children: any;
    }) => React.JSX.Element;
};
