/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SelectProps } from 'antd';
import React from 'react';
export type SnapshotOwnerCollectionFieldsSelectProps = Omit<SelectProps, 'options'>;
export declare const useSnapshotOwnerCollectionFields: () => {
    label: any;
    value: any;
    name?: any;
    collectionName?: string;
    sourceKey?: string;
    uiSchema?: any;
    target?: string;
}[];
export declare const SnapshotOwnerCollectionFieldsSelect: React.FC<SnapshotOwnerCollectionFieldsSelectProps>;
