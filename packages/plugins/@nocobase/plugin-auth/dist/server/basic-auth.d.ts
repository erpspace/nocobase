/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AuthConfig, BaseAuth } from '@nocobase/auth';
export declare class BasicAuth extends BaseAuth {
    static readonly optionsKeysNotAllowedInEnv: string[];
    constructor(config: AuthConfig);
    private isEmail;
    validate(): Promise<any>;
    private getSignupFormSettings;
    private verfiySignupParams;
    signUp(): Promise<any>;
    private getEmailConfig;
    lostPassword(): Promise<any>;
    resetPassword(): Promise<any>;
    /**
     * 检查重置密码的 Token 是否有效
     */
    checkResetToken(resetToken: string): Promise<boolean>;
}
