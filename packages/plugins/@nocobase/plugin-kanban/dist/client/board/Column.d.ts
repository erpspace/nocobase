/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
declare function Column({ children, index: columnIndex, renderCard, renderCardAdder, renderColumnHeader, disableColumnDrag, disableCardDrag, onCardNew, allowAddCard, cardAdderPosition, }: {
    children: any;
    index: any;
    renderCard: any;
    renderCardAdder?: ({ column, onConfirm }: {
        column: any;
        onConfirm: any;
    }) => React.JSX.Element;
    renderColumnHeader: any;
    disableColumnDrag: any;
    disableCardDrag: any;
    onCardNew: any;
    allowAddCard: any;
    cardAdderPosition?: string;
}): React.JSX.Element;
export default Column;
