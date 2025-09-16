/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseValueParser } from './base-value-parser';
export declare class ToManyValueParser extends BaseValueParser {
    setAccessors: {
        attachment: string;
        chinaRegion: string;
    };
    setAttachments(value: any): Promise<void>;
    setChinaRegion(value: any): Promise<void>;
    setAssociations(value: any): Promise<void>;
    setValue(value: any): Promise<void>;
    getInterface(): string;
    isInterface(name: string): boolean;
}
