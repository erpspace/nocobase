/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Resourcer } from '@nocobase/resourcer';
import { Command } from 'commander';
import Application, { ApplicationOptions } from './application';
export declare function createI18n(options: ApplicationOptions): import("i18next").i18n;
export declare function createResourcer(options: ApplicationOptions): Resourcer;
export declare function registerMiddlewares(app: Application, options: ApplicationOptions): void;
export declare const createAppProxy: (app: Application) => Application<import("./application").DefaultState, import("./application").DefaultContext>;
export declare const getCommandFullName: (command: Command) => string;
export declare const tsxRerunning: () => Promise<void>;
export declare const enablePerfHooks: (app: Application) => void;
export declare function getBodyLimit(): string;
