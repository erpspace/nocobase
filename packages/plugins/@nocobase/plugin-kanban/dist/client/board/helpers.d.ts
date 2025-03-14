/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare function moveColumn(board: any, { fromPosition }: {
    fromPosition: any;
}, { toPosition }: {
    toPosition: any;
}): any;
declare function moveCard(board: any, { fromPosition, fromColumnId }: {
    fromPosition: any;
    fromColumnId: any;
}, { toPosition, toColumnId }: {
    toPosition: any;
    toColumnId: any;
}): any;
declare function addColumn(board: any, column: any): any;
declare function removeColumn(board: any, column: any): any;
declare function changeColumn(board: any, column: any, newColumn: any): any;
declare function addCard(board: any, inColumn: any, card: any, { on }?: any): any;
declare function removeCard(board: any, fromColumn: any, card: any): any;
declare function changeCard(board: any, cardId: any, newCard: any): any;
export { moveColumn, moveCard, addColumn, removeColumn, changeColumn, addCard, removeCard, changeCard };
