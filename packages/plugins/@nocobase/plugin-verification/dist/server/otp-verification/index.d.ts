/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Verification } from '../verification';
export declare class OTPVerification extends Verification {
    expiresIn: number;
    maxVerifyAttempts: number;
    verify({ resource, action, boundInfo, verifyParams }: {
        resource: any;
        action: any;
        boundInfo: any;
        verifyParams: any;
    }): Promise<any>;
    bind(userId: number, resource?: string, action?: string): Promise<{
        uuid: string;
        meta?: any;
    }>;
    onActionComplete({ verifyResult }: {
        verifyResult: any;
    }): Promise<void>;
}
