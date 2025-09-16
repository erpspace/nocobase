/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { FormItemCheckOptions } from '../formItemChecker';
export interface CheckModalOptions {
    triggerText?: string;
    modalTitle?: string;
    confirmTitle?: string;
    submitText?: string;
    contentText?: string;
    beforeCheck?: () => Promise<void> | void;
    customCheck?: () => Promise<void> | void;
    formItems?: FormItemCheckOptions[];
    afterSubmit?: () => Promise<void> | void;
}
export declare function checkModal(options: CheckModalOptions): Promise<void>;
