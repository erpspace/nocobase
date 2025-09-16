/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Toposort, ToposortOptions } from '@nocobase/utils';
import Action, { ActionName } from './action';
import Resource, { ResourceOptions } from './resource';
import { ParsedParams } from './utils';
export interface ResourcerContext {
    resourcer?: Resourcer;
    action?: Action;
    [key: string]: any;
}
export interface KoaMiddlewareOptions {
    skipIfDataSourceExists?: boolean;
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 自定义 resource name 的获取规则
     *
     * 默认规则 relatedTable ? relatedTable.table : table
     */
    nameRule?: (params: ParsedParams) => string;
    /**
     * 自定义 action name
     *
     * 默认为
     *
     * - list 查看列表
     * - create 新增数据
     * - get 查看数据详情
     * - update 更新数据
     * - delete 删除数据
     */
    accessors?: {
        /**
         * 查看列表
         */
        list?: string;
        /**
         * 新增数据
         */
        create?: string;
        /**
         * 查看数据详情
         */
        get?: string;
        /**
         * 更新数据
         */
        update?: string;
        /**
         * 删除数据
         */
        delete?: string;
    };
}
export interface ResourceManagerOptions {
    /**
     * 前缀
     */
    prefix?: string;
    /**
     * 自定义 action name
     *
     * 默认为
     *
     * - list 查看列表
     * - create 新增数据
     * - get 查看数据详情
     * - update 更新数据
     * - delete 删除数据
     */
    accessors?: {
        /**
         * 查看列表
         */
        list?: string;
        /**
         * 新增数据
         */
        create?: string;
        /**
         * 查看数据详情
         */
        get?: string;
        /**
         * 更新数据
         */
        update?: string;
        /**
         * 删除数据
         */
        delete?: string;
    };
}
export interface ExecuteOptions {
    /**
     * 资源名称
     */
    resource: string;
    /**
     * 自定义 action name
     *
     * 默认
     * - list 查看列表
     * - create 新增数据
     * - get 查看数据详情
     * - update 更新数据
     * - delete 删除数据
     */
    action: ActionName;
}
export type HandlerType = (ctx: ResourcerContext, next: () => Promise<any>) => any;
export interface Handlers {
    [key: string]: HandlerType;
}
export interface ImportOptions {
    /**
     * 指定配置所在路径
     */
    directory: string;
    /**
     * 文件后缀，默认值 ['js', 'ts', 'json']
     */
    extensions?: string[];
}
export declare class ResourceManager {
    /**
     * @internal
     */
    readonly options: ResourceManagerOptions;
    protected resources: Map<string, Resource>;
    /**
     * 全局定义的 action handlers
     */
    protected handlers: Map<ActionName, any>;
    protected actionHandlers: Map<ActionName, any>;
    protected middlewareHandlers: Map<string, any>;
    protected middlewares: Toposort<any>;
    constructor(options?: ResourceManagerOptions);
    /**
     * 载入指定目录下的 resource 配置（配置的文件驱动）
     *
     * TODO: 配置的文件驱动现在会全部初始化，大数据时可能存在性能瓶颈，后续可以加入动态加载
     *
     * @param {object}   [options]
     * @param {string}   [options.directory] 指定配置所在路径
     * @param {array}    [options.extensions = ['js', 'ts', 'json']] 文件后缀
     *
     */
    import(options: ImportOptions): Promise<Map<string, Resource>>;
    /**
     * resource 配置
     *
     * @param name
     * @param options
     */
    define(options: ResourceOptions): Resource;
    isDefined(name: string): boolean;
    /**
     * @internal
     */
    removeResource(name: any): boolean;
    /**
     * This method is deprecated and should not be used.
     * Use {@link ResourceManager#registerActionHandler} instead.
     * @deprecated
     */
    registerAction(name: ActionName, handler: HandlerType): void;
    /**
     * This method is deprecated and should not be used.
     * Use {@link ResourceManager#registerActionHandlers} instead.
     * @deprecated
     */
    registerActions(handlers: Handlers): void;
    /**
     * 注册全局的 action handlers
     *
     * @param handlers
     */
    registerActionHandlers(handlers: Handlers): void;
    registerActionHandler(name: ActionName, handler: HandlerType): void;
    /**
     * @internal
     */
    getRegisteredHandler(name: ActionName): any;
    /**
     * @internal
     */
    getRegisteredHandlers(): Map<ActionName, any>;
    /**
     * @internal
     */
    getResource(name: string): Resource;
    /**
     * @internal
     */
    getAction(name: string, action: ActionName): Action;
    /**
     * @internal
     */
    getMiddlewares(): any[];
    use(middlewares: HandlerType | HandlerType[], options?: ToposortOptions): void;
    middleware({ prefix, accessors, skipIfDataSourceExists }?: KoaMiddlewareOptions): (ctx: ResourcerContext, next: () => Promise<any>) => Promise<any>;
    /**
     * This method is deprecated and should not be used.
     * Use {@link ResourceManager#middleware} instead.
     * @deprecated
     */
    restApiMiddleware(options?: KoaMiddlewareOptions): (ctx: ResourcerContext, next: () => Promise<any>) => Promise<any>;
    /**
     * @internal
     */
    execute(options: ExecuteOptions, context?: ResourcerContext, next?: any): Promise<void>;
}
/**
 * This interface is deprecated and should not be used.
 * Use {@link ResourceManagerOptions} instead.
 * @deprecated
 */
export interface ResourcerOptions extends ResourceManagerOptions {
}
/**
 * This class is deprecated and should not be used.
 * Use {@link ResourceManager} instead.
 * @deprecated
 */
export declare class Resourcer extends ResourceManager {
}
export default ResourceManager;
