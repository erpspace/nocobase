/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model } from '@nocobase/database';
export declare const beforeInitOptions: {
    belongsTo(model: Model, { database }: {
        database: any;
    }): void;
    belongsToMany(model: Model, { database }: {
        database: any;
    }): void;
    hasMany(model: Model, { database }: {
        database: any;
    }): void;
    hasOne(model: Model, { database }: {
        database: any;
    }): void;
};
