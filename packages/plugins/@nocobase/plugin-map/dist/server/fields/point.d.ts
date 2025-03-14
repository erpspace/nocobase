/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseColumnFieldOptions, DataTypes, Field, FieldContext } from '@nocobase/database';
declare class Point extends DataTypes.ABSTRACT {
    key: string;
}
export declare class PointField extends Field {
    constructor(options?: any, context?: FieldContext);
    get dataType(): typeof Point | DataTypes.GeometryDataType;
}
export interface PointFieldOptions extends BaseColumnFieldOptions {
    type: 'point';
}
export {};
