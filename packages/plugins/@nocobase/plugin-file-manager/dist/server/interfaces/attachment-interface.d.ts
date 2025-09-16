/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseInterface } from '@nocobase/database';
export declare class AttachmentInterface extends BaseInterface {
    toValue(value: any, ctx?: any): Promise<{
        title: string;
        extname: string;
        filename: string;
        url: string;
    }[]>;
    toString(value: any, ctx?: any): string;
}
