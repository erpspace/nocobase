/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { MenuDesigner } from './Menu.Designer';
import { MenuItem } from './Menu.Item';
export declare const MMenu: React.FC<{}> & {
    Item: typeof MenuItem;
    Designer: typeof MenuDesigner;
};
