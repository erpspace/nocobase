/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Action, { ActionName, ActionType } from './action';
import Middleware, { MiddlewareType } from './middleware';
import { HandlerType, ResourceManager } from './resourcer';
export type ResourceType = 'single' | 'hasOne' | 'hasMany' | 'belongsTo' | 'belongsToMany';
export interface ResourceOptions {
    /**
     * 资源名称
     */
    name: string;
    /**
     * 资源类型，默认为 single
     */
    type?: ResourceType;
    /**
     * 资源的行为
     */
    actions?: {
        [key: string]: ActionType;
    };
    /**
     * actions 白名单，默认有 list、get、create、update、delete
     */
    only?: Array<ActionName>;
    /**
     * actions 黑名单，默认有 list、get、create、update、delete
     */
    except?: Array<ActionName>;
    /**
     * 中间件
     */
    middleware?: MiddlewareType;
    /**
     * 中间件
     */
    middlewares?: MiddlewareType;
    /**
     * 额外的一些参数
     */
    [key: string]: any;
}
export declare class Resource {
    readonly resourcer: ResourceManager;
    readonly middlewares: Middleware[];
    readonly actions: Map<ActionName, Action>;
    readonly options: ResourceOptions;
    readonly except: Array<ActionName>;
    constructor(options: ResourceOptions, resourcer: ResourceManager);
    getName(): string;
    getExcept(): ActionName[];
    addAction(name: ActionName, handler: HandlerType): void;
    getAction(action: ActionName): Action;
}
export default Resource;
