/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
export declare const smsOTPVerificationOptions: {
    components: {
        VerificationForm: (props: import("../../verification-manager").VerificationFormProps) => import("react").JSX.Element;
        AdminSettingsForm: import("react").FC<{}>;
        BindForm: (props: import("../../verification-manager").BindFormProps) => import("react").JSX.Element;
    };
};
export declare const smsAliyunProviderOptions: {
    components: {
        AdminSettingsForm: import("react").FC<{}>;
    };
};
export declare const smsTencentProviderOptions: {
    components: {
        AdminSettingsForm: import("react").FC<{}>;
    };
};
