/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseInterface } from '@nocobase/database';
export declare class PointInterface extends BaseInterface {
    toValue(str: any, ctx?: any): Promise<any>;
    toString(value: any, ctx?: any): any;
}
export declare class PolygonInterface extends BaseInterface {
    toValue(str: any, ctx?: any): Promise<any>;
    toString(value: any, ctx?: any): string;
}
export declare class LineStringInterface extends PolygonInterface {
}
export declare class CircleInterface extends BaseInterface {
    toValue(str: any, ctx?: any): Promise<any>;
    toString(value: any, ctx?: any): any;
}
