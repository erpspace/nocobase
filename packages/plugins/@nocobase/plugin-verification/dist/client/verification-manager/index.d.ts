/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ComponentType } from 'react';
export type VerificationFormProps = {
    verifier: string;
    actionType: string;
    boundInfo: any;
    isLogged?: boolean;
};
export type BindFormProps = {
    verifier: string;
    actionType: string;
    isLogged?: boolean;
};
export type VerificationTypeOptions = {
    components: {
        AdminSettingsForm?: ComponentType;
        VerificationForm: ComponentType<VerificationFormProps>;
        BindForm?: ComponentType<BindFormProps>;
    };
};
export declare class VerificationManager {
    verifications: any;
    registerVerificationType(type: string, options: VerificationTypeOptions): void;
    getVerification(type: string): any;
}
