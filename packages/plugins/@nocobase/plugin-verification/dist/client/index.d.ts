/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { SMS_OTP_VERIFICATION_TYPE } from '../constants';
import { VerificationManager } from './verification-manager';
import { SMSOTPProviderManager } from './otp-verification/sms/provider-manager';
export declare class PluginVerificationClient extends Plugin {
    verificationManager: VerificationManager;
    smsOTPProviderManager: SMSOTPProviderManager;
    load(): Promise<void>;
}
export { SMS_OTP_VERIFICATION_TYPE };
export { UserVerifiersContext } from './VerificationMenu';
export default PluginVerificationClient;
