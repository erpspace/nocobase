/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import DysmsApi from '@alicloud/dysmsapi20170525';
import { Provider } from './Provider';
export default class extends Provider {
    client: DysmsApi;
    constructor(plugin: any, options: any);
    send(phoneNumbers: any, data?: {}): Promise<never>;
}
