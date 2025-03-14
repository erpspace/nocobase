/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context } from '@nocobase/actions';
import { HandlerType } from '@nocobase/resourcer';
import { Plugin } from '@nocobase/server';
import { Registry } from '@nocobase/utils';
import { Provider } from '.';
export interface Interceptor {
    manual?: boolean;
    expiresIn?: number;
    getReceiver(ctx: any): string;
    getCode?(ctx: any): string;
    validate?(ctx: Context, receiver: string): boolean | Promise<boolean>;
}
export default class PluginVerficationServer extends Plugin {
    providers: Registry<typeof Provider>;
    interceptors: Registry<Interceptor>;
    intercept: HandlerType;
    install(): Promise<void>;
    load(): Promise<void>;
    getDefault(): Promise<any>;
}
