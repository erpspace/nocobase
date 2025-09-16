/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ResourceType } from './resource';
export interface ParseRequest {
    path: string;
    method: string;
    namespace?: string;
    type?: ResourceType;
}
export interface ParseOptions {
    prefix?: string;
    accessors?: {
        list?: string;
        create?: string;
        get?: string;
        update?: string;
        delete?: string;
        set?: string;
        add?: string;
    };
}
export interface ParsedParams {
    actionName?: string;
    resourceName?: string;
    resourceIndex?: string;
    associatedName?: string;
    associatedIndex?: string;
}
export declare function getNameByParams(params: ParsedParams): string;
export declare function parseRequest(request: ParseRequest, options?: ParseOptions): ParsedParams | false;
export declare function parseQuery(input: string): any;
export declare function parseFields(fields: any): any;
export declare function mergeFields(defaults: any, inputs: any): any;
