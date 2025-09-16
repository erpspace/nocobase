/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
import { OTPVerification } from '..';
import { SMSProvider } from './providers';
type SMSProviderOptions = {
    title: string;
    provider: typeof SMSProvider;
};
export declare class SMSOTPProviderManager {
    providers: Registry<SMSProviderOptions>;
    registerProvider(type: string, options: SMSProviderOptions): void;
    listProviders(): {
        name: string;
        title: string;
    }[];
}
export declare class SMSOTPVerification extends OTPVerification {
    getProvider(): Promise<SMSProvider>;
    getPublicBoundInfo(userId: number): Promise<{
        bound: boolean;
        publicInfo?: undefined;
    } | {
        bound: boolean;
        publicInfo: string;
    }>;
    validateBoundInfo({ uuid: phone }: {
        uuid: any;
    }): Promise<boolean>;
}
export {};
