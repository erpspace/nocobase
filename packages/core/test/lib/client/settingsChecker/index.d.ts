/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CheckDeleteSettingOptions } from './delete';
import { CheckModalSettingOptions } from './modal';
import { CheckSwitchSettingOptions } from './switch';
import { SelectSettingOptions } from './select';
export * from './delete';
export * from './modal';
export * from './switch';
export * from './select';
export type CheckSettingsOptions = ({
    type: 'switch';
} & CheckSwitchSettingOptions) | ({
    type: 'modal';
} & CheckModalSettingOptions) | ({
    type: 'select';
} & SelectSettingOptions) | ({
    type: 'delete';
} & CheckDeleteSettingOptions);
export declare function checkSettings(list: CheckSettingsOptions[], checkLength?: boolean): Promise<void>;
