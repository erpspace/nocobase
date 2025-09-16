/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
/// <reference types="koa-bodyparser" />
import { AuthManager, AuthManagerOptions } from '@nocobase/auth';
import { Cache, CacheManager, CacheManagerOptions } from '@nocobase/cache';
import { DataSourceManager, SequelizeDataSource } from '@nocobase/data-source-manager';
import Database, { CollectionOptions, IDatabaseOptions } from '@nocobase/database';
import { Logger, LoggerOptions, RequestLoggerOptions, SystemLogger, SystemLoggerOptions } from '@nocobase/logger';
import { ResourceOptions, Resourcer } from '@nocobase/resourcer';
import { Telemetry, TelemetryOptions } from '@nocobase/telemetry';
import { LockManager, LockManagerOptions } from '@nocobase/lock-manager';
import { AsyncEmitter, ToposortOptions } from '@nocobase/utils';
import { Command, CommandOptions, ParseOptions } from 'commander';
import { IncomingMessage, ServerResponse } from 'http';
import { i18n, InitOptions } from 'i18next';
import Koa, { DefaultContext as KoaDefaultContext, DefaultState as KoaDefaultState } from 'koa';
import { RecordableHistogram } from 'node:perf_hooks';
import { AppCommand } from './app-command';
import { AppSupervisor } from './app-supervisor';
import { CronJobManager } from './cron/cron-job-manager';
import { ApplicationVersion } from './helpers/application-version';
import { Locale } from './locale';
import { Plugin } from './plugin';
import { InstallOptions, PluginManager } from './plugin-manager';
import { PubSubManager, PubSubManagerOptions } from './pub-sub-manager';
import { SyncMessageManager } from './sync-message-manager';
import AesEncryptor from './aes-encryptor';
import { AuditManager } from './audit-manager';
import { Environment } from './environment';
import { ServiceContainer } from './service-container';
import { EventQueue, EventQueueOptions } from './event-queue';
import { BackgroundJobManager, BackgroundJobManagerOptions } from './background-job-manager';
export type PluginType = string | typeof Plugin;
export type PluginConfiguration = PluginType | [PluginType, any];
export interface ResourceManagerOptions {
    prefix?: string;
}
/**
 * this interface is deprecated and should not be used.
 * @deprecated
 * use {@link ResourceManagerOptions} instead
 */
