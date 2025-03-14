/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export declare const DeletedField: () => React.JSX.Element;
export declare enum BulkEditFormItemValueType {
    RemainsTheSame = 1,
    ChangedTo = 2,
    Clear = 3,
    AddAttach = 4
}
export declare const BulkEditField: (props: any) => React.JSX.Element;
