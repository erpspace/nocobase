/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database, Field } from '@nocobase/database';
type WriterFunc = (val: any, database: Database) => any;
export declare class FieldValueWriter {
    static writers: Map<string, WriterFunc>;
    static write(field: Field, val: any, database: any): any;
    static toDumpedValue(field: Field, val: any): any;
    static registerWriter(types: string | string[], writer: WriterFunc): void;
}
export {};
