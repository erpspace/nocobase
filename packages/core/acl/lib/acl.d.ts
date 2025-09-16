/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { Toposort, ToposortOptions } from '@nocobase/utils';
import EventEmitter from 'events';
import { ACLAvailableAction, AvailableActionOptions } from './acl-available-action';
import { ACLAvailableStrategy, AvailableStrategyOptions } from './acl-available-strategy';
import { ACLRole, ResourceActionsOptions, RoleActionParams } from './acl-role';
import { AllowManager, ConditionFunc } from './allow-manager';
import FixedParamsManager, { Merger } from './fixed-params-manager';
import SnippetManager, { SnippetOptions } from './snippet-manager';
interface CanResult {
    role: string;
    resource: string;
    action: string;
    params?: any;
}
export interface DefineOptions {
    role: string;
    /**
     * @internal
     */
    allowConfigure?: boolean;
    strategy?: string | AvailableStrategyOptions;
    actions?: ResourceActionsOptions;
    /**
     * @internal
     */
    routes?: any;
    snippets?: string[];
}
export interface ListenerContext {
    acl: ACL;
    role: ACLRole;
    path: string;
    actionName: string;
    resourceName: string;
    params: RoleActionParams;
}
type Listener = (ctx: ListenerContext) => void;
interface CanArgs {
    role?: string;
    resource: string;
    action: string;
    rawResourceName?: string;
    ctx?: any;
    roles?: string[];
}
export declare class ACL extends EventEmitter {
    /**
     * @internal
     */
    availableStrategy: Map<string, ACLAvailableStrategy>;
    /**
     * @internal
     */
    allowManager: AllowManager;
    /**
     * @internal
     */
    snippetManager: SnippetManager;
    /**
     * @internal
     */
    roles: Map<string, ACLRole>;
    /**
     * @internal
     */
    actionAlias: Map<string, string>;
    protected availableActions: Map<string, ACLAvailableAction>;
    protected fixedParamsManager: FixedParamsManager;
    protected middlewares: Toposort<any>;
    protected strategyResources: Set<string> | null;
    constructor();
    setStrategyResources(resources: Array<string> | null): void;
    getStrategyResources(): string[];
    appendStrategyResource(resource: string): void;
    removeStrategyResource(resource: string): void;
    define(options: DefineOptions): ACLRole;
    getRole(name: string): ACLRole;
    getRoles(names: string[]): ACLRole[];
    removeRole(name: string): boolean;
    setAvailableAction(name: string, options?: AvailableActionOptions): void;
    getAvailableAction(name: string): ACLAvailableAction;
    getAvailableActions(): Map<string, ACLAvailableAction>;
    setAvailableStrategy(name: string, options: AvailableStrategyOptions): void;
    beforeGrantAction(listener?: Listener): void;
    can(options: CanArgs): CanResult | null;
    private getCanByRoles;
    private getCanByRole;
    /**
     * @internal
     */
    resolveActionAlias(action: string): string;
    use(fn: any, options?: ToposortOptions): void;
    allow(resourceName: string, actionNames: string[] | string, condition?: string | ConditionFunc): void;
    /**
     * @deprecated
     */
    skip(resourceName: string, actionNames: string[] | string, condition?: string | ConditionFunc): void;
    /**
     * @internal
     */
    parseJsonTemplate(json: any, ctx: any): Promise<any>;
    middleware(): (ctx: any, next: any) => Promise<void>;
    /**
     * @internal
     */
    getActionParams(ctx: any): Promise<void>;
    addFixedParams(resource: string, action: string, merger: Merger): void;
    registerSnippet(snippet: SnippetOptions): void;
    /**
     * @internal
     */
    filterParams(ctx: any, resourceName: any, params: any): any;
    protected addCoreMiddleware(): void;
    protected isAvailableAction(actionName: string): boolean;
}
export {};
