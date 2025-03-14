/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model } from '@nocobase/database';
import nodemailer from 'nodemailer';
export declare class NotificationService extends Model {
    [key: string]: any;
    static createTransport: typeof nodemailer.createTransport;
    private _transporter;
    get transporter(): any;
    send(options: any): Promise<any>;
}
