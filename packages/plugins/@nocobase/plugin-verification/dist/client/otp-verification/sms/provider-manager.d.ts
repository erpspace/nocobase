/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ComponentType } from 'react';
export type SMSOTPProviderOptions = {
    components: {
        AdminSettingsForm: ComponentType;
    };
};
export declare class SMSOTPProviderManager {
    providers: any;
    registerProvider(type: string, options: SMSOTPProviderOptions): void;
    getProvider(type: string): any;
}
