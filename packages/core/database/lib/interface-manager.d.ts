/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Database from './database';
import { BaseInterface } from './interfaces/base-interface';
export declare class InterfaceManager {
    private db;
    interfaceTypes: Map<string, new (options: any) => BaseInterface>;
    constructor(db: Database);
    registerInterfaceType(name: any, iface: any): void;
    getInterfaceType(name: any): new (options: any) => BaseInterface;
}
