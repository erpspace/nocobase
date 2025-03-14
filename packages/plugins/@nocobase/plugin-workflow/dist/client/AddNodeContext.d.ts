/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
interface AddButtonProps {
    upstream: any;
    branchIndex?: number | null;
    [key: string]: any;
}
export declare function AddButton(props: AddButtonProps): React.JSX.Element;
export declare function useAddNodeContext(): any;
export declare function AddNodeContextProvider(props: any): React.JSX.Element;
export {};
