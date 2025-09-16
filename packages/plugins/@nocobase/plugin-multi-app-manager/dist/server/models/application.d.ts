/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model, Transactionable } from '@nocobase/database';
import { Application } from '@nocobase/server';
import { AppOptionsFactory } from '../server';
export interface registerAppOptions extends Transactionable {
    skipInstall?: boolean;
    appOptionsFactory: AppOptionsFactory;
}
export declare class ApplicationModel extends Model {
    registerToSupervisor(mainApp: Application, options: registerAppOptions): Application<import("@nocobase/server").DefaultState, import("@nocobase/server").DefaultContext>;
}
