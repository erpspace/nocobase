/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model, Transactionable } from 'sequelize';
import Database from '../database';
interface ReferentialIntegrityCheckOptions extends Transactionable {
    db: Database;
    referencedInstance: Model;
}
export declare function referentialIntegrityCheck(options: ReferentialIntegrityCheckOptions): Promise<void>;
export {};
