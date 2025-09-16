/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { SelectProps } from 'antd';
import React from 'react';
import { ReadPretty } from './ReadPretty';
export declare const CustomSelect: React.ForwardRefExoticComponent<Partial<SelectProps<any, any> & {
    objectValue?: boolean;
    onChange?: (v: any) => void;
    multiple: boolean;
}> & React.RefAttributes<unknown>> & {
    ReadPretty: typeof ReadPretty;
};
export default CustomSelect;