export interface ResourcerOptions extends ResourceManagerOptions {
}
export interface AppLoggerOptions {
    request: RequestLoggerOptions;
    system: SystemLoggerOptions;
}
export interface AppTelemetryOptions extends TelemetryOptions {
    enabled?: boolean;
}
export interface ApplicationOptions {
    instanceId?: string;
    database?: IDatabaseOptions | Database;
    cacheManager?: CacheManagerOptions;
    /**
     * this property is deprecated and should not be used.
     * @deprecated
     * use {@link ApplicationOptions.resourceManager} instead
     */
    resourcer?: ResourceManagerOptions;
    resourceManager?: ResourceManagerOptions;
    pubSubManager?: PubSubManagerOptions;
    syncMessageManager?: any;
    bodyParser?: any;
    cors?: any;
    dataWrapping?: boolean;
    registerActions?: boolean;
    i18n?: i18n | InitOptions;
    plugins?: PluginConfiguration[];
    acl?: boolean;
    logger?: AppLoggerOptions;
    /**
     * @internal
     */
    pmSock?: string;
    name?: string;
    authManager?: AuthManagerOptions;
    auditManager?: AuditManager;
    lockManager?: LockManagerOptions;
    eventQueue?: EventQueueOptions;
    backgroundJobManager?: BackgroundJobManagerOptions;
    /**
     * @internal
     */
    perfHooks?: boolean;
    telemetry?: AppTelemetryOptions;
    skipSupervisor?: boolean;
}
export interface DefaultState extends KoaDefaultState {
    currentUser?: any;
    [key: string]: any;
}
export interface DefaultContext extends KoaDefaultContext {
    db: Database;
    cache: Cache;
    resourcer: Resourcer;
    i18n: any;
    [key: string]: any;
}
interface ActionsOptions {
    resourceName?: string;
    resourceNames?: string[];
}
interface LoadOptions {
    reload?: boolean;
    hooks?: boolean;
    sync?: boolean;
    [key: string]: any;
}
interface StartOptions {
    cliArgs?: any[];
    dbSync?: boolean;
    checkInstall?: boolean;
    quickstart?: boolean;
    reload?: boolean;
    recover?: boolean;
}
type MaintainingStatus = 'command_begin' | 'command_end' | 'command_running' | 'command_error';
export type MaintainingCommandStatus = {
    command: {
        name: string;
    };
    status: MaintainingStatus;
    error?: Error;
};
export declare class Application<StateT = DefaultState, ContextT = DefaultContext> extends Koa implements AsyncEmitter {
    options: ApplicationOptions;
    readonly instanceId: string;
    /**
     * @internal
     */
    middleware: any;
    /**
     * @internal
     */
    stopped: boolean;
    /**
     * @internal
     */
    ready: boolean;
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
    /**
     * @internal
     */
    rawOptions: ApplicationOptions;
    /**
     * @internal
     */
    activatedCommand: {
        name: string;
    };
    /**
     * @internal
     */
    running: boolean;
    /**
     * @internal
     */
    perfHistograms: Map<string, RecordableHistogram>;
    /**
     * @internal
     */
    pubSubManager: PubSubManager;
    syncMessageManager: SyncMessageManager;
    requestLogger: Logger;
    protected plugins: Map<string, Plugin<any>>;
    protected _appSupervisor: AppSupervisor;
    private _authenticated;
    private _maintaining;
    private _maintainingCommandStatus;
    private _maintainingStatusBeforeCommand;
    private _actionCommand;
    container: ServiceContainer;
    lockManager: LockManager;
    eventQueue: EventQueue;
    backgroundJobManager: BackgroundJobManager;
    constructor(options: ApplicationOptions);
    private static staticCommands;
    static addCommand(callback: (app: Application) => void): void;
    private _sqlLogger;
    get sqlLogger(): Logger;
    protected _logger: SystemLogger;
    get logger(): SystemLogger;
    protected _started: Date | null;
    /**
     * @experimental
     */
    get started(): Date;
    get log(): SystemLogger;
    protected _loaded: boolean;
    /**
     * @internal
     */
    get loaded(): boolean;
    private _maintainingMessage;
    /**
     * @internal
     */
    get maintainingMessage(): string;
    private _env;
    get environment(): Environment;
    protected _cronJobManager: CronJobManager;
    get cronJobManager(): CronJobManager;
    get mainDataSource(): SequelizeDataSource;
    get db(): Database;
    get resourceManager(): import("@nocobase/resourcer").ResourceManager;
    /**
     * This method is deprecated and should not be used.
     * Use {@link #resourceManager} instead.
     * @deprecated
     */
    get resourcer(): import("@nocobase/resourcer").ResourceManager;
    protected _cacheManager: CacheManager;
    get cacheManager(): CacheManager;
    protected _cache: Cache;
    get cache(): Cache;
    /**
     * @internal
     */
    set cache(cache: Cache);
    protected _cli: AppCommand;
    get cli(): AppCommand;
    protected _i18n: i18n;
    get i18n(): i18n;
    protected _pm: PluginManager;
    get pm(): PluginManager;
    get acl(): import("@nocobase/acl").ACL;
    protected _authManager: AuthManager;
    get authManager(): AuthManager;
    protected _auditManager: AuditManager;
    get auditManager(): AuditManager;
    protected _locales: Locale;
    /**
     * This method is deprecated and should not be used.
     * Use {@link #localeManager} instead.
     * @deprecated
     */
    get locales(): Locale;
    get localeManager(): Locale;
    protected _telemetry: Telemetry;
    get telemetry(): Telemetry;
    protected _version: ApplicationVersion;
    get version(): ApplicationVersion;
    get name(): string;
    protected _dataSourceManager: DataSourceManager;
    get dataSourceManager(): DataSourceManager;
    protected _aesEncryptor: AesEncryptor;
    get aesEncryptor(): AesEncryptor;
    /**
     * Check if the application is serving as a specific worker.
     * @experimental
     */
    serving(key?: string): boolean;
    /**
     * @internal
     */
    getMaintaining(): MaintainingCommandStatus;
    /**
     * @internal
     */
    setMaintaining(_maintainingCommandStatus: MaintainingCommandStatus): void;
    /**
     * @internal
     */
    setMaintainingMessage(message: string): void;
    /**
     * This method is deprecated and should not be used.
     * Use {@link #this.version.get()} instead.
     * @deprecated
     */
    getVersion(): string;
    getPackageVersion(): string;
    /**
     * This method is deprecated and should not be used.
     * Use {@link #this.pm.addPreset()} instead.
     * @deprecated
     */
    plugin<O = any>(pluginClass: any, options?: O): void;
    use<NewStateT = {}, NewContextT = {}>(middleware: Koa.Middleware<StateT & NewStateT, ContextT & NewContextT>, options?: ToposortOptions): this;
    /**
     * @internal
     */
    callback(): (req: IncomingMessage, res: ServerResponse) => any;
    /**
     * This method is deprecated and should not be used.
     * Use {@link #this.db.collection()} instead.
     * @deprecated
     */
    collection(options: CollectionOptions): import("@nocobase/database").Collection<any, any>;
    /**
     * This method is deprecated and should not be used.
     * Use {@link #this.resourceManager.define()} instead.
     * @deprecated
     */
    resource(options: ResourceOptions): import("@nocobase/resourcer").Resource;
    /**
     * This method is deprecated and should not be used.
     * Use {@link #this.resourceManager.registerActionHandlers()} instead.
     * @deprecated
     */
    actions(handlers: any, options?: ActionsOptions): void;
    command(name: string, desc?: string, opts?: CommandOptions): AppCommand;
    findCommand(name: string): Command;
    /**
     * @internal
     */
    reInit(): Promise<void>;
    createCacheManager(): Promise<CacheManager>;
    load(options?: LoadOptions): Promise<void>;
    reload(options?: LoadOptions): Promise<void>;
    /**
     * This method is deprecated and should not be used.
     * Use {@link this.pm.get()} instead.
     * @deprecated
     */
    getPlugin<P extends Plugin>(name: string | typeof Plugin): P;
    authenticate(): Promise<void>;
    runCommand(command: string, ...args: any[]): Promise<AppCommand>;
    runCommandThrowError(command: string, ...args: any[]): Promise<AppCommand>;
    /**
     * @internal
     */
    loadMigrations(options: any): Promise<{
        beforeLoad: any[];
        afterSync: any[];
        afterLoad: any[];
    }>;
    /**
     * @internal
     */
    loadCoreMigrations(): Promise<{
        beforeLoad: {
            up: () => Promise<void>;
        };
        afterSync: {
            up: () => Promise<void>;
        };
        afterLoad: {
            up: () => Promise<void>;
        };
    }>;
    /**
     * @internal
     */
    runAsCLI(argv?: string[], options?: ParseOptions & {
        throwError?: boolean;
        reqId?: string;
    }): Promise<AppCommand>;
    start(options?: StartOptions): Promise<void>;
    /**
     * @internal
     */
    emitStartedEvent(options?: StartOptions): Promise<void>;
    isStarted(): Promise<boolean>;
    /**
     * @internal
     */
    tryReloadOrRestart(options?: StartOptions): Promise<void>;
    restart(options?: StartOptions): Promise<void>;
    stop(options?: any): Promise<void>;
    destroy(options?: any): Promise<void>;
    isInstalled(): Promise<boolean>;
    install(options?: InstallOptions): Promise<void>;
    upgrade(options?: any): Promise<void>;
    toJSON(): {
        appName: string;
        name: string;
    };
    /**
     * @internal
     */
    reInitEvents(): void;
    createLogger(options: LoggerOptions): Logger;
    protected createCLI(): AppCommand;
    protected initLogger(options: AppLoggerOptions): void;
    protected closeLogger(): void;
    protected init(): void;
    protected createMainDataSource(options: ApplicationOptions): void;
    protected createDatabase(options: ApplicationOptions): Database;
}
export default Application;
