/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare function partialRight(fn: any, ...args: any[]): (...leftArgs: any[]) => any;
declare function addInArrayAtPosition(array: any, element: any, position: any): any[];
declare function removeFromArrayAtPosition(array: any, position: any): any;
declare function changeElementOfPositionInArray(array: any, from: any, to: any): any;
declare function identity(value: any): any;
declare function when(value: any, predicate?: typeof identity): (callback: any) => any;
declare function replaceElementOfArray(array: any): (options: any) => any;
declare function pickPropOut(object: any, prop: any): {};
export { addInArrayAtPosition, removeFromArrayAtPosition, changeElementOfPositionInArray, when, replaceElementOfArray, partialRight, pickPropOut, };
