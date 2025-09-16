/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function requireResolve(m: any): Promise<string>;
export declare function requireModule(m: any): any;
export default requireModule;
export declare function importModule(m: string): Promise<any>;
