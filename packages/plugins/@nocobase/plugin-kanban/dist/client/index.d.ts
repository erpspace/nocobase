/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
type Option = {
    color?: string;
    label: string;
    value: string;
};
type GroupOptions = {
    options: Option[];
    loading?: boolean;
};
type GetGroupOptions = (collectionField: string) => GroupOptions;
declare class PluginKanbanClient extends Plugin {
    groupFields: {
        [T: string]: {
            useGetGroupOptions: GetGroupOptions;
        };
    };
    registerGroupFieldInterface(interfaceName: string, options: {
        useGetGroupOptions: GetGroupOptions;
    }): void;
    getGroupFieldInterface(key: any): {
        useGetGroupOptions: GetGroupOptions;
    } | {
        [T: string]: {
            useGetGroupOptions: GetGroupOptions;
        };
    };
    load(): Promise<void>;
}
export default PluginKanbanClient;
