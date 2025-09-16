/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export interface CheckSwitchSettingOptions {
    title: string;
    beforeClick?: () => Promise<void> | void;
    afterFirstClick?: () => Promise<void> | void;
    afterSecondClick?: () => Promise<void> | void;
    afterThirdClick?: () => Promise<void> | void;
}
export declare function checkSwitchSetting(options: CheckSwitchSettingOptions): Promise<void>;
