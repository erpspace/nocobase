/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import React from 'react';
interface ColorFunctions {
    loading: boolean;
    getFontColor: (value: any) => string;
    getBackgroundColor: (value: any) => string;
}
type TitleRendererProps = {
    value: any;
};
export declare class PluginCalendarClient extends Plugin {
    titleFieldInterfaces: {
        [T: string]: {
            TitleRenderer: React.FC<TitleRendererProps>;
        };
    };
    colorFieldInterfaces: {
        [T: string]: {
            useGetColor: (field: any) => ColorFunctions;
        };
    };
    dateTimeFieldInterfaces: string[];
    registerTitleFieldInterface(key: string, options: {
        TitleRenderer: React.FC<TitleRendererProps>;
    }): void;
    getTitleFieldInterface(key: string): {
        TitleRenderer: React.FC<TitleRendererProps>;
    } | {
        [T: string]: {
            TitleRenderer: React.FC<TitleRendererProps>;
        };
    };
    registerDateTimeFieldInterface(data: string | string[]): void;
    registerColorFieldInterface(type: any, option: {
        useGetColor: (field: any) => ColorFunctions;
    }): void;
    getColorFieldInterface(type: string): {
        useGetColor: (field: any) => ColorFunctions;
    };
    load(): Promise<void>;
}
export default PluginCalendarClient;
