/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ActionName } from './action';
import { HandlerType } from './resourcer';
export type MiddlewareType = string | string[] | HandlerType | HandlerType[] | MiddlewareOptions | MiddlewareOptions[];
export interface MiddlewareOptions {
    /**
     * actions 白名单，默认有 list、get、create、update、delete
     */
    only?: Array<ActionName>;
    /**
     * actions 黑名单，默认有 list、get、create、update、delete
     */
    except?: Array<ActionName>;
    handler?: HandlerType | Function;
    [key: string]: any;
}
export declare class Middleware {
    protected options: MiddlewareOptions;
    private middlewares;
    constructor(options: MiddlewareOptions | Function);
    getHandler(): (ctx: any, next: any) => Promise<void>;
    use(middleware: HandlerType): void;
    disuse(middleware: HandlerType): void;
    canAccess(name: ActionName): boolean;
    static toInstanceArray(middlewares: any): Middleware[];
}
export default Middleware;
export declare function branch(map: {
    [key: string]: HandlerType;
}, reducer: (ctx: any) => string, options?: {
    keyNotFound?(ctx: any, next: any): void;
    handlerNotSet?(ctx: any, next: any): void;
}): HandlerType;
