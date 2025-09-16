/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { ThemeItem } from '../../types';
declare enum HandleTypes {
    delete = "delete",
    optional = "optional"
}
interface Props {
    item: ThemeItem;
    style?: React.CSSProperties;
    onChange?: (params: {
        type: HandleTypes;
        item: ThemeItem;
    }) => void;
}
declare const ThemeCard: {
    (props: Props): React.JSX.Element;
    displayName: string;
};
export default ThemeCard;
