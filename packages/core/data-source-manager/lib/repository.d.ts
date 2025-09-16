/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { IModel, IRepository } from './types';
export declare class Repository implements IRepository {
    create(options: any): Promise<void>;
    update(options: any): Promise<void>;
    find(options?: any): Promise<IModel[]>;
    findOne(options?: any): Promise<IModel>;
    destroy(options: any): Promise<void>;
    count(options?: any): Promise<Number>;
    findAndCount(options?: any): Promise<[IModel[], Number]>;
}
