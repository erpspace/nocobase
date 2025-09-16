/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseNotificationChannel } from '@nocobase/plugin-notification-manager';
import { Transporter } from 'nodemailer';
export declare class MailNotificationChannel extends BaseNotificationChannel {
    transpoter: Transporter;
    send(args: any): Promise<any>;
}
