/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
import { SwaggerManager } from './swagger';
export declare class PluginAPIDocServer extends Plugin {
    swagger: SwaggerManager;
    constructor(app: any, options: any);
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
}
export default PluginAPIDocServer;
