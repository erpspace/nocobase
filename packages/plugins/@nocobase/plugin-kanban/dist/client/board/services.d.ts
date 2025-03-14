/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare function getCoordinates(event: any, board: any): {
    source?: undefined;
    destination?: undefined;
} | {
    source: {
        fromPosition: any;
    };
    destination: {
        toPosition: any;
    };
} | {
    source: {
        fromColumnId: any;
        fromPosition: any;
    };
    destination: {
        toColumnId: any;
        toPosition: any;
    };
};
declare function isAColumnMove(type: any): boolean;
declare function getCard(board: any, sourceCoordinate: any): any;
declare function isMovingAColumnToAnotherPosition(coordinates: any): boolean;
declare function isMovingACardToAnotherPosition(coordinates: any): boolean;
export { getCard, getCoordinates, isAColumnMove, isMovingAColumnToAnotherPosition, isMovingACardToAnotherPosition };
