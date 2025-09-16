/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection } from '@nocobase/client';
import React from 'react';
export declare const useRemoteCollectionContext: () => {
    targetCollection: Collection;
    refreshRM: Function;
    titleField: string;
};
export declare const CollectionFields: () => React.JSX.Element;
