/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export type Merger = () => object;
export type ActionPath = string;
export default class FixedParamsManager {
    merger: Map<string, Merger[]>;
    addParams(resource: string, action: string, merger: Merger): void;
    getParamsMerger(resource: string, action: string): Merger[];
    protected getActionPath(resource: string, action: string): string;
    getParams(resource: string, action: string, extraParams?: any): {};
    static mergeParams(a: any, b: any): void;
}
