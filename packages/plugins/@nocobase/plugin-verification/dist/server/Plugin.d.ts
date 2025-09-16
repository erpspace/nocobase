/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
import { VerificationManager } from './verification-manager';
import { SMSOTPProviderManager } from './otp-verification/sms';
import { Counter } from '@nocobase/cache';
export default class PluginVerficationServer extends Plugin {
    verificationManager: VerificationManager;
    smsOTPProviderManager: SMSOTPProviderManager;
    smsOTPCounter: Counter;
    afterAdd(): Promise<void>;
    load(): Promise<void>;
    install(): Promise<void>;
}
