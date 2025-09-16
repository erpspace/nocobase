/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export interface CommonFormItemCheckerOptions {
    label?: string;
    container?: HTMLElement;
    newValue?: any;
    oldValue?: any;
    Component?: string;
}
export interface GetFormItemElementOptions {
    container?: HTMLElement;
    Component: string;
    label?: string;
}
export declare function getFormItemElement({ container, Component, label }: GetFormItemElementOptions): Element;
