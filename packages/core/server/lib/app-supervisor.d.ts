/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { AsyncEmitter } from '@nocobase/utils';
import { EventEmitter } from 'events';
import Application, { ApplicationOptions } from './application';
type BootOptions = {
    appName: string;
    options: any;
    appSupervisor: AppSupervisor;
};
type AppBootstrapper = (bootOptions: BootOptions) => Promise<void>;
type AppStatus = 'initializing' | 'initialized' | 'running' | 'commanding' | 'stopped' | 'error' | 'not_found';
export declare class AppSupervisor extends EventEmitter implements AsyncEmitter {
    private static instance;
    runningMode: 'single' | 'multiple';
    singleAppName: string | null;
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
    apps: {
        [appName: string]: Application;
    };
    lastSeenAt: Map<string, number>;
    appErrors: {
        [appName: string]: Error;
    };
    appStatus: {
        [appName: string]: AppStatus;
    };
    lastMaintainingMessage: {
        [appName: string]: string;
    };
    statusBeforeCommanding: {
        [appName: string]: AppStatus;
    };
    private appMutexes;
    private appBootstrapper;
    private constructor();
    static getInstance(): AppSupervisor;
    setAppError(appName: string, error: Error): void;
    hasAppError(appName: string): boolean;
    clearAppError(appName: string): void;
    reset(): Promise<void>;
    destroy(): Promise<void>;
    setAppStatus(appName: string, status: AppStatus, options?: {}): void;
    getMutexOfApp(appName: string): any;
    bootStrapApp(appName: string, options?: {}): Promise<void>;
    getApp(appName: string, options?: {
        withOutBootStrap?: boolean;
        [key: string]: any;
    }): Promise<Application<import("./application").DefaultState, import("./application").DefaultContext>>;
    setAppBootstrapper(appBootstrapper: AppBootstrapper): void;
    getAppStatus(appName: string, defaultStatus?: AppStatus): AppStatus | null;
    bootMainApp(options: ApplicationOptions): Application<import("./application").DefaultState, import("./application").DefaultContext>;
    hasApp(appName: string): boolean;
    touchApp(appName: string): void;
    addApp(app: Application): Application<import("./application").DefaultState, import("./application").DefaultContext>;
    getAppsNames(): Promise<string[]>;
    removeApp(appName: string): Promise<void>;
    subApps(): Application<import("./application").DefaultState, import("./application").DefaultContext>[];
    on(eventName: string | symbol, listener: (...args: any[]) => void): this;
    private bindAppEvents;
}
export {};
