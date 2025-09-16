/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CheckModalOptions } from '../utils';
export interface CheckDeleteSettingOptions {
    title: string;
    deletedText?: string;
    afterClick?: () => Promise<void> | void;
    modalChecker?: Omit<CheckModalOptions, 'triggerText'>;
}
export declare function checkDeleteSetting(options: CheckDeleteSettingOptions): Promise<void>;
