/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AxiosInstance } from 'axios';
import React, { ComponentType } from 'react';
import { Application, ApplicationOptions, SchemaSettings } from '@nocobase/client';
export * from './utils';
type URL = string;
type ResponseData = any;
type MockApis = Record<URL, ResponseData>;
type AppOrOptions = Application | ApplicationOptions;
export declare const mockApi: (axiosInstance: AxiosInstance, apis?: MockApis, delayResponse?: number) => (apis?: MockApis) => void;
export declare const mockAppApi: (app: Application, apis?: MockApis, delayResponse?: number) => (apis?: MockApis) => void;
export interface GetAppOptions {
    appOptions?: AppOrOptions;
    providers?: (ComponentType | [ComponentType, any])[];
    apis?: MockApis;
    delayResponse?: number;
    designable?: boolean;
    schemaSettings?: SchemaSettings;
    disableAcl?: boolean;
    enableMultipleDataSource?: boolean;
}
export declare const getApp: (options: GetAppOptions) => {
    App: React.FC<{
        children?: React.ReactNode;
    }>;
    app: Application;
};
export interface GetAppComponentOptions<V = any, Props = {}> extends GetAppOptions {
    schema?: any;
    Component?: ComponentType<Props>;
    value?: V;
    props?: Props;
    noWrapperSchema?: boolean;
    enableUserListDataBlock?: boolean;
    onChange?: (value: V) => void;
}
export declare const getAppComponent: (options: GetAppComponentOptions) => React.FC<{
    children?: React.ReactNode;
}>;
export declare function addXReadPrettyToEachLayer(obj?: Record<string, any>): Record<string, any>;
export declare const getReadPrettyAppComponent: (options: GetAppComponentOptions) => React.FC<{
    children?: React.ReactNode;
}>;
interface GetAppComponentWithSchemaSettingsOptions extends GetAppComponentOptions {
    settingPath?: string;
}
export declare function setSchemaWithSettings(options: GetAppComponentWithSchemaSettingsOptions): void;
export declare const getAppComponentWithSchemaSettings: (options: GetAppComponentWithSchemaSettingsOptions) => React.FC<{
    children?: React.ReactNode;
}>;
export declare const getReadPrettyAppComponentWithSchemaSettings: (options: GetAppComponentWithSchemaSettingsOptions) => React.FC<{
    children?: React.ReactNode;
}>;
export declare function withSchema(Component: ComponentType, name?: string): React.MemoExoticComponent<import("@formily/react").ReactFC<unknown>>;
export declare const CommonSchemaComponent: React.MemoExoticComponent<import("@formily/react").ReactFC<unknown>>;
