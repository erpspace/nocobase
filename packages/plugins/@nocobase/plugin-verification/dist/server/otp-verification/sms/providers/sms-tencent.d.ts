/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SMSProvider } from '.';
declare const smsClient: typeof import("tencentcloud-sdk-nodejs/tencentcloud/services/sms/v20210111/sms_client").Client;
export default class extends SMSProvider {
    client: InstanceType<typeof smsClient>;
    constructor(options: any);
    send(phoneNumbers: any, data: {
        code: string;
    }): Promise<string>;
}
export {};
