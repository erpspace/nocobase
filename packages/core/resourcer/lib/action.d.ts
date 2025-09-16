/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { MergeStrategies } from '@nocobase/utils';
import Middleware, { MiddlewareType } from './middleware';
import Resource from './resource';
import { HandlerType } from './resourcer';
export type ActionType = string | HandlerType | ActionOptions;
export type DefaultActionType = 'list' | 'create' | 'get' | 'update' | 'destroy' | 'set' | 'add' | 'remove';
export type ActionName = DefaultActionType | Omit<string, DefaultActionType>;
export interface ActionContext {
    action?: Action;
    [key: string]: any;
}
export type FieldsOptions = string[] | {
    only?: string[];
    appends?: string[];
} | {
    except?: string[];
    appends?: string[];
};
export type FieldsOptionsFn = (ctx: ActionContext) => FieldsOptions | Promise<FieldsOptions>;
/**
 * 过滤参数
 *
 * TODO：细节待定
 */
export interface FilterOptions {
    [key: string]: any;
}
export type FilterOptionsFn = (ctx: ActionContext) => FilterOptions | Promise<FieldsOptions>;
export type ParamsCallback = (ctx: ActionContext) => ActionParams | Promise<ActionParams>;
export interface ActionOptions {
    /**
     * 默认数据
     */
    values?: any;
    /**
     * 字段
     *
     * 示例一：
     * ['col1', 'col2', 'relation.col1'];
     *
     * 示例二：
     * {
     *  only: ['col1'],
     * }
     *
     * 示例三：
     * {
     *  except: ['col1'],
     * }
     */
    fields?: string[];
    appends?: string[];
    except?: string[];
    whitelist?: string[];
    blacklist?: string[];
    /**
     * 过滤
     */
    filter?: FilterOptions;
    /**
     * 排序
     */
    sort?: string[];
    /**
     * 当前页码
     */
    page?: number;
    /**
     * 每页显示数量
     */
    pageSize?: number;
    /**
     * 最大每页显示数量
     */
    maxPageSize?: number;
    /**
     * 中间件
     */
    middleware?: MiddlewareType;
    /**
     * 中间件
     *
     * 与 middleware 用法相同
     */
    middlewares?: MiddlewareType;
    /**
     * 当前 Action 待执行的方法
     *
     * 支持 Function 和 require 调用
     */
    handler?: HandlerType;
    /**
     * 其他扩展配置
     */
    [key: string]: any;
}
/**
 * action params 与 action options 略有不同
 * - options 的参数更灵活，主要用于开发配置
 * - params 是开发配置参数 + 客户端参数的结合体
 */
export interface ActionParams {
    filterByTk?: any;
    /**
     * 输出哪些字段
     *
     * 与 ActionOptions 的不同，这里的 fields 是 object，提供 only，except，appends 三种情况
     */
    fields?: string[];
    appends?: string[];
    except?: string[];
    whitelist?: string[];
    blacklist?: string[];
    /**
     * 过滤
     */
    filter?: FilterOptions;
    /**
     * 排序
     *
     * 与 ActionOptions 的不同，这里的 sort 只有一种 array 类型
     */
    sort?: string[];
    /**
     * 当前页码
     */
    page?: number;
    /**
     * 每页显示数量
     */
    pageSize?: number;
    /**
     * 数据，默认为 options.defaultValues + request.body
     */
    values?: any;
    /**
     * This method is deprecated and should not be used.
     * Use {@link action.resourceName.split(',')[0]} instead.
     * @deprecated
     */
    resourceName?: string;
    /**
     * This method is deprecated and should not be used.
     * Use {@link filterByTk} instead.
     * @deprecated
     */
    resourceIndex?: string;
    /**
     * This method is deprecated and should not be used.
     * Use {@link action.resourceName.split(',')[1]} instead.
     * @deprecated
     */
    associatedName?: string;
    /**
     * This method is deprecated and should not be used.
     * Use {@link action.sourceId} instead.
     * @deprecated
     */
    associatedIndex?: string;
    /**
     * This method is deprecated and should not be used.
     * @deprecated
     */
    associated?: any;
    /**
     * This method is deprecated and should not be used.
     * Use {@link action.actionName} instead.
     * @deprecated
     */
    actionName?: string;
    /**
     * 其他扩展配置
     */
    [key: string]: any;
}
export declare class Action {
    protected handler: any;
    protected resource: Resource;
    protected name: ActionName;
    protected options: ActionOptions;
    protected context: ActionContext;
    params: ActionParams;
    actionName: string;
    resourceName: string;
    /**
     * This method is deprecated and should not be used.
     * Use {@link this.sourceId} instead.
     * @deprecated
     */
    resourceOf: any;
    sourceId: any;
    readonly middlewares: Array<Middleware>;
    /**
     * @internal
     */
    constructor(options: ActionOptions);
    /**
     * @internal
     */
    toJSON(): {
        actionName: string;
        resourceName: string;
        resourceOf: any;
        sourceId: any;
        params: ActionParams;
    };
    /**
     * @internal
     */
    clone(): Action;
    /**
     * @internal
     */
    setContext(context: any): void;
    mergeParams(params: ActionParams, strategies?: MergeStrategies): void;
    /**
     * @internal
     */
    setResource(resource: Resource): this;
    /**
     * @internal
     */
    getResource(): Resource;
    /**
     * @internal
     */
    getOptions(): ActionOptions;
    /**
     * @internal
     */
    setName(name: ActionName): this;
    /**
     * @internal
     */
    getName(): ActionName;
    /**
     * @internal
     */
    getMiddlewareHandlers(): ((ctx: any, next: any) => Promise<void>)[];
    /**
     * @internal
     */
    getHandler(): any;
    /**
     * @internal
     */
    getHandlers(): any[];
    /**
     * @internal
     */
    execute(context: any, next?: any): Promise<void>;
    /**
     * @internal
     */
    static toInstanceMap(actions: object, resource?: Resource): Map<string, Action>;
}
export default Action;
