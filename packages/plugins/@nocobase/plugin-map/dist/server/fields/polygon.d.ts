/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseColumnFieldOptions, DataTypes, Field, FieldContext } from '@nocobase/database';
declare class Polygon extends DataTypes.ABSTRACT {
    key: string;
}
export declare class PolygonField extends Field {
    constructor(options?: any, context?: FieldContext);
    get dataType(): DataTypes.GeometryDataType | typeof Polygon;
}
export interface PolygonFieldOptions extends BaseColumnFieldOptions {
    type: 'polygon';
}
export {};
