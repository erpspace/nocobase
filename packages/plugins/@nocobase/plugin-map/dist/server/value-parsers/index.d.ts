/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseValueParser } from '@nocobase/database';
export declare class PointValueParser extends BaseValueParser {
    setValue(value: any): Promise<void>;
}
export declare class PolygonValueParser extends BaseValueParser {
    setValue(value: any): Promise<void>;
}
export declare class LineStringValueParser extends BaseValueParser {
    setValue(value: any): Promise<void>;
}
export declare class CircleValueParser extends BaseValueParser {
    setValue(value: any): Promise<void>;
}
